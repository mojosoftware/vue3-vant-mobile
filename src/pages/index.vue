<script setup lang="ts">

const checked = computed({
  get: () => isDark.value,
  set: () => toggleDark(),
})

const menuItems = computed(() => ([
  { title: '🗂️ Mock', route: 'mock' },
  { title: '⚡ UnoCSS', route: 'unocss' },
  { title: '🍍 状态持久化', route: 'counter' },
  { title: '♻️ 页面缓存', route: 'keepalive' },
  { title: '📍 滚动缓存', route: 'scroll-cache' },
  { title: '⚠️ 404 页面', route: 'unknown' },
]))
</script>

<template>
  <van-cell-group title="设置" :border="false" :inset="true">
    <van-cell center title="🌗 深色模式">
      <template #right-icon>
        <van-switch
          v-model="checked"
          size="20px"
          aria-label="on/off Dark Mode"
        />
      </template>
    </van-cell>
  </van-cell-group>

  <van-cell-group title="示例" :border="false" :inset="true">
    <template v-for="item in menuItems" :key="item.route">
      <van-cell :title="item.title" :to="item.route" is-link />
    </template>
  </van-cell-group>
</template>

<route lang="json5">
{
  name: 'Home'
}
</route>
