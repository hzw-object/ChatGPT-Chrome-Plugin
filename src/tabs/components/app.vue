<template>
  <div class="background">
    <div class="content margin-auto">
      <el-card class="box-card overflow-scroll flex-1">
        <div> </div>
        <div class="flex-bet margin-tb-10" v-for="(item, index) in sessionList" :key="index">
          <div class="image-position">
            <div class="width-30 height-30">
              <img :src="Auth" alt="" srcset="" class="width-30 height-30" />
            </div>
          </div>
          <div class="flex-1 font-s-14 margin-l-10">
            <v-md-preview :text="item.content" />
          </div>
        </div>
      </el-card>
      <el-card>
        <el-input v-model="message" placeholder="请输入..." class="input-with-select">
          <template #append>
            <el-button :icon="Position" @click="submit" />
          </template>
        </el-input>
      </el-card>
    </div>
  </div>
</template>

<script setup lang="ts">
  import Auth from '../../assets/images/openai.png';
  import { Position } from '@element-plus/icons-vue';
  import { fetchChatAPI } from '../../utils/request';
  import { ChatCompletionRequestMessage } from 'openai';
  const message = ref<string>('');
  const sessionList = reactive<ChatCompletionRequestMessage[]>([]);
  const submit = async () => {
    sessionList.push({ role: 'user', content: message.value });
    const res = await fetchChatAPI(sessionList);
    console.log(res);
    if (res.status === 200) {
      sessionList.push(res.data.choices[0].message as ChatCompletionRequestMessage);
      message.value = '';
    }
  };
</script>

<style scoped lang="scss">
  .background {
    width: 100vw;
    height: 100vh;
    background-color: #171921;
    color: #ffffff;
  }
  .content {
    width: 800px;
    height: 100vh;
    display: flex;
    flex-direction: column;
  }
  .image-position {
    display: flex;
    align-items: flex-start;
  }
  .box-card {
    width: 800px;
  }
</style>
