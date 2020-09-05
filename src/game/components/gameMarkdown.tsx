import Markdown from "markdown-to-jsx"
import React from "react"
import { CompleteText } from "./completeText"

const GameMarkdown = ({ raw }: { raw: string }) => (
  <Markdown
    children={raw}
    options={{
      overrides: {
        CompleteText,
      },
    }}
  />
)
export default GameMarkdown
