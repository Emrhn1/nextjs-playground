"use client"
import {useEffect, useState} from "react";

const Posts = () => {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        const fetchPosts = async () => {
            try {
               const response = await fetch("https://jsonplaceholder.typicode.com/posts")
                const data = await response.json();
               setPosts(data)
            } catch (error) {
                console.log("Fetching error in posts:" +error)
            }
        }
        fetchPosts()
    }, [])

    return (
        <div className="grid grid-cols-1">
           {posts.map((post:any) => (
               <div className="bg-black shadow-md" key={post.id}>
                 <h1 className="text-lg font-bold">{post.title}</h1>
                   <p className="text-gray-50">{post.body}</p>
               </div>
           ))}
        </div>
    )
}
export default Posts;