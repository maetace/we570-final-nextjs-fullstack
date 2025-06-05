'use client';

import { useState } from 'react';
import styles from './auth.module.css';

export default function AuthPage() {
    const [isSignup, setIsSignup] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch(
            `/api/auth/${isSignup ? 'signup' : 'signin'}`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            }
        );

        const data = await res.json();
        if (res.ok) {
            setMessage(data.message || 'Success');
            location.href = '/admin';
        } else {
            setMessage(data.error || 'Failed');
        }
    };

    return (
        <div className={styles.container}>
            <h2>{isSignup ? 'Sign Up' : 'Sign In'}</h2>
            <form onSubmit={handleSubmit} className={styles.form}>
                <input type="email" placeholder="Email" value={email}
                    onChange={e => setEmail(e.target.value)} required />
                <input type="password" placeholder="Password" value={password}
                    onChange={e => setPassword(e.target.value)} required />
                <button type="submit">{isSignup ? 'Register' : 'Login'}</button>
            </form>
            <button onClick={() => setIsSignup(!isSignup)} className={styles.toggle}>
                {isSignup ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
            </button>
            {message && <p className={styles.message}>{message}</p>}
        </div>
    );
}