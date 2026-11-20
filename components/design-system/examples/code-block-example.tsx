"use client"
// Kronos demo for Code Block (the official example needs streamdown and an AI backend).

import { FileCodeIcon, TerminalIcon } from "lucide-react"

import {
  CodeBlock,
  CodeBlockActions,
  CodeBlockContent,
  CodeBlockCopyButton,
  CodeBlockFooter,
  CodeBlockHeader,
  CodeBlockLine,
  CodeBlockTitle,
} from "@/components/ui/code-block"
import { Example, ExampleWrapper } from "@/components/design-system/example"

const snippet = `import { StatCard } from "@/components/kronos/stat-card"

export function OutThisWeek() {
  return <StatCard label="Out this week" value="9" delta="+2" />
}`

export default function CodeBlockExample() {
  return (
    <ExampleWrapper>
      <Example title="With header and copy">
        <CodeBlock>
          <CodeBlockHeader>
            <CodeBlockTitle><FileCodeIcon />out-this-week.tsx</CodeBlockTitle>
            <CodeBlockActions><CodeBlockCopyButton value={snippet} /></CodeBlockActions>
          </CodeBlockHeader>
          <CodeBlockContent lineNumbers>{snippet}</CodeBlockContent>
        </CodeBlock>
      </Example>

      <Example title="Small, floating actions">
        <CodeBlock size="sm">
          <CodeBlockActions><CodeBlockCopyButton value="pnpm dev" /></CodeBlockActions>
          <CodeBlockContent>pnpm dev</CodeBlockContent>
        </CodeBlock>
      </Example>

      <Example title="Diff lines">
        <CodeBlock>
          <CodeBlockContent lineNumbers>
            <CodeBlockLine>{"const PER_PAGE = 10"}</CodeBlockLine>
            <CodeBlockLine variant="removed">{'const accent = "blue"'}</CodeBlockLine>
            <CodeBlockLine variant="added">{'const accent = "teal"'}</CodeBlockLine>
            <CodeBlockLine variant="highlighted">{"export { PER_PAGE, accent }"}</CodeBlockLine>
          </CodeBlockContent>
        </CodeBlock>
      </Example>

      <Example title="Error output">
        <CodeBlock variant="destructive" size="sm">
          <CodeBlockHeader>
            <CodeBlockTitle><TerminalIcon />pnpm build</CodeBlockTitle>
          </CodeBlockHeader>
          <CodeBlockContent wrap>Error: Invariant: PPR cannot be enabled in export mode</CodeBlockContent>
          <CodeBlockFooter>Exit code 1</CodeBlockFooter>
        </CodeBlock>
      </Example>
    </ExampleWrapper>
  )
}
