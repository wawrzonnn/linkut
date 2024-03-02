'use client';
import styles from './page.module.scss';
import { UserRegistrationForm } from './UserRegistrationForm/UserRegistrationForm';
export default function Registration() {
  return (
    <main className={styles.main}>
      <h1>Rejestracja</h1>
      <UserRegistrationForm />
    </main>
  );
}
