import React from "react"
import { Speech } from "./speech"

export const T = ({
  translate,
  children,
  inSpeech,
}: {
  translate: string
  children: any
  inSpeech: boolean
}) => {
  const text = children?.filter(a => typeof a === "string")?.join(" ")
  return (
    <>
      {" "}
      {!inSpeech && text && <Speech speak={text} />}
      <span
        className="extraInfo hoverDarker"
        title={translate}
        style={{
          backgroundColor: "lightpink",
          padding: "0.1rem",
          cursor: "pointer",
        }}
        onClick={a => {
          a.stopPropagation()
          alert(translate)
        }}
      >
        {children}
      </span>
    </>
  )
}
