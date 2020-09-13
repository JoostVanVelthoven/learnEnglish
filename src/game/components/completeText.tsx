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

  const [validResult, setValidResult] = useState<boolean | undefined>(undefined)
  const onUpdateChange = useCallback(
    e => {
      update(dispatch, id, e, answer, setInput, true, setValidResult)
    },
    [id, isValid, setValidResult]
  )

  const onUpdateBlur = useCallback(
    e => {
      update(dispatch, id, e, answer, setInput, false, setValidResult)
    },
    [id, isValid, setValidResult]
  )

  return (
    <input
      style={{
        borderRadius: "3px",
        border:
          validResult == null
            ? "4px solid #999"
            : validResult
            ? "4px solid lightgreen"
            : "4px solid darkred",
        padding: "3px",
        width: `${Math.max(answer.length, placeholder.length) * 15}px`,
        lineHeight: "1rem",
        maxWidth: "100%",
        outline: "none!important",
      }}
      aria-label={"перевести: " + placeholder}
      type="text"
      placeholder={placeholder}
      onBlur={onUpdateBlur}
      onChange={onUpdateChange}
    />
  )
}

function update(
  dispatch: any,
  id: string,
  e: any,
  answer: string,
  setInput: React.Dispatch<React.SetStateAction<string>>,
  onlyWhenValid: boolean,
  setValidResult: React.Dispatch<React.SetStateAction<boolean>>
) {
  setInput(e.target.value.trim())

  const valid = isValid(e.target.value.trim(), answer)

  if (!onlyWhenValid || valid) {
    dispatch({
      type: actions.setChallengeResult,
      id,
      isValid: valid,
    })
    setValidResult(valid)
  }
}
