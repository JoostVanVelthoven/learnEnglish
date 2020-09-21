import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react"
import AppContext, { actions, State } from "../../context/languageContext"
import useUniqueId from "../hooks/useUniqueId"

const isValid = (input: string, answer: string) =>
  input?.length === 0 ? null : input?.toLowerCase() === answer?.toLowerCase()

export const CompleteText = ({
  answer,
  placeholder,
  startsWith,
}: {
  answer?: string
  placeholder?: string

  startsWith?: string
}) => {
  const context = useContext<any>(AppContext)
  const { state, dispatch }: { state: State; dispatch: any } = context
  const id = useUniqueId("Challenge")

  const item = state?.items.find(a => a.id === id)
  const isCurrent = item?.isCurrent ?? false
  const [input, setInput] = useState<string>(startsWith ?? "")
  useEffect(() => {
    dispatch({
      type: actions.initChallenge,
      payloadString: "starten",
      id,
    })
  }, [])

  const ref = useRef(undefined)

  useEffect(() => {
    if (isCurrent) {
      ref.current.focus()
    }
  }, [isCurrent])

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
        width: `${
          Math.max(answer?.length ?? 0, placeholder?.length ?? 0) * 15
        }px`,
        lineHeight: "1rem",
        maxWidth: "100%",
        outline: "none!important",
      }}
      aria-label={"перевести: " + placeholder}
      type="text"
      placeholder={placeholder}
      onBlur={onUpdateBlur}
      onChange={onUpdateChange}
      value={input}
      ref={ref}
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
  setValidResult: React.Dispatch<React.SetStateAction<boolean>>,
  validResult: boolean
) {
  setInput(e.target.value)

  const valid = isValid(e.target.value.trim(), answer)

  if (!onlyWhenValid || valid || validResult) {
    dispatch({
      type: actions.setChallengeResult,
      id,
      isValid: valid,
    })
    setValidResult(valid)
  }
}
