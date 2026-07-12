import CommentLine from "@/components/CommentLine";

export default async function ProductPage({
                                              params,
                                          }: {
    params: Promise<{ id: string }>;
}) {

    const { id } = await params;

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold">Product Detail Page</h1>
            <p className="text-gray-500">Current Product ID: {id}</p>
            <div className="mt-8 border-t pt-8">
                <CommentLine productId={id} />
            </div>
        </div>
    );W
}