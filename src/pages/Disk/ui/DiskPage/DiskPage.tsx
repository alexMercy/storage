import { useResources } from '@/api/resources'
import { MimeIcon } from '@/shared'
import { css } from '@emotion/react'
import mime from 'mime'
import { useState, type FC } from 'react'

const mimenames = [
  'док.doc',
  'док.docx',
  'док.xls',
  'док.xlsx',
  'док.pdf',
  'док.mp3',
  'док.mp4',
  'док.ppt',
  'док.pptx',
  'док.m4a',
  'док.png',
  'док.jpg',
  'док.jpeg',
  'док.txt',
  'док.md',
  'док.zip',
  'док.gif',
]

// док.doc application/msword
// док.docx application/vnd.openxmlformats-officedocument.wordprocessingml.document
// док.xls application/vnd.ms-excel
// док.xlsx application/vnd.openxmlformats-officedocument.spreadsheetml.sheet
// док.pdf application/pdf
// док.mp3 audio/mpeg
// док.mp4 video/mp4
// док.ppt application/vnd.ms-powerpoint
// док.pptx application/vnd.openxmlformats-officedocument.presentationml.presentation
// док.m4a audio/mp4
// док.png image/png
// док.jpg image/jpeg
// док.jpeg image/jpeg

export const DiskPage: FC = () => {
  const [uuid, setUuid] = useState('root')
  const { data: root } = useResources(uuid)

  mimenames.forEach((type) => console.log(type, mime.getType(type)))

  return (
    <div
      css={css`
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: 12px;
      `}
    >
      {mimenames.map((type) => (
        <div
          css={css`
            background: #000;
          `}
        >
          <MimeIcon mimetype={mime.getType(type) ?? ''} />
          {type}
        </div>
      ))}

      {/* {root?.parentPath.length && root?.parentPath.length > 1 && (
        <Button
          onClick={() => setUuid(root.parentPath[root.parentPath.length - 2])}
        >
          Back
        </Button>
      )}
      {root?.resources.map((resource) => (
        <Card
          key={resource.uuid}
          css={css`
            width: 250px;
            height: 150px;
          `}
          onDoubleClick={() => setUuid(resource.uuid)}
          title={resource.type}
        >
          {resource.title}
        </Card>
      ))} */}
    </div>
  )
}
