import Link from 'next/link';
import Image from 'next/image';

export default function NewsList({ news }) {
    if (!Array.isArray(news)) {
        return <p>ไม่พบรายการข่าว หรือข้อมูลไม่ถูกต้อง</p>;
    }

    return (
        <ul className="news-list">
            {news.map(item => (
                <li key={item.id}>
                    <Link href={`/news/${item.slug}`} className="news-link">
                        <Image
                            src={`/images/news/${item.image}`}
                            alt={item.title}
                            width={300}
                            height={300}
                            className="news-image"
                        />
                        <span>{item.title}</span>
                    </Link>
                </li>
            ))}
        </ul>
    );
}