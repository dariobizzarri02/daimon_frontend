# Daimon Frontend

Codebase del frontend di Daimon, sviluppato in NextJS e deployato su Vercel.
Daimon è una piattaforma di gioco di ruolo con collegamenti a molteplici giochi e servizi esterni.

## Website
https://daimon.world

## Features

- Fetching di media dinamici da bucket MinIO hostato autonomamente
- Fetching di dati dinamici da REST API hostata autonomamente (Daimon Backend)
- Sistema di account con autenticazione proprietaria o tramite Discord o Minecraft
- Sistema di creazione avatar personalizzato
- Sistema di gilde, con inbox per gestione inviti e richieste
- CRUD compliance per ogni entità (account, gilda, collegamento account ecc.)
- Leaderboard esaustive per ogni campo di punteggio
- Browser per la wiki di lore del progetto

## Installazione

- Clonare la repository tramite `git clone <repository-url>`
- Installare le dipendenze tramite `npm install`
- Rinominare `.env.example` in `.env`
- Eseguire in modalità sviluppo tramite `npm run dev`