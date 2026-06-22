# Next.js Routing System

In Next.js, routing is based on folders.

Every folder created inside the `app` directory becomes part of the URL.

For example, if we create an `about` folder inside the `app` directory and then create a `page.tsx` file inside that folder, our URL will become:

```text
localhost:3000/about
```

Any code written inside `app/about/page.tsx` will be displayed at this URL.

## Example

```text
app/
└── about/
    └── page.tsx
```

URL:

```text
localhost:3000/about
```

---

# Route Groups

As projects grow, managing pages can become difficult because the folder structure gets larger and more complex.

To organize our application better, Next.js provides **Route Groups**.

Route Groups allow us to group related pages together without affecting the URL structure.

To create a Route Group, we wrap the folder name with parentheses `()`.

For example:

```text
app/
└── (dashboard)/
    └── about/
        └── page.tsx
```

Even though the `about` page is inside the `(dashboard)` folder, the URL will still be:

```text
localhost:3000/about
```

The `(dashboard)` folder will **NOT** appear in the URL.

Like this:

![Routing Screenshots](public/screenshots/routing.png)

## Important Note

Any folder wrapped in parentheses `()` does not affect the URL path.

Route Groups are mainly used to:

* Organize large projects
* Separate application sections (e.g. authentication and dashboard pages)
* Apply different layouts to different parts of the application

We will learn layouts in more detail later.

---

# Summary

* Next.js uses a file-based routing system.
* Every folder inside `app` becomes part of the URL.
* `page.tsx` represents the page shown at that URL.
* Route Groups use parentheses `()`.
* Route Groups help organize large applications.
* Route Groups do not affect the URL.
