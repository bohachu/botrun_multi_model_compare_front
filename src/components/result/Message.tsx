import Markdown from "react-markdown"
import CodeBlock from "./CodeBlock"
import remarkGfm from "remark-gfm"
import remarkBreaks from "remark-breaks"

export default function Message({
  content,
  handleCopy,
}: {
  content: string
  handleCopy: (text: string) => void
}) {
  return (
    <Markdown
      className="markdown-wrapper"
      remarkPlugins={[remarkGfm, remarkBreaks]}
      components={{
        code(props) {
          const { children, className, node, ...rest } = props
          const match = /language-(\w+)/.exec(className || "")
          return (
            <CodeBlock match={match} handleCopy={handleCopy}>
              {children}
            </CodeBlock>
          )
        },
        a: ({ node, href, children, ...props }) => (
          <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
            {children}
          </a>
        ),
      }}
    >
      {content}
    </Markdown>
  )
}
