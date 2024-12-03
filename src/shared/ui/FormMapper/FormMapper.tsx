import { Field, FieldTypes } from '@/shared'
import { css } from '@emotion/react'
import { Form, FormInstance, FormProps, Input, InputRef } from 'antd'
import { useEffect, useRef, useState } from 'react'
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
  const firstRef = useRef<InputRef | null>(null)

  //Overhead state for antd form correct works
  const [initialVals, setInitVals] = useState(initialValues)

  useEffect(() => {
    setTimeout(() => {
      firstRef.current?.focus()

      const name = firstRef.current?.input?.value
      const lastDotIndex = name?.lastIndexOf('.')

      if (!lastDotIndex || !name) return

      const selectionRange = (
        lastDotIndex === -1 ? name : name.slice(0, lastDotIndex)
      ).length

      firstRef.current?.setSelectionRange(0, selectionRange)
    })
  }, [firstRef])

  useEffect(() => {
    return () => {
      setInitVals(undefined)
    }
  }, [])
  return (
    <Form
      form={form}
      layout="vertical"
      variant="filled"
      requiredMark={(label, { required }) => (
        <label css={css({ fontWeight: 600 })}>
          {label}{' '}
          {required ? <span css={css({ color: 'red' })}>*</span> : <></>}
        </label>
      )}
      onFinish={onSumbit}
      onFinishFailed={onError}
      initialValues={initialVals}
    >
      {fields.map((field, idx) => {
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
                <Input
                  ref={idx === 0 ? firstRef : undefined}
                  placeholder={t(placeholder ?? '')}
                />
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
