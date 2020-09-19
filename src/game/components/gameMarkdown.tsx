import Markdown from "markdown-to-jsx"
import React from "react"
import { Box } from "./box"
import { CompleteText } from "./completeText"
import { Dropdown } from "./dropdown"
import { More } from "./more"
import { Speech } from "./speech"
import { Tabs } from "./tabs"
import { T } from "./text"
const GameMarkdown = ({ raw }: { raw: string }) => (
  <Markdown
    children={raw}
    options={{
      overrides: {
        CompleteText,
        T,
        Speech,
        More,
        Box,
        Tabs,
        Dropdown,
      },
    }}
  />
)
export default GameMarkdown
