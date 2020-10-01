// If you don't want to use TypeScript you can delete this file!
import React, { useCallback, useEffect, useState } from "react"
import Layout from "../components/layout"
import { api } from "../settings"

const Unsubscribe = () => {
  const [id, setId] = useState<string>()

  useEffect(() => {
    const length = window.location.search.length
    if (length < 5) {
      return
    }
    const id = window.location.search.substring(4, length)
    setId(id)
  }, [])

  const [submitted, useSetSubmitted] = useState<boolean>(false)
  const unsubscribeEvent = useCallback(
    a => {
      a.preventDefault()
      fetch(api + "/api/RequestUnsubscribeFunction", {
        method: "POST", // *GET, POST, PUT, DELETE, etc.x
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify({ id }), // body data type must match "Content-Type" header
      }).then(a => {
        useSetSubmitted(true)
      })
    },
    [useSetSubmitted, id]
  )

  if (submitted) {
    return (
      <Layout location={location} title={"You are unsubscribed"}>
        You are unsubscribed
      </Layout>
    )
  }
  return (
    <Layout location={location} title={"Unsubscribed"}>
      <form onSubmit={unsubscribeEvent}>
        <h4
          style={{
            margin: "0.1rem 0.1rem 1rem 0.1rem",
            textAlign: "center",
            padding: "1rem 0",
          }}
        >
          Ваше бесплатное ежедневное упражнение
        </h4>
        <button>Зарегистрироваться</button>
      </form>
    </Layout>
  )
}

export default Unsubscribe
