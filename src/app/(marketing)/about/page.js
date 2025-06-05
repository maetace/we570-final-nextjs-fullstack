import Link from 'next/link';

export default function AboutPage() {
    return (
        <section id="home">
            <h1>About NextNews</h1>
            <p>
                NextNews is your go-to platform for concise and unbiased news.
                We aim to deliver information that matters without overwhelming you.
            </p>

            <p>
                <Link href="/">ย้อนกลับหน้าแรก</Link>
            </p>
        </section>
    );
}