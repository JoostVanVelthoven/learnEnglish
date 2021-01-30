import React, { useState } from "react"
export const More = ({
  children,
  extraText,
}: {
  children: any
  extraText: string
}) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <span style={{ border: "1px solid #B6FF00", borderRadius: "2px" }}>
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
