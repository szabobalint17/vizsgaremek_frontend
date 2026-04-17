import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Button from "../components/Button";
import Modal from "../components/Modal";
import { useNavigate } from "react-router-dom";
import { adataim, sajatKutyakLekerese, kutyaTorlese, BASE } from "../api";

export default function ImagesPage() {
    const [user, setUser] = useState(null);
    const [adatok, setAdatok] = useState([]);
    const [betoltes, setBetoltes] = useState(true);

    const [torlesOpen, setTorlesOpen] = useState(false);
    const [torlesHiba, setTorlesHiba] = useState("");
    const [torlendoKutyaId, setTorlendoKutyaId] = useState(null);

    const nav = useNavigate();

    async function kutyakBetoltese() {
        const data = await sajatKutyakLekerese();
        if (data.result) {
            setAdatok(data.kutyak);
        } else {
            setAdatok([]);
        }
    }

    useEffect(() => {
        (async () => {
            const userData = await adataim();

            if (userData.result) {
                setUser(userData.user);
                await kutyakBetoltese();
            } else {
                nav("/");
                return;
            }

            setBetoltes(false);
        })();
    }, [nav]);

    const getNemSzoveg = (nem) => {
        if (String(nem) === "0") return "Kan";
        if (String(nem) === "1") return "Szuka";
        return "Ismeretlen";
    };

    const handleTorles = async () => {
        if (!torlendoKutyaId) return;

        const data = await kutyaTorlese(torlendoKutyaId);

        if (data.result) {
            setTorlesHiba("");
            setTorlesOpen(false);
            setTorlendoKutyaId(null);
            await kutyakBetoltese();
        } else {
            setTorlesHiba(data.message);
        }
    };

    if (betoltes) {
        return (
            <div className="min-vh-100">
                <Navbar user={user} />
                <div className="container py-5 text-center">
                    <h4>Betöltés...</h4>
                </div>
            </div>
        );
    }

    return (
        <div className="app-page min-vh-100">
            <Navbar user={user} />

            <div className="container dogs-wide-container py-4">
                <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
                    <div>
                        <h2 className="page-title">Saját kutyáim</h2>
                        <p className="page-subtitle">
                            Itt látod a saját feltöltött kutyáidat.
                        </p>
                    </div>

                    <div style={{ minWidth: "260px" }}>
                        <Button
                            content={"Új kutya feltöltése"}
                            onClick={() => nav("/upload")}
                            color={"light"}
                        />
                    </div>
                </div>
                {adatok.length === 0 ? (
                    <div className="empty-state-box">
                        Még nem töltöttél fel egy kutyát sem.
                    </div>
                ) : (
                    <div className="row g-4">
                        {adatok.map((adat) => (
                            <div
                                className="col-12 col-sm-6 col-lg-4 col-xl-3"
                                key={adat.id}
                            >
                                <div className="card h-100 shadow-sm border-0 rounded-4 overflow-hidden">
                                    <div
                                        className="bg-white d-flex align-items-center justify-content-center"
                                        style={{ height: "240px" }}
                                    >
                                        {adat.kep ? (
                                            <img
                                                src={`${BASE}/uploads/${adat.kep}`}
                                                alt={adat.nev}
                                                className="w-100 h-100"
                                                style={{ objectFit: "cover" }}
                                            />
                                        ) : (
                                            <div className="text-secondary">
                                                Nincs feltöltött kép
                                            </div>
                                        )}
                                    </div>

                                    <div className="card-body d-flex flex-column">
                                        <h5 className="card-title fw-bold mb-2">
                                            {adat.nev}
                                        </h5>

                                        <p className="mb-1">
                                            <strong>Fajta:</strong>{" "}
                                            {adat.kutyafajta_megnevezes || "Ismeretlen"}
                                        </p>

                                        <p className="mb-1">
                                            <strong>Nem:</strong> {getNemSzoveg(adat.nem)}
                                        </p>

                                        <p className="mb-1">
                                            <strong>Feltöltve:</strong>{" "}
                                            {adat.letrehozva
                                                ? new Date(adat.letrehozva).toLocaleString("hu-HU")
                                                : "Nincs adat"}
                                        </p>

                                        <p className="mb-3">
                                            <strong>Leírás:</strong>{" "}
                                            {adat.leiras ? adat.leiras : "Nincs leírás"}
                                        </p>

                                        <div className="mt-auto">
                                            <Button
                                                content={"Törlés"}
                                                color={"dark"}
                                                onClick={() => {
                                                    setTorlendoKutyaId(adat.id);
                                                    setTorlesHiba("");
                                                    setTorlesOpen(true);
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                <Modal
                    open={torlesOpen}
                    title={"Kutya törlése"}
                    color={"danger"}
                    onClose={() => {
                        setTorlesOpen(false);
                        setTorlesHiba("");
                        setTorlendoKutyaId(null);
                    }}
                    submitText={"Törlés"}
                    onSubmit={handleTorles}
                >
                    {torlesHiba && (
                        <div className="alert alert-danger" role="alert">
                            {torlesHiba}
                        </div>
                    )}
                    Biztosan törölni szeretnéd ezt a kutyát? A művelet nem vonható vissza.
                </Modal>
            </div>
        </div>
    );
}