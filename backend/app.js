import express from 'express';
import sqlite from 'better-sqlite3';
import cors from 'cors';

const DUMMY_NEWS = [
  {
    id: 'n1',
    slug: 'us-tariff-impact-thai-economy',
    title: 'ส.อ.ท. ประเมินสหรัฐฯขึ้นภาษี ทำไทยเสียหายสูง 8-9 แสนล้านบาท',
    image: 'us-tariff.jpg',
    date: '2025-04-04',
    content: 'นายเกรียงไกร เธียรนุกุล ประธานสภาอุตสาหกรรมแห่งประเทศไทย (ส.อ.ท.) เปิดเผยว่าการขึ้นภาษีของสหรัฐฯ อาจทำให้ไทยเสียหายสูงถึง 8-9 แสนล้านบาท และเรียกร้องให้รัฐบาลเร่งเจรจาต่อรอง'
  },
  {
    id: 'n2',
    slug: 'lisa-oscar-performance',
    title: 'ลิซ่า สร้างประวัติศาสตร์! โชว์สุดพิเศษบนเวทีออสการ์ ครั้งที่ 97',
    image: 'lisa-oscar.jpg',
    date: '2025-03-02',
    content: 'ลิซ่า สมาชิกวง BLACKPINK ได้สร้างประวัติศาสตร์ด้วยการแสดงสุดพิเศษบนเวทีออสการ์ ครั้งที่ 97'
  },
  {
    id: 'n3',
    slug: 'bimstec-leaders-sign-agreements',
    title: '7 ผู้นำบิมสเทค ลงนามเอกสาร 6 ฉบับ ชู วิสัยทัศน์กรุงเทพฯ',
    image: 'bimstec-summit.jpg',
    date: '2025-04-05',
    content: 'ผู้นำจาก 7 ประเทศสมาชิกบิมสเทคได้ลงนามในเอกสาร 6 ฉบับ เพื่อส่งเสริมวิสัยทัศน์กรุงเทพฯ ที่มุ่งสร้างความมั่งคั่ง ยั่งยืน ฟื้นคืน และเปิดกว้าง'
  },
  {
    id: 'n4',
    slug: 'val-kilmer-passes-away',
    title: 'วัล คิลเมอร์ ผู้รับบทแบทแมนใน “Batman Forever” เสียชีวิตในวัย 65 ปี',
    image: 'val-kilmer.jpg',
    date: '2025-04-02',
    content: 'วัล คิลเมอร์ นักแสดงชื่อดังที่เคยรับบทเป็นแบทแมนในภาพยนตร์ “Batman Forever” ได้เสียชีวิตลงในวัย 65 ปี'
  },
  {
    id: 'n5',
    slug: 'gene-hackman-passes-away',
    title: 'ปิดตำนาน Gene Hackman นักแสดงดัง 2 ผลงานออสการ์',
    image: 'gene-hackman.jpg',
    date: '2025-02-28',
    content: 'Gene Hackman นักแสดงชื่อดังเจ้าของรางวัลออสการ์ 2 สมัย ได้เสียชีวิตลง'
  },
];

const db = sqlite('data.db');

function initDb() {
  db.prepare(
    'CREATE TABLE IF NOT EXISTS news (id INTEGER PRIMARY KEY, slug TEXT UNIQUE, title TEXT, content TEXT, date TEXT, image TEXT)'
  ).run();

  const { count } = db.prepare('SELECT COUNT(*) as count FROM news').get();

  if (count === 0) {
    const insert = db.prepare(
      'INSERT INTO news (slug, title, content, date, image) VALUES (?, ?, ?, ?, ?)'
    );

    DUMMY_NEWS.forEach((news) => {
      insert.run(news.slug, news.title, news.content, news.date, news.image);
    });
  }
}

const app = express();

app.use(cors())

app.get('/news', (req, res) => {
  const news = db.prepare('SELECT * FROM news').all();
  res.json(news);
});

initDb();

app.listen(8081);
