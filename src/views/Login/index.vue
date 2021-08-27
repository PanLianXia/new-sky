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
          <li
            :class="{ choose: currentConversation ? item.conversationID === currentConversation.conversationID : false }"
            v-for="(item, index) in conversationList"
            :key="index"
            @click="changeCurrentConversation(item)"
          >
            {{ item.userProfile.userID }}
          </li>
        </ul>
      </el-col>
      <el-col :xs="14" :sm="14" :md="16" :lg="16" :xl="17">
        <!-- <current-conversation /> -->
        <ul>
          <li>收到的消息</li>
          <li v-for="(item, index) in currentMessageList" :key="index">
            {{ item }}
          </li>
        </ul>
        <div class="send-message-block">
          <div id="send-msg" class="send-msg" @drop="handleDrop" contenteditable="true" @keydown.enter.exact.prevent="sendMessage">
            <div v-if="sendFileList.length > 0">
              <txt-block v-for="(fileItem, index) in sendFileList" :key="index" :fileName="fileItem.name" />
            </div>
          </div>
          <div class="send-message-icons">
            <i class="el-icon-files" @click="handleSendFileClick" title="发文件"></i>
            <el-popover placement="top" :width="400" trigger="click">
              <div class="emoji-block">
                <div v-for="(value, key) in emojiEnum" class="emoji" :key="key" @click="chooseEmoji(key)">
                  <img :src="emojiUrl + value" style="width: 30px; height: 30px" />
                </div>
              </div>
              <template #reference>
                <i class="el-icon-star-off" title="发表情"></i>
              </template>
            </el-popover>
          </div>
        </div>

        <input type="file" id="imagePicker" ref="imagePickerRef" accept=".jpg" @change="sendImage" style="display: none" />
        <input type="file" id="filePicker" ref="filePickerRef" @change="sendFile" multiple="multiple" style="display: none" />
        <input type="file" id="videoPicker" ref="videoPickerRef" @change="sendVideo" style="display: none" accept=".mp4" />
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>

<style lang="scss" scoped>
.choose {
  background-color: #ccc;
}
.send-msg {
  height: 300px;
  padding: 20px;
  background-color: #fff;
}
.emoji-block {
  display: flex;
  flex-flow: wrap;
  height: 100px;
  overflow-y: auto;
}
</style>
