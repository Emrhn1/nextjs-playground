import {GetAlbums} from "@/components/Albums";
import Posts from "@/components/Posts";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: "Main Page",
    description: "Main Page description",
    openGraph: {
        title: "OpenGraph",
        description: "OpenGraph",
        url: "https://opengraph.org/",
        images: ['/og.jpg'],
    }
}

export default function Home() {
  return (
     <div>
         <Posts/>
     </div>
  );
}
