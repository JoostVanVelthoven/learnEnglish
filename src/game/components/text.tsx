import React from "react"

const isValid = (input: string, answer: string) =>
  input.length === 0 ? null : input?.toLowerCase() === answer?.toLowerCase()

export const T = ({
  translate,
  children,
}: {
  translate: string
  children: any
}) => {
  return (
    <span
      className="extraInfo"
      title={translate}
      style={{ backgroundColor: "rgba(12, 242, 143, 0.2)", padding: "0.1rem" }}
      onClick={a => alert(translate)}
    >
      {children}
    </span>
  )
}
