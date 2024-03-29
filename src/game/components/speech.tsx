import React, { useCallback } from "react"
var sdk = require("microsoft-cognitiveservices-speech-sdk")
export const Speech = ({
  speak,
  children,
}: {
  speak: string
  children?: any
}) => {
  const text = children
    ?.map((a: any) => (typeof a === "string" ? a : a.props.children[0]))
    ?.join(" ")

  const childWithSpeechFlag = children?.map((a: any) => {
    if (typeof a === "object") {
      return React.cloneElement(a, { inSpeech: true })
    }
    return a
  })

  const playSound = useCallback(
    _ => {
      const speechConfig = sdk.SpeechConfig.fromSubscription(
        process.env.GATSBY_SpeechKey,
        "northeurope"
      )
      sdk.Recognizer.enableTelemetry(false)
      const audioConfig = sdk.AudioConfig.fromDefaultSpeakerOutput()

      const synthesizer = new sdk.SpeechSynthesizer(speechConfig, audioConfig)

      synthesizer.speakTextAsync(
        speak ?? text,
        () => {
          synthesizer.close()
        },
        () => {
          alert("браузер не поддерживает функцию браузера")
          synthesizer.close()
        }
      )
    },
    [speak]
  )

  return (
    <span className="hoverDarker">
      <span
        onClick={playSound}
        style={{
          cursor: "pointer",
          borderRadius: "50px",
          backgroundColor: "lightCoral",

          width: "30px",
          display: "inline-block",
          textAlign: "center",
          lineHeight: "initial",
          userSelect: "none",
        }}
      >
        🔉
      </span>
      {text && (
        <span
          onClick={playSound}
          style={{
            backgroundColor: "lightYellow",
            padding: "0.6rem",
            cursor: "pointer",
          }}
        >
          {childWithSpeechFlag}
        </span>
      )}
    </span>
  )
}
