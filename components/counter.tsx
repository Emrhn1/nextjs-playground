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