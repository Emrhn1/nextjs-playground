'use server'

import { revalidateTag } from 'next/cache'

export async function addNewProduct(formData: FormData) {
    await db.product.create({ data: { ... } }) // 1. Update data

    revalidateTag('products-list') // 2. Clear the cache for ALL pages associated with this tag
}
