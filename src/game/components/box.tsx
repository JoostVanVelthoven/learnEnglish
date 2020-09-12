import React from "react"
import "./box.css"
export const Box = ({
  children,
  isJustify,
}: {
  children: any
  isJustify: boolean
}) => {
  return <div className={isJustify ? "box" : ""}>{children}</div>
}
