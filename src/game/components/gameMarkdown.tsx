import Markdown from "markdown-to-jsx"
import React from "react"
import { Box } from "./box"
import { CompleteText } from "./completeText"
import { More } from "./more"
import { Speech } from "./speech"
import { T } from "./text"
const GameMarkdown = ({ raw }: { raw: string }) => (
  <Markdown
    style={{ lineHeight: "3.5rem" }}
    children={raw}
    options={{
      overrides: {
        CompleteText,
        T,
        Speech,
        More,
        Box,
      },
    }}
  />
)
export default GameMarkdown
