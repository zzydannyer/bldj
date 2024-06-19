<script setup lang="ts">
  import {
    listOrgChildren,
    listUserByPosition,
    searchUser
  } from '@/api/_system/org';
  import { TreeNode, User, IUser, LoadOptions } from './type.d';
  import { debounce } from 'lodash';
  // @ts-ignore
  import Treeselect from '@zanmato/vue3-treeselect';
  import '@zanmato/vue3-treeselect/dist/vue3-treeselect.min.css';
  import { SysOrg } from '@/types/system/sys-org';
  import { SysUser } from '@/types/system/sys-user';
  import { onClickOutside } from '@vueuse/core';

  const {
    limit = 5,
    multiple = true,
    placeholder = '请选择',
    disabled = false,
    importType = 'user',
    valueFormat
  } = defineProps({
    limit: Number,
    placeholder: String,
    multiple: Boolean,
    disabled: Boolean,
    importType: String as PropType<'user' | 'org'>,
    valueFormat: [Object, String]
  });
  const modelValue = defineModel<IUser[] | IUser | string | string[]>();
  const options = ref<TreeNode[] | null>(null);
  const searchFn = debounce(
    (searchQuery, callback) => {
      searchUser(0, searchQuery).then(({ data }) => {
        const res = data?.map(
          (item: any) =>
            ({
              id: item.id,
              label: item.name + '-' + item.orgName
            }) as TreeNode
        );
        callback(undefined, res);
      });
    },
    1000,
    { leading: false, trailing: true }
  );

  function loadOptions({
    action,
    parentNode,
    callback,
    searchQuery,
    ...rest
  }: LoadOptions) {
    const errorHandler = (err: any) => {
      console.error(err);
      callback(new Error('加载失败'));
    };
    if (action === 'LOAD_CHILDREN_OPTIONS') {
      if (parentNode.type === 3 && importType === 'user') {
        listUserByPosition(parentNode.id)
          .then(({ data }) => {
            if (data && data.length) {
              parentNode.children = data.map(
                (item: SysUser) =>
                  ({
                    id: item.userId,
                    code: item.orgCode,
                    org: item.orgName,
                    label: item.nickName,
                    parentId: parentNode.id
                  }) as TreeNode
              );
            }
            callback();
          })
          .catch(errorHandler);
      } else {
        listOrgChildren(parentNode.id)
          .then(({ data }) => {
            if (data && data.length) {
              const result =
                importType == 'user' ? data : data.filter((i) => i.type !== 3);
              parentNode.children = result.map(
                (item: SysOrg) =>
                  ({
                    id: item.id,
                    code: item.code,
                    label: item.name,
                    parentId: parentNode.id,
                    type: item.type,
                    children: null
                  }) as TreeNode
              );
            }
            callback();
          })
          .catch(errorHandler);
      }
    } else if (action === 'ASYNC_SEARCH') {
      if (searchQuery) {
        searchFn(searchQuery, callback);
      }
    } else if (action === 'LOAD_ROOT_OPTIONS') {
      listOrgChildren(0)
        .then(({ data }) => {
          if (data && data.length) {
            options.value = data.map(
              (item: SysOrg) =>
                ({
                  id: item.id,
                  code: item.code,
                  label: item.name,
                  parentId: 0,
                  type: item.type,
                  children: null
                }) as TreeNode
            );
          }
          callback();
        })
        .catch(errorHandler);
    }
  }
  const emits = defineEmits(['select']);
  function onSelect(node: TreeNode) {
    emits('select', node);
  }
  const searchable = ref(false);
  function onSearch() {
    searchable.value = true;
    nextTick(() => {
      (
        document.querySelector('.vue3-treeselect__input') as HTMLInputElement
      )?.focus();
    });
  }
  function init() {
    const input = document.querySelector(
      '.vue3-treeselect__control'
    ) as HTMLInputElement;
    input.addEventListener('click', onSearch);
    onClickOutside(input, (event) => {
      searchable.value = false;
    });
  }
  function destroy() {
    const input = document.querySelector(
      '.vue3-treeselect__control'
    ) as HTMLInputElement;
    input.removeEventListener('click', onSearch);
  }
  onMounted(init);
  onBeforeUnmount(destroy);
</script>
<template>
  <treeselect
    async
    always-open
    disable-branch-nodes
    auto-load-root-options
    v-model="modelValue"
    valueFormat="object"
    retry-text="重试"
    loading-text="加载中"
    open-direction="bottom"
    no-results-text="没有结果"
    no-options-text="没有选项"
    no-children-text="没有选项"
    :max-height="360"
    :options="options"
    :multiple="true"
    :searchable="true"
    :load-options="loadOptions"
    :placeholder="placeholder"
    :limit-text="() => `最多选择 ${limit} 项`"
    :search-prompt-text="placeholder"
    @select="onSelect"
  />
</template>
