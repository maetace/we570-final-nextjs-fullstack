import { getNewsItem } from "@/lib/news";
import { notFound } from "next/navigation";
import Image from "next/image";

export default async function ImagePage({ params }) {
    const { slug } = params;
    const newsItem = await getNewsItem(slug);

    if (!newsItem) notFound();

    return (
        <div>
            <Image
                src={`/images/news/${newsItem.image}`}
                alt={newsItem.title}
                width={1000}
                height={1000}
                className="fullscreen-image"
            />
        </div>
    );
}