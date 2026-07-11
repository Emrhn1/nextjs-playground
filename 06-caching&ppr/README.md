# Caching in Next.js

Caching is one of the most important performance features in Next.js.

Its purpose is to store previously generated HTML or fetched data so that the server does not need to perform the same work repeatedly.

By serving cached content instead of generating it every time, applications become faster and server costs are reduced.

---

# Real-Life Example

Imagine a group of friends visits your restaurant every day.

Every day they order exactly the same meal.

Instead of cooking the same meal from scratch every time, the chef prepares it in advance because he already knows what they will order.

Caching works in a very similar way.

If some data or pages rarely change, Next.js can store the generated result in memory and reuse it for future requests instead of generating it again.

As a result:

* Faster page loading
* Better user experience
* Lower server workload
* Reduced infrastructure costs

---

# Caching in Next.js 16

Before Next.js 16, many pages were cached automatically.

Next.js analyzed your application and decided whether a page should be static or dynamic.

Starting with Next.js 16, caching becomes much more explicit.

By default, Next.js assumes your code is dynamic unless you explicitly tell it that something should be cached.

To cache components or functions, we now use the new Cache Components feature.

The most important directive is:

```tsx
"use cache";
```

---

# What is `"use cache"`?

You already know that Client Components start with:

```tsx
"use client";
```

Caching works in a similar way.

By writing:

```tsx
"use cache";
```

we tell Next.js:

> "Cache the result of this computation and reuse it for future requests until the cache becomes invalid."

`"use cache"` can be applied to:

* An entire page
* A Server Component
* An async function

---

# Caching an Entire Page

```tsx
// Example
"use cache";

export default async function Page() {
  ...
}
```

---

# Caching a Component

```tsx
// Example
async function ProductDetails() {
  "use cache";

  ...
}
```

---

# Caching an Async Function

```tsx
// Example
async function getProducts() {
  "use cache";

  ...
}
```

The cached value will be reused until the cache expires or is invalidated.

---

# Other Important Caching APIs

## cacheLife()

`cacheLife()` controls how long cached content should remain valid.

It defines:

* How long the cache can be reused
* When it should be revalidated
* When it becomes completely stale

Example:

```tsx
"use cache"

import {cacheLife} from "next/cache";

export default async function BlogPage () {
    cacheLife('days')

    const posts = await getBlogPosts();

    return (
        <div>{/*rendering posts */}</div>
    )
}
```

---

## cacheTag()

`cacheTag()` assigns one or more tags to cached data.

Later, those tags can be revalidated without affecting unrelated cached content.

Example:

```tsx
import {cacheTag} from "next/cache";

export async function getData() {
    'use cache'
    cacheTag('my-data')
    const data = await fetch("api/data")
    return data
}
```

---

## revalidatePath()

`revalidatePath()` invalidates the cache for an entire route.

This is useful after updating data that affects a specific page.

Example:

```tsx
import { revalidatePath } from 'next/cache';

// Only the cache for this URL (page) will be cleared and rebuilt
revalidatePath('/urunler/nike-ayakkabi');
```

---

## revalidateTag()

Instead of invalidating an entire page, `revalidateTag()` invalidates only the cache associated with a specific tag.

This provides much more granular cache invalidation.

Example:

```tsx
'use server'

import { revalidateTag } from 'next/cache'

export async function addNewProduct(formData: FormData) {
    await db.product.create({ data: { ... } }) // 1. Update data

    revalidateTag('products-list') // 2. Clear the cache for ALL pages associated with this tag
}
```
---

# What is PPR (Partial Prerendering)?

Partial Prerendering (PPR) allows static and dynamic content to exist together on the same page.

Before this approach became available, pages were generally treated as either:

* Static
* Dynamic

If even a small part of the page required dynamic rendering, the entire page often had to be rendered dynamically.

With PPR, only the dynamic parts remain dynamic while the static parts are prerendered and cached.

---

# Real-Life Example

Imagine you are building an e-commerce website.

Some parts of the page rarely change:

* Product title
* Product description
* Images

These are excellent candidates for caching.

However, other parts change frequently:

* Shopping cart count
* Live stock information
* Personalized recommendations

Those sections should remain dynamic.

Without PPR, a small dynamic section could force the whole page to become dynamic.

That means even the product description would be regenerated for every request.

PPR solves this problem by allowing static and dynamic sections to coexist.

Instead of asking:

> "Should this page be static or dynamic?"

we now ask:

> "Which parts of this page should be static, and which parts should remain dynamic?"

---

# Example

```tsx
import { Suspense } from "react";

export default function ProductPage() {
  return (
    <>
      <ProductDescription />

      <Suspense fallback={<p>Loading stock information...</p>}>
        <LiveStock />
      </Suspense>
    </>
  );
}
```

---

# How It Works

When the user visits the page:

1. The static content is rendered immediately.
2. The user can start reading the page without waiting.
3. Dynamic content is streamed later as soon as it becomes available.

The user no longer sees a completely blank page while waiting for dynamic data.

This improves the perceived loading speed and contributes to better performance metrics such as FCP and LCP.

---

# Summary

* Caching stores previously generated content for reuse.
* `"use cache"` enables caching for pages, components, or async functions.
* `cacheLife()` controls how long cached data remains valid.
* `cacheTag()` groups cached data using tags.
* `revalidatePath()` invalidates an entire route.
* `revalidateTag()` invalidates cached content by tag.
* `updateTag()` expires cached data immediately.
* PPR allows static and dynamic content to exist together on the same page.
* With PPR, we focus on making only the necessary parts of a page dynamic instead of the entire page.
