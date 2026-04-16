import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "../components/Navbar";
import Button from "../components/Button";
import Modal from "../components/Modal";
import TextBox from "../components/TextBox";

import {
  adataim,
  emailModositas,
  telefonModositas,
  fiokTorlese,
  jelszoModositas
} from "../api";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const nav = useNavigate();

  const [emailOpen, setEmailOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [emailHiba, setEmailHiba] = useState("");

  const [telOpen, setTelOpen] = useState(false);
  const [telefon, setTelefon] = useState("");
  const [telHiba, setTelHiba] = useState("");

  const [jelszoOpen, setJelszoOpen] = useState(false);
  const [aktJelszo, setAktJelszo] = useState("");
  const [ujJelszo1, setUjJelszo1] = useState("");
  const [ujJelszo2, setUjJelszo2] = useState("");
  const [jelszoHiba, setJelszoHiba] = useState("");

  const [torlesOpen, setTorlesOpen] = useState(false);
  const [torlesHiba, setTorlesHiba] = useState("");

  useEffect(() => {
    (async () => {
      const data = await adataim();
      if (data.result) {
        setUser(data.user);
      } else {
        nav("/");
      }
    })();
  }, [nav]);

  async function frissitUser() {
    const data = await adataim();
    if (data.result) {
      setUser(data.user);
    }
  }

  return (
    <div className="app-page min-vh-100">
      <Navbar user={user} />

      <div className="container py-4 py-md-5">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-10 col-md-8 col-lg-7 col-xl-6">
            <div className="profile-card glass">
              <div className="profile-card-body">
                <h1 className="page-title text-center mb-2">Profil</h1>
                <p className="page-subtitle text-center mb-4">
                  Itt kezelheted a fiókod adatait és biztonsági beállításait.
                </p>

                <div className="profile-info-box">
                  <div className="profile-info-row">
                    <span className="profile-label">Név:</span>
                    <span className="profile-value">{user?.teljes_nev || "Nincs adat"}</span>
                  </div>

                  <div className="profile-info-row">
                    <span className="profile-label">E-mail:</span>
                    <span className="profile-value">{user?.email || "Nincs adat"}</span>
                  </div>

                  <div className="profile-info-row">
                    <span className="profile-label">Telefonszám:</span>
                    <span className="profile-value">{user?.telefonszam || "Nincs adat"}</span>
                  </div>

                  <div className="profile-info-row">
                    <span className="profile-label">Szerepkör:</span>
                    <span className="profile-value">
                      {Number(user?.szerepkor) === 1 ? "Admin" : "Felhasználó"}
                    </span>
                  </div>
                </div>

                <div className="d-grid gap-3 mt-4">
                  <Button
                    color="dark"
                    content="Email módosítása"
                    onClick={() => setEmailOpen(true)}
                  />

                  <Button
                    color="outline-dark"
                    content="Telefonszám módosítása"
                    onClick={() => setTelOpen(true)}
                  />

                  <Button
                    color="outline-dark"
                    content="Jelszó módosítása"
                    onClick={() => setJelszoOpen(true)}
                  />

                  <Button
                    color="danger"
                    content="Fiók törlése"
                    onClick={() => setTorlesOpen(true)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        open={emailOpen}
        title="Email módosítása"
        onClose={() => {
          setEmailOpen(false);
          setEmail("");
          setEmailHiba("");
        }}
        submitText="Mentés"
        onSubmit={async () => {
          const res = await emailModositas(email);

          if (!res.result) {
            setEmailHiba(res.message);
            return;
          }

          setEmailOpen(false);
          setEmail("");
          setEmailHiba("");
          await frissitUser();
        }}
      >
        {emailHiba && <div className="alert alert-danger">{emailHiba}</div>}

        <TextBox
          title="Új e-mail"
          type="email"
          placeholder="pelda@email.com"
          value={email}
          setValue={setEmail}
        />
      </Modal>

      <Modal
        open={telOpen}
        title="Telefonszám módosítása"
        onClose={() => {
          setTelOpen(false);
          setTelefon("");
          setTelHiba("");
        }}
        submitText="Mentés"
        onSubmit={async () => {
          const res = await telefonModositas(telefon);

          if (!res.result) {
            setTelHiba(res.message);
            return;
          }

          setTelOpen(false);
          setTelefon("");
          setTelHiba("");
          await frissitUser();
        }}
      >
        {telHiba && <div className="alert alert-danger">{telHiba}</div>}

        <TextBox
          title="Új telefonszám"
          type="text"
          placeholder="0612345678"
          value={telefon}
          setValue={setTelefon}
        />
      </Modal>

      <Modal
        open={jelszoOpen}
        title="Jelszó módosítása"
        onClose={() => {
          setJelszoOpen(false);
          setAktJelszo("");
          setUjJelszo1("");
          setUjJelszo2("");
          setJelszoHiba("");
        }}
        submitText="Mentés"
        onSubmit={async () => {
          if (ujJelszo1 !== ujJelszo2) {
            setJelszoHiba("Az új jelszavak nem egyeznek.");
            return;
          }

          const res = await jelszoModositas(aktJelszo, ujJelszo1);

          if (!res.result) {
            setJelszoHiba(res.message);
            return;
          }

          setJelszoOpen(false);
          setAktJelszo("");
          setUjJelszo1("");
          setUjJelszo2("");
          setJelszoHiba("");
        }}
      >
        {jelszoHiba && <div className="alert alert-danger">{jelszoHiba}</div>}

        <div className="mb-3">
          <TextBox
            title="Jelenlegi jelszó"
            type="password"
            placeholder="********"
            value={aktJelszo}
            setValue={setAktJelszo}
          />
        </div>

        <div className="mb-3">
          <TextBox
            title="Új jelszó"
            type="password"
            placeholder="********"
            value={ujJelszo1}
            setValue={setUjJelszo1}
          />
        </div>

        <TextBox
          title="Új jelszó újra"
          type="password"
          placeholder="********"
          value={ujJelszo2}
          setValue={setUjJelszo2}
        />
      </Modal>

      <Modal
        open={torlesOpen}
        title="Fiók törlése"
        color="danger"
        onClose={() => {
          setTorlesOpen(false);
          setTorlesHiba("");
        }}
        submitText="Törlés"
        onSubmit={async () => {
          const res = await fiokTorlese();

          if (!res.result) {
            setTorlesHiba(res.message);
            return;
          }

          nav("/");
          window.location.reload();
        }}
      >
        {torlesHiba && <div className="alert alert-danger">{torlesHiba}</div>}

        <p className="mb-0">
          Biztosan törölni szeretnéd a fiókodat? Ez a művelet nem visszavonható.
        </p>
      </Modal>
    </div>
  );
}