import Markdown from "markdown-to-jsx"
import React from "react"
import { CompleteText } from "./completeText"
import { T } from "./text"
const GameMarkdown = ({ raw }: { raw: string }) => (
  <Markdown
    style={{ lineHeight: "3.5rem" }}
    children={raw}
    options={{
      overrides: {
        CompleteText,
        T,
      },
    }}
  />
)
export default GameMarkdown
