<script setup lang="ts">
  import { useGlobal } from '@/utils';
  import { Icon } from '@iconify/vue';
  import Search from '@/views/culture/social/search.vue';
  import SocialContent from '@/views/culture/social/content.vue';
  import AdvancedCrates from '@/views/culture/social/advancedSearch.vue';
  const { $parse } = useGlobal<GlobalPropertiesApi>();
  const text = '沙家邦红色党建活动';
  defineOptions({
    name: 'MediaList'
  });

  const router = useRouter();
  const active = ref(0);
</script>

<template>
  <div class="m-4">
    <van-search
      v-model="value"
      class="mx-auto rounded-md"
      placeholder="请输入搜索关键词"
      shape="round"
      show-action
      @search="onSearch"
    >
    </van-search>
  </div>
</template>
