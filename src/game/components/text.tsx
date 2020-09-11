import React from "react"
import { Speech } from "./speech"

export const T = ({
  translate,
  children,
}: {
  translate: string
  children: any
}) => {
  const text = children?.filter(a => typeof a === "string")?.join(" ")
  return (
    <>
      {text && <Speech speak={text} />}
      <span
        className="extraInfo"
        title={translate}
        style={{
          backgroundColor: "rgba(12, 242, 143, 0.2)",
          padding: "0.1rem",
        }}
        onClick={a => alert(translate)}
      >
        {children}
      </span>
    </>
  )
}
