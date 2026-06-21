# Next.js Rendering Model (Server vs Client Components)

### 1) Server Components 
Server components are only render on the server side which means that these components are running on the server.

### Features
* Server components don't send the Javascript to the browser. (or little)
* Generate HTML as a result
* Database and API operations can be performed
* Cannot use React State or event

Important: In Next.js components are server components as default.

```
export default function Home() {
    console.log("What type component am I?")
  return (
     <h1>WELCOME TO THE NEXTJS 16</h1>
  );
}

// We didn't "use client" or user interactivity like button, form. 
// Thus this component is server component in Next.js
```

### 2) Client Components
Client comppnents are components that used for interactivity in browser.

### Features
* Client components don't just run in the browser. First pre-rendered on the server side, then JavaScript is sent to the browser, and become interactive through the hydration process.
* The file is created by writing “use client” at the beginning of the file.

### How to use Client Component in Next.js?
```
"use client"
import {useState} from "react";

const Counter = () => {
    const [counter, setCounter] = useState(0);
    return (
        <div>
            <span>Counter: {counter}</span>
            <button onClick={() => setCounter(counter + 1)}>
                Increment counter
            </button>
        </div>
    )
}
export default Counter;

// We write "use client" to indicate that it is a client component. 
// Then we can use this component in the page.tsx file.
```

# Comparison (Server and Client Components)

| Features           | Server Components                             | Client Components ("use client")   |
|:-------------------|:----------------------------------------------|:-----------------------------------|
| Data fetching      | ✅     Yes (directly)                          | ⚠️ Yes (with useEffect)            |
| Backend            | ✅     Yes (DB)                                | ❌ No                               |
| Bundle Size        | 🚀     0 (The code doesn't go to the browser) | 📦 Yes (Downloaded to the browser) |
| React Hooks        | ❌     No                                      | ✅     Yes           |
| User Interactivity | ❌     No                                      | ✅     Yes           |

