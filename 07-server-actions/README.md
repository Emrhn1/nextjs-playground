# Server Actions in Next.js

## What are Server Actions?

Server Actions are a Next.js feature that allows us to execute server-side code directly from the browser.

Before Server Actions, adding data to a database usually looked like this:

```text
Client
    ↓
POST /api/products
    ↓
API Route
    ↓
Database
```

With Server Actions, the flow becomes much simpler:

```text
Client
    ↓
Server Action
    ↓
Database
```

In many cases, Server Actions remove the need to create separate API Routes for simple server-side operations.

---

# Why Should We Use Server Actions?

Some operations should always be executed on the server.

Examples include:

* Database operations
* Payment systems
* Working with cookies
* Authentication
* Sending emails
* Uploading files

Server Actions provide a simple and secure way to perform these operations without creating API Routes for every request.

---

# `"use server"`

Since Server Actions run on the server, we need to mark them using the `"use server"` directive.

It can be placed:

* At the top of a file
* Inside a specific function

## Example

```tsx
"use server";

import { revalidatePath } from "next/cache";

export async function createProduct() {
    await db.product.create({
        data: {
            // Product data
        }
    });

    revalidatePath("/products");
}
```

### Explanation

* `"use server"` tells Next.js that this code must execute on the server.
* The product is added to the database.
* `revalidatePath()` clears the cached `/products` page so the next request receives fresh data.

---

# Form Actions

One of the most common uses of Server Actions is handling form submissions.

Instead of sending a request to an API Route, we can submit the form directly to a Server Action.

This makes form handling simpler while keeping sensitive logic on the server.

---

# Calling Server Actions from Client Components

## actions.ts

```tsx
"use server";

import { revalidatePath } from "next/cache";

export async function addComment(formData: FormData) {
    const productId = formData.get("productId");
    const comment = formData.get("comment");

    console.log(
        `Added to the database. Product: ${productId} Comment: ${comment}`
    );

    await new Promise((resolve) => setTimeout(resolve, 1000));

    revalidatePath(`/products/${productId}`);
}
```

---

## CommentLine.tsx

```tsx
"use client";

import { useRef } from "react";
import { addComment } from "@/app/07-server-actions/product/actions";

export default function CommentLine({
    productId,
}: {
    productId: string;
}) {
    const formRef = useRef<HTMLFormElement>(null);

    return (
        <div className="p-6 border rounded-lg max-w-md mt-4">
            <h3 className="font-bold mb-4">Comment</h3>

            <form
                ref={formRef}
                action={async (formData) => {
                    await addComment(formData);
                    formRef.current?.reset();
                }}
            >
                <input
                    type="hidden"
                    name="productId"
                    value={productId}
                />

                <textarea
                    name="comment"
                    required
                    placeholder="What do you think about this shoe?"
                    className="w-full border p-2 mb-2 rounded"
                />

                <button
                    type="submit"
                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 w-full"
                >
                    Send Comment
                </button>
            </form>
        </div>
    );
}
```

---

## product/[id]/page.tsx

```tsx
import CommentLine from "@/components/CommentLine";

export default async function ProductPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold">
                Product Detail Page
            </h1>

            <p className="text-gray-500">
                Current Product ID: {id}
            </p>

            <div className="mt-8 border-t pt-8">
                <CommentLine productId={id} />
            </div>
        </div>
    );
}
```

---

## Explanation

1. The user fills out the form inside the Client Component.
2. When the form is submitted, the `addComment()` Server Action is executed.
3. The Server Action processes the form data on the server.
4. The new comment is saved to the database (simulated in this example).
5. `revalidatePath()` invalidates the cache for that product page.
6. The next request receives fresh data instead of stale cached content.

---

# Cache Invalidation

Server Actions are commonly used together with cache invalidation.

Imagine a product page is cached.

A user submits a new comment.

The database now contains the new comment, but the cached page still contains the old data.

To solve this problem, Next.js provides cache invalidation functions.

The most commonly used ones are:

* `revalidatePath()`
* `revalidateTag()`
* `updateTag()`

These functions tell Next.js to invalidate the existing cache so that fresh data is generated on the next request.

---

# Complete Flow

A typical Server Action flow looks like this:

```text
User
    ↓
Submit Form
    ↓
Client Component
    ↓
Server Action
    ↓
Database
    ↓
revalidatePath()
    ↓
Cache Invalidated
    ↓
Fresh Data on the Next Request
```

---

# Summary

* Server Actions execute server-side code directly from the browser.
* In many cases, they replace the need for API Routes.
* `"use server"` marks a function or file as a Server Action.
* Forms can submit data directly to Server Actions.
* Server Actions are commonly used with cache invalidation.
* `revalidatePath()`, `revalidateTag()`, and `updateTag()` keep cached pages synchronized with the latest data.
