import { graphql, Link, navigate } from "gatsby"
import React from "react"
import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import SignUp from "../components/signUp"
import { AppProvider } from "../context/languageContext"
import GameMarkdown from "../game/components/gameMarkdown"
import { ProgressBar } from "../game/components/progressBar"
import { rhythm, scale } from "../utils/typography"

const BlogPostTemplate = ({ data, pageContext, location }: any) => {
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata.title
  const { previous, next, raw } = pageContext

  return (
    <Layout location={location} title={siteTitle}>
      <AppProvider>
        <SEO
          title={post.frontmatter.title}
          description={post.frontmatter.description || post.excerpt}
        />
        <article>
          <ProgressBar />
          <header>
            <h1
              style={{
                marginTop: rhythm(1),
                marginBottom: 0,
              }}
            >
              {post.frontmatter.title}
            </h1>
            <p
              style={{
                ...scale(-1 / 5),
                display: `block`,
                marginBottom: rhythm(1),
              }}
            >
              {post.frontmatter.date}
            </p>
          </header>
          <GameMarkdown raw={raw} />

          <a
            style={{ color: "#fff" }}
            onClick={() => {
              localStorage.setItem("editor", raw)
              navigate("/editor")
            }}
          >
            edit
          </a>

          <hr
            style={{
              marginBottom: rhythm(1),
            }}
          />
          <footer>
            <SignUp />
            <Bio />
          </footer>
        </article>

        <nav>
          <ul
            style={{
              display: `flex`,
              flexWrap: `wrap`,
              justifyContent: `space-between`,
              listStyle: `none`,
              padding: 0,
            }}
          >
            <li>
              {previous && (
                <Link to={previous.fields.slug} rel="prev">
                  ← {previous.frontmatter.title}
                </Link>
              )}
            </li>
            <li>
              {next && (
                <Link to={next.fields.slug} rel="next">
                  {next.frontmatter.title} →
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </AppProvider>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
      }
    }
  }
`
