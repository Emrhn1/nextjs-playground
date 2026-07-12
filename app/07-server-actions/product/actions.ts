"use server"
import {revalidatePath} from "next/cache";

export async function addComment(formData: FormData) {
    const productId = formData.get("productId");
    const comment = formData.get("comment");

    console.log(`Added to the database. Product: ${productId} Comment: ${comment}`)

    await new Promise(resolve => setTimeout(resolve, 1000));

    revalidatePath(`products/${productId}`);
}