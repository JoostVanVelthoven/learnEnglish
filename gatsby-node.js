const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

// query site {
//   allFile(filter: {sourceInstanceName: {eq: "blog"}}) {
//     edges {

//       node {

//         internal {
//           content
//         }
//       }
//     }
//   }
// }

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const blogPost = path.resolve(`./src/templates/blog-post.tsx`)
  const result = await graphql(
    `
      {
        allMarkdownRemark(
          sort: { fields: [frontmatter___level], order: ASC }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
                level
                index
              }
              internal {
                content
              }
            }
          }
        }
      }
    `
  )

  if (result.errors) {
    throw result.errors
  }

  // Create blog posts pages.
  const posts = result.data.allMarkdownRemark.edges

  posts.forEach((post, index) => {
    const previousList = posts
      .slice(0, index)
      .filter(a => a.node.frontmatter.index === true)

    const previous =
      previousList.length > 0
        ? previousList[previousList.length - 1].node
        : undefined

    const nextList = posts
      .slice(index, posts.length)
      .filter(a => a.node.frontmatter.index === true)

    const next = nextList.length > 0 ? nextList[0].node : undefined

    console.log(post.node.fields.slug)

    console.log(next)
    console.log(previous)

    console.log("!!!!!!")

    createPage({
      path: post.node.fields.slug,
      component: blogPost,
      context: {
        slug: post.node.fields.slug,
        previous,
        next,
        raw: post.node.internal.content,
      },
    })
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}
