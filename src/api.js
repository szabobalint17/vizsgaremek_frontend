export const BASE = "https://nodejs311.dszcbaross.edu.hu";

// REGISZTRÁCIÓ
export async function regisztracio(email, teljes_nev, jelszo, telefonszam) {
    const res = await fetch(`${BASE}/regisztracio`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, teljes_nev, jelszo, telefonszam })
    });

    const data = await res.json();
    if (!res.ok) return { result: false, message: data.message };
    return { result: true, message: data.message, id: data.id };
}

// BELÉPÉS
export async function belepes(teljes_nevVagyEmail, jelszo) {
    try {
        const res = await fetch(`${BASE}/belepes`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ teljes_nevVagyEmail, jelszo })
        });

        const data = await res.json();

        if (!res.ok) {
            return {
                result: false,
                message: data.message || "Szerverhiba"
            };
        }

        return {
            result: true,
            message: data.message,
            user: data.user
        };
    } catch (error) {
        return {
            result: false,
            message: "A szerver nem elérhető"
        };
    }
}
// ADATAIM
export async function adataim() {
    try {
        const res = await fetch(`${BASE}/adataim`, {
            method: "GET",
            credentials: "include"
        });

        const data = await res.json();

        if (!res.ok) {
            return { result: false, message: data.message, user: null };
        }

        return { result: true, user: data };
    } catch (error) {
        return { result: false, message: "Hálózati hiba", user: null };
    }
}

// KIJELENTKEZÉS
export async function kijelentkezes() {
    const res = await fetch(`${BASE}/kijelentkezes`, {
        method: "POST",
        credentials: "include"
    });

    const data = await res.json();
    if (!res.ok) return { result: false, message: data.message };
    return { result: true, message: data.message };
}

// ÚJ KUTYA LÉTREHOZÁSA
export async function kutyaLetrehozas(
    nev,
    kutyafajta_id,
    nem,
    leiras,
    file,
    tipus,
    szin,
    hely,
    ido
) {
    const formData = new FormData();
    formData.append("nev", nev);
    formData.append("kutyafajta_id", kutyafajta_id);
    formData.append("nem", nem);
    formData.append("leiras", leiras ?? "");
    formData.append("tipus", tipus ?? "");
    formData.append("szin", szin ?? "");
    formData.append("hely", hely ?? "");
    formData.append("ido", ido ?? "");

    if (file) {
        formData.append("kep", file);
    }

    const res = await fetch(`${BASE}/kutyak`, {
        method: "POST",
        credentials: "include",
        body: formData
    });

    const data = await res.json();
    if (!res.ok) return { result: false, message: data.message };
    return { result: true, message: data.message, id: data.id };
}

// KUTYAFAJTÁK LEKÉRÉSE
export async function kutyafajtakLekerese() {
    const res = await fetch(`${BASE}/kutyafajtak`, {
        method: "GET",
        credentials: "include"
    });

    const data = await res.json();
    if (!res.ok) return { result: false, message: data.message };
    return { result: true, fajtak: data };
}

// ÖSSZES KUTYA LEKÉRÉSE
export async function kutyakLekerese() {
    const res = await fetch(`${BASE}/kutyak`, {
        method: "GET",
        credentials: "include"
    });

    const data = await res.json();
    if (!res.ok) return { result: false, message: data.message };
    return { result: true, kutyak: data };
}

// ELVESZETT KUTYÁK LEKÉRÉSE
export async function elveszettKutyakLekerese() {
    const res = await fetch(`${BASE}/kutyak/elveszett`, {
        method: "GET",
        credentials: "include"
    });

    const data = await res.json();
    if (!res.ok) return { result: false, message: data.message, kutyak: [] };
    return { result: true, kutyak: data };
}

// TALÁLT KUTYÁK LEKÉRÉSE
export async function talaltKutyakLekerese() {
    const res = await fetch(`${BASE}/kutyak/talalt`, {
        method: "GET",
        credentials: "include"
    });

    const data = await res.json();
    if (!res.ok) return { result: false, message: data.message, kutyak: [] };
    return { result: true, kutyak: data };
}

// SAJÁT KUTYÁK LEKÉRÉSE
export async function sajatKutyakLekerese() {
    const res = await fetch(`${BASE}/en-kutyaim`, {
        method: "GET",
        credentials: "include"
    });

    const data = await res.json();
    if (!res.ok) return { result: false, message: data.message };
    return { result: true, kutyak: data };
}

// KUTYA TÖRLÉSE
export async function kutyaTorlese(id) {
    const res = await fetch(`${BASE}/kutyak/${id}`, {
        method: "DELETE",
        credentials: "include"
    });

    const data = await res.json();
    if (!res.ok) return { result: false, message: data.message };
    return { result: true, message: data.message };
}

// EMAIL MÓDOSÍTÁS
export async function emailModositas(ujEmail) {
    const res = await fetch(`${BASE}/email`, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ujEmail })
    });

    const data = await res.json();
    if (!res.ok) return { result: false, message: data.message };
    return { result: true, message: data.message };
}

// JELSZÓ MÓDOSÍTÁS
export async function jelszoModositas(jelenlegiJelszo, ujJelszo) {
    const res = await fetch(`${BASE}/jelszo`, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jelenlegiJelszo, ujJelszo })
    });

    const data = await res.json();
    if (!res.ok) return { result: false, message: data.message };
    return { result: true, message: data.message };
}

// FIÓK TÖRLÉSE
export async function fiokTorlese() {
    const res = await fetch(`${BASE}/fiokom`, {
        method: "DELETE",
        credentials: "include"
    });

    const data = await res.json();
    if (!res.ok) return { result: false, message: data.message };
    return { result: true, message: data.message };
}

// FELHASZNÁLÓK LEKÉRÉSE ADMINNAK
export async function felhasznalokLekerese() {
    const res = await fetch(`${BASE}/felhasznalok`, {
        method: "GET",
        credentials: "include"
    });

    const data = await res.json();
    if (!res.ok) return { result: false, message: data.message };
    return { result: true, felhasznalok: data };
}

// FELHASZNÁLÓ TÖRLÉSE ADMINNAL
export async function felhasznaloTorleseADMIN(felhasznalo_id) {
    const res = await fetch(`${BASE}/felhasznalo/${felhasznalo_id}`, {
        method: "DELETE",
        credentials: "include"
    });

    const data = await res.json();
    if (!res.ok) return { result: false, message: data.message };
    return { result: true, message: data.message };
}

// SZEREPKÖR MÓDOSÍTÁS ADMINNAL
export async function szerepkorModositasADMIN(felhasznalo_id, szerepkor) {
    const res = await fetch(`${BASE}/szerepkor/${felhasznalo_id}`, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ szerepkor })
    });

    const data = await res.json();
    if (!res.ok) return { result: false, message: data.message };
    return { result: true, message: data.message };
}

export async function telefonModositas(telefon) {
    try {
        const res = await fetch(`${BASE}/telefon-modositas`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ telefon })
        });

        const data = await res.json();

        return {
            result: res.ok,
            message: data.message
        };
    } catch (error) {
        return {
            result: false,
            message: "A szerver nem elérhető"
        };
    }
}