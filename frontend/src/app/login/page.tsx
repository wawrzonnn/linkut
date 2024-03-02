'use client';
import styles from './page.module.scss';
import { UserLoginForm } from './UserLoginForm/UserLoginForm';
export default function Login() {
  return (
    <main className={styles.main}>
      <h1>Login</h1>
      <UserLoginForm />
    </main>
  );
}
