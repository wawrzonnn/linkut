'use client';
import { createShortLink } from '../../../services/linksService';
import React, { useState } from 'react';

const CreateNewLink = () => {
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');

  const handleShorten = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const result = await createShortLink(longUrl);
      setShortUrl(result.shortUrl);
    } catch (error) {
      console.error('Error shortening the link:', error);
    }
  };

  return (
    <>
      <form onSubmit={handleShorten}>
        <input
          type="text"
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
          placeholder="Enter long URL"
        />
        <button type="submit">Shorten</button>
      </form>
      {shortUrl && <span>Short URL: {shortUrl}</span>}
    </>
  );
};

export default CreateNewLink;
