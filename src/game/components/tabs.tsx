import React, { useState } from "react"
import "./box.css"
export const Tabs = ({ children }: { children: any }) => {
  const tabs = children.filter(a => typeof a === "object")

  const [activeTab, setActiveTab] = useState(0)
  const menu = tabs.map((a, index) => (
    <span
      onClick={a => setActiveTab(index)}
      style={{
        cursor: "pointer",
        padding: "1rem",
        border: "1px solid #999",
        borderBottom: index === activeTab ? "1px solid #fff" : "1px solid #999",
        color: index === activeTab ? "#000" : "#999",
        display: "inline-block",
        margin: "0 0.3rem 0 0.3rem",
        borderRadius: "5px 5px 0px 0px",
        position: "relative",
        top: "1px",
        transition: "color 0.3s",
        backgroundColor: "#fff",
      }}
      key={index}
    >
      {a.props.title}
    </span>
  ))

  const content = tabs.map((a, index) => (
    <div
      style={{
        paddingTop: "1rem",
        display: activeTab === index ? "block" : "none",
      }}
    >
      {a}
    </div>
  ))

  return (
    <div>
      <div
        style={{
          borderBottom: "1px solid #999",
          padding: "0",
          margin: "0",
          lineHeight: "initial",
        }}
      >
        {menu}
      </div>
      {content}
    </div>
  )
}
