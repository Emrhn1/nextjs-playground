'use server'

import {revalidatePath, revalidateTag} from 'next/cache'

export async function addNewProduct(formData: FormData) {
    await db.product.create({ data: { ... } }) // 1. Update data

    revalidateTag('products-list', "max") // 2. Clear the cache for ALL pages associated with this tag
}


export async function createProduct() {
    await db.product.create({ data: { ... } })

    revalidatePath("/products")
}
