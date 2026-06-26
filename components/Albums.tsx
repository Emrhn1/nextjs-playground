export async function GetAlbums() {
    const response = await fetch("https://jsonplaceholder.typicode.com/albums")
    if (!response.ok) {
        throw new Error("Failed to fetch Albums")
    }
    const albums = await response.json();

    return (
        <div className="grid grid-cols-1">
            {albums.map((album:any) => {
                const {id,title} = album;
                return (
                    <div key={id} className="bg-black shadow-md rounded-lg p-4">
                        <h3 className="text-lg font-bold mb-2">{title}</h3>
                        <p className="text-sm text-gray-600">{id}</p>
                    </div>
                    )
            })}
        </div>
    )
}
