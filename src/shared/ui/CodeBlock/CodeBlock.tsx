import { themeCtx } from '@/app/lib/core-context'
import { CopyOutlined } from '@ant-design/icons'
import { css } from '@emotion/react'
import { Button, message } from 'antd'
import { useContext, type FC } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import {
  materialDark,
  materialLight,
} from 'react-syntax-highlighter/dist/esm/styles/prism'

interface CodeBlockProps {
  code: string
  lang?: string
}

export const CodeBlock: FC<CodeBlockProps> = ({
  code,
  lang = 'typescript',
}) => {
  const [messageApi, contextHolder] = message.useMessage({
    maxCount: 3,
  })

  const success = () => {
    messageApi.open({
      type: 'success',
      content: 'Copy to clipboard',
    })
  }

  const { isDark } = useContext(themeCtx)
  const syntaxStyle = isDark ? materialDark : materialLight
  const onCopy = () => navigator.clipboard.writeText(code).then(success)

  return (
    <>
      {contextHolder}
      <div
        css={css({
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        })}
      >
        <code>{lang.toUpperCase()}</code>
        <Button icon={<CopyOutlined />} onClick={onCopy}>
          Copy
        </Button>
      </div>
      <SyntaxHighlighter
        language={lang}
        style={syntaxStyle}
        customStyle={{ borderRadius: '4px' }}
        wrapLines={true}
        showLineNumbers={true}
        codeTagProps={{ translate: 'no', lang: 'en' }}
      >
        {code}
      </SyntaxHighlighter>
    </>
  )
}
