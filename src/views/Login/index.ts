import {
  computed,
  defineComponent,
  getCurrentInstance,
  ref,
  reactive,
  toRefs,
  onMounted,
} from "vue";
import genTestUserSig from "../../../public/debug/GenerateTestUserSig";
import { userStore } from "../../store/user";
import { conversationStore } from "../../store/conversation";
import TxtBlock from "@/components/FileBlock/Txt.vue";
import { emojiMap } from '@/utils/emojiMap'

function registerEvents(tim: any, TIM: any, cstore: any) {
  console.log("TIM", TIM.EVENT);
  // 收到新消息
  tim.on(TIM.EVENT.MESSAGE_RECEIVED, ({ data: messageList }: any) => {
    console.log("event", messageList);
    if (
      messageList[0].conversationID ===
      cstore.currentConversation.conversationID
    ) {
      cstore.pushCurrentMessageList(messageList[0].payload.text);
    }
  }),
    // 会话列表更新
    tim.on(TIM.EVENT.CONVERSATION_LIST_UPDATED, (event: any) => {
      cstore.updateConversationList(event.data);
      console.log("cstore.conversationList", cstore.conversationList);
    });
}

export default defineComponent({
  components: { TxtBlock },
  setup() {
    const emojiEnum = emojiMap
    const emojiUrl = import.meta.env.VITE_EMOJI_URL
    const ustore = userStore();
    const cstore = conversationStore();

    const filePickerRef = ref();
    const imagePickerRef = ref();
    const videoPickerRef = ref();
    const loginUserId = ref<string>("");
    const sendMsg = ref<string>("");
    const sendMsgType = ref<string>("text");

    const state = reactive<{ sendFileList: any[]; test: any }>({
      sendFileList: [],
      test: {},
    });

    const $tim = getCurrentInstance()?.appContext.config.globalProperties.$tim;
    const $TIM = getCurrentInstance()?.appContext.config.globalProperties.$TIM;

    const isLogin = computed(() => ustore.isLogin);
    const currentMessageList = computed(() => cstore.currentMessageList);
    const conversationList = computed(() => cstore.conversationList);
    const currentConversation = computed(() => cstore.currentConversation);

    const login = () => {
      $tim
        .login({
          userID: loginUserId.value,
          userSig: genTestUserSig(loginUserId.value).userSig,
        })
        .then((res: any) => {
          console.log("res", res);
          registerEvents($tim, $TIM, cstore);
          cstore.updateCurrentConversation(conversationList[0]);
          ustore.toggleIsLogin(true);
          console.log(cstore.currentConversation);
        });
    };

    const changeCurrentConversation = (conversation: any) => {
      cstore.updateCurrentConversation(conversation);
    };

    const sendMessage = (e: Event) => {
      e.preventDefault(); // 阻止浏览器默认换行操作
      let message;
      if (sendMsgType.value === "text") {
        // 1. 创建消息实例，接口返回的实例可以上屏
        message = $tim.createTextMessage({
          to: "user1",
          conversationType: $TIM.TYPES.CONV_C2C,
          // 消息优先级，用于群聊（v2.4.2起支持）。如果某个群的消息超过了频率限制，后台会优先下发高优先级的消息，详细请参考：https://cloud.tencent.com/document/product/269/3663#.E6.B6.88.E6.81.AF.E4.BC.98.E5.85.88.E7.BA.A7.E4.B8.8E.E9.A2.91.E7.8E.87.E6.8E.A7.E5.88.B6)
          // 支持的枚举值：TIM.TYPES.MSG_PRIORITY_HIGH, TIM.TYPES.MSG_PRIORITY_NORMAL（默认）, TIM.TYPES.MSG_PRIORITY_LOW, TIM.TYPES.MSG_PRIORITY_LOWEST
          // priority: TIM.TYPES.MSG_PRIORITY_NORMAL,
          payload: {
            text: document.getElementById("send-msg")?.textContent,
          },
        });
        // 2. 发送消息
        let promise = $tim.sendMessage(message);
        promise
          .then((imResponse: any) => {
            // 发送成功
            document.getElementById("send-msg")!.textContent = "";
            // filePickerRef.value.value = null
            // state.sendFileList = []
            console.log(imResponse);
          })
          .catch((imError: any) => {
            // 发送失败
            console.warn("sendMessage error:", imError);
          });
      } else if (sendMsgType.value === "file") {
        state.sendFileList.forEach((_, index) => {
          message = $tim.createFileMessage({
            to: "user1",
            conversationType: $TIM.TYPES.CONV_C2C,
            payload: {
              file: state.test[index], // 或者用event.target
            },
            onProgress: (percent: any) => {
              // 手动给message 实例加个响应式属性: progress
            },
          });
          // 2. 发送消息
          let promise = $tim.sendMessage(message);
          promise
            .then((imResponse: any) => {
              // 发送成功
              filePickerRef.value.value = null;
              state.sendFileList = [];
              console.log(imResponse);
            })
            .catch((imError: any) => {
              // 发送失败
              console.warn("sendMessage error:", imError);
            });
        });
      }
    };

    // t拖拽发送
    const handleDrop = (e: any) => {
      e.preventDefault();
      console.log("eeeeeeeeeeeeeeeeee", e.dataTransfer.files);
      let file = e.dataTransfer.files[0];
      let message = {};
      if (file.type === "image/jpeg") {
        // 创建图片消息实例
        // 1. 创建消息实例，接口返回的实例可以上屏
        message = $tim.createImageMessage({
          to: "user1",
          conversationType: $TIM.TYPES.CONV_C2C,
          payload: {
            file: file,
          },
          onProgress: (event: any) => {
            console.log("file uploading:", event);
          },
        });
      } else if (file.type === "video/mp4") {
        // 创建视频消息实例
        message = $tim.createVideoMessage({
          to: "user1",
          conversationType: $TIM.TYPES.CONV_C2C,
          payload: {
            file: document.getElementById("videoPicker"), // 或者用event.target
          },
          onProgress: (event: any) => {
            console.log("file uploading:", event);
          },
        });
      } else {
        // 创建文件消息实例\
        message = $tim.createFileMessage({
          to: "user1",
          conversationType: $TIM.TYPES.CONV_C2C,
          payload: {
            file: file,
          },
          onProgress: (event: any) => {
            console.log("file uploading:", event);
          },
        });
      }
      // 2. 发送消息
      let promise = $tim.sendMessage(message);
      promise
        .then((imResponse: any) => {
          // 发送成功
          console.log(imResponse);
        })
        .catch((imError: any) => {
          // 发送失败
          console.warn("sendMessage error:", imError);
        });
    };

    const handleSendFileClick = () => {
      filePickerRef.value.click();
    };

    const sendFile = (e: any) => {
      console.log("file", e.target.files);
      console.log("file", e);
      state.test = e!.target!.files;
      state.sendFileList = Array.from(e.target.files);
      console.log("state.sendFileList", state.sendFileList);
      sendMsgType.value = "file";
    };

    // 选择表情
    const chooseEmoji = (emojiName:string) => {
        debugger
        //输入框内容加[表情]
        document.getElementById("send-msg")!.innerHTML = document.getElementById("send-msg")!.innerHTML + emojiName;
    }

    return {
      emojiEnum,
      emojiUrl,
      filePickerRef,
      imagePickerRef,
      videoPickerRef,
      loginUserId,
      isLogin,
      currentMessageList,
      conversationList,
      currentConversation,
      sendMsg,
      ...toRefs(state),
      login,
      changeCurrentConversation,
      sendMessage,
      handleDrop,
      handleSendFileClick,
      sendFile,
      chooseEmoji
    };
  },
});