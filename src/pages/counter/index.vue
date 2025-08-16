<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useCounterStore } from '@/stores'

const counterStore = useCounterStore()
const { counter } = storeToRefs(counterStore)
</script>

<template>
  <div class="text-14 space-y-10">
    <p>该计数器的状态通过 Pinia 持久化。刷新页面试试看！</p>
    <van-stepper v-model="counter" />
  </div>
</template>

<route lang="json5">
{
  name: 'Counter'
}
</route>
