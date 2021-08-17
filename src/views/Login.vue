<template>
    <div v-if="!isLogin">
        <el-input v-model="loginUserId"></el-input>
        <el-button size="small" type="primary" @click="login">登录</el-button>
    </div>
    <div v-else>
        <el-row>
            <el-col :xs="10" :sm="10" :md="8" :lg="8" :xl="7">
                <!-- <side-bar /> -->
                <ul>
                    <li :class="{ 'choose': currentConversation ? item.conversationID === currentConversation.conversationID : false }" v-for="(item, index) in conversationList" :key="index" @click="changeCurrentConversation(item)">{{ item.userProfile.userID }}</li>
                </ul>
            </el-col>
            <el-col :xs="14" :sm="14" :md="16" :lg="16" :xl="17">
                <!-- <current-conversation /> -->
                <ul>
                    <li>11</li>
                    <li v-for="(item,index) in currentMessageList" :key="index">{{item}}</li>
                </ul>
                <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="sendMsg" @keydown.enter.exact.prevent="sendMessage"></el-input>
            </el-col>
        </el-row>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, getCurrentInstance, ref } from 'vue'
import genTestUserSig from '../../public/debug/GenerateTestUserSig'
import { userStore } from '../store/user'
import { conversationStore } from '../store/conversation'
import { mapState } from 'vuex'

function registerEvents(tim: any, TIM: any, cstore: any) {
    console.log('TIM',TIM.EVENT)
    // 收到新消息
    tim.on(TIM.EVENT.MESSAGE_RECEIVED, function({data:messageList}) {
        console.log('event',messageList)
        if(messageList[0].conversationID === cstore.currentConversation.conversationID) {
            cstore.pushCurrentMessageList(messageList[0].payload.text)
        }
    }),
    // 会话列表更新
    tim.on(TIM.EVENT.CONVERSATION_LIST_UPDATED, function(event: any) {
        cstore.updateConversationList(event.data)
        console.log('cstore.conversationList',cstore.conversationList)
    })
}

export default defineComponent({
    setup() {
        const ustore = userStore()
        const cstore = conversationStore()
        const loginUserId = ref<string>('')
        const sendMsg = ref<string>('')
        const $tim = getCurrentInstance().appContext.config.globalProperties.$tim
        const $TIM = getCurrentInstance().appContext.config.globalProperties.$TIM
        const isLogin = computed(() => ustore.isLogin)
        const currentMessageList = computed(() => cstore.currentMessageList)
        const conversationList = computed(() => cstore.conversationList)
        const currentConversation = computed(() => cstore.currentConversation)

        const login = () => {
            $tim.login({
                userID: loginUserId.value,
                userSig: genTestUserSig(loginUserId.value).userSig, 
            }).then((res: any) =>{
                console.log('res',res)
                registerEvents($tim, $TIM, cstore)
                cstore.updateCurrentConversation(conversationList[0])
                ustore.toggleIsLogin(true)
                console.log(cstore.currentConversation)
            })
        }

        const changeCurrentConversation = (conversation) => {
            cstore.updateCurrentConversation(conversation)
        }

        const sendMessage = (e: Event) => {
            e.preventDefault(); // 阻止浏览器默认换行操作
            // 1. 创建消息实例，接口返回的实例可以上屏
            let message = $tim.createTextMessage({
                to: 'user1',
                conversationType: $TIM.TYPES.CONV_C2C,
                // 消息优先级，用于群聊（v2.4.2起支持）。如果某个群的消息超过了频率限制，后台会优先下发高优先级的消息，详细请参考：https://cloud.tencent.com/document/product/269/3663#.E6.B6.88.E6.81.AF.E4.BC.98.E5.85.88.E7.BA.A7.E4.B8.8E.E9.A2.91.E7.8E.87.E6.8E.A7.E5.88.B6)
                // 支持的枚举值：TIM.TYPES.MSG_PRIORITY_HIGH, TIM.TYPES.MSG_PRIORITY_NORMAL（默认）, TIM.TYPES.MSG_PRIORITY_LOW, TIM.TYPES.MSG_PRIORITY_LOWEST
                // priority: TIM.TYPES.MSG_PRIORITY_NORMAL,
                payload: {
                    text: sendMsg.value
                }
            });

            // 2. 发送消息
            let promise = $tim.sendMessage(message);
            promise.then((imResponse: any) => {
                // 发送成功
                sendMsg.value = ''
                console.log(imResponse);
            }).catch((imError: any) => {
                // 发送失败
                console.warn('sendMessage error:', imError);
            });
        }
        
        return {
            loginUserId,
            isLogin,
            currentMessageList,
            conversationList,
            currentConversation,
            sendMsg,
            login,
            changeCurrentConversation,
            sendMessage
        }
    },
})
</script>

<style lang="scss" scoped>
.choose {
    background-color: #ccc;
}
</style>
