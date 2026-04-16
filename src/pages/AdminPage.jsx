import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Button from '../components/Button';
import Modal from '../components/Modal';
import {
  adataim,
  felhasznalokLekerese,
  szerepkorModositasADMIN,
  felhasznaloTorleseADMIN
} from '../api';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function AdminPage() {
  const [user, setUser] = useState(null);
  const [felhasznalok, setFelhasznalok] = useState([]);
  const [loading, setLoading] = useState(true);
  const [torlesOpen, setTorlesOpen] = useState(false);
  const [torlesHiba, setTorlesHiba] = useState('');
  const [torlendoFelhasznalo, setTorlendoFelhasznalo] = useState(null);

  const nav = useNavigate();

  const felhasznalokBetoltese = async () => {
    const data = await felhasznalokLekerese();
    if (data.result) {
      setFelhasznalok(data.felhasznalok || []);
    } else {
      alert(data.message);
      setFelhasznalok([]);
    }
  };

  useEffect(() => {
    const init = async () => {
      try {
        const userData = await adataim();

        if (!userData.result) {
          nav('/');
          return;
        }

        setUser(userData.user);

        if (Number(userData.user.szerepkor) !== 1) {
          nav('/');
          return;
        }

        await felhasznalokBetoltese();
      } catch (error) {
        console.log('Admin oldal betöltési hiba:', error);
        nav('/');
      } finally {
        setLoading(false);
      }
    };

    init();
  }, [nav]);

  const handleSzerepkorValtas = async (felhasznaloId, ujSzerepkor) => {
    const data = await szerepkorModositasADMIN(felhasznaloId, ujSzerepkor);
    if (data.result) {
      await felhasznalokBetoltese();
    } else {
      alert(data.message);
    }
  };

  const handleTorles = async () => {
    if (!torlendoFelhasznalo) return;

    const data = await felhasznaloTorleseADMIN(torlendoFelhasznalo.id);
    if (data.result) {
      setTorlesHiba('');
      setTorlesOpen(false);
      setTorlendoFelhasznalo(null);
      await felhasznalokBetoltese();
    } else {
      setTorlesHiba(data.message);
    }
  };

  if (loading) {
    return (
      <div className="app-page">
        <Navbar user={user} />
        <div className="container page-shell">
          <div className="status-box">Betöltés...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="app-page">
      <Navbar user={user} />

      <div className="container page-shell">
        <div className="page-header">
          <div>
            <h2 className="page-title">Admin panel</h2>
            <p className="page-subtitle mb-0">
              Itt kezelheted a felhasználókat és a szerepköröket.
            </p>
          </div>

          <div className="mini-stat-row">
            <div className="mini-stat">
              <strong>{felhasznalok.length}</strong>
              <span className="text-muted-soft">felhasználó</span>
            </div>
          </div>
        </div>

        {felhasznalok.length === 0 ? (
          <div className="empty-state-box">Nincs megjeleníthető felhasználó.</div>
        ) : (
          <div className="card table-card glass border-0 overflow-hidden">
            <div className="table-responsive">
              <table className="table align-middle mb-0">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Email</th>
                    <th>Teljes név</th>
                    <th>Telefonszám</th>
                    <th>Szerepkör</th>
                    <th>Művelet</th>
                  </tr>
                </thead>
                <tbody>
                  {felhasznalok.map((felhasznalo) => (
                    <tr key={felhasznalo.id}>
                      <td>{felhasznalo.id}</td>
                      <td>{felhasznalo.email}</td>
                      <td>{felhasznalo.teljes_nev || 'Nincs adat'}</td>
                      <td>{felhasznalo.telefonszam || 'Nincs adat'}</td>
                      <td style={{ minWidth: '190px' }}>
                        <select
                          className="form-select"
                          value={String(felhasznalo.szerepkor)}
                          onChange={(e) => handleSzerepkorValtas(felhasznalo.id, e.target.value)}
                        >
                          <option value="1">Admin</option>
                          <option value="0">Felhasználó</option>
                        </select>
                      </td>
                      <td style={{ minWidth: '170px' }}>
                        <Button
                          color="danger"
                          content="Törlés"
                          onClick={() => {
                            setTorlendoFelhasznalo(felhasznalo);
                            setTorlesHiba('');
                            setTorlesOpen(true);
                          }}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      <Modal
        open={torlesOpen}
        title="Felhasználó törlése"
        color="danger"
        onClose={() => {
          setTorlesOpen(false);
          setTorlesHiba('');
          setTorlendoFelhasznalo(null);
        }}
        submitText="Törlés"
        onSubmit={handleTorles}
      >
        {torlesHiba && <div className="alert alert-danger">{torlesHiba}</div>}

        <p className="mb-2">Biztosan törölni szeretnéd ezt a felhasználót?</p>

        <div className="small text-muted-soft">
          <div><strong>ID:</strong> {torlendoFelhasznalo?.id}</div>
          <div><strong>Email:</strong> {torlendoFelhasznalo?.email}</div>
          <div><strong>Név:</strong> {torlendoFelhasznalo?.teljes_nev || 'Nincs adat'}</div>
        </div>

        <p className="mt-3 mb-0 text-danger">A művelet nem vonható vissza.</p>
      </Modal>
    </div>
  );
}
