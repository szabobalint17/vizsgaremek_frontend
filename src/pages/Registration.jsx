import 'bootstrap/dist/css/bootstrap.min.css';
import TextBox from '../components/TextBox';
import Button from '../components/Button';
import { adataim, regisztracio } from '../api';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function RegistrationPage() {
  const navigation = useNavigate();

  const [email, setEmail] = useState('');
  const [teljesNev, setTeljesNev] = useState('');
  const [jelszo, setJelszo] = useState('');
  const [jelszo2, setJelszo2] = useState('');
  const [telefonszam, setTelefonszam] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!email || !teljesNev || !jelszo || !jelszo2 || !telefonszam) {
      alert('Minden mező kitöltése kötelező.');
      return;
    }

    if (jelszo !== jelszo2) {
      alert('A két jelszó nem egyezik.');
      return;
    }

    setLoading(true);
    const res = await regisztracio(email, teljesNev, jelszo, telefonszam);
    setLoading(false);

    alert(res.message);
    if (res.result) {
      navigation('/login');
    }
  };

  useEffect(() => {
    (async () => {
      const data = await adataim();
      if (data.result) {
        navigation("/");
      } 
    })();
  }, []);

  return (
    <div className="app-page auth-page">
      <div className="auth-card glass card border-0 p-4 p-md-5">
        <div className="auth-title text-center">Regisztráció</div>
        <p className="auth-subtitle text-center">
          Hozz létre fiókot, és tölts fel elveszett vagy talált kutyákat.
        </p>

        <div className="row g-3">
          <div className="col-12">
            <TextBox title="E-mail" type="email" placeholder="pelda@email.com" value={email} setValue={setEmail} />
          </div>
          <div className="col-12">
            <TextBox title="Teljes név" type="text" placeholder="Példa Péter" value={teljesNev} setValue={setTeljesNev} />
          </div>
          <div className="col-12">
            <TextBox title="Telefonszám" type="tel" placeholder="0612345678" value={telefonszam} setValue={setTelefonszam} />
          </div>
          <div className="col-12 col-md-6">
            <TextBox title="Jelszó" type="password" placeholder="******" value={jelszo} setValue={setJelszo} />
          </div>
          <div className="col-12 col-md-6">
            <TextBox
              title="Jelszó megerősítése"
              type="password"
              placeholder="******"
              value={jelszo2}
              setValue={setJelszo2}
            />
          </div>
        </div>

        <div className="mt-4">
          <Button
            content={loading ? 'Regisztráció...' : 'Regisztráció'}
            onClick={handleRegister}
            disabled={loading}
          />
        </div>

        <div className="text-center mt-4">
          <Link to="/login" className="auth-link">
            Már van fiókod? Lépj be
          </Link>
        </div>
      </div>
    </div>
  );
}
