import mime from 'mime'
import { v4 } from 'uuid'
export const enum RESOURCE_TYPES {
  FOLDER = 'folder',
  FILE = 'file',
}

interface FileMeta {
  mimetype: string
}

interface ResourceBase {
  uuid: string
  parent: string
  title: string
}

interface AppFile extends ResourceBase {
  type: RESOURCE_TYPES.FILE
  meta: FileMeta
}

type Resource = AppFile | FlatFolder

type _Resource = AppFile | Folder

interface FlatFolder extends ResourceBase {
  type: RESOURCE_TYPES.FOLDER
}

interface Folder extends FlatFolder {}

interface Response {
  parentPath: string[]
  title: string
  // paths: { uuid: string; title: string }[]
  resources: Resource[]
}

const rootFolder: Folder = {
  parent: '',
  type: RESOURCE_TYPES.FOLDER,
  title: 'Мой диск',
  uuid: 'd83492a7-5d23-4af9-a136-9560c4c8c61e',
}

const rootDB: _Resource[] = [
  {
    parent: 'd83492a7-5d23-4af9-a136-9560c4c8c61e',
    uuid: '4ca18f38-083e-4ccf-83f8-237013d77e69',
    type: RESOURCE_TYPES.FILE,
    title: 'Мое достояние.jpg',
    meta: { mimetype: mime.getType('Мое достояние.jpg')! },
  },
  {
    parent: 'd83492a7-5d23-4af9-a136-9560c4c8c61e',
    uuid: '511d46e2-5bcb-4498-a33b-ea9aa4145b28',
    type: RESOURCE_TYPES.FOLDER,
    title: 'Загрузки',
  },
  {
    parent: 'd83492a7-5d23-4af9-a136-9560c4c8c61e',
    uuid: '06527268-fb12-4ce2-8b23-0939bcca6195',
    type: RESOURCE_TYPES.FILE,
    title: 'Поздравление.mp4',
    meta: { mimetype: mime.getType('Поздравление.mp4')! },
  },
  {
    parent: '511d46e2-5bcb-4498-a33b-ea9aa4145b28',
    uuid: 'e3ec8726-2fea-448a-871f-3d656c7880cc',
    type: RESOURCE_TYPES.FILE,
    title: 'ВКР.pdf',
    meta: { mimetype: mime.getType('ВКР.pdf')! },
  },
]

const mapPaths = () => {
  const result: Record<string, string[]> = {}

  const getNode = (folder: Folder, path: string[] = []) => {
    const subpath = [...path, folder.uuid]

    result[folder.uuid] = subpath
    const children = rootDB.filter((res) => res.parent === folder.uuid)

    if (!children) return

    const subFolders = children.filter(
      (resource) => resource.type === RESOURCE_TYPES.FOLDER
    )

    if (!subFolders.length) return

    subFolders.forEach((folder) => getNode(folder, subpath))
  }

  getNode(rootFolder)
  return result
}

const indexedWithFiles = () => {
  const result: Record<string, any> = {}

  const getNode = (folder: Folder, node: Record<string, any>) => {
    node[folder.uuid] = {}
    const children = rootDB.filter((res) => res.parent === folder.uuid)
    if (!children) {
      return
    }
    const files: string[] = []
    children
      .sort((a, b) => {
        const check = [RESOURCE_TYPES.FILE, RESOURCE_TYPES.FOLDER]
        return check.indexOf(a.type) - check.indexOf(b.type)
      })
      .forEach((resource) => {
        if (resource.type === RESOURCE_TYPES.FILE) {
          files.push(resource.uuid)
        } else if (resource.type === RESOURCE_TYPES.FOLDER) {
          getNode(resource, node[folder.uuid])
        }
      })
    if (files.length) {
      node[folder.uuid].files = files
    }
  }

  getNode(rootFolder, result)
  return result
}

let paths = mapPaths()
let indexes = indexedWithFiles()

const updateStructures = () => {
  paths = mapPaths()
  indexes = indexedWithFiles()
}

const findFolder = (path: string[]) => {
  if (path.length === 1 && path[0] === rootFolder.uuid) return rootFolder

  const folder = rootDB.find((res) => res.uuid === path[path.length - 1])

  if (!folder) throw new Error('Folder not found')

  return folder
}

const getChildResources = (path: string[]) => {
  const resources: Resource[] = []

  const node = path.reduce((acc, path) => {
    const node = acc[path]
    if (!node) throw new Error('Wrong path')
    return node
  }, indexes)

  const { files, ...nodes } = node
  const uuids = Object.keys(nodes)

  if (files) {
    uuids.push(...files)
    uuids.flat()
  }

  rootDB.forEach((res) => {
    if (uuids.includes(res.uuid)) {
      resources.push(res)
    }
  })

  return resources
}

export const getItems = (uuid: string): Response => {
  const path = uuid !== 'root' ? paths[uuid] : [rootFolder.uuid]

  if (!path) throw new Error('UUID not found')

  const folder = findFolder(path)

  return {
    parentPath: path,
    title: folder.title,
    resources: getChildResources(path) ?? [],
  }
}
export const createFolder = (title: string, parent: string) => {
  const path = paths[parent]

  if (!path) throw new Error('Parent not found')

  const folder: Folder = {
    parent,
    uuid: v4(),
    type: RESOURCE_TYPES.FOLDER,
    title,
  }
  rootDB.push(folder)
  updateStructures()
}
