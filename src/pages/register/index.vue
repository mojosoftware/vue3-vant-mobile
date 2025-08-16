<script setup lang="ts">
import { useRouter } from 'vue-router'
import { showNotify } from 'vant'
import { useUserStore } from '@/stores'
import vw from '@/utils/inline-px-to-vw'

const router = useRouter()
const userStore = useUserStore()
const loading = ref(false)

const postData = reactive({
  email: '',
  code: '',
  nickname: '',
  password: '',
  confirmPassword: '',
})

const validatorPassword = (val: string) => val === postData.password

const rules = reactive({
  email: [
    { required: true, message: '请输入邮箱' },
  ],
  code: [
    { required: true, message: '请输入验证码' },
  ],
  nickname: [
    { required: true, message: '请输入昵称' },
  ],
  password: [
    { required: true, message: '请输入密码' },
  ],
  confirmPassword: [
    { required: true, message: '请再次输入密码' },
    { required: true, validator: validatorPassword, message: '两次输入的密码不一致' },
  ],
})

async function register() {
  try {
    loading.value = true

    const res = await userStore.register()

    if (res.code === 0) {
      showNotify({ type: 'success', message: '注册成功' })
      router.push({ name: 'Login' })
    }
  }
  finally {
    loading.value = false
  }
}

const isGettingCode = ref(false)

const buttonText = computed(() => {
  return isGettingCode.value ? '获取中' : '获取验证码'
})

async function getCode() {
  if (!postData.email) {
    showNotify({ type: 'warning', message: '请输入邮箱' })
    return
  }

  isGettingCode.value = true
  const res = await userStore.getCode()
  if (res.code === 0)
    showNotify({ type: 'success', message: `已发送，验证码为: ${res.result}` })

  isGettingCode.value = false
}
</script>

<template>
  <div class="m-x-a text-center w-7xl">
    <van-form :model="postData" :rules="rules" validate-trigger="onSubmit" @submit="register">
      <div class="rounded-3xl overflow-hidden">
        <van-field
          v-model.trim="postData.email"
          :rules="rules.email"
          name="email"
          placeholder="邮箱"
        />
      </div>

      <div class="mt-16 rounded-3xl overflow-hidden">
        <van-field
          v-model.trim="postData.code"
          :rules="rules.code"
          name="code"
          placeholder="验证码"
        >
          <template #button>
            <van-button size="small" type="primary" plain @click="getCode">
              {{ buttonText }}
            </van-button>
          </template>
        </van-field>
      </div>

      <div class="mt-16 rounded-3xl overflow-hidden">
        <van-field
          v-model.trim="postData.nickname"
          :rules="rules.nickname"
          name="nickname"
          placeholder="昵称"
        />
      </div>

      <div class="mt-16 rounded-3xl overflow-hidden">
        <van-field
          v-model.trim="postData.password"
          type="password"
          :rules="rules.password"
          name="password"
          placeholder="密码"
        />
      </div>

      <div class="mt-16 rounded-3xl overflow-hidden">
        <van-field
          v-model.trim="postData.confirmPassword"
          type="password"
          :rules="rules.confirmPassword"
          name="confirmPassword"
          placeholder="再次输入密码"
        />
      </div>

      <div class="mt-16">
        <van-button
          :loading="loading"
          type="primary"
          native-type="submit"
          round block
        >
          确认
        </van-button>
      </div>
    </van-form>

    <GhostButton to="login" block :style="{ 'margin-top': vw(8) }">
      返回登录
    </GhostButton>
  </div>
</template>

<route lang="json5">
{
  name: 'Register'
}
</route>