import ModalBackdrop from '@/components/modal-backdrop';
import { getNewsItem } from '@/lib/news';
import { notFound } from 'next/navigation';
import Image from 'next/image';

export default async function InterceptedImageModal({ params }) {
    const newsItem = await getNewsItem(params.slug);
    if (!newsItem) notFound();

    return (
        <ModalBackdrop>
            <Image
                src={`/images/news/${newsItem.image}`}
                alt={newsItem.title}
                width={800}
                height={800}
                className="modal-image"
            />
        </ModalBackdrop>
    );
}