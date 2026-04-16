import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import TextBox from '../components/TextBox';
import Button from '../components/Button';
import { belepes } from '../api';
import { Link, useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [jelszo, setJelszo] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigate();

  const handleLogin = async () => {
    if (!usernameOrEmail.trim() || !jelszo.trim()) {
      alert('Az email/felhasználónév és a jelszó megadása kötelező.');
      return;
    }

    setLoading(true);
    const res = await belepes(usernameOrEmail, jelszo);
    setLoading(false);

    alert(res.message);

    if (res.result) {
      navigation('/');
      window.location.reload();
    }
  };

  return (
    <div className="app-page auth-page">
      <div className="auth-card glass card border-0 p-4 p-md-5">
        <div className="auth-title text-center">Bejelentkezés</div>
        <p className="auth-subtitle text-center">
          Lépj be, és kezeld az elveszett vagy talált kutyák bejelentéseit.
        </p>

        <div className="mb-3">
          <TextBox
            title="E-mail vagy felhasználónév"
            type="text"
            placeholder="valami@pelda.hu vagy felhasználónév"
            value={usernameOrEmail}
            setValue={setUsernameOrEmail}
          />
        </div>

        <div className="mb-3">
          <TextBox
            title="Jelszó"
            type="password"
            placeholder="******"
            value={jelszo}
            setValue={setJelszo}
          />
        </div>

        <div className="mt-4">
          <Button
            content={loading ? 'Bejelentkezés...' : 'Belépés'}
            onClick={handleLogin}
            disabled={loading}
          />
        </div>

        <div className="text-center mt-4">
          <Link to="/" className="auth-link">
            Vissza a főoldalra
          </Link>
        </div>

        <div className="text-center mt-2">
          <Link to="/registration" className="auth-link">
            Nincs még fiókod? Regisztrálj
          </Link>
        </div>
      </div>
    </div>
  );
}
