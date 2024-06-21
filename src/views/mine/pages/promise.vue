<script setup lang="ts">
  import { Icon } from '@iconify/vue';
  import { useIcon } from '@/utils/assets';

  const router = useRouter();
  const form = ref({ code: '' });
</script>
<template>
  <div class="bg-white pb-28">
    <div class="tit">我的承诺</div>
    <div class="leading-7 text-sm p-5">
      1、树立正确的世界观、人生观、价值观，严格遵守党纪国法，坚决贯彻执行领导干部廉洁从政的相关制度和准则;<br />
      2、敬岗爱业，扎实履行工作职责，认真贯彻落实国家各级各项政策，维护人民群众利益;<br />
      3、不断加强自身廉洁自律、率先垂范。牢固树立大局观念,弘扬和谐向上的团队精神。
    </div>
    <div class="tit">岗位承诺</div>
    <div class="leading-7 text-sm p-5">
      1、认真履行本职工作，严格执行国家教育考试工作有关，积极推进教育考试各项改革;<br />
      2、协调各相关部门、学校和考点，加强考点环境周边治理工作、交通疏导工作和安全保卫工作，确保为考生提供安全、舒适的招考环境，切实做到“平安招考”。<br />
      3、以人为本、关心考生、服务考生，服务社会，提高人民群众对招考系统工作的满意度。
    </div>
    <div class="tit">实事承诺</div>
    <div class="leading-7 text-sm p-5">
      1、积极争取各级党委、政府的支持，筹备资金和技术人员，推进我市考点标准化建设和考务平台建设的第二期工程顺利进行。<br />
      2、协调各相关部门、学校和考点，加强考点环境周边治理工作、交通疏导工作和安全保卫工作，确保为考生提供安全、舒适的招考环境，切实做到“平安招考”。<br />
      3、以人为本、关心考生、服务考生，服务社会，提高人民群众对招考系统工作的满意度。
    </div>
  </div>
</template>
<style lang="scss" scoped>
  .tit {
    @apply leading-9 text-center font-normal;
    background-color: #f6f6f6;
  }
  .text {
    @apply leading-7 text-sm p-5;
  }
</style>
