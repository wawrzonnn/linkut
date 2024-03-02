'use client';
import React, { useState } from 'react';

const Page = () => {
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setError('');
    try {
      const response = await fetch('http://localhost:4000/links', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ originalUrl }),
        credentials: 'include',
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setShortUrl(data.shortUrl);
    } catch (error) {
      console.error('Wystąpił problem z fetch:', error);
      setError('Wystąpił błąd podczas skracania linku.');
    }
  };

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
            placeholder="Wpisz długi URL"
          />
          <button type="submit">Skróć link</button>
        </form>
        {shortUrl && <div>Twój skrócony link: {shortUrl}</div>}
        {error && <div>{error}</div>}
      </div>
    </>
  );
};

export default Page;
