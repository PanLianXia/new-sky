import { defineStore } from "pinia";

interface ConversationState {
    currentConversation: any,
    currentMessageList: any[],
    conversationList: any[]
}
// defineStore 调用后返回一个函数，调用该函数获得 Store 实体
export const conversationStore = defineStore({
  // id: 必须的，在所有 Store 中唯一
  id: "conversationState",
  // state: 返回对象的函数
  state: ():ConversationState => ({
    currentConversation: {},
    currentMessageList: [],
    conversationList: []
  }),
  actions: {
    /**
     * 将消息插入当前会话列表
     * 调用时机：收/发消息事件触发时
     * @param {Message[]|Message} data
     * @returns
     */
    pushCurrentMessageList(message: string) {
        this.currentMessageList
        this.currentMessageList = [...this.currentMessageList, message]
    },
    /**
     * 更新会话列表
     * 调用时机：触发会话列表更新事件时。CONVERSATION_LIST_UPDATED
     * @param {Conversation[]} conversationList
     */
    updateConversationList(conversationList: any[]) {
        this.conversationList = conversationList
    },

    /**
     * 更新当前会话
     * 调用时机: 切换会话时
     * @param {Conversation} conversation
     */
    updateCurrentConversation(conversation: any) {
        this.currentConversation = conversation
        this.currentMessageList = []
    }
  },
});
