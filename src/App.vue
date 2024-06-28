<template>
  <!-- 会跟vue-slider-component冲突 -->
  <van-config-provider theme="light">
    <routerView v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </routerView>
  </van-config-provider>
</template>
