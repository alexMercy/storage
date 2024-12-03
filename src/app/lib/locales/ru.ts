import { FieldTranslationTypes } from '@/shared'

export const ru = {
  disk: 'диск',
  trash: 'корзина',
  collapse: 'свернуть',
  up: 'вверх',
  theme: {
    light: 'светлая',
    dark: 'темная',
  },
  selectedRecords: {
    plural_one: 'Выбрана {{count}} запись',
    plural_few: 'Выбрано {{count}} записи',
    plural_many: 'Выбрано {{count}} записей',
  },
  delete: 'Удалить',
  download: 'Скачать',
  createFolder: 'Создать папку',
  newFolder: 'Новая папка',
  renameFolder: 'Переименовать папку',
  upload: 'Загрузить',
  search: 'Искать...',
  rename: 'Переименовать',
  forms: {
    shared: {
      save: 'Сохранить',
      cancel: 'Отменить',
    },
    createFolder: {
      [FieldTranslationTypes.ERRORS]: {
        title_required: 'Обязательное поле',
        title_text: 'Должно быть текстом',
      },
      [FieldTranslationTypes.PLACEHOLDERS]: {
        title: 'Введите название...',
      },
      [FieldTranslationTypes.LABELS]: {
        title: 'Название',
      },
    },
  },
}
