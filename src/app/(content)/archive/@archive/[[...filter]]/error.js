'use client';

export default function ArchiveFilterError({ error }) {
    return (
        <div id="error">
            <h2>An error occurred!</h2>
            <p>{error.message || 'Invalid filter value!'}</p>
        </div>
    );
}