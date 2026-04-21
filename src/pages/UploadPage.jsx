import { useNavigate, useSearchParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../components/Navbar';
import Button from '../components/Button';
import { useState, useEffect } from 'react';
import { adataim, kutyaLetrehozas, kutyafajtakLekerese } from '../api';

export default function UploadPage() {
  const nav = useNavigate();
  const [searchParams] = useSearchParams();

  const [user, setUser] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [file, setFile] = useState(null);
  const [nev, setNev] = useState('');
  const [kutyafajtaId, setKutyafajtaId] = useState('');
  const [nem, setNem] = useState('');
  const [leiras, setLeiras] = useState('');
  const [tipus, setTipus] = useState(searchParams.get('tipus') || 'elveszett');
  const [szin, setSzin] = useState('');
  const [hely, setHely] = useState('');
  const [ido, setIdo] = useState('');
  const [fajtak, setFajtak] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      const userData = await adataim();

      if (userData.result) {
        setUser(userData.user);
      } else {
        nav('/');
        alert('jelentkezz be')
        return;
      }

      const fajtaData = await kutyafajtakLekerese();
      if (fajtaData.result) {
        setFajtak(fajtaData.fajtak || []);
      }
    })();
  }, [nav]);

  const saveToPreview = (e) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    setImagePreview(URL.createObjectURL(selectedFile));
  };

  const uploadData = async () => {
    if (!nev.trim()) return alert('Add meg a kutya nevét.');
    if (!kutyafajtaId) return alert('Válassz kutyafajtát.');
    if (nem === '') return alert('Válaszd ki a kutya nemét.');
    if (!szin.trim()) return alert('Add meg a kutya színét.');
    if (!hely.trim()) return alert('Add meg a helyet.');
    if (!ido) return alert('Add meg az időpontot.');
    if (!file) return alert('Nincs kiválasztva kép.');

    setLoading(true);

    const data = await kutyaLetrehozas(
      nev,
      kutyafajtaId,
      nem,
      leiras,
      file,
      tipus,
      szin,
      hely,
      ido
    );

    setLoading(false);
    alert(data.message);

    if (data.result) {
      nav(tipus === 'talalt' ? '/talalt' : '/elveszett');
    }
  };

  return (
    <div className="app-page">
      <Navbar user={user} />

      <div className="container page-shell">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-10 col-xl-9">
            <div className="card upload-card glass border-0 shadow-sm">
              <div className="card-body p-4 p-lg-5">
                <div className="page-header mb-4">
                  <div>
                    <h2 className="page-title mb-2">
                      {tipus === 'talalt' ? 'Talált kutya bejelentése' : 'Elveszett kutya bejelentése'}
                    </h2>
                    <p className="page-subtitle mb-0">
                      Töltsd ki az adatokat, adj hozzá képet, és mentsd el a bejelentést.
                    </p>
                  </div>
                </div>

                <div className="row g-4 align-items-start">
                  <div className="col-12 col-lg-4">
                    <div className="d-flex justify-content-center">
                      <div className="upload-preview">
                        {imagePreview ? (
                          <img src={imagePreview} alt="Előnézet" className="w-100 h-100" style={{ objectFit: 'cover' }} />
                        ) : (
                          <div className="text-center text-muted-soft px-3">Kép előnézet</div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="col-12 col-lg-8">
                    <div className="row g-3">
                      <div className="col-12 col-md-6">
                        <label className="form-label">Típus</label>
                        <select className="form-select" value={tipus} onChange={(e) => setTipus(e.target.value)}>
                          <option value="elveszett">Elveszett</option>
                          <option value="talalt">Talált</option>
                        </select>
                      </div>

                      <div className="col-12 col-md-6">
                        <label htmlFor="kep" className="form-label">Kép feltöltése</label>
                        <input id="kep" type="file" accept="image/*" className="form-control" onChange={saveToPreview} />
                      </div>

                      <div className="col-12 col-md-6">
                        <label htmlFor="nev" className="form-label">Kutya neve</label>
                        <input id="nev" type="text" className="form-control" value={nev} onChange={(e) => setNev(e.target.value)} placeholder="Pl.: Bodri" />
                      </div>

                      <div className="col-12 col-md-6">
                        <label htmlFor="fajta" className="form-label">Kutyafajta</label>
                        <select id="fajta" className="form-select" value={kutyafajtaId} onChange={(e) => setKutyafajtaId(e.target.value)}>
                          <option value="">Válassz fajtát</option>
                          {fajtak.map((fajta) => (
                            <option key={fajta.id} value={fajta.id}>
                              {fajta.megnevezes}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="col-12 col-md-4">
                        <label htmlFor="nem" className="form-label">Nem</label>
                        <select id="nem" className="form-select" value={nem} onChange={(e) => setNem(e.target.value)}>
                          <option value="">Válassz nemet</option>
                          <option value="0">Kan</option>
                          <option value="1">Szuka</option>
                        </select>
                      </div>

                      <div className="col-12 col-md-4">
                        <label htmlFor="szin" className="form-label">Szín</label>
                        <input id="szin" type="text" className="form-control" value={szin} onChange={(e) => setSzin(e.target.value)} placeholder="Pl.: barna-fehér" />
                      </div>

                      <div className="col-12 col-md-4">
                        <label htmlFor="ido" className="form-label">
                          {tipus === 'talalt' ? 'Megtalálás ideje' : 'Eltűnés ideje'}
                        </label>
                        <input id="ido" type="datetime-local" className="form-control" value={ido} onChange={(e) => setIdo(e.target.value)} />
                      </div>

                      <div className="col-12">
                        <label htmlFor="hely" className="form-label">
                          {tipus === 'talalt' ? 'Megtalálás helye' : 'Eltűnés helye'}
                        </label>
                        <input id="hely" type="text" className="form-control" value={hely} onChange={(e) => setHely(e.target.value)} placeholder="Pl.: Szeged, Kálvária tér" />
                      </div>

                      <div className="col-12">
                        <label htmlFor="leiras" className="form-label">Leírás</label>
                        <textarea
                          id="leiras"
                          className="form-control"
                          value={leiras}
                          onChange={(e) => setLeiras(e.target.value)}
                          placeholder="Írj pár fontos információt a kutyáról..."
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="d-flex flex-column flex-sm-row gap-3 mt-4">
                  <div className="w-100">
                    <Button content="Vissza" color="outline-dark" onClick={() => nav(-1)} />
                  </div>
                  <div className="w-100">
                    <Button
                      content={loading ? 'Mentés...' : 'Bejelentés mentése'}
                      color="secondary"
                      onClick={uploadData}
                      disabled={loading}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
