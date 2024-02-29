import { useState } from 'react';
import '../styles/AuthPage.scss';

export default function AuthPage(): JSX.Element {
  const [authForm, setAuthForm] = useState<{ login: string; password: string; confirmPassword: string }>({
    login: '',
    password: '',
    confirmPassword: '',
  });

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setAuthForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.MouseEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (authForm.password !== authForm.confirmPassword) {
      // eslint-disable-next-line no-console
      console.log('passwords are not equal');
    }
  };

  return (
    <section className="auth__page">
      <div className="auth__box">
        <div className="auth__header">
          <h6>Реєстрація Користувача</h6>
        </div>
        <form className="auth__form" onSubmit={(e: React.MouseEvent<HTMLFormElement>) => handleSubmit(e)}>
          <input
            type="text"
            name="email"
            placeholder="Введіть логін"
            required
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => changeHandler(e)}
          />
          <input
            type="text"
            name="password"
            placeholder="Введіть пароль"
            required
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => changeHandler(e)}
          />
          <input
            type="text"
            name="confirmPassword"
            placeholder="Повторіть пароль"
            required
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => changeHandler(e)}
          />
          <button type="submit">submit</button>
        </form>
      </div>
    </section>
  );
}
