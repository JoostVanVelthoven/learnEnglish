import React from "react"
import { Speech } from "./speech"

export const T = ({
  translate,
  children,
}: {
  translate: string
  children: any
}) => {
  return (
    <>
      <Speech speak={children} />
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
