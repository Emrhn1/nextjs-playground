# Dynamic Routes in Next.js

Dynamic Routes allow us to create dynamic URLs in Next.js.

For example, imagine we want to build a blog website. Creating a separate folder for every single blog post would unnecessarily increase the size and complexity of the project.

To avoid this, we can use Next.js Dynamic Routes.

---

# How to Use Dynamic Routes

Folder structure:

```text
app/
└── blog/
    └── [id]/
        └── page.tsx
```

First, we create a `blog` folder inside the `app` directory.

Then, we create another folder called `[id]`.

Finally, we create a `page.tsx` file inside the `[id]` folder.

When we wrap a folder name with `[]`, Next.js treats it as a dynamic URL segment.

For example:

```text
localhost:3000/blog/2

localhost:3000/blog/15

localhost:3000/blog/123
```
![Routing Screenshots](public/screenshots/dynamicroute.png)

All of these URLs will use the same `page.tsx` file.

---

# page.tsx Example

```tsx
export default async function BlogPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {

  const { id } = await params;

  return (
    <h1>Blog ID: {id}</h1>
  );
}
```

## Explanation

This page is a Server Component because all components in Next.js are Server Components by default.

`params` contains the dynamic values coming from the URL.

Since we are using TypeScript, we specify the type of `id`.

In Next.js 16, `params` is currently a Promise, so we need to await it.

```tsx
const { id } = await params;
```

This line extracts the dynamic value from the URL.

For example:

```text
localhost:3000/blog/15
```

will produce:

```text
id = "15"
```

---

# Catch-all Routes

Sometimes Dynamic Routes are not enough.

For example, imagine that you are building a documentation website. Creating many nested dynamic routes would eventually become difficult to manage.

Instead of creating separate folders for every document, we can use Catch-all Routes.

---

# How to Use Catch-all Routes

Folder structure:

```text
app/
└── docs/
    └── [...slug]/
        └── page.tsx
```

By using `[...slug]`, we can manage multiple URL segments with a single route.

For example:

```text
/docs/react

/docs/react/hooks

/docs/react/hooks/useState
```

All of these URLs will be handled by the same `page.tsx` file.

Next.js will convert the URL into an array.

Example:

```text
/docs/react/hooks/useState
```

becomes:

```ts
slug = [
  "react",
  "hooks",
  "useState"
]
```

## Important Note

`[...slug]` requires at least one URL segment.

This will work:

```text
/docs/react
```

But this will NOT work:

```text
/docs
```

because there is no segment to capture.

---

# Optional Catch-all Routes

Sometimes we also want the root page to work.

For example:

```text
/ docs
/docs/react
/docs/react/hooks
/docs/react/hooks/useState
```

In this case, we use `[[...slug]]`.

Folder structure:

```text
app/
└── docs/
    └── [[...slug]]/
        └── page.tsx
```

This allows us to capture zero or more URL segments.

Examples:

```text
/docs

/docs/react

/docs/react/hooks

/docs/react/hooks/useState
```

All of these URLs will work.

If the user visits:

```text
/docs
```

Then:

```ts
slug = undefined
```

because there are no segments.

---

# Difference Between Catch-all and Optional Catch-all

| Route Type    | Supported URLs        |
| ------------- | --------------------- |
| `[slug]`      | Exactly one segment   |
| `[...slug]`   | One or more segments  |
| `[[...slug]]` | Zero or more segments |

---

# Simple Summary

* `[id]` → Creates a dynamic URL segment.
* `[...slug]` → Captures one or more URL segments.
* `[[...slug]]` → Captures zero or more URL segments.
* `params` contains values extracted from the URL.
* Dynamic Routes help us avoid creating unnecessary folders.
