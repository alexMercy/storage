import { Field, FieldTypes } from '@/shared'
import { Form, FormInstance, FormProps, Input } from 'antd'
import { useTranslation } from 'react-i18next'

interface FormMapperProps<T> {
  form: FormInstance<T>
  fields: Field[]
  onSumbit: FormProps<T>['onFinish']
  onError?: FormProps<T>['onFinishFailed']
  initialValues?: FormProps<T>['initialValues']
}

export const FormMapper = <T extends Record<string, any>>({
  form,
  fields,
  onError,
  onSumbit,
  initialValues,
}: FormMapperProps<T>) => {
  const { t } = useTranslation()
  return (
    <Form
      form={form}
      onFinish={onSumbit}
      onFinishFailed={onError}
      initialValues={initialValues}
    >
      {fields.map((field) => {
        switch (field.type) {
          case FieldTypes.INPUT: {
            const { placeholder, label, name, rules } = field
            const tRules = rules.map((rule) => ({
              ...rule,
              //@ts-ignore
              message: t(rule.message ?? ''),
            }))
            return (
              <Form.Item
                label={t(label)}
                name={name}
                rules={tRules}
                key={field.name}
              >
                <Input placeholder={t(placeholder ?? '')} variant="filled" />
              </Form.Item>
            )
          }
          default: {
            return <></>
          }
        }
      })}
    </Form>
  )
}
