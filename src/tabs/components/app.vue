<template>
  <div class="background">
    <div class="content margin-auto">
      <!-- <el-card class="margin-t-10">
        <div> </div>
        <div class="flex-center">
          <el-input
            v-model="searchValue"
            placeholder="Please input"
            class="input-with-select"
            autofocus
          >
            <template #prepend>
              <div class="input-prepend cursor-pointer" @click="showDialog">
                <img :src="Openai" alt="" srcset="" class="width-30 height-30" />
                <el-icon class="arrow" :class="{ caretActive: isMask }"><CaretBottom /></el-icon>
              </div>
            </template>
          </el-input>
        </div>
      </el-card> -->
      <el-card class="overflow-scroll flex-1 margin-t-10" v-loading="loading">
        <div class="flex-bet message-list" v-for="(item, index) in sessionList" :key="index">
          <div class="image-position">
            <img
              :src="item.role === 'assistant' ? Openai : Head"
              alt=""
              srcset=""
              class="width-30 height-30"
            />
          </div>
          <div class="flex-1 font-s-14">
            <v-md-preview :text="item.content" />
          </div>
        </div>
      </el-card>
      <el-card class="margin-t-10">
        <div class="flex-center">
          <el-input v-model="message" placeholder="请输入..." class="input-with-select">
            <template #append>
              <el-button color="#626aef" :dark="true" @click="submit" class="height-40 width-80"
                >submit</el-button
              >
            </template>
          </el-input>
        </div>
      </el-card>
      <div class="mask" v-if="isMask" @click="closeDialog">
        <div class="engine-list">
          <div class="item" v-for="item of logoList" :key="item.id">
            <img :src="item.logo" alt="" srcset="" class="logo" />
            <span class="title">{{ item.title }}</span>
            <svg
              class="icon-checked"
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
            >
              <rect width="14" height="14" rx="7" fill="#626aef" />
              <path
                d="M3 7.90942L4.23077 6.6973L6.07692 7.90942C7 6.39426 9.76923 4.37406 11 3.66699V4.87911C9.76923 5.60639 7.20513 8.81851 6.07692 10.3337L3 7.90942Z"
                fill="white"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import Openai from '../../assets/images/openai.png';
  import Head from '../../assets/images/head.png';
  // import { CaretBottom } from '@element-plus/icons-vue';
  import { fetchChatAPI } from '../../utils/request';
  import { ChatCompletionRequestMessage } from 'openai';
  import { logoList } from './const';
  const message = ref<string>('');
  // const searchValue = ref<string>('');
  const loading = ref<boolean>(false);
  const isMask = ref<boolean>(false);
  const sessionList = reactive<ChatCompletionRequestMessage[]>([]);
  const submit = async () => {
    sessionList.push({ role: 'user', content: message.value });
    clearMessage();
    loading.value = true;
    const res = await fetchChatAPI(sessionList);
    console.log(res);
    if (res.status === 200) {
      sessionList.push(res.data.choices[0].message as ChatCompletionRequestMessage);
      loading.value = false;
    }
  };
  const clearMessage = () => {
    message.value = '';
  };
  const closeDialog = () => {
    isMask.value = false;
  };
  // const showDialog = () => {
  //   isMask.value = true;
  // };
</script>

<style scoped lang="scss">
  .background {
    width: 100vw;
    height: 100vh;
    color: #ffffff;
    background-color: rgba(4, 101, 120, 0.9);
  }

  .content {
    width: 60vw;
    height: 100vh;
    opacity: 0.9;
    display: flex;
    flex-direction: column;
    z-index: 999;
  }

  .image-position {
    margin-top: 2rem;
  }

  .message-list {
    align-items: flex-start;
  }
  .input-prepend {
    width: 50px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .arrow {
    transition: transform 0.15s linear;
  }
  .caretActive {
    transform: rotate(180deg);
  }
  img {
    border-style: none !important;
  }
  img {
    border: 0;
  }
  .mask {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 600;
    background-color: rgba(0, 0, 0, 0.4);
  }
  .engine-list {
    display: flex;
    flex-direction: row;
    z-index: 750;
    flex-wrap: wrap;
    justify-content: flex-start;
    position: absolute;
    top: 4.6rem;
    left: 30%;
    border-radius: 2px;
    width: calc(40vw - 20px);
    padding: 0.6rem 0.6rem 0 0.6rem;
    color: #1d2129;
    background-color: #fff;
    .item {
      position: relative;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      width: 7.5rem;
      height: 7.5rem;
      border-radius: 2px;
      font-size: 0.8rem;
      margin-right: 0.6rem;
      margin-bottom: 0.6rem;
    }
    .logo {
      width: 3rem;
    }
    .title {
      margin-top: 0.6rem;
    }
    .icon-checked {
      position: absolute;
      right: 0.3rem;
      top: 0.3rem;
      background-size: 100%;
      width: 1rem;
      height: 1rem;
    }
  }
  .engine-list .item.active,
  .engine-list .item:hover {
    font-weight: 500;
    background-color: rgba(129, 136, 242, 0.2);
    color: rgb(129, 136, 242);
  }
  .input-with-select {
    margin: 0 auto;
    width: 40vw;
  }
</style>
