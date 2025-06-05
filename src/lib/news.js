import sql from 'better-sqlite3';
import fs from 'fs/promises';
import path from 'path';

const db = sql('data.db');

const DUMMY_NEWS = [
  {
    id: 'n3',
    slug: 'bimstec-leaders-sign-agreements',
    title: '7 ผู้นำบิมสเทค ลงนามเอกสาร 6 ฉบับ ชู วิสัยทัศน์กรุงเทพฯ',
    image: 'bimstec-summit.jpg',
    date: '2025-04-05',
    content: 'ผู้นำจาก 7 ประเทศสมาชิกบิมสเทคได้ลงนามในเอกสาร 6 ฉบับ เพื่อส่งเสริมวิสัยทัศน์กรุงเทพฯ ที่มุ่งสร้างความมั่งคั่ง ยั่งยืน ฟื้นคืน และเปิดกว้าง'
  },
  {
    id: 'n1',
    slug: 'us-tariff-impact-thai-economy',
    title: 'ส.อ.ท. ประเมินสหรัฐฯขึ้นภาษี ทำไทยเสียหายสูง 8-9 แสนล้านบาท',
    image: 'us-tariff.jpg',
    date: '2025-04-04',
    content: 'นายเกรียงไกร เธียรนุกุล ประธานสภาอุตสาหกรรมแห่งประเทศไทย (ส.อ.ท.) เปิดเผยว่าการขึ้นภาษีของสหรัฐฯ อาจทำให้ไทยเสียหายสูงถึง 8-9 แสนล้านบาท และเรียกร้องให้รัฐบาลเร่งเจรจาต่อรอง'
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
    id: 'n2',
    slug: 'lisa-oscar-performance',
    title: 'ลิซ่า สร้างประวัติศาสตร์! โชว์สุดพิเศษบนเวทีออสการ์ ครั้งที่ 97',
    image: 'lisa-oscar.jpg',
    date: '2025-03-02',
    content: 'ลิซ่า สมาชิกวง BLACKPINK ได้สร้างประวัติศาสตร์ด้วยการแสดงสุดพิเศษบนเวทีออสการ์ ครั้งที่ 97'
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

function initDb() {
  db.exec(
    `CREATE TABLE IF NOT EXISTS news (
      id INTEGER PRIMARY KEY,
      slug TEXT UNIQUE,
      title TEXT,
      content TEXT,
      date TEXT,
      image TEXT
    )`
  );

  const { count } = db.prepare('SELECT COUNT(*) as count FROM news').get();

  if (count === 0) {
    const insert = db.prepare('INSERT INTO news (slug, title, content, date, image) VALUES (?, ?, ?, ?, ?)');
    DUMMY_NEWS.forEach((news) => {
      insert.run(news.slug, news.title, news.content, news.date, news.image);
    });
  }
}

initDb();

// 📦 GET functions

export async function getAllNews() {
  return db.prepare('SELECT * FROM news').all();
}

export async function getNewsItem(slug) {
  return db.prepare('SELECT * FROM news WHERE slug = ?').get(slug);
}

export async function getLatestNews() {
  return db.prepare('SELECT * FROM news ORDER BY date DESC LIMIT 3').all();
}

export async function getAvailableNewsYears() {
  return db
    .prepare("SELECT DISTINCT strftime('%Y', date) as year FROM news")
    .all()
    .map(row => row.year);
}

export async function getAvailableNewsMonths(year) {
  return db
    .prepare("SELECT DISTINCT strftime('%m', date) as month FROM news WHERE strftime('%Y', date) = ?")
    .all(year)
    .map(row => row.month);
}

export async function getNewsForYear(year) {
  return db
    .prepare("SELECT * FROM news WHERE strftime('%Y', date) = ? ORDER BY date DESC")
    .all(year);
}

export async function getNewsForYearAndMonth(year, month) {
  return db
    .prepare("SELECT * FROM news WHERE strftime('%Y', date) = ? AND strftime('%m', date) = ? ORDER BY date DESC")
    .all(year, month);
}

// ✨ Add news

export async function addNews(news, image) {
  const { slug, title, content, date } = news;
  const insert = db.prepare('INSERT INTO news (slug, title, content, date, image) VALUES (?, ?, ?, ?, ?)');
  const result = insert.run(slug, title, content, date, '');
  const id = result.lastInsertRowid;

  let imageFile = 'news.jpg';
  if (image && image.size > 0) {
    imageFile = `news-${id}.${image.name.split('.').pop()}`;
    const imagePath = path.resolve(process.cwd(), 'public/images/news', imageFile);
    await fs.writeFile(imagePath, Buffer.from(await image.arrayBuffer()));
    db.prepare('UPDATE news SET image = ? WHERE id = ?').run(imageFile, id);
  }

  return { id, slug, title, content, date, image: imageFile };
}

// ✏️ Update news

export async function updateNews(news, file) {
  const { id, slug, title, content, date } = news;

  if (file && file.size > 0) {
    const { image: oldImage } = db.prepare('SELECT image FROM news WHERE id = ?').get(id);
    const oldPath = path.resolve(process.cwd(), 'public/images/news', oldImage);
    await fs.unlink(oldPath).catch(() => { });

    const newImageFile = `news-${id}.${file.name.split('.').pop()}`;
    const newImagePath = path.resolve(process.cwd(), 'public/images/news', newImageFile);
    await fs.writeFile(newImagePath, Buffer.from(await file.arrayBuffer()));

    db.prepare(
      'UPDATE news SET slug = ?, title = ?, content = ?, date = ?, image = ? WHERE id = ?'
    ).run(slug, title, content, date, newImageFile, id);

    return { ...news, image: newImageFile };
  } else {
    db.prepare(
      'UPDATE news SET slug = ?, title = ?, content = ?, date = ? WHERE id = ?'
    ).run(slug, title, content, date, id);

    const { image } = db.prepare('SELECT image FROM news WHERE id = ?').get(id);
    return { ...news, image };
  }
}

// ❌ Delete news

export async function deleteNews(id) {
  const { image } = db.prepare('SELECT image FROM news WHERE id = ?').get(id);
  db.prepare('DELETE FROM news WHERE id = ?').run(id);

  const imagePath = path.resolve(process.cwd(), 'public/images/news', image);
  await fs.unlink(imagePath).catch(() => { });
}