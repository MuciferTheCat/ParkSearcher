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
- **Iskanje parkirnih mest** uporabnik na podlagi svoje ali vnesene lokacije najdel bližnja parkirna mesta in njihove podatke
- **Parkiranje** uporabnik si določi čas parkiranja, parkirišče in registersko številko avta, ki se nato vnesejo v padotkovno bazo, ko mu parkiranje poteče se mu v podatkovno bazo mikrostoritve Payments vnesejo podatki o ceni

## 9. Seznam opravljenih/vključenih osnovnih in dodatnih projektnih zahtev

- **Repozitorij:** za izdelavo rojekta sva uporabljala platformo github
- **Mikrostoritve in »cloud-native« aplikacija:** aplikacija je sestavljena iz večih mikrostoritev, vsaka ima svojo podatkovno bazo, dostopne so preko API endpointov
- **Dokumentacija:** dokumentacija je napisana v 'opis_projekta.md'
- **Namestitev v oblak:** aplikacija je javno dostopna na Azure
- **Grafični vmesnik:** 
- **API dokumentacija:**
- **Cevovod CI/CD:** implementirano z github actions, ni preverjeno delovanje (zmanjkalo časa), konfiguracija v '.github' mapi
- **Helm charts:** vsaka mikrostoritev ima v mapi <ime-storitve>-service-chart konfiguracijo za deployment z helm-charts
- **»Serverless« funkcija:** z uporabo azure functions smo implementirali iskanje parkirišč glede na GPS lokacijo (iz nekega razloga ne deluje, ko je postavljena na azure, deluje pa lokalno)
- **Zunanji API:** implementiran zunanji API Overpass-API za iskanje parkirnih mest v okolici
- **Preverjanje zdravja:** 
- **Sporočilni sistemi:** komunikacija med parking in payment mikrostoritvami s pomočjo RabbitMQ, deluje lokalno, na azure pa ima RabitMQ server nekakšne težave
- **Centralizirano beleženje dnevnikov:** uporaba Logs funkcionalnosti na AKS za osnovno zbiranje centralizirano zbiranje dnevnikov
- **Zbiranje metrik:** uporaba funkcionalnosti Metrics na AKS, nastavljeno obveščanje preko outlooka

Dodatne točke:
- **Ingress Controller:** Traefik in ingress.yaml konfiguracije za posamezne mikrostoritve.