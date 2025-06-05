import { getAllNews } from "@/lib/news";
import NewsList from "@/components/NewsList";

export default async function NewsPage() {
    const news = await getAllNews();

    if (!news || news.length === 0) {
        return <p>ไม่พบข่าวในระบบ</p>;
    }

    return (
        <>
            <h1>หน้ารายการข่าว</h1>
            <NewsList news={news} />
        </>
    );
}