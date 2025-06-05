import { getAllNews } from '@/lib/news';

export function GET() {
    const stats = {};
    const newsList = getAllNews();

    for (const news of newsList) {
        const month = news.date.slice(0, 7); // 'YYYY-MM'
        stats[month] = (stats[month] || 0) + 1;
    }

    return Response.json(stats);
}