import React from "react"

const SignUp = (
  <div
    style={{
      backgroundColor: "antiquewhite",
      borderRadius: "1rem",
      padding: "1rem",
      textAlign: "center",
      margin: "1rem 0 1rem 0",
    }}
  >
    <form onSubmit={a => alert("скоро!")}>
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
      />{" "}
      <button>Зарегистрироваться</button>
    </form>
  </div>
)
export default SignUp
