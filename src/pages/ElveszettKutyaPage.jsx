import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import KutyaKartya from '../components/KutyaKartya';
import { adataim, elveszettKutyakLekerese } from '../api';

export default function ElveszettKutyaPage() {
  const [user, setUser] = useState(null);
  const [kutyak, setKutyak] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const u = await adataim();
      if (u.result) setUser(u.user);

      const res = await elveszettKutyakLekerese();
      setKutyak(res.result ? res.kutyak || [] : []);

      setLoading(false);
    })();
  }, []);

  return (
    <div className="app-page">
      <Navbar user={user} />

      <div className="container dogs-wide-container page-shell">
        <div className="list-topbar">
          <div>
            <h2 className="page-title">Elveszett kutyák</h2>
            <p className="page-subtitle mb-0">
              Itt láthatod az összes bejelentett elveszett kutyát.
            </p>
          </div>

          <div className="mini-stat-row">
            <div className="mini-stat">
              <strong>{kutyak.length}</strong>
              <span className="text-muted-soft">bejelentés</span>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="status-box">Betöltés...</div>
        ) : kutyak.length === 0 ? (
          <div className="empty-state-box">Jelenleg nincs megjeleníthető elveszett kutya.</div>
        ) : (
          <div className="row g-4">
            {kutyak.map((kutya) => (
              <div className="col-12 col-sm-6 col-lg-4 col-xl-3" key={kutya.id}>
                <KutyaKartya kutya={kutya} tipus="elveszett" />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
