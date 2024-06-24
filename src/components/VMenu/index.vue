<script setup lang="ts">
  import { RouteRecordRaw } from 'vue-router';
  import { useImage } from '@/utils/assets';
  import { Icon } from '@iconify/vue';
  import { storeToRefs } from 'pinia';
  import useUserInfoStore from '@/store/modules/userInfo';
  import allRoutes from '@/router/routes';
  import { hasAuth } from '@/utils/auth';
  import { cloneDeep } from 'lodash';

  const route = useRoute();
  const router = useRouter();

  const userInfoStore = useUserInfoStore();
  const { orgName, username, avatar } = storeToRefs(userInfoStore);

  const { logout } = userInfoStore;
  const { auths } = storeToRefs(userInfoStore);
  console.log('🚀 ~ file: upload.vue:19 ~ auths:', auths);
  const container = ref<HTMLElement>();

  const show = ref(false);
  const showMenu = () => {
    show.value = true;
  };
  const activeNames = ref<string>('');

  const curRoute = computed(() => route.path);

  const menu = computed<RouteRecordRaw[]>(() => filteRoutes(allRoutes));

  /**
   * @description 过滤隐藏的路由
   * @param routes
   */
  const filteRoutes = (routes: readonly RouteRecordRaw[]) => {
    return routes
      .filter((route: RouteRecordRaw) => {
        if (!route.meta!.auth) return route.meta!.visible;
        return route.meta!.visible && hasAuth(route.meta!.auth as string);
      })
      .map((route) => {
        const newRoute = cloneDeep(route);
        if (newRoute.children)
          newRoute.children = filteRoutes(newRoute.children);
        return newRoute;
      });
  };

  /**
   * @description 路由跳转
   * @param menuItem
   */
  const navigateTo = (menuItem: RouteRecordRaw) => {
    const { path, children } = menuItem;
    if (!children || children.length === 0) {
      router.push({ path });
    }
  };
  defineExpose({ showMenu });
</script>

<template>
  <van-popup
    ref="container"
    v-model:show="show"
    position="right"
    teleport="body"
    :style="{ width: '60%', height: '100%' }"
  >
    <van-sticky class="my-2 px-4" :container="container">
      <van-row justify="center" align="center">
        <van-image width="20" height="20" :src="useImage('logo')" />
        <span class="font-bold inline-block p-2">百联党建</span>
      </van-row>
      <div class="text-center text-sm font-thin text-gray-500">
        {{ username }}
      </div>
      <div class="text-center text-xs font-thin text-gray-500">
        <p class="text-left inline-block my-0">{{ orgName }}</p>
      </div>
    </van-sticky>

    <van-collapse v-model="activeNames" accordion>
      <!-- 一级菜单 -->
      <van-collapse-item
        v-for="menuItem in menu"
        class="menu-item"
        :class="
          curRoute === menuItem.redirect &&
          (!menuItem.children || menuItem.children.length === 0)
            ? 'active-menu'
            : ''
        "
        :border="false"
        :key="menuItem.path"
        :name="menuItem.path"
        :readonly="!menuItem.children || menuItem.children.length === 0"
        @click.prevent="navigateTo(menuItem)"
      >
        <template #icon>
          <Icon :icon="menuItem.meta?.icon as string" />
        </template>
        <template #title>
          {{ menuItem.meta?.title }}
        </template>
        <!-- 二级菜单 -->
        <van-collapse-item
          v-for="subMenuItem in menuItem.children"
          class="sub-menu-item"
          :class="curRoute === subMenuItem.path ? 'active-menu' : ''"
          :border="false"
          :key="subMenuItem.path"
          :name="menuItem.path + '&' + subMenuItem.path"
          :readonly="!subMenuItem.children || subMenuItem.children.length === 0"
          @click.prevent="navigateTo(subMenuItem)"
        >
          <template #title>
            {{ subMenuItem.meta?.title }}
          </template>
          <!-- 三级菜单 -->
          <van-collapse-item
            v-for="childMenuItem in subMenuItem.children"
            class="child-menu-item"
            :class="curRoute === childMenuItem.path ? 'active-menu' : ''"
            :border="false"
            :key="childMenuItem.path"
            :name="childMenuItem.path"
            :readonly="
              !childMenuItem.children || childMenuItem.children.length === 0
            "
            @click.prevent="navigateTo(childMenuItem)"
          >
            <template #title>
              {{ childMenuItem.meta?.title }}
            </template>
          </van-collapse-item>
        </van-collapse-item>
      </van-collapse-item>
    </van-collapse>

    <van-cell
      class="fixed left-0 bottom-0 items-center gap-1"
      clickable
      @click="logOut"
    >
      <template #icon>
        <Icon class="align-middle" icon="basil:logout-solid" :rotate="2" />
      </template>
      <template #title>
        <span class="align-middle">退出登录</span>
      </template>
    </van-cell>
  </van-popup>
</template>

<style lang="scss" scoped>
  :deep() {
    .van-collapse-item__content {
      padding: 0;
    }

    // --van-collapse-item-content-padding

    .menu-item,
    .sub-menu-item,
    .child-menu-item {
      .van-cell {
        // border-bottom: var(--van-border-width) solid var(--van-gray-3);
        background-color: transparent;
        align-items: center;
        gap: 10px;

        &:active {
          background-color: var(--van-gray-2);
        }
      }
    }

    .menu-item .van-cell {
      padding-left: var(--van-padding-md);
    }

    .sub-menu-item .van-cell {
      font-size: $small-font-size;
      padding-left: calc(var(--van-padding-md) * 2);
    }

    .child-menu-item .van-cell {
      font-size: $min-font-size;
      padding-left: calc(var(--van-padding-md) * 3);
    }

    .active-menu .van-cell {
      position: relative;
      background: #f1f7ff;

      &::before {
        position: absolute;
        left: 0;
        top: 0;
        content: '';
        display: block;
        width: 8px;
        height: 100%;
        background-color: $theme-color;
        border-radius: $border-radius;
      }
    }
  }

  .van-hairline--top-bottom:after,
  .van-hairline-unset--top-bottom:after {
    border-width: 0;
  }
</style>
