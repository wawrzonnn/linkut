'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AppRoutes } from '../../utils/routes';
import styles from './page.module.css';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const router = useRouter(); // Użyj hooka useRouter

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:4000/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Błąd logowania:', errorData);
        setLoginError(
          errorData.message || 'Błąd podczas logowania. Spróbuj ponownie.',
        );
        return;
      }
      const data = await response.json();
      localStorage.setItem('jwtToken', data.accessToken);
      router.push(AppRoutes.profile);
    } catch (error) {
      console.error('Wystąpił błąd:', error);
      setLoginError('Problem z serwerem. Spróbuj ponownie później.');
    }
  };

  return (
    <main className={styles.main}>
      <h1>Login</h1>
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
          Zaloguj się
        </button>
        {loginError && <p className={styles.error}>{loginError}</p>}
      </form>
    </main>
  );
};

export default Login;
