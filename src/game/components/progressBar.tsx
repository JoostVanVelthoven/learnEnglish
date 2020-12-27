import React, { useContext, useEffect, useState } from "react"
import Confetti from "react-dom-confetti"
import AppContext, { State } from "../../context/languageContext"

export const ProgressBar = () => {
  const context = useContext<any>(AppContext)
  const { state }: { state: State; dispatch: any } = context

  const [previouslyPercentage, setPreviouslyPercentage] = useState(0)
  const percentage = Math.min(
    (state.items.filter(a => a.isValid).length / state.items.length) * 100,
    100
  )
  useEffect(() => {
    const thresholds = [1, 50, 75, 100]
    const thresholdValue = thresholds.find(
      threshold => previouslyPercentage < threshold && threshold >= percentage
    )
    const hasGa = typeof ga
    console.log({ hasGa })
    if (thresholdValue && hasGa !== "undefined") {
      if (percentage > previouslyPercentage) {
        ga("send", "event", "exercise", `${thresholdValue} completed`)
        setPreviouslyPercentage(percentage)
      }
    }
  }, [percentage])

  if (!(state.numberOfChallenges > 0)) {
    return <></>
  }

  const completed = percentage === 100
  const config = {
    angle: 90,
    spread: 360,
    startVelocity: 40,
    elementCount: 70,
    dragFriction: 0.12,
    duration: 3000,
    stagger: 3,
    width: "10px",
    height: "10px",
    perspective: "500px",
    colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"],
  }
  return (
    <>
      <div
        style={{
          position: "sticky",
          top: "0px",
          backgroundColor: "#fff",
          padding: "5px 0 5px 0",
          zIndex: 500,
        }}
      >
        <div
          style={{
            backgroundColor: "#E5E5E5",
            borderRadius: "5px",
            padding: "5px",
          }}
        >
          <div
            style={{
              backgroundColor: "#4099D5",
              width: percentage + "%",
              lineHeight: "0.0",
              height: "5px",
              transition: "all 0.3s ease 0s",
            }}
          >
            &nbsp;
          </div>
        </div>
      </div>
      <div
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          overflow: "none",
        }}
      >
        <Confetti active={completed} config={config} />
      </div>
    </>
  )
}
