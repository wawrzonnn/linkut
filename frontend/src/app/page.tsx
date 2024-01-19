'use client';
import { useState } from 'react';
import styles from './page.module.css';
import { useRouter } from 'next/navigation';
export default function Home() {
  const router = useRouter(); // Użyj hooka useRouter
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [registrationError, setRegistrationError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:4000/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Registration error:', errorData);
        const errorMessage =
          typeof errorData.message === 'string'
            ? errorData.message
            : 'Registration failed. Please try again.';
        setRegistrationError(errorMessage);
        return;
      }

      const data = await response.json();
      console.log('Zarejestrowano:', data);
      setRegistrationError('');
      setSuccessMessage('Congratulations, you have successfully registered!');
      router.push('/login');
    } catch (error) {
      console.error('Wystąpił błąd:', error);
      setRegistrationError(
        'An error occurred during registration. Please try again.',
      );
    }
  };

  return (
    <main className={styles.main}>
      <h1>Rejestracja</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputGroup}>
          <label htmlFor="email">Adres e-mail</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="password">Hasło</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className={styles.button}>
          Zarejestruj się
        </button>
        {registrationError && <p>{registrationError}</p>}
        {successMessage && <p>{successMessage}</p>}
      </form>
    </main>
  );
}
