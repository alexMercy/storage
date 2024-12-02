import { rootDB, updateStructures } from '@/db/resource'

export const getResource = (uuid: string) => {
  const resource = rootDB.find((resource) => resource.uuid === uuid)
  if (!resource) throw new Error('Resource not found')

  return resource
}

export const deleteResources = (uuids: string[]) => {
  uuids.forEach((uuid) => {
    const resourceIndex = rootDB.findIndex((resource) => resource.uuid === uuid)

    if (resourceIndex === -1) throw new Error('Resource not found')

    rootDB.splice(resourceIndex, 1)
  })

  updateStructures()
}

export const downloadResources = (uuids: string[]) => {
  const findResource = (uuid: string) => {
    const resource = rootDB.find((res) => res.uuid === uuid)

    if (!resource) throw new Error('Resource not found')

    return resource
  }

  return uuids.map((uuid) => findResource(uuid))
}
