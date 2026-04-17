import { useEffect, useMemo, useState } from "react";
import Navbar from "../components/Navbar";
import KutyaKartya from "../components/KutyaKartya";
import {
  adataim,
  elveszettKutyakLekerese,
  talaltKutyakLekerese
} from "../api";

export default function AllDogsPage() {
  const [user, setUser] = useState(null);
  const [elveszettKutyak, setElveszettKutyak] = useState([]);
  const [talaltKutyak, setTalaltKutyak] = useState([]);
  const [loading, setLoading] = useState(true);
  const [szuro, setSzuro] = useState("mind");

  useEffect(() => {
    const betoltes = async () => {
      try {
        const userRes = await adataim();
        if (userRes.result) setUser(userRes.user);

        const [elveszettRes, talaltRes] = await Promise.all([
          elveszettKutyakLekerese(),
          talaltKutyakLekerese()
        ]);

        setElveszettKutyak(elveszettRes.result ? (elveszettRes.kutyak || []) : []);
        setTalaltKutyak(talaltRes.result ? (talaltRes.kutyak || []) : []);
        console.log('kutyak', elveszettKutyak);
      } catch (error) {
        console.log("Minden kutya betöltési hiba:", error);
        setElveszettKutyak([]);
        setTalaltKutyak([]);
      } finally {
        setLoading(false);
      }
    };

    betoltes();
  }, []);

  const listazottKutyak = useMemo(() => {
    if (szuro === "elveszett") {
      return elveszettKutyak.map((kutya) => ({
        ...kutya,
        _tipus: "elveszett"
      }));
    }

    if (szuro === "talalt") {
      return talaltKutyak.map((kutya) => ({
        ...kutya,
        _tipus: "talalt"
      }));
    }

    return [
      ...elveszettKutyak.map((kutya) => ({
        ...kutya,
        _tipus: "elveszett"
      })),
      ...talaltKutyak.map((kutya) => ({
        ...kutya,
        _tipus: "talalt"
      }))
    ];
  }, [szuro, elveszettKutyak, talaltKutyak]);

  return (
    <div className="app-page">
      <Navbar user={user} />

      <div className="container dogs-wide-container page-shell">
        <div className="list-topbar">
          <div>
            <h2 className="page-title">Minden kutya</h2>
            <p className="page-subtitle mb-0">
              Egy helyen láthatod az elveszett és a talált kutyákat is.
            </p>
          </div>

          <div className="mini-stat-row">
            <div className="mini-stat">
              <strong>{elveszettKutyak.length}</strong>
              <span className="text-muted-soft">elveszett</span>
            </div>

            <div className="mini-stat">
              <strong>{talaltKutyak.length}</strong>
              <span className="text-muted-soft">talált</span>
            </div>
          </div>
        </div>

        <div className="d-flex flex-wrap gap-2 mb-4">
          <button
            className={`filter-chip ${szuro === "mind" ? "active" : ""}`}
            onClick={() => setSzuro("mind")}
          >
            Mind
          </button>

          <button
            className={`filter-chip ${szuro === "elveszett" ? "active" : ""}`}
            onClick={() => setSzuro("elveszett")}
          >
            Elveszett
          </button>

          <button
            className={`filter-chip ${szuro === "talalt" ? "active" : ""}`}
            onClick={() => setSzuro("talalt")}
          >
            Talált
          </button>
        </div>

        {loading ? (
          <div className="status-box">Betöltés...</div>
        ) : listazottKutyak.length === 0 ? (
          <div className="empty-state-box">Nincs megjeleníthető kutya.</div>
        ) : (
          <div className="row g-4">
            {listazottKutyak.map((kutya) => (
              <div
                className="col-12 col-sm-6 col-lg-4 col-xl-3"
                key={`${kutya._tipus}-${kutya.id}`}
              >
                <KutyaKartya kutya={kutya} tipus={kutya._tipus} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}