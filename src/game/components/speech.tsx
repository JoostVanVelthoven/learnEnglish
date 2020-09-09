import React, { useCallback } from "react"
var sdk = require("microsoft-cognitiveservices-speech-sdk")
export const Speech = ({ speak }: { speak: string }) => {
  const playSound = useCallback(
    _ => {
      const speechConfig = sdk.SpeechConfig.fromSubscription(
        "d5bf02f585f34c82826195a57bc5a75e",
        "northeurope"
      )
      sdk.Recognizer.enableTelemetry(false)
      const audioConfig = sdk.AudioConfig.fromDefaultSpeakerOutput()

      console.log(speechConfig)
      const synthesizer = new sdk.SpeechSynthesizer(speechConfig, audioConfig)

      synthesizer.speakTextAsync(
        speak,
        result => {
          if (result) {
            console.log(JSON.stringify(result))
          }
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
      🔉
    </span>
  )
}
