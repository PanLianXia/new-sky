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
                <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="textarea2"></el-input>
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

function registerEvents(tim, TIM, cstore) {
    console.log('TIM',TIM.EVENT)
    // 收到新消息
    tim.on(TIM.EVENT.MESSAGE_RECEIVED, function({data:messageList}) {
        console.log('event',messageList)
        if(messageList[0].conversationID === cstore.currentConversation.conversationID) {
            cstore.pushCurrentMessageList(messageList[0].payload.text)
        }
    }),
    // 会话列表更新
    tim.on(TIM.EVENT.CONVERSATION_LIST_UPDATED, function(event) {
        cstore.updateConversationList(event.data)
        console.log('cstore.conversationList',cstore.conversationList)
    })
}

export default defineComponent({
    setup() {
        const ustore = userStore()
        const cstore = conversationStore()
        const loginUserId = ref<string>('')
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
            }).then((res) =>{
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
        
        return {
            loginUserId,
            isLogin,
            currentMessageList,
            conversationList,
            currentConversation,
            login,
            changeCurrentConversation
        }
    },
})
</script>

<style lang="scss" scoped>
.choose {
    background-color: #ccc;
}
</style>
