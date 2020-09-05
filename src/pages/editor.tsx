import React, { useEffect, useState } from "react"
import { AppProvider } from "../context/languageContext"
import GameMarkdown from "../game/components/gameMarkdown"

const EditorIndex = ({}) => {
  const [input, setInput] = useState("")
  useEffect(() => setInput(localStorage.getItem("editor") ?? ""), [])

  if (typeof window === "undefined") {
    return <div>Здравствуй...</div>
  }

  return (
    <AppProvider>
      <div>
        <div style={{ width: "100vw", height: "100vh", display: "flex" }}>
          <textarea
            onChange={a => {
              localStorage.setItem("editor", a.target.value)
              setInput(a.target.value)
            }}
            value={input}
            style={{ flex: "1" }}
          ></textarea>
          <div style={{ flex: "1", margin: "2rem" }}>
            <GameMarkdown raw={input} />
          </div>
        </div>
      </div>
    </AppProvider>
  )
}

export default EditorIndex
