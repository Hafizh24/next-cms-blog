import Header from '@/app/components/Header'
import PostComponent from '@/app/components/PostComponent'
import { client } from '@/sanity/lib/client'

const getPostByTag = async (slug) => {
  const query = `
    *[_type == "post" && references(*[_type == "tag" && slug.current == "${slug}"]._id)] {
        title,
        slug,
        excerpt,
        publishedAt,
        tags[]-> {
            _id,
            slug,
            name,
        }
    }
    `
  const data = await client.fetch(query)
  return data
}

export const revalidate = 60

const PostByTagPage = async ({ params }) => {
  const posts = await getPostByTag(params.slug)

  return (
    <div>
      <Header title={`#${params?.slug}`} tags />
      <div>{posts?.length > 0 && posts.map((post) => <PostComponent key={post._id} post={post} />)}</div>
    </div>
  )
}

export default PostByTagPage
