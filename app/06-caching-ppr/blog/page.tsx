"use cache"

import {cacheLife} from "next/cache";

export default async function BlogPage () {
   cacheLife('days')

    const posts = await getBlogPosts();

   return (
       <div>{/*rendering posts */}</div>
   )
}