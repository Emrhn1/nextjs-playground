import {cacheTag} from "next/cache";

export async function getData() {
    'use cache'
    cacheTag('my-data')
    const data = await fetch("api/data")
    return data
}