import {
  Field,
  FieldTypes,
  FieldWithoutTranslations,
  textPattern,
  withTranslations,
} from '@/shared'

const translationPath = 'forms.createFolder'

export interface EditorFolderValues {
  title: string
}

enum EditorFolderFields {
  TITLE = 'title',
}

enum ErrorsKeys {
  TITLE_REQUIRED = 'title_required',
  TITLE_TEXT = 'title_text',
}

const createFormMapBase: FieldWithoutTranslations[] = [
  {
    type: FieldTypes.INPUT,
    name: EditorFolderFields.TITLE,
    rules: [
      { required: true, message: ErrorsKeys.TITLE_REQUIRED },
      { pattern: textPattern, message: ErrorsKeys.TITLE_TEXT },
    ],
  },
]

export const createFormMap: Field[] = withTranslations(
  createFormMapBase,
  translationPath
)
