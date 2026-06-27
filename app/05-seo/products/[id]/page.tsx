type Props = {
    params: Promise<{id:string}>
}

export async function generateMetadata({params}: Props) {
    const {id} = await params;

    const products = {
        id,
        title: "iPhone 16 Pro",
        description: "The latest iPhone with the A20 chip.",
    }
    return {
        title: products.title,
        description: products.description,
    }
}

export default async function ProductsPage({params}: Props) {
    const {id} = await params;

    return (
        <h1>Product Id: {id}</h1>
    )
}
