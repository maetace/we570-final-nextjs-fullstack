import logo from '@/assets/logo.png'
import Link from 'next/link';
import Image from 'next/image';

export default function HomePage() {
    return (
        <div id="home">
            <Image
                src={logo.src}
                alt="A newspaper"
                width={200}
                height={200}
                className="home-image"
            />
            <h1>A News Site by Next.js</h1>
            <p>
                NextNews พร้อมนำเสนอข่าวสารล่าสุดให้คุณแบบกระชับและเป็นกลาง!
            </p>

            <p>
                NextNews มุ่งมั่นที่จะส่งต่อข่าวสารล่าสุดให้คุณอย่างกระชับ เข้าใจง่าย และไม่มีอคติ เราต้องการให้คุณได้รับข้อมูลข่าวสารอย่างตรงประเด็น โดยไม่ต้องรู้สึกสับสนกับรายละเอียดที่ไม่จำเป็น
            </p>

            <p>
                เรามีทีมผู้สื่อข่าวมืออาชีพที่ทุ่มเทในการนำเสนอข่าวอย่างยุติธรรมและเป็นกลาง ทีมงานของเรามีความมุ่งมั่นในการอัปเดตข่าวสารให้คุณอย่างต่อเนื่องและเชื่อถือได้
            </p>

            <p>
                <Link href="/news">อ่านข่าวล่าสุด</Link>
            </p>
        </div>
    );
}