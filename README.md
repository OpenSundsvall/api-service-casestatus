# CaseStatus

![bild](https://user-images.githubusercontent.com/75727533/145235231-60614dcc-8754-4097-8477-574e09f252fd.png)


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
