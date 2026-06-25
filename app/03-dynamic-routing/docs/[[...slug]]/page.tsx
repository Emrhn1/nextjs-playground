export default async function DocsPage({
                                           params,
                                       }: {
    params: Promise<{ slug?: string[] }>
}) {

    const { slug } = await params;

    console.log(slug);

    return (
        <div>Docs id: {slug}</div>
    )
}
