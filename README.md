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

## Képernyőképek:

### Főoldal:

<img width="945" height="413" alt="Fooldal" src="https://github.com/user-attachments/assets/d2931ea8-98a8-44f7-84f9-afe8d7835cde" />

### Összes kutya oldal:

<img width="947" height="413" alt="Osszeskutya" src="https://github.com/user-attachments/assets/85b0e606-249c-44bd-8d15-233803bf26a7" />

### Elveszett kutyák:

<img width="940" height="412" alt="Elveszett" src="https://github.com/user-attachments/assets/fa45708e-f4e5-4bf1-b4e0-59832c9f5171" />

### Talált kutyák:

<img width="946" height="410" alt="Talalt" src="https://github.com/user-attachments/assets/8c51caba-4864-4e9c-873c-af7cf94026bc" />

### Saját feltöltések:

<img width="947" height="407" alt="Sajatkutyak" src="https://github.com/user-attachments/assets/2242deeb-93bb-4082-8732-0730054d53ab" />

### Profil oldal:

<img width="947" height="407" alt="Profil" src="https://github.com/user-attachments/assets/aa0ddfe7-c28f-490c-b9e4-a90cc8974b18" />

### Admin panel:

<img width="944" height="409" alt="Adminpanel" src="https://github.com/user-attachments/assets/8ca88b3e-861c-4a9b-a04c-25711e7b4272" />

### Adatbázis diagram:

<img width="659" height="271" alt="sqlkutya" src="https://github.com/user-attachments/assets/a1b2104a-43e1-4055-b2eb-94cee2da37b2" />

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
