# CaseStatus

![bild](https://user-images.githubusercontent.com/75727533/158754187-05e6f387-1c35-48a7-9601-aa0271048f1d.png)

Observera: för att hantera statusar från Open ePlatform behöver ni även https://github.com/OpenSundsvall/caseStatus-cache
## Config

### Production-config

- **API Gateway:**                  api-i.sundsvall.se
  - **Endpoint:**                   Production
- **Server:**                       microservices.sundsvall.se
- **DB:**                           Maria DB
- **Version av integrationer:**     Produktion

### Test-config

- **API Gateway:**                  api-i-test.sundsvall.se
  - **Endpoint:**                   Production
- **Server:**                       microservices-test.sundsvall.se
- **DB:**                           Maria DB
- **Version av integrationer:**     Test

### Sandbox-config

- **API Gateway:**                  api-i-test.sundsvall.se
  - **Endpoint:**                   Sandbox
- **Server:**                       microservices-test.sundsvall.se
- **DB:**                           Hårdkodade svar
- **Version av integrationer:**     Mockade

## Integrationer

Denna applikation har integrationer mot:

* Incident (Sundsvalls kommun)
* CaseManagement (Sundsvalls kommun)

## Miljövariabler

Dessa miljövariabler måste sättas för att det ska gå att köra applikationen.

DB_HOST<br>
DB_USER<br>
DB_PASSWORD<br>
DB_DATABASE<br>
SANDBOX<br>
ENDPOINT_URI<br>
CLIENT_KEY<br>
CLIENT_SECRET<br>
URL_GATEWAY<br>
PRODUCTION<br>

## Kör applikationen lokalt

För att köra applikationen lokalt krävs en .env-fil med miljövariabler. Applikationen startas med `node app.js` eller Nodemon.

## 
Copyright (c) 2021 Sundsvalls kommun
