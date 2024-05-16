import Header from '@/app/components/Header'
import { client } from '@/sanity/lib/client'
import Link from 'next/link'

const getAllTags = async () => {
  const query = `*[_type == "tag"] {
        _id,
        name,
        slug,
        "postCount": count(*[_type == "post" && references("tags",^._id)])
    }`
  const data = await client.fetch(query)
  return data
}

export const revalidate = 60

const TagPage = async () => {
  const tags = await getAllTags()

  return (
    <div>
      <Header title="Tags" />
      <div>
        {tags?.length > 0 &&
          tags?.map((tag) => (
            <Link key={tag?._id} href={`/tag/${tag.slug.current}`}>
              <div className="mb-2 p-2 text-sm lowercase dark:bg-gray-950 border dark:border-gray-900 hover:text-purple-500">
                #{tag?.name} ({tag?.postCount})
              </div>
            </Link>
          ))}
      </div>
    </div>
  )
}

export default TagPage
