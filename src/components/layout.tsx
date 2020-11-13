import { theme, ThemeProvider } from "@chakra-ui/core"
import { Link } from "gatsby"
import React from "react"
import { rhythm, scale } from "../utils/typography"
import "./layout.css"
declare var __PATH_PREFIX__: any

const Layout = ({ location, title, children }: any) => {
  const rootPath = `${__PATH_PREFIX__}/`
  let header

  if (location.pathname === rootPath) {
    header = (
      <h1
        style={{
          ...scale(1.5),
          marginBottom: rhythm(1.5),
          marginTop: 0,
        }}
      >
        <Link
          style={{
            boxShadow: `none`,
            color: `inherit`,
          }}
          to={`/`}
        >
          {title}
        </Link>
      </h1>
    )
  } else {
    header = (
      <h3
        style={{
          fontFamily: `Montserrat, sans-serif`,
          marginTop: 0,
        }}
      >
        <Link
          style={{
            boxShadow: `none`,
            color: `inherit`,
          }}
          to={`/`}
        >
          {title}
        </Link>
      </h3>
    )
  }
  return (
    <ThemeProvider theme={theme}>
      {/* <CSSReset /> */}
      <div
        style={{
          marginLeft: `auto`,
          marginRight: `auto`,
          maxWidth: rhythm(30),
          backgroundColor: "#fff",
          boxShadow: "-1px 10px 23px 0px rgba(0,0,0,0.61)",
          padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
        }}
      >
        <header>{header}</header>
        <main>{children}</main>
        <footer>© {new Date().getFullYear()}</footer>
      </div>
    </ThemeProvider>
  )
}

export default Layout
