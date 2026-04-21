import { BASE } from "../api";

function getNemSzoveg(nem) {
    if (String(nem) === "0") return "Kan";
    if (String(nem) === "1") return "Szuka";
    if (nem === "kan") return "Kan";
    if (nem === "szuka") return "Szuka";
    return nem || "Nincs adat";
}

function formatIdo(ido) {
    if (!ido) return "Nincs adat";

    const datum = new Date(ido);
    if (isNaN(datum.getTime())) return ido;

    return datum.toLocaleString("hu-HU");
}

export default function KutyaKartya({ kutya, tipus = "elveszett" }) {
    const nev = kutya.nev || "Nincs adat";
    const fajta =
        kutya.kutyafajta_megnevezes ||
        kutya.fajta ||
        kutya.kutyafajta ||
        "Nincs adat";

    const szin = kutya.szin || kutya.szine || "Nincs adat";
    const nem = getNemSzoveg(kutya.nem);

    const hely =
        tipus === "talalt"
            ? kutya.megtalalas_helye || kutya.hely || "Nincs adat"
            : kutya.eltunes_helye || kutya.hely || "Nincs adat";

    const ido =
        tipus === "talalt"
            ? kutya.megtalalas_ideje || kutya.ido || kutya.letrehozva
            : kutya.eltunes_ideje || kutya.ido || kutya.letrehozva;

    const kepSrc = kutya.kep
        ? `${BASE}/uploads/${kutya.kep}`
        : "https://via.placeholder.com/800x500?text=Nincs+kep";

    const statusText = tipus === "talalt" ? "Talált" : "Elveszett";
    const statusClass =
        tipus === "talalt"
            ? "dog-status dog-status-found"
            : "dog-status dog-status-lost";

    return (
        <div className="dog-card glass h-100">
            <div className="dog-card-image-wrap">
                <img
                    src={kepSrc}
                    alt={nev}
                    className="dog-card-image"
                />
                <span className={statusClass}>{statusText}</span>
            </div>

            <div className="dog-card-body">
                <div className="dog-card-top">
                    <h3 className="dog-card-name">{nev}</h3>
                    <p className="dog-card-breed">{fajta}</p>
                </div>

                <div className="dog-card-grid">
                    <div className="dog-card-item">
                        <span className="dog-card-label">Nem</span>
                        <span className="dog-card-value">{nem}</span>
                    </div>

                    <div className="dog-card-item">
                        <span className="dog-card-label">Szín</span>
                        <span className="dog-card-value">{szin}</span>
                    </div>
                </div>

                <div className="dog-card-info">
                    <div className="dog-card-row">
                        <span className="dog-card-row-label">
                            {tipus === "talalt" ? "Megtalálás helye" : "Eltűnés helye"}
                        </span>
                        <span className="dog-card-row-value">{hely}</span>
                    </div>

                    <div className="dog-card-row">
                        <span className="dog-card-row-label">
                            {tipus === "talalt" ? "Megtalálás ideje" : "Eltűnés ideje"}
                        </span>
                        <span className="dog-card-row-value">{formatIdo(ido)}</span>
                    </div>

                    <div className="dog-card-row">
                        <span className="dog-card-row-label">Feltöltő neve</span>
                        <span className="dog-card-row-value">
                            {kutya.gazda_nev || "Nincs adat"}
                        </span>
                    </div>

                    <div className="dog-card-row">
                        <span className="dog-card-row-label">Telefonszám</span>
                        <span className="dog-card-row-value">
                            {kutya.gazda_telefonszam || "Nincs adat"}
                        </span>
                    </div>
                </div>

                {kutya.leiras && (
                    <div className="dog-card-description">
                        {kutya.leiras}
                    </div>
                )}
            </div>
        </div>
    );
}