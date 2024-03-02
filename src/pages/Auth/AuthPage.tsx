import { useState } from 'react';
import './AuthPage.scss';
import { useNavigate } from 'react-router';
import PassWordStrengthChecker from './PasswordStrengthChecker';
import instance from '../../api/requests';
import { AuthResponse, SignUpResponse } from '../../models/models';

export default function AuthPage(): JSX.Element {
  const [authForm, setAuthForm] = useState<{ login: string; password: string; confirmPassword: string }>({
    login: '',
    password: '',
    confirmPassword: '',
  });
  const [formError, setFormError] = useState<{
    loginError: string;
    confirmPasswordError: string;
  }>({
    loginError: '',
    confirmPasswordError: '',
  });
  const [signInClicked, setSignInClicked] = useState(false);
  const navigate = useNavigate();

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setAuthForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const login = async (): Promise<void> => {
    const response: AuthResponse = await instance.post('/login', {
      email: authForm.login,
      password: authForm.password,
    });
    localStorage.setItem('token', response.token);
    localStorage.setItem('refreshToken', response.refreshToken);
    instance.defaults.headers.Authorization = `Bearer ${response.token}`;
    navigate('/home');
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLFormElement>, action: string): Promise<void> => {
    e.preventDefault();
    if (action === 'sign-up') {
      const emailRegx =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      if (authForm.password !== authForm.confirmPassword) {
        setFormError((prev) => ({
          ...prev,
          confirmPasswordError: 'Паролі не співпадають',
        }));
        return;
      }
      if (!authForm.login.match(emailRegx)) {
        setFormError((prev) => ({
          ...prev,
          loginError: 'Такої пошти не існує',
        }));
        return;
      }

      const signUpResponse: SignUpResponse = await instance.post('/user', {
        email: authForm.login,
        password: authForm.password,
      });
      if (signUpResponse.result === 'Created') {
        await login();
      }
    } else if (action === 'sign-in') {
      await login();
    }
  };

  return (
    <section className="auth__page">
      <div className="auth__box">
        {!signInClicked ? (
          <>
            <div className="auth__header">
              <h6>Вхід</h6>
            </div>
            <form
              className="auth__form"
              onSubmit={(e: React.MouseEvent<HTMLFormElement>) => handleSubmit(e, 'sign-in')}
            >
              <label className="auth__label">
                Логін
                <input
                  type="text"
                  name="login"
                  placeholder="Введіть електронну пошту"
                  className="auth__input"
                  required
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => changeHandler(e)}
                />
              </label>
              <label className="auth__label">
                Пароль
                <input
                  type="password"
                  name="password"
                  placeholder="Введіть пароль"
                  className="auth__input"
                  maxLength={16}
                  required
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => changeHandler(e)}
                />
              </label>
              <p className="auth__error">{formError.loginError}</p>
              <div
                className="to__sign__in"
                onClick={() => {
                  setSignInClicked(!signInClicked);
                  setAuthForm({ login: '', password: '', confirmPassword: '' });
                }}
              >
                <p>Немає акаунта? Зареєструватись</p>
              </div>
              <button className="add auth" type="submit">
                Увійти
              </button>
            </form>
          </>
        ) : (
          <>
            <div className="auth__header">
              <h6>Реєстрація нового користувача</h6>
            </div>
            <form
              className="auth__form"
              onSubmit={(e: React.MouseEvent<HTMLFormElement>) => handleSubmit(e, 'sign-up')}
            >
              <label className="auth__label">
                Логін
                <input
                  type="text"
                  name="login"
                  placeholder="Введіть електронну пошту"
                  className="auth__input"
                  required
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => changeHandler(e)}
                />
                <p className="auth__error">{formError.loginError}</p>
              </label>
              <label className="auth__label">
                Пароль
                <input
                  type="password"
                  name="password"
                  placeholder="Введіть пароль"
                  className="auth__input"
                  maxLength={16}
                  required
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => changeHandler(e)}
                />
                <PassWordStrengthChecker password={authForm.password} />
              </label>
              <label className="auth__label">
                Підтвердження пароля
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Повторіть пароль"
                  maxLength={16}
                  className="auth__input"
                  required
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => changeHandler(e)}
                />
                <p className="auth__error">{formError.confirmPasswordError}</p>
              </label>
              <div
                className="to__sign__in"
                onClick={() => {
                  setSignInClicked(!signInClicked);
                  setAuthForm({ login: '', password: '', confirmPassword: '' });
                }}
              >
                <p>Уже є акаунт? Увійти</p>
              </div>
              <button className="add auth" type="submit">
                Зареєструватись
              </button>
            </form>
          </>
        )}
      </div>
    </section>
  );
}
