<script setup lang="ts">
  import { useGlobal } from '@/utils';
  import { Icon } from '@iconify/vue';
  import AdvancedSearch from '@/views/culture/media/advanceSearch.vue';
  import List from '@/views/politics/components/keynote/list-system.vue';
  import useQueryParams from '@/hooks/common/useQueryParams';
  import { CultureMediaParams } from '@/api/culture/media.ts';
  const { $parse } = useGlobal<GlobalPropertiesApi>();
  const [queryParams, resetQueryParams] = useQueryParams<CultureMediaParams>(
    new CultureMediaParams()
  );

  const text = '沙家邦红色党建活动';
  defineOptions({
    name: 'MediaList'
  });

  const router = useRouter();
  const active = ref(0);
</script>

<template>
  <AdvancedSearch
    v-model="queryParams.params.mediaTitleLike"
    @search="onSearch"
    @reset="resetQueryParams"
  >
    <!-- 标题 -->
    <van-field
      v-model="queryParams.params.mediaTitleLike"
      input-align="left"
      label="标题"
      label-align="top"
      placeholder="请输入学习标题"
    />
    <!-- 填报单位 -->
    <van-field
      v-model="queryParams.params.authorLike"
      input-align="left"
      label="填报单位"
      label-align="top"
      placeholder="请输入填报单位"
    />
    <!-- 素材类别 -->
    <v-picker
      label="学习方式"
      label-align="top"
      input-align="left"
      placeholder="请选择学习方式"
      v-model="queryParams.params.resourceType"
      :columns="categoryOption"
      :columns-field-names="{
        text: 'label',
        value: 'id'
      }"
    />
    <!-- 学习年月 -->
    <van-field
      v-model="result"
      is-link
      label="学习年月"
      name="datePicker"
      label-align="top"
      input-align="left"
      placeholder="请选择学习年月"
      readonly
      @click="showreleasePicker = true"
    />
    <van-popup v-model:show="showreleasePicker" position="bottom">
      <van-date-picker
        @cancel="showreleasePicker = false"
        @confirm="onrleaseConfirm"
      />
    </van-popup>
    <!-- 填报时间 -->
    <van-field
      v-model="result"
      is-link
      label="填报时间"
      name="datePicker"
      label-align="top"
      input-align="left"
      placeholder="请选择填报时间"
      readonly
      @click="showreleasePicker = true"
    />
    <van-popup v-model:show="showreleasePicker" position="bottom">
      <van-date-picker
        @cancel="showreleasePicker = false"
        @confirm="onrleaseConfirm"
      />
    </van-popup>
  </AdvancedSearch>

  <v-card
    v-for="i in 10"
    :key="i"
    class="mt-3 mx-4 p-3"
    style="border: solid 1px #f3f3f3"
  >
    <template #title>
      <van-text-ellipsis :content="text" @click="router.push('/detail')" />
    </template>
    <List :count="i" :name="'name' + i" />
  </v-card>
</template>
