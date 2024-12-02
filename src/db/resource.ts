import mime from 'mime'
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

export interface AppFile extends ResourceBase {
  type: RESOURCE_TYPES.FILE
  meta: FileMeta
}

export type Resource = AppFile | FlatFolder

type _Resource = AppFile | Folder

interface FlatFolder extends ResourceBase {
  type: RESOURCE_TYPES.FOLDER
}

export interface Folder extends FlatFolder {}

export interface FolderResources {
  parentPath: { uuid: string; title: string }[]
  title: string
  // paths: { uuid: string; title: string }[]
  resources: Resource[]
}

export const rootFolder: Folder = {
  parent: '',
  type: RESOURCE_TYPES.FOLDER,
  title: 'Мой диск',
  uuid: 'd83492a7-5d23-4af9-a136-9560c4c8c61e',
}

export const rootDB: _Resource[] = [
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
  {
    parent: '511d46e2-5bcb-4498-a33b-ea9aa4145b28',
    uuid: '652d1f61-61c5-4831-b712-5ac8cf3fd710',
    type: RESOURCE_TYPES.FOLDER,
    title: 'Иннер Папочка',
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

export let paths = mapPaths()
export let indexes = indexedWithFiles()

export const updateStructures = () => {
  paths = mapPaths()
  indexes = indexedWithFiles()
}

export const getParentPath = (path: string[]) => {
  const parentPath: FolderResources['parentPath'] = []
  // O(M*N) I think, because path is short array
  for (const node of path) {
    const resource = [rootFolder, ...rootDB].find((res) => res.uuid === node)

    if (!resource) {
      throw new Error('Wrong path')
    }

    parentPath.push({ uuid: resource.uuid, title: resource.title })
  }

  return parentPath
}

export const getChildResources = (path: string[]) => {
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

export const findResource = (path: string[]) => {
  if (path.length === 1 && path[0] === rootFolder.uuid) return rootFolder

  const resource = rootDB.find((res) => res.uuid === path[path.length - 1])

  if (!resource) throw new Error('Resource not found')

  return resource
}
