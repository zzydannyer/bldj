<script setup lang="ts">
  import { getWorkFeedbackDealtSum } from '@/api';
  import { listWorkFeedbackByWorkId, getWorkFeedback } from '@/api/media/taskExecution';
  import { getWorkMain } from '@/api/media/taskRelease';
  import { Work, WorkFeedback, WorkFeedbackQuery, WorkMust } from '@/types/_media/task';
  import { useGlobal } from '@/utils';
  import { join } from 'lodash';
  const { $useDict, $parse, $value_to_label } = useGlobal<GlobalPropertiesApi>();
  const { work_release_type } = $useDict('work_release_type', 'feedback_status', 'work_type_code');

  const route = useRoute();
  const { id } = route.params;
  const work = ref<Work>(new Work());
  const workFeedbackList = ref<WorkFeedback[]>([]);
  // 展开回填
  const activeNames = ref<string[]>([]);
  // 问题
  const query = ref<WorkFeedbackQuery>({});

  // 督导数据
  const handleDetail = async () => {
    const { data: _work } = await getWorkMain(id as string);
    work.value = _work!;

    query.value.workId = id as string;
    const { data: _workFeedbackList } = await listWorkFeedbackByWorkId(query.value);
    workFeedbackList.value = _workFeedbackList!;

    for (const index in workFeedbackList.value) {
      const item = workFeedbackList.value[index];
      const { data: _workFeedback } = await getWorkFeedback(item.id);
      item.questions = _workFeedback?.questions!;
    }
  };
  onBeforeMount(handleDetail);
</script>
<template>
  <main class="container">
    <van-cell-group inset>
      <van-form input-align="right">
        <van-field readonly>
          <template #label>
            <span class="section-title">任务详情</span>
          </template>
        </van-field>
        <van-field>
          <template #label>类型</template>
          <template #input>
            {{ $value_to_label(work_release_type, work.workType) }}
          </template>
        </van-field>
        <van-field>
          <template #label>任务名</template>
          <template #input>{{ work.workTitle }}</template>
        </van-field>
        <van-field>
          <template #label>截止时间</template>
          <template #input>{{ $parse(work.deadline) }}</template>
        </van-field>
        <van-field>
          <template #label>任务内容</template>
          <template #input>{{ work.workDesc }}</template>
        </van-field>
        <van-field>
          <template #label>接收类型</template>
          <!-- 接收单位类型( 1:全部;2：分组;3：指定用户) -->
          <template #input>
            {{ work.receiveType == '2' ? '分组' : work.receiveType == '3' ? '指定用户' : '' }}
          </template>
        </van-field>
        <van-field v-if="work.receiveType === '2'">
          <template #label>接收群组</template>
          <template #input>
            {{ work.receivePackage!.packageName }}
          </template>
        </van-field>
        <van-field v-if="work.receiveType === '2'">
          <template #label>群组机构</template>

          <template #input>
            {{ join(work.receivePackage!.orgNames) }}
          </template>
        </van-field>
        <van-field v-if="work.receiveType === '2'">
          <template #label>群组角色</template>

          <template #input>
            {{ join(work.receivePackage!.roleNames) }}
          </template>
        </van-field>
        <van-field v-if="work.receiveType === '3'">
          <template #label>用户</template>
          <template #input>{{ join(work.recUserNames) }}</template>
        </van-field>
        <van-field>
          <template #label>任务附件</template>
          <template #input>
            <v-uploader url="oss" :disabled="true" v-if="work.workFiles && work.workFiles.length > 0" v-model="work.workFiles" type="file" />
            <van-tag v-else plain size="medium" type="primary"> 暂无附件 </van-tag>
          </template>
        </van-field>
      </van-form>
    </van-cell-group>

    <!-- 工作督查 -->
    <van-cell-group inset style="margin-top: 20px">
      <van-form input-align="right">
        <van-field readonly>
          <template #label>
            <span class="section-title">工作督查</span>
          </template>
        </van-field>
        <van-collapse v-model="activeNames">
          <van-collapse-item :name="index" v-for="(workFeedback, index) in workFeedbackList" :key="index">
            <template #title>
              <!-- 所属组织 -->
              <section class="between-center">
                <span class="font-medium">
                  {{ workFeedback.roleName ? workFeedback.orgName + ' - ' + workFeedback.roleName : workFeedback.orgName }}
                </span>
                <div class="whitespace-nowrap">
                  <van-icon
                    type="danger"
                    :name="workFeedback.isDone === '1' ? 'checked' : 'warning'"
                    :color="workFeedback.isDone === '1' ? '#07c160' : '#ee0a24'"
                  />
                  {{ workFeedback.isDone === '1' ? '已完成' : '未完成' }}
                </div>
              </section>
            </template>

            <section class="text-sm text-gray-500">
              <span v-if="workFeedback.submitStatus === '3'">
                <van-icon name="checked" style="color: #07c160" />
                已提交
                <span class="m-2">
                  <van-icon name="manager-o" />
                  {{ workFeedback.belongToName }}
                </span>
                <span class="m-2">
                  <van-icon name="underway-o" />
                  {{ $parse(workFeedback.updateTime!) }}
                </span>
              </span>
              <span v-else>
                <van-icon name="clear" color="#ee0a24" />
                未提交
              </span>
            </section>

            <section class="text-sm py-1">
              反馈：
              <span v-if="workFeedback.submitStatus !== '3'">待提交</span>
              <span v-else>{{ workFeedback.feedbackDesc ?? '无' }}</span>
            </section>
            <!-- 反馈附件 -->
            <section class="text-sm py-1">
              反馈附件：
              <template v-if="workFeedback.workFiles && workFeedback.workFiles?.length > 0">
                <v-uploader url="oss" :disabled="true" v-model="workFeedback.workFiles" type="file" />
              </template>
              <div v-else>暂无反馈附件</div>
            </section>
            <van-collapse
              v-model="activeNames"
              v-if="workFeedback.submitStatus === '3' && work.workType === '2' && workFeedback.questions && workFeedback.questions.length > 0"
            >
              <van-collapse-item title="回填信息" :name="workFeedback.id">
                <div v-for="(item, index) in workFeedback.questions" :key="index">
                  <van-field label-width="40" readonly v-model="item.question" label="提问" label-class="text-gray-400" />
                  <van-field label-width="40" readonly v-model="item.mustDesc" label="回答" label-class="text-gray-400" />
                </div>
              </van-collapse-item>
            </van-collapse>
          </van-collapse-item>
        </van-collapse>
      </van-form>
    </van-cell-group>
  </main>
</template>
