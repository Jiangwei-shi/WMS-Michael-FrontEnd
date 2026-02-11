<template>
  <el-config-provider :locale="elementLocale">
    <router-view />
  </el-config-provider>
  </template>

<script setup>
import { computed, nextTick, onMounted } from 'vue'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import en from 'element-plus/lib/locale/lang/en'
import useSettingsStore from '@/store/modules/settings'
import { handleThemeStyle } from '@/utils/theme'

const settingsStore = useSettingsStore()

const elementLocale = computed(() =>
  settingsStore.language === 'en' ? en : zhCn
)

onMounted(() => {
  nextTick(() => {
    // 初始化主题样式
    handleThemeStyle(settingsStore.theme)
  })
})
</script>

<style>
.anchorBL {
  display: none !important;
}
</style>
