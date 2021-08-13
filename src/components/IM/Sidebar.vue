<template>
    <div class="side-bar-wrapper">
        <div class="bar-left">
            <!-- <my-profile />
            <div class="tab-items" @click="handleClick">
                <div id="conversation-list" class="iconfont icon-conversation" :class="{ active: showConversationList }" title="会话列表">
                    <sup class="unread" v-if="totalUnreadCount !== 0">
                        <template v-if="totalUnreadCount > 99">99+</template>
                        <template v-else>{{totalUnreadCount}}</template>
                    </sup>
                </div>
                <div id="group-list" class="iconfont icon-group" :class="{ active: showGroupList }" title="群组列表"></div>
                <div id="friend-list" class="iconfont icon-contact" :class="{ active: showFriendList }" title="好友列表"></div>
                <div id="black-list" class="iconfont icon-blacklist" :class="{ active: showBlackList }" title="黑名单列表"></div>
                <div id="group-live" class="group-live" title="群直播"></div>
            </div>
            <div class="bottom">
                <div class="iconfont icon-tuichu" @click="$store.dispatch('logout')" title="退出"></div>
            </div> -->
            会话列表
        </div>
        <div class="bar-right">
            <!-- <conversation-list v-show="showConversationList" /> -->
            
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    setup() {
        
    },
})
</script>
