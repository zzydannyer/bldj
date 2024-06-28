import { MediaAudit } from '@/types/_media';
import { useGlobal } from '@/utils';
import { Steps, Step, Form, Field } from 'vant';
// import 'vant/es/step/index.css'
import 'vant/lib/step/index.css';

export default defineComponent({
  name: 'reviewTimeline',
  props: {
    auditList: {
      type: Array as PropType<MediaAudit[]>,
      default: () => []
    }
  },
  setup(props) {
    const { $parse, $parseDict } = useGlobal<GlobalPropertiesApi>();

    return () => (
      <Form input-align="right">
        {props.auditList.length > 0 && (
          <Steps
            class="pl-5"
            direction="vertical"
            finish-icon="checked"
            active={props.auditList.length}
            inactive-color="#07c160"
          >
            {props.auditList.map((audit: MediaAudit) => (
              <Step key={audit.id} style={{ paddingBottom: 0 }}>
                <section class="between-center">
                  <div>
                    <span class="text-base font-semibold">
                      {audit.auditLevel == '2' ? '集团级' : '公司级'}审核
                    </span>
                    <span class="v-label ml-2">{$parse(audit.auditTime!)}</span>
                  </div>

                  {(audit.auditResult === '1' || audit.auditResult === '2') && (
                    <v-plain-tag
                      type={audit.auditResult === '1' ? 'success' : 'danger'}
                    >
                      {audit.auditResult === '1'
                        ? '通过'
                        : audit.auditResult === '2'
                          ? '退回'
                          : ''}
                    </v-plain-tag>
                  )}
                </section>

                <Field class="px-0">
                  {{
                    label: () => '审核意见',
                    input: () =>
                      audit.auditStatus == '1' ? audit.auditDesc : '待审核'
                  }}
                </Field>

                {audit.auditUser && (
                  <Field class="px-0">
                    {{
                      label: () => '审核人',
                      input: () => audit.auditUser
                    }}
                  </Field>
                )}
              </Step>
            ))}
          </Steps>
        )}
      </Form>
    );
  }
});
