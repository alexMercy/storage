import {
  AppFile,
  paths,
  RESOURCE_TYPES,
  rootDB,
  updateStructures,
} from '@/db/resource'
import mime from 'mime'
import { v4 } from 'uuid'

export const createFile = (fileName: string, parent: string) => {
  const path = paths[parent]

  if (!path) throw new Error('Parent not found')

  const mimetype = mime.getType(fileName)
  if (!mimetype) throw new Error('Mimetype not found')

  const file: AppFile = {
    parent,
    uuid: v4(),
    type: RESOURCE_TYPES.FILE,
    meta: { mimetype },
    title: fileName,
  }
  rootDB.push(file)
  updateStructures()
}
