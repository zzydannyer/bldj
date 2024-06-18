import { Field, Form } from 'vant';

export default defineComponent({
  name: 'BackDialog',
  props: {
    maxLength: {
      type: Number,
      default: 100
    }
  },
  setup(props, { slots, emit }) {
    const backReason = ref('');
    const formRef = ref();

    return () => (
      <Form ref={formRef}>
        <Field
          v-model={backReason.value}
          required
          rows={2}
          autosize
          type="textarea"
          show-word-limit
          placeholder="请输入退回理由"
          maxlength={props.maxLength}
          rules={[{ required: true, message: '请输入退回理由' }]}
        />
        {slots.default!([formRef.value, backReason.value])}
      </Form>
    );
  }
});
