import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../components/Navbar";
import { adataim } from "../api";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
    const [user, setUser] = useState(null);
    const nav = useNavigate();

    useEffect(() => {
        (async () => {
            const data = await adataim();
            if (data.result) setUser(data.user);
        })();
    }, []);

    return (
        <div className="app-page min-vh-100">
            <Navbar user={user} />

            <main className="container py-4 py-md-5">
                <section className="hero-section mb-5">
                    <div className="row align-items-center g-4">
                        <div className="col-12 col-lg-6">
                            <div className="hero-content">
                                <span className="hero-badge">Modern közösségi kutyakereső platform</span>

                                <h1 className="hero-heading">
                                    Eltűnt a kutyád?
                                    <br />
                                    Segítünk hazatalálni.
                                </h1>

                                <p className="hero-paragraph">
                                    A GazdiVár egy gyors, átlátható és látványos webalkalmazás,
                                    ahol az elveszett és talált kutyák bejelentése pár perc alatt megtörténhet.
                                </p>

                                <div className="row g-3 mt-1">
                                    <div className="col-12 col-md-4">
                                        <Button color="dark" content="Elveszett kutyák" onClick={() => nav("/elveszett")} />
                                    </div>
                                    <div className="col-12 col-md-4">
                                        <Button color="secondary" content="Talált kutyák" onClick={() => nav("/talalt")} />
                                    </div>
                                    <div className="col-12 col-md-4">
                                        <Button color="outline-dark" content="Minden kutya" onClick={() => nav("/kutya")} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-12 col-lg-6">
                            <div className="hero-image-card">
                                <img
                                    src="https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=1200&q=80"
                                    alt="Kutya"
                                    className="hero-image"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                <section className="mb-5">
                    <div className="row g-4">
                        <div className="col-12 col-md-4">
                            <div className="info-card h-100">
                                <div className="info-card-number">01</div>
                                <h3 className="info-card-title">Gyors bejelentés</h3>
                                <p className="info-card-text">
                                    Néhány adat és egy fotó feltöltése után azonnal megjelenhet a kutyád az oldalon.
                                </p>
                            </div>
                        </div>

                        <div className="col-12 col-md-4">
                            <div className="info-card h-100">
                                <div className="info-card-number">02</div>
                                <h3 className="info-card-title">Közösségi segítség</h3>
                                <p className="info-card-text">
                                    A felhasználók gyorsan értesülhetnek az elveszett vagy talált kutyákról.
                                </p>
                            </div>
                        </div>

                        <div className="col-12 col-md-4">
                            <div className="info-card h-100">
                                <div className="info-card-number">03</div>
                                <h3 className="info-card-title">Nagyobb esély</h3>
                                <p className="info-card-text">
                                    Minél gyorsabban kerül ki az információ, annál nagyobb az esély a hazajutásra.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="cta-panel">
                    <h2 className="cta-panel-title">Jelents be elveszett vagy talált kutyát</h2>
                    <p className="cta-panel-text">
                        Egyetlen feltöltéssel segíthetsz abban, hogy egy kutya újra hazataláljon.
                    </p>

                    <div className="row g-3 justify-content-center mt-2">
                        <div className="col-12 col-md-4">
                            <Button
                                color="light"
                                content="Elveszett kutyát jelentek"
                                onClick={() => nav("/upload?tipus=elveszett")}
                            />
                        </div>

                        <div className="col-12 col-md-4">
                            <Button
                                color="light"
                                content="Talált kutyát jelentek"
                                onClick={() => nav("/upload?tipus=talalt")}
                            />
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
