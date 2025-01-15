# PARKSEARCHER

V okviru projekta pri predmetu RSO sva razvila aplikacijo ParkSearch. Aplikacija omogoča iskanje parkirišč. Implementirala sva nekatere storitve, ki jih ponuja že aplikacija *Easy Park*.

Aplikacijo sva zasnovala tako, da jo lahko v prihodnje še nadgradiva z mobilno aplikacijo, ki bi olajšala uporabo same aplikacije.

## 1. Člani skupine in številka projektne skupine

Člana skupine Ravioli sva Mojca Kompara in Andraž Sovinec (projektna skupina št. 13).

## 2. Povezava do repozitorija

Izvorna koda aplikacije je dostopna na sledečem naslovu: `https://github.com/MuciferTheCat/ParkSearcher`.

## 3. Naslov URL, na katerem se nahaja aplikacija

Aplikacija je dostopna na sledečem naslovu: `http://108.142.6.242/`.

## 4. Kratek opis projekta

Aplikacija ParkSearch omogoča uporabniku najti parkirna mesta na več različnih načinov. Parkirna mesta lahko poišče glede na svojo lokacijo, ali pa sam vpiše kraj, kjer bi rad poiskal parkirna mesta. V obeh primerih lahko izbere tudi radius iskanja (oddaljenost od središča). Po izbiri parkirišča je preusmerjen na potrditev parkiranja, kjer lahko izbere začetni in končni čas parkiranja. Parkiranje lahko potrdi le, če je prijavljen. Na svojem profilu lahko pridobi podatke o aktivnem parkiranju, kjer lahko spremeni končni čas parkiranja ali pa ga konča predčasno. Na svojem profilu lahko dostopa do aktivni (neplačanih) računov in neaktivnih (že plačanih) računov.

## 5. Orodje in razvojno okolje

Backend aplikacije je narejen z Javascript, frontend pa s Typescript. Za programiranje sva uporabila razvojno okolje Visual Studio Code. Uporabila sva sledeče tehnologije: Docker, Node.js, REST API, Swagger, minikube, Kubernetes, Azure, ...

## 6. Shema arhitekture

```
      +------------------+         +-------------------+
      |  Authentication  | =====>  |    UserService    | <================\\
      +------------------+         +-------------------+                  ||
                                             /\                           ||
                                             ||                           ||
                                             \/                           \/       
      +------------------+         +-------------------+         +-------------------+ 
      |  SearchService   | =====>  |  ParkingService   | <=====> |  PaymentService   |
      +------------------+         +-------------------+         +-------------------+
```

## 7. Seznam funkcionalnosti mikrostoritev

- **Users**: registracija in prijava uporabnika (avtentikacija), uporabniški profil (uporabniško ime, email, geslo, aktivno parkiranje, računi), spreminjanje časa trajanja aktivnega parkiranja, končanje aktivnega parkiranja
- **Search**: iskanje parkirišč glede na trenutno/podano lokacijo, poljubno območje iskanja
- **Payments**: prikaz aktivnih (neplačanih) in neaktivnih (že plačanih računov)
- **Parking**: izbira in začetek parkiranja, izbira začetnega in končnega časa, podatki o parkirnem mestu

## 8. Primeri uporabe

- **Registracija:** uporabnik kreira nov račun z uporabniškim imenom, emailom in geslom; podatki se shranijo v podatkovno bazo
- ****

## 9. Seznam opravljenih/vključenih osnovnih in dodatnih projektnih zahtev