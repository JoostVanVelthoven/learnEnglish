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
          <div style={{ flex: "1" }}>
            <textarea
              onChange={a => {
                localStorage.setItem("editor", a.target.value)
                setInput(a.target.value)
              }}
              value={input}
              style={{ width: "50vw", height: "90vh" }}
            ></textarea>
            <p>
              translate:
              <pre>&lt;T translate=&quot;нет&quot;&gt;no&lt;/T&gt;</pre>
              <pre>
                &lt;CompleteText answer=&quot;long answer&quot;
                placeholder=&quot;длинный ответ&quot;/&gt;
              </pre>
              <pre>&lt;Speech&gt;This is the first line&lt;/Speech&gt;</pre>
              <pre>
                &lt;More extraText=&quot;This is a extra text&quot;&gt; this is
                a text&lt;/More&gt;
              </pre>
              <pre>
                &lt;Dropdown options=&quot;hello|goodby|good day&quot;
                answer=&quot;goodby&quot; /&gt;
              </pre>
            </p>
          </div>
          <div style={{ flex: "1", margin: "2rem" }}>
            <GameMarkdown raw={input} />
          </div>
        </div>
      </div>
    </AppProvider>
  )
}

export default EditorIndex
