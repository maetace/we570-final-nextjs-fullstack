'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function opreateNews(formData) {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const id = formData.get('id');

    const res = await fetch(id ? `${baseUrl}/api/news/${id}` : `${baseUrl}/api/news`, {
        method: id ? 'PUT' : 'POST',
        body: formData
    });
    if (res.ok) {
        revalidatePath('/', 'layout');
        redirect('/news');
    } else {
        const err = await res.json();
        throw new Error(err.message || 'News operation failed');
    }
}