<script setup lang="ts">
  import { useGlobal } from '@/utils';
  import { Icon } from '@iconify/vue';
  import Search from '@/views/culture/social/search.vue';
  import SocialContent from '@/views/culture/social/content.vue';
  const { $parse } = useGlobal<GlobalPropertiesApi>();
  const text = '沙家邦红色党建活动';
  defineOptions({
    name: 'MediaList'
  });

  const router = useRouter();
  const active = ref(0);
</script>

<template>
  <Search />
  <section>工作提示</section>
</template>
