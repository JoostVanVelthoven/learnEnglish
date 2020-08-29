import React, { useCallback, useContext, useEffect, useState } from "react"
import AppContext, { actions, State } from "../../context/languageContext"
import useUniqueId from "../hooks/useUniqueId"

const isValid = (input: string, answer: string) =>
  input.length === 0 ? null : input?.toLowerCase() === answer?.toLowerCase()

export const CompleteText = ({
  answer,
  placeholder,
}: {
  answer: string
  placeholder: string
}) => {
  const context = useContext<any>(AppContext)
  const { state, dispatch }: { state: State; dispatch: any } = context

  const id = useUniqueId("Challenge")

  const [input, setInput] = useState<string>("")
  useEffect(() => {
    dispatch({
      type: actions.initChallenge,
      payloadString: "starten",
      id,
    })
  }, [])

  const validResult = isValid(input, answer)

  const onUpdate = useCallback(
    e => {
      dispatch({
        type: actions.setChallengeResult,
        id,
        isValid: isValid(e.target.value.trim(), answer),
      })
      setInput(e.target.value.trim())
    },
    [id, isValid]
  )

  return (
    <input
      style={{
        borderRadius: "3px",
        border:
          validResult == null
            ? "4px solid #999"
            : validResult
            ? "4px solid darkgreen"
            : "4px solid darkred",
        padding: "3px",
        width: `${answer.length * 15}px`,
      }}
      type="text"
      placeholder={placeholder}
      onChange={onUpdate}
    />
  )
}
