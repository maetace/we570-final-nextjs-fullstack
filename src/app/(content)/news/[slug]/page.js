import { notFound } from "next/navigation";
import { getNewsItem } from "@/lib/news";
import Link from "next/link";
import Image from "next/image";

export default async function NewsContentPage({ params }) {
    const { slug } = params;
    const newsItem = await getNewsItem(slug);

    if (!newsItem) notFound();

    return (
        <article className="news-article">
            <header>
                <Link href={`/news/${slug}/image`}>
                    <Image src={`/images/news/${newsItem.image}`}
                        alt={newsItem.title}
                        width={100}
                        height={100}
                        className="news-article-image"
                    />
                </Link>
                <h1>{newsItem.title}</h1>
                <time dateTime={newsItem.date}>{newsItem.date}</time>
            </header>
            <p>{newsItem.content}</p>
        </article>
    );
}