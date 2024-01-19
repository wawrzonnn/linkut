'use client';
import React, { useEffect, useState } from 'react';
interface LinkStat {
  clickedAt: string;
  referrer: string;
}
const Page = () => {
  const BASE_URL = 'http://localhost:4000/links/';
  const [userEmail, setUserEmail] = useState('');
  const [userId, setUserId] = useState('');

  const [originalUrl, setOriginalUrl] = useState('');
  const [shortenedUrl, setShortenedUrl] = useState('');
  const [linkId, setLinkId] = useState('');
  const [linkStats, setLinkStats] = useState<LinkStat[]>([]);
  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('jwtToken');
      if (token) {
        try {
          const response = await fetch('http://localhost:4000/users/me', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (!response.ok) {
            throw new Error('Nie udało się pobrać danych użytkownika');
          }

          const userData = await response.json();
          console.log(userData.id, 'id kurwa');
          console.log(userData, 'wszystko  kurwa');
          setUserEmail(userData.email);
          setUserId(userData.id);
        } catch (error) {
          console.error('Błąd:', error);
        }
      }
    };

    fetchUserData();
  }, []);
  console.log(userEmail, 'email usera');

  const shortenLink = async () => {
    const token = localStorage.getItem('jwtToken');
    if (token && originalUrl) {
      try {
        const response = await fetch('http://localhost:4000/links', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ originalUrl }),
        });

        if (!response.ok) {
          throw new Error('Błąd przy skracaniu linku');
        }

        const result = await response.json();
        const fullShortenedUrl = `${BASE_URL}${result.shortUrl}`;
        setShortenedUrl(fullShortenedUrl);
        setLinkId(result.id);
      } catch (error) {
        console.error('Błąd:', error);
      }
    }
  };

  const fetchLinkStats = async () => {
    if (!linkId) return;

    const token = localStorage.getItem('jwtToken');
    if (token) {
      try {
        const response = await fetch(
          `http://localhost:4000/links/stats/${linkId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (!response.ok) {
          throw new Error('Błąd przy pobieraniu statystyk linku');
        }

        const stats = await response.json();
        console.log(stats);
        setLinkStats(stats);
      } catch (error) {
        console.error('Błąd:', error);
      }
    }
  };


  return (
    <div>
      <h1>Email użytkownika: {userEmail || 'Brak zalogowanego użytkownika'}</h1>
      <h1>id użytkownika: {userId || 'Brak zalogowanego użytkownika'}</h1>
      <h2>Moje linki:</h2>
      <input
        type="text"
        value={originalUrl}
        onChange={(e) => setOriginalUrl(e.target.value)}
        placeholder="Wpisz URL do skrócenia"
      />
      <button onClick={shortenLink}>Skróć Link</button>

      {shortenedUrl && (
        <p>
          Skrócony link:{' '}
          <a href={shortenedUrl} target="_blank" rel="noopener noreferrer">
            {shortenedUrl}
          </a>
        </p>
      )}
      <span>ajdi {linkId}</span>

      <div>
        <h3>Statystyki linku:</h3>
        {linkStats.map((stat, index) => (
          <div key={index}>
            <p>Clicked At: {stat.clickedAt}</p>
            <p>Referrer: {stat.referrer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
