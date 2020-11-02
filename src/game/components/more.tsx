import React, { useState } from "react"
var sdk = require("microsoft-cognitiveservices-speech-sdk")
export const More = ({
  children,
  extraText,
}: {
  children: any
  extraText: string
}) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div>
      <span
        onClick={_ => setIsOpen(!isOpen)}
        style={{
          cursor: "pointer",
          borderRadius: "50px",
          backgroundColor: "yellowgreen",
          width: "30px",
          display: "inline-block",
          textAlign: "center",
          lineHeight: "initial",
          userSelect: "none",
        }}
      >
        ℹ️
      </span>
      &nbsp;
      {children} {isOpen && <span>{extraText}</span>}
    </div>
  )
}
