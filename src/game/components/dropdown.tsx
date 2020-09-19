import React, { useCallback, useContext, useEffect, useState } from "react"
import AppContext, { actions, State } from "../../context/languageContext"
import useUniqueId from "../hooks/useUniqueId"

const isValid = (input: string, answer: string) =>
  input?.length === 0 ? null : input?.toLowerCase() === answer?.toLowerCase()

export const Dropdown = ({
  answer,
  options,
}: {
  answer?: string
  options?: string
}) => {
  const optionsList = (options ?? "").split("|")
  const context = useContext<any>(AppContext)
  const { state, dispatch }: { state: State; dispatch: any } = context

  const id = useUniqueId("Dropdown")

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
      update(
        dispatch,
        id,
        e,
        answer,
        setInput,
        true,
        setValidResult,
        validResult
      )
    },
    [id, isValid, setValidResult, validResult]
  )

  const onUpdateBlur = useCallback(
    e => {
      update(
        dispatch,
        id,
        e,
        answer,
        setInput,
        false,
        setValidResult,
        validResult
      )
    },
    [id, isValid, setValidResult, validResult]
  )

  return (
    <select
      style={{
        borderRadius: "3px",
        border:
          validResult == null
            ? "4px solid #999"
            : validResult
            ? "4px solid lightgreen"
            : "4px solid darkred",
        padding: "3px",

        lineHeight: "1rem",
        maxWidth: "100%",
        outline: "none!important",
      }}
      aria-label={"перевести: "}
      onBlur={onUpdateBlur}
      onChange={onUpdateChange}
    >
      {optionsList.map((i, index) => (
        <option key={index}>{i}</option>
      ))}
    </select>
  )
}

function update(
  dispatch: any,
  id: string,
  e: any,
  answer: string,
  setInput: React.Dispatch<React.SetStateAction<string>>,
  isOnBlur: boolean,
  setValidResult: React.Dispatch<React.SetStateAction<boolean>>,
  validResult: boolean
) {
  debugger
  setInput(e.target.value.trim())

  const valid = isValid(e.target.value.trim(), answer)

  if (!isOnBlur || valid || validResult) {
    dispatch({
      type: actions.setChallengeResult,
      id,
      isValid: valid,
    })
    setValidResult(valid)
  }
}
