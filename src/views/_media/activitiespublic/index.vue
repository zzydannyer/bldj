<script setup lang="ts">
import { PaginationProps } from "@/types/index";
import { activitiesLists } from '@/types/_media'
import { onBeforeMount, onMounted, reactive, ref } from 'vue';
import { listMediaActivitiesRanking } from "@/api/media";
const activitiesList = ref<any[]>([])
const pagination = reactive<PaginationProps>({
    total: 0,
    pageSize: 10,
    currentPage: 1
});
// 获取排名
const getRanking = async () => {
    let { data } = await listMediaActivitiesRanking({},pagination)
    activitiesList.value = data!
}

onMounted(() => {
    getRanking()
})
</script>
<template>
    <main class="container">
        <v-card v-for="item in activitiesList" class="mt-2">
            <h3 class="text-center">{{ item?.activitiesName }}</h3>
            <van-divider />
            <div class="pr-5" v-for="(i, index) in item.scoreList.slice(0,6)">
                <div v-if="index + 1 === 1">
                    <div class="flex justify-between  font-bold text-xl text-red-600">
                        
                            <div class="medal">
                            {{index + 1}}
                       
                        </div>
                       
                       
                        <div class="text-center flex-1 items-center">{{ i.userName }}</div>
                        <div class="w-5">{{ i.score }}</div>
                    </div>
                </div>
                <div v-else-if="index + 1 === 2">
                    <div class="flex justify-between mt-3 font-bold text-lg text-red-400">
                        <div class="medal silvery">
                            {{index + 1}}
                        </div>
                        <div class="text-center flex-1 items-center">{{ i.userName }}</div>
                        <div class="w-5">{{ i.score }}</div>
                    </div>
                </div>
                <div v-else-if="index + 1 === 3">
                    <div class="flex mt-3 justify-between font-bold text-base text-red-400">
                        <div class="medal copper">
                            {{index + 1}}
                        </div>
                        <div class="text-center flex-1 items-center">{{ i.userName }}</div>
                        <div class="w-5">{{ i.score }}</div>
                    </div>
                </div>
                <div v-else class="flex justify-between text-gray-500 text-xs">
                    <span class="w-2"> {{ index + 1 }}</span>
                    <div class="text-center flex-1 items-center">{{ i.userName }}</div>
                    <div class="w-5">{{ i.score }}</div>
                </div>
            </div>


        </v-card>
    </main>
</template>
<style>
.medal{
    width: 50px;
    height: 50px;
    text-align: center;
    border-radius: 4px;
    line-height: 50px;
    color: white;
    background-color:#FFD700 ;
}
.silvery{
    width: 40px;
    height: 40px;
    line-height: 40px;

    background-color:#C0C0C0 ;
}
.copper{
    width: 30px;
    height: 30px;
    line-height: 30px;

    background-color: #b87333;
}
</style>