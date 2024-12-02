import { FieldTypes } from '@/shared'
import { FormRule } from 'antd'

interface FieldBase {
  type: unknown
  name: string
  label?: string
  placeholder?: string
  rules: FormRule[]
}

interface FieldInput extends FieldBase {
  type: FieldTypes.INPUT
}

interface FieldDivider {
  type: FieldTypes.DIVIDER
}

interface FieldWithTranslations {
  label: string
}

export type FieldWithoutTranslations = FieldDivider | FieldInput

export type Field = FieldDivider | (FieldInput & FieldWithTranslations)
