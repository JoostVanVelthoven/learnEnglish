import React, { useState } from "react"

export const CompleteText = ({ answer }: { answer: string }) => {
  const [input, setInput] = useState<string>()
  return (
    <input
      style={{
        borderRadius: "3px",
        border: input === answer ? "4px solid darkgreen" : "4px solid #999",
        padding: "3px",
        width: `${answer.length * 15}px`,
      }}
      type="text"
      placeholder={answer}
      onChange={e => setInput(e.target.value)}
    />
  )
}
