import Link from 'next/link';

export default function notFound() {
    return (
        <section id="home">
            <h1>Page Not Found</h1>
            <p>The page you&apos;re looking for does not exist.</p>
            <p>
                <Link href="/">ย้อนกลับหน้าแรก</Link>
            </p>
        </section>
    );
}