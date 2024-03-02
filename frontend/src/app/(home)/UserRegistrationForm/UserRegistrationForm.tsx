import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';
import styles from './UserRegistrationForm.module.scss';
import { RegisterUser } from '../../../types/interfaces';
import { registerUser } from '../../../services/authService';
import { AppRoutes } from '../../../utils/routes';

export const UserRegistrationForm = () => {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Niepoprawny adres email')
        .required('Adres email jest wymagany'),
      password: Yup.string()
        .min(8, 'Hasło musi zawierać co najmniej 8 znaków')
        .required('Hasło jest wymagane'),
    }),
    onSubmit: async (values: RegisterUser) => {
      try {
        await registerUser(values);
        router.push(AppRoutes.login);
      } catch (error) {
        console.error('Błąd rejestracji:', error);
        //wyświetl jakieś toasty potem
      }
    },
  });
  // loading i usetransistion na button do pusha rejestracji

  const {
    values,
    errors,
    touched,
    isValid,
    dirty,
    handleSubmit,
    handleChange,
    handleBlur,
  } = formik;

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.inputGroup}>
        <label htmlFor="email">Adres e-mail</label>
        <input
          type="email"
          id="email"
          name="email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {touched.email && errors.email ? <div>{errors.email}</div> : null}
      </div>
      <div className={styles.inputGroup}>
        <label htmlFor="password">Hasło</label>
        <input
          type="password"
          id="password"
          name="password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {touched.password && errors.password ? (
          <div>{errors.password}</div>
        ) : null}
      </div>
      <button
        type="submit"
        className={styles.button}
        disabled={!isValid || !dirty}
      >
        Zarejestruj się
      </button>
      {errors.email && <p>{errors.email}</p>}
      {errors.password && <p>{errors.password}</p>}
    </form>
  );
};
