# SEO in Next.js

## What is SEO?

SEO (Search Engine Optimization) is the process of optimizing a website so that search engines can better understand its content and display it in relevant search results.

The better your SEO is, the easier it becomes for users to discover your website through search engines like Google.

---

# Why is SEO Important?

SEO provides many benefits for a website, such as:

* Improves visibility in search engine results
* Helps users discover your website more easily
* Builds trust and credibility
* Improves the overall user experience
* Can increase organic traffic without paid advertisements

Now let's see how SEO is implemented in Next.js.

---

# Metadata API

The Metadata API is a built-in Next.js feature that allows us to manage SEO-related metadata for each page.

Using the Metadata API, we can define:

* Page title
* Description
* Keywords
* Open Graph metadata
* Twitter metadata
* Icons
* Robots rules
* And many other meta tags

There are two types of metadata in Next.js:

* Static Metadata
* Dynamic Metadata

---

# Static Metadata

Static Metadata is used for pages whose metadata rarely changes.

Examples:

* Home page
* About page
* Contact page

## Example

```tsx
export const metadata: Metadata = {
    title: "Main Page",
    description: "Main Page description",
}   
```
How it looks like in browser:

![Routing Screenshots](public/screenshots/staticmetadata.png)

### Explanation

Static Metadata is declared using the exported `metadata` object.

The metadata is generated at build time and remains the same every time the page is visited.

---

# Dynamic Metadata

Dynamic Metadata allows every dynamic page to have its own metadata.

It is created using the `generateMetadata()` function.

This is commonly used in applications such as:

* E-commerce websites
* Blog websites
* News websites

For example, every product page can have its own title and description.

Instead of displaying the same metadata for every product, Next.js generates metadata dynamically based on the current URL.

This helps search engines better understand what each page is about.

## Example

```tsx
type Props = {
    params: Promise<{id:string}>
}

export async function generateMetadata({params}: Props) {
    const {id} = await params;

    const products = {
        id,
        title: "iPhone 16 Pro",
        description: "The latest iPhone with the A20 chip.",
    }
    return {
        title: products.title,
        description: products.description,
    }
}

export default async function ProductsPage({params}: Props) {
    const {id} = await params;

    return (
        <h1>Product Id: {id}</h1>
    )
}
```
How it looks like in browser:
![Routing Screenshots](public/screenshots/dynamicmetadata.png)
### Explanation

`generateMetadata()` runs on the server.

It can fetch data and generate metadata dynamically based on the current page.

For example:

```text
/products/1
```

can generate:

```text
Title: iPhone 16 Pro
Description: The latest iPhone with the A20 chip.
```

while

```text
/products/2
```

can generate:

```text
Title: Samsung Galaxy S26
Description: Discover the latest Samsung flagship phone.
```

---

# Open Graph

Open Graph is a protocol that controls how your website appears when it is shared on social media platforms.

For example, when you share a website link on Discord, Facebook, LinkedIn, or other platforms, you usually see:

* A title
* A description
* A preview image

These elements are generated using Open Graph metadata.

## Example

```tsx
export const metadata: Metadata = {
    title: "Main Page",
    description: "Main Page description",
    openGraph: {
        title: "OpenGraph",
        description: "OpenGraph",
        url: "https://opengraph.org/",
        images: ['/og.jpg'],
    }
}
```

---

# robots.txt

The `robots.txt` file tells search engine crawlers which pages they are allowed (or not allowed) to crawl.

For example, you may want Google to ignore:

* Admin pages
* Private dashboards
* Internal routes

## Example

```ts
User-Agent: *
Allow: /
Disallow: /private/

Sitemap: https://acme.com/sitemap.xml
```

To learn more about robots metadata, visit the official Next.js documentation:

https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots

---

# sitemap.xml

A sitemap helps search engines discover and crawl your website more efficiently.

Instead of finding pages one by one, search engines can use the sitemap as a roadmap of your website.

## Advantages

* Faster page discovery
* Easier indexing by search engines
* Helps crawlers understand your site's structure
* Makes it easier for newly created pages to be discovered
* Can provide information such as the last modification date and page priority

## Example

```xml
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
        <loc>https://acme.com</loc>
        <lastmod>2023-04-06T15:02:24.021Z</lastmod>
        <changefreq>yearly</changefreq>
        <priority>1</priority>
    </url>
    <url>
        <loc>https://acme.com/about</loc>
        <lastmod>2023-04-06T15:02:24.021Z</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
    </url>
    <url>
        <loc>https://acme.com/blog</loc>
        <lastmod>2023-04-06T15:02:24.021Z</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.5</priority>
    </url>
</urlset>
```

---

# Summary

* SEO helps search engines understand your website.
* The Metadata API is the primary SEO tool in Next.js.
* Static Metadata is used for pages whose metadata rarely changes.
* Dynamic Metadata generates metadata based on the current page.
* Open Graph controls how links appear on social media.
* `robots.txt` controls which pages search engines can crawl.
* `sitemap.xml` helps search engines discover your website more efficiently.
