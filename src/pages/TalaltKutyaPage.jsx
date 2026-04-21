import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import KutyaKartya from "../components/KutyaKartya";
import { adataim, talaltKutyakLekerese } from "../api";
import { useNavigate } from "react-router-dom";

export default function TalaltKutyaPage() {
  const [user, setUser] = useState(null);
  const [kutyak, setKutyak] = useState([]);
  const [loading, setLoading] = useState(true);
  const nav = useNavigate();

  useEffect(() => {
    const betoltes = async () => {
      try {
        const u = await adataim();
        if (u.result) setUser(u.user);
        else{
          nav('/')
          alert('jelentkezz be')
        }

        const res = await talaltKutyakLekerese();
        setKutyak(res.result ? (res.kutyak || []) : []);
      } catch (error) {
        console.log("Talált kutyák betöltési hiba:", error);
        setKutyak([]);
      } finally {
        setLoading(false);
      }
    };

    betoltes();
  }, []);

  return (
    <div className="app-page min-vh-100">
      <Navbar user={user} />

      <div className="container dogs-wide-container py-4">
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">
          <div>
            <h2 className="page-title">Talált kutyák</h2>
            <p className="page-subtitle mb-0">
              Itt láthatod az összes bejelentett talált kutyát.
            </p>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-5">
            <h4>Betöltés...</h4>
          </div>
        ) : kutyak.length === 0 ? (
          <div className="alert alert-secondary rounded-4">
            Nincs még talált kutya bejelentés.
          </div>
        ) : (
          <div className="row g-4">
            {kutyak.map((kutya) => (
              <div className="col-12 col-sm-6 col-lg-4 col-xl-3" key={kutya.id}>
                <KutyaKartya kutya={kutya} tipus="talalt" />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
