import { useEffect, useState } from 'react';
import './PasswordStrengthChecker.scss';

export default function PassWordStrengthChecker({ password }: { password: string }): JSX.Element {
  const [passwordError, setPasswordError] = useState('');

  const [barColor, setBarColor] = useState<{ bad: string; weak: string; norm: string; good: string }>({
    bad: 'gray',
    weak: 'gray',
    norm: 'gray',
    good: 'gray',
  });

  const displayError = (criteria: string): void => {
    setPasswordError('');

    switch (criteria) {
      case 'length':
        if (password.length < 8) {
          setPasswordError('В паролі має бути мінімум 8 символів');
        }
        break;
      case 'numbers':
        if (!password.match(/\d/)) {
          setPasswordError('В паролі має бути хоча б одна цифра');
        }
        break;
      case 'letters':
        if (!password.match(/[A-Z]/)) {
          setPasswordError('В паролі мають бути великі і малі літери');
        }
        break;
      case 'repetitive':
        if (password.match(/(.)\1{2,}/)) {
          setPasswordError('Символи в паролі не мають часто повторюватись');
        }
        break;
      case 'symbols':
        if (!password.match(/[!@#$%^&*()]/)) {
          setPasswordError('В паролі мають бути спецсимволи типу: !@#%');
        }
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    const strengthChecker = (): void => {
      if (password.length < 8) {
        setBarColor((prev) => ({
          ...prev,
          weak: 'gray',
          norm: 'gray',
          good: 'gray',
        }));
        setBarColor((prev) => ({
          ...prev,
          bad: '#d2122e',
        }));
        displayError('length');
      } else if (password.length >= 8) {
        setBarColor((prev) => ({
          ...prev,
          weak: 'gray',
          norm: 'gray',
          good: 'gray',
        }));
        displayError('numbers');
        if (password.match(/\d/)) {
          setBarColor((prev) => ({
            ...prev,
            weak: '#FF8C00',
          }));
          displayError('letters');
          if (password.match(/[A-Z]/)) {
            setBarColor((prev) => ({
              ...prev,
              norm: '#FFD700',
            }));
            displayError('repetitive');
            if (!password.match(/(.)\1{2,}/g)) {
              displayError('symbols');
              if (password.match(/[!@#$%^&*()]/)) {
                setBarColor((prev) => ({
                  ...prev,
                  good: '#32CD32',
                }));
              }
            }
          }
        }
      }
    };

    strengthChecker();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [password]);

  return (
    <div className="checker__box">
      <div className="strong__checker">
        <div className="strong__bar" style={{ backgroundColor: barColor.bad }} />
        <div className="strong__bar" style={{ backgroundColor: barColor.weak }} />
        <div className="strong__bar" style={{ backgroundColor: barColor.norm }} />
        <div className="strong__bar" style={{ backgroundColor: barColor.good }} />
      </div>
      <p className="auth__error">{passwordError}</p>
    </div>
  );
}
