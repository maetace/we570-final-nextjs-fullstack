'use client';
import { useState, useEffect } from 'react';
import styles from './admin.module.css';
import { redirect } from 'next/navigation';
import { opreateNews } from './handle-form';
import Image from 'next/image';

export default function AdminPage() {
    const [newsList, setNewsList] = useState([]);
    const [form, setForm] = useState({
        id: '',
        slug: '',
        title: '',
        content: '',
        date: '',
        image: null
    });
    const [preview, setPreview] = useState('');

    useEffect(() => {
        fetch('/api/news')
            .then(res => res.json())
            .then(setNewsList);
    }, []);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'image') {
            setForm({ ...form, image: files[0] });
            setPreview(URL.createObjectURL(files[0]));
        } else {
            setForm({ ...form, [name]: value });
        }
    };

    const handleEdit = (item) => {
        setForm(item);
        setPreview(`/images/news/${item.image}`);
    };

    const handleDelete = (id) => {
        fetch(`/api/news/${id}`, { method: 'DELETE', headers: { 'x-admin': true } })
            .then(res => {
                if (res.ok) {
                    redirect('/news')
                }
            })
    };

    return (
        <>

            <h1>
                Manage News{" "}
                <button
                    className={styles.signout}
                    onClick={() => (window.location.href = "/api/auth/signout")}
                >
                    Sign out
                </button>
            </h1>
            <form action={opreateNews} className={styles.form}>
                <input type="hidden" name="id" value={form.id} />
                <input name="slug" placeholder="Slug" value={form.slug}
                    onChange={handleChange} required />
                <input name="title" placeholder="Title" value={form.title}
                    onChange={handleChange} required />
                <textarea name="content" placeholder="Content" value={form.content}
                    onChange={handleChange} required />
                <input name="date" type="date" value={form.date}
                    onChange={handleChange} required />
                <input name="image" type="file" accept="image/*"
                    onChange={handleChange} />
                {preview && (
                    <Image
                        src={preview}
                        alt="preview"
                        className={styles.preview}
                        width={300} // กำหนดขนาดให้เหมาะสม
                        height={300}
                    />
                )}
                <button type="submit">{form.id ? 'Update' : 'Create'} News</button>
            </form>

            <ul className={styles.list}>
                {newsList.map((item) => (
                    <li key={item.id}>
                        <strong>{item.title}</strong> ({item.date})<br />
                        <button onClick={() => handleEdit(item)}>Edit</button>
                        <button onClick={() => handleDelete(item.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </>
    );
}