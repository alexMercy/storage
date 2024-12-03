import { FieldTranslationTypes } from '@/shared'

export const en = {
  disk: 'disk',
  trash: 'trash',
  collapse: 'collapse',
  up: 'up',
  theme: {
    light: 'light',
    dark: 'dark',
  },
  selectedRecords: {
    plural_one: 'Selected {{count}} item',
    plural_other: 'Selected {{count}} items',
  },
  delete: 'Delete',
  download: 'Download',
  createFolder: 'Create folder',
  newFolder: 'New folder',
  renameFolder: 'Rename folder',
  upload: 'Upload',
  search: 'Search...',
  rename: 'Rename',
  forms: {
    shared: {
      save: 'Save',
      cancel: 'Cancel',
    },
    createFolder: {
      [FieldTranslationTypes.ERRORS]: {
        title_required: 'Required field',
        title_text: 'Must be text',
      },
      [FieldTranslationTypes.PLACEHOLDERS]: {
        title: 'Type...',
      },
      [FieldTranslationTypes.LABELS]: {
        title: 'Title',
      },
    },
  },
}
