<script setup lang="ts">
import { rootRouteList } from '@/config/routes'

const route = useRoute()
const router = useRouter()

const titleMap: Record<string, string> = {
  'Home': '主页',
  'Profile': '我的',
  'Mock': '🗂️ Mock',
  'Charts': '📊 图表',
  'UnoCSS': '⚡ UnoCSS',
  'Counter': '🍍 状态持久化',
  'KeepAlive': '♻️ 页面缓存',
  'ScrollCache': '📍 滚动缓存',
  'Login': '🧑‍💻 登录',
  'Register': '🧑‍💻 注册',
  'ForgotPassword': '❓ 忘记密码',
  'Settings': '⚙️ 设置',
  '404': '⚠️ 404 页面',
}

const title = computed(() => {
  if (route.name && titleMap[route.name as string]) {
    return titleMap[route.name as string]
  }
  return '🤷 未定义标题'
})

/**
 * Show the left arrow
 * If route name is in rootRouteList, hide left arrow
 */
const showLeftArrow = computed(() => {
  if (route.name && rootRouteList.includes(route.name)) {
    return false
  }

  return true
})

function onBack() {
  if (window.history.state.back) {
    history.back()
  }
  else {
    router.replace('/')
  }
}
</script>

<template>
  <VanNavBar
    :title="title"
    :fixed="true"
    :left-arrow="showLeftArrow"
    placeholder clickable
    @click-left="onBack"
  />
</template>
