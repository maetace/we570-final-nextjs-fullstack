import { getAllNews, addNews } from '@/lib/news';

export async function GET() {
  try {
    const news = await getAllNews();
    return Response.json(news);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const form = await req.formData();
    const news = {
      slug: form.get('slug'),
      title: form.get('title'),
      content: form.get('content'),
      date: form.get('date'),
    };
    const file = form.get('image');

    const result = await addNews(news, file);
    return Response.json(result, { status: 201 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}