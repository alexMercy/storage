import {
  Field,
  FieldTranslationTypes,
  FieldTypes,
  FieldWithoutTranslations,
} from '@/shared'

export const textPattern = /^[\p{L}\s\-]+$/u

const getTranslation = (
  type: FieldTranslationTypes,
  message: string | undefined,
  path: string
) => `${path}.${type}.${message ?? 'default'}`

export const withTranslations = (
  fields: FieldWithoutTranslations[],
  translationPath: string
): Field[] => {
  const getTranslationWithPath = (
    type: FieldTranslationTypes,
    message: string | undefined
  ) => getTranslation(type, message, translationPath)

  return fields.map((field) => {
    switch (field.type) {
      case FieldTypes.DIVIDER: {
        return field
      }
      default:
        const rules = field.rules.map((rule) => ({
          ...rule,
          message: getTranslationWithPath(
            FieldTranslationTypes.ERRORS,
            //@ts-ignore
            rule.message
          ),
        }))
        return {
          ...field,
          label: getTranslationWithPath(
            FieldTranslationTypes.LABELS,
            field.label ?? field.name
          ),
          placeholder: getTranslationWithPath(
            FieldTranslationTypes.PLACEHOLDERS,
            field.placeholder ?? field.name
          ),
          rules,
        }
    }
  })
}
