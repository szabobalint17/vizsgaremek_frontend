# GazdiVár – Elveszett és talált kutyák webalkalmazás

A **GazdiVár** egy modern, reszponzív közösségi webalkalmazás, amelynek célja, hogy segítse az elveszett kutyák hazajutását. A felhasználók bejelenthetnek elveszett vagy talált kutyákat, megtekinthetik a bejelentéseket, kezelhetik saját feltöltéseiket, valamint módosíthatják profiladataikat.

## Tartalomjegyzék

- [Projekt célja](#projekt-célja)
- [Fő funkciók](#fő-funkciók)
- [Felhasználói szerepkörök](#felhasználói-szerepkörök)
- [Adatbázis felépítése](#adatbázis-felépítése)
- [Képernyőképek](#képernyőképek)
- [Használt technológiák](#használt-technológiák)
- [Telepítés és futtatás](#telepítés-és-futtatás)
- [Tesztelési szempontok](#tesztelési-szempontok)
- [Fejlesztési lehetőségek](#fejlesztési-lehetőségek)

## Projekt célja

A projekt célja egy olyan online felület létrehozása, ahol a kutyatulajdonosok gyorsan közzétehetik, ha elveszett a kutyájuk, illetve más felhasználók jelezhetik, ha találtak egy kutyát. Az alkalmazás segíti az információk átlátható megjelenítését és a gazdik, valamint megtalálók közötti kapcsolatfelvételt.

## Fő funkciók

- Felhasználói regisztráció és bejelentkezés
- Elveszett kutya bejelentése
- Talált kutya bejelentése
- Összes kutya listázása
- Elveszett és talált kutyák külön listázása
- Saját feltöltések kezelése
- Profiladatok megtekintése és módosítása
- Admin panel felhasználókezeléssel
- Szerepkörök módosítása admin felületen
- Felhasználók törlése admin jogosultsággal
- Kutyafajták adatbázisból történő kezelése

## Felhasználói szerepkörök

Az alkalmazásban két fő szerepkör található:

| Szerepkör | Jogosultság |
|---|---|
| Felhasználó | Bejelentések létrehozása, saját adatok kezelése, kutyák megtekintése |
| Admin | Felhasználók kezelése, szerepkörök módosítása, törlés |

## Adatbázis felépítése

Az adatbázis három fő táblából áll:

### `felhasznalok`

A regisztrált felhasználók adatait tárolja.

Főbb mezők:

- `id`
- `email`
- `jelszo`
- `szerepkor`
- `telefonszam`
- `teljes_nev`
- `letrehozva`

### `jelentesek`

Az elveszett és talált kutyák bejelentéseit tárolja.

Főbb mezők:

- `id`
- `tipus`
- `felhasznalo_id`
- `nev`
- `kutyafajta_id`
- `nem`
- `szin`
- `utolso_latas_hely`
- `utolso_latas_ido`
- `leiras`
- `kep`
- `letrehozva`

### `kutyafajtak`

A választható kutyafajtákat tárolja.

Főbb mezők:

- `id`
- `megnevezes`

## Képernyőképek

### Főoldal

![Főoldal](./screenshots/Fooldal.png)

### Összes kutya oldal

![Összes kutya](./screenshots/Osszeskutya.png)

### Elveszett kutyák

![Elveszett kutyák](./screenshots/Elveszett.png)

### Talált kutyák

![Talált kutyák](./screenshots/Talalt.png)

### Saját feltöltések

![Saját kutyák](./screenshots/Sajatkutyak.png)

### Profil oldal

![Profil](./screenshots/Profil.png)

### Admin panel

![Admin panel](./screenshots/Adminpanel.png)

### Adatbázis diagram

![Adatbázis diagram](./screenshots/sqlkutya.png)

## Használt technológiák

- HTML
- CSS
- JavaScript
- React
- PHP / backend API
- MySQL adatbázis
- Netlify frontend hosztolás
- Reszponzív webdesign

## Telepítés és futtatás

### 1. Projekt klónozása

```bash
git clone https://github.com/felhasznalonev/gazdivar.git
cd gazdivar
```

### 2. Függőségek telepítése

```bash
npm install
```

### 3. Fejlesztői szerver indítása

```bash
npm run dev
```

### 4. Adatbázis beállítása

Hozz létre egy MySQL adatbázist, majd importáld a projekt SQL fájlját.

Példa adatbázisnév:

```sql
CREATE DATABASE gazdivar;
```

### 5. Környezeti változók beállítása

Hozz létre egy `.env` fájlt, és add meg a szükséges adatbázis-kapcsolati adatokat.

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=gazdivar
```

## Tesztelési szempontok

A vizsga során az alábbi funkciók tesztelhetők:

- Új felhasználó regisztrációja
- Bejelentkezés helyes és hibás adatokkal
- Elveszett kutya feltöltése
- Talált kutya feltöltése
- Kutyák listázása kategória szerint
- Saját feltöltések megjelenítése
- Profiladatok módosítása
- Admin felület elérése admin felhasználóval
- Felhasználói szerepkör módosítása
- Felhasználó törlése
- Reszponzív megjelenés ellenőrzése

## Fejlesztési lehetőségek

- Térképes keresés beépítése
- E-mail értesítés új bejelentés esetén
- Kereső és szűrő funkció bővítése
- Kommentelési lehetőség bejelentéseknél
- Képfeltöltés optimalizálása
- Mobilalkalmazás készítése

## Készítő

Készítette: **Szabó Bálint**  
Projekt típusa: **Vizsgaremek**
