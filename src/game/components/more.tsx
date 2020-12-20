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
    <span>
      <span
        onClick={e => {
          e.stopPropagation()
          setIsOpen(!isOpen)
        }}
        style={{
          cursor: "pointer",
          borderRadius: "50px",
          backgroundColor: "#B6FF00",
          width: "30px",
          display: "inline-block",
          textAlign: "center",
          lineHeight: "initial",
          userSelect: "none",
        }}
      >
        I
      </span>
      &nbsp;
      {children}{" "}
      {isOpen && (
        <span style={{ backgroundColor: "#B6FF00" }}>{extraText}</span>
      )}
    </span>
  )
}
