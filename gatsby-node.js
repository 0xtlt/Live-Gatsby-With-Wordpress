const path = require(`path`)

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions
  const PostPageTemplate = path.resolve("./src/templates/post.js")

  const result = await graphql(`
    {
      allWordpressPost {
        edges {
          node {
            path
            wordpress_id
          }
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  const BlogPosts = result.data.allWordpressPost.edges;

  BlogPosts.forEach(post => {
    createPage({
      path: post.node.path,
      component: PostPageTemplate,
      context: {
        id: post.node.wordpress_id,
      },
    })
  })
}