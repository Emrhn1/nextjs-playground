# Next.js Playground 🚀

This repository is my personal learning playground for Next.js 16 and modern React concepts.

The goal of this project is to understand Next.js deeply by building small isolated examples instead of large complex applications.

---

# 🎯 Purpose of this Repo

- Learn Next.js step by step
- Understand Server vs Client Components
- Practice React Server Components (RSC)
- Learn data fetching patterns
- Understand Server Actions
- Build mental models instead of memorizing

---

# 🧠 Learning Approach

This repo is based on **learning by building small isolated experiments**.

Each folder represents a single concept in Next.js.

Instead of mixing everything in one project, each topic is separated to avoid confusion.

---

# 📁 Project Structure


nextjs-playground/

01-server-client

02-routing

03-dynamic-routing

04-data-fetching

05-server-actions

06-caching

07-search-params

08-layouts

09-middleware

10-auth


Each folder contains:

- A small Next.js example
- A simple README (optional)
- Focused code related only to that concept

---

# 🧩 Core Concepts Covered

## 1. Server Components
- Default component type in Next.js
- Runs on the server
- Produces HTML
- No browser interactivity

## 2. Client Components
- Activated using `"use client"`
- Runs in the browser after hydration
- Supports state and events

## 3. Server Actions
- Server-side functions triggered from client components
- Used for mutations (DB, forms, etc.)

## 4. Data Fetching
- Server-side fetching with `fetch`
- Built-in caching and revalidation

## 5. Routing (App Router)
- File-based routing system
- Nested layouts and pages

and more..
---
# 🧪 Learning Strategy

Each topic follows the same pattern:

1. What is it?
2. Where is it used?
3. Simple code example
4. Mental model (how it works internally)

---

# ⚙️ Tech Stack

- Next.js 16 (App Router)
- React (Server Components architecture)
- TypeScript
- Node.js runtime

---

# 🧠 Key Mental Model

> Next.js is not just React. It is a full-stack framework that decides where code runs.

- Server = data + HTML generation
- Client = interactivity + browser logic

---

# 🚀 Goal of This Repo

The goal is not just to write code, but to understand:

- Where code runs
- Why it runs there
- What is sent to the browser
- What stays on the server

---

# 📌 Notes

This repository is continuously updated as I learn new concepts in Next.js.

Each folder is intentionally kept small and isolated to reinforce understanding.
