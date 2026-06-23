const BlogPage = async ({
    params
}: {params: Promise<{id:string}>} ) => {
    const {id} = await params
    return (
        <div>Blog Id: {id}</div>
    )
}
export default BlogPage