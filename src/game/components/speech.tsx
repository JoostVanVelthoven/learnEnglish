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
    ?.map(a => (typeof a === "string" ? a : a.props.children[0]))
    ?.join(" ")

  const childWithSpeechFlag = children?.map(a => {
    if (typeof a === "object") {
      return React.cloneElement(a, { inSpeech: true })
    }
    return a
  })

  const playSound = useCallback(
    _ => {
      const speechConfig = sdk.SpeechConfig.fromSubscription(
        "d5bf02f585f34c82826195a57bc5a75e",
        "northeurope"
      )
      sdk.Recognizer.enableTelemetry(false)
      const audioConfig = sdk.AudioConfig.fromDefaultSpeakerOutput()

      const synthesizer = new sdk.SpeechSynthesizer(speechConfig, audioConfig)

      synthesizer.speakTextAsync(
        speak ?? text,
        result => {
          synthesizer.close()
        },
        error => {
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
          padding: "0.2rem",
          width: "25px",
          display: "inline-block",
          textAlign: "center",
          lineHeight: "initial",
          userSelect: "none",
        }}
      >
        😀
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
