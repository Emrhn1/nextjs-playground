# Data Fetching in Next.js

Data fetching is one of the most important concepts in Next.js.

There are two common ways to fetch data:

* Server-side Fetching
* Client-side Fetching

Although both approaches are used to retrieve data, they work differently and are designed for different use cases.

---

# 1) Server-side Fetching

Server-side Fetching means that data is fetched and processed on the server before the page is sent to the browser.

The server generates the HTML together with the fetched data, and the browser receives a fully rendered page.

## Advantages

### Better SEO

Server-side Fetching is great for SEO because the page content already exists in the HTML.

Search engine crawlers can easily read and index the page without waiting for JavaScript to load.

---

### Better First Contentful Paint (FCP)

FCP (First Contentful Paint) measures how long it takes for the user to see the first meaningful content on the page.

General guideline:

* ✅ Less than **1.8 seconds** → Good
* ⚠️ Between **1.8 - 3 seconds** → Needs improvement
* ❌ More than **3 seconds** → Slow

Since the server sends ready-to-render HTML, users usually see content faster.

---

### More Secure

Sensitive information such as:

* API keys
* Database credentials
* Private environment variables

remain on the server and are never exposed to the browser.

---

## Example

```tsx
// Server-side fetching example
export async function GetAlbums() {
    const response = await fetch("https://jsonplaceholder.typicode.com/albums")
    if (!response.ok) {
        throw new Error("Failed to fetch Albums")
    }
    const albums = await response.json();


    return (
        <div className="grid grid-cols-1">
            {albums.map((album:any) => {
                const {id,title} = album;
                return (
                    <div key={id} className="bg-black shadow-md rounded-lg p-4">
                        <h3 className="text-lg font-bold mb-2">{title}</h3>
                        <p className="text-sm text-gray-600">{id}</p>
                    </div>
                )
            })}
        </div>
    )
}
```

### Explanation

The page fetches data on the server before sending the HTML to the browser.

The user receives a fully rendered page containing the requested data.

---

# 2) Client-side Fetching

Client-side Fetching means that data is fetched inside the user's browser using JavaScript.

This is commonly done using:

* fetch()
* Axios
* SWR
* TanStack Query (React Query)

The browser first loads the page and then requests the data.

---

## Advantages

### Better User Experience (UX)

Since only the required data is requested, page interactions can feel much faster.

This is especially useful for dashboards, user profiles, notifications, and other interactive applications.

---

### Less Work for the Server

The browser performs additional data requests after the page loads, reducing the amount of work required when rendering pages.

---

### Interactive Applications

Client-side Fetching is useful when data changes frequently.

Examples:

* Live notifications
* Chat applications
* Dashboards
* Weather applications
* Stock market data

---

## Example

```tsx
// Client-side fetching example
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
```

### Explanation

The browser first loads the page.

Then JavaScript fetches the data and updates the UI without requiring a full page reload.

---

# Server-side vs Client-side Fetching

| Feature            | Server-side Fetching                | Client-side Fetching            |
| ------------------ | ----------------------------------- | ------------------------------- |
| Where does it run? | Server                              | Browser                         |
| SEO                | ✅ Excellent                         | ❌ Limited                       |
| Initial Page Load  | ✅ Fast (HTML is ready)              | ⚠️ Data loads after page render |
| Security           | ✅ API keys stay on the server       | ❌ Never expose secrets          |
| User Interactivity | ⚠️ Limited                          | ✅ Excellent                     |
| Best Use Cases     | Blogs, Landing Pages, Documentation | Dashboards, Chats, Live Data    |

---

# When Should You Use Each One?

Use **Server-side Fetching** when:

* SEO is important
* The page should load with data already available
* You need to access databases or private APIs

Use **Client-side Fetching** when:

* The data changes frequently
* You need a highly interactive UI
* The content depends on user actions

---

# Summary

* Both methods fetch data, but they run in different environments.
* Server-side Fetching runs on the server and sends ready-made HTML to the browser.
* Client-side Fetching runs in the browser after the page loads.
* In Next.js, Server-side Fetching is generally the recommended approach unless your application requires frequent client-side updates.
