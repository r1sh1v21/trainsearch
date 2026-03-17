# Train Search

A train route search application. Enter a source and destination — get direct trains and connecting routes with prices and timings.

Built with React, Node.js, Express, and MongoDB.

---

## What it does

- Search trains between any two stations
- Finds direct routes and connecting routes (with transfer info)
- Calculates ticket price based on distance (Rs 1.25/km)
- Sort results by price or departure time

---

## Stack

- **Frontend** — React
- **Backend** — Node.js, Express
- **Database** — MongoDB with Mongoose
- **Containerization** — Docker

---

## Running with Docker

The easiest way. Make sure Docker Desktop is running.

```bash
git clone https://github.com/YOUR_USERNAME/train-search.git
cd train-search
docker compose up --build
```

Then seed the database:

```bash
docker exec -it backend node scripts/seedData.js
```

App runs at `http://localhost:3000`

---

## Running locally

**Prerequisites** — Node.js v18+, MongoDB running locally

```bash
# Backend
cd backend
npm install
npm run dev

# Frontend (new terminal)
cd frontend
npm install
npm start
```

Seed the database:

```bash
cd backend
npm run seed
```

---

## Environment variables

Create a `.env` file in the `backend/` folder:

```
MONGO_URI=mongodb://localhost:27017/traindb
PORT=5000
```

---

## API

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/stations` | All station names |
| GET | `/api/search?from=X&to=Y` | Search routes between two stations |