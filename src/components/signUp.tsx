import React, { useCallback, useState } from "react"
import { api } from "../settings"

const SignUp = () => {
  const [submitted, useSetSubmitted] = useState<boolean>(false)
  const [email, setEmail] = useState<string>("")

  const subscribeCallback = useCallback(
    v => {
      v.preventDefault()
      console.log(api + "/api/RequestSubscribeFunction")
      const response = fetch(api + "/api/RequestSubscribeFunction", {
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
        body: JSON.stringify({ email }), // body data type must match "Content-Type" header
      }).then(a => {
        useSetSubmitted(true)
      })
    },
    [useSetSubmitted, email]
  )

  const onchangeCallback = useCallback(
    v => {
      setEmail(v.target.value)
    },
    [setEmail]
  )

  const content = submitted ? (
    <h4>добро пожаловать, у вас есть почта</h4>
  ) : (
    <form onSubmit={subscribeCallback}>
      <h4
        style={{
          margin: "0.1rem 0.1rem 1rem 0.1rem",
          textAlign: "center",
          padding: "1rem 0",
        }}
      >
        Ваше бесплатное ежедневное упражнение
      </h4>
      <input
        type="email"
        required
        placeholder="me@yandex.ru"
        aria-label="E-mail"
        style={{ maxWidth: "100%" }}
        value={email}
        onChange={onchangeCallback}
      />{" "}
      <button>Зарегистрироваться</button>
    </form>
  )

  return (
    <div
      style={{
        backgroundColor: "antiquewhite",
        borderRadius: "1rem",
        padding: "1rem",
        textAlign: "center",
        margin: "1rem 0 1rem 0",
      }}
    >
      {content}
    </div>
  )
}
export default SignUp
