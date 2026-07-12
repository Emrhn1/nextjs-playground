"use client"
import {useRef} from "react";
import {addComment} from "@/app/07-server-actions/product/actions";
export default function CommentLine({productId} : {productId: string}) {
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
                <input type="hidden" name="productId" value={productId} />

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
                    Send comment
                </button>
            </form>
        </div>
    )
}