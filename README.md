# InnovateFest — Hackathon Registration Portal

A full-stack web application for managing hackathon registrations, built as part of the SMP Web Nominee Assignment 2026-27.

---
## Live Demo
- Frontend: [https://your-production-vercel-url](https://innovate-fest-amber.vercel.app/)
- Backend: [https://your-render-url](https://innovatefest.onrender.com)

---

## Tech Stack & Architecture

**Frontend:** React (Vite), React Router DOM, Axios  
**Backend:** Node.js, Express.js  
**Database:** PostgreSQL  

### Why this stack?

- **React with Vite** over plain HTML because component-based architecture makes the UI maintainable. Vite gives near-instant hot reload during development.
- **Express.js** because it is minimal and unopinionated, we wire only what we need. Good for understanding what each layer actually does.
- **PostgreSQL** over SQLite or MongoDB because this is relational data with a clear schema. SQL enforces constraints (UNIQUE on email, CHECK on year) at the database level, not just in application code. This means data integrity is guaranteed even if the backend has a bug.

### Architecture

The frontend and backend are fully decoupled. React runs on port 5173 and communicates with the Express API on port 3000 via HTTP. The backend connects to a local PostgreSQL instance via a connection pool (pg.Pool).

Browser(React) -> HTTP (axios) -> Express API (Node.js) -> SQL queries (pg) -> PostgreSQL Database (pg)

---

## API Documentation

Base URL: `http://localhost:3000`

### POST /api/registrations
Register a new participant.

**Request Body:**
```json
{
  "full_name": "John Doe",
  "email": "johndoe123@gmail.com",
  "college": "college/ univ name",
  "year_of_study": 2,
  "skills": ["Node.js", "React"],
  "motivation": "I want to build something meaningful."
}
```

**Responses:**
- `201 Created` — registration successful, returns the created row
- `400 Bad Request` — validation failed (missing fields, invalid email, bad year)
- `409 Conflict` — email already registered
- `500 Internal Server Error` — unexpected server error

---

### GET /api/registrations
Fetch all registrations, ordered by most recent first.

**Response:**
```json
{
  "total": 1,
  "registrations": [...]
}
```
- `200 OK`
- `500 Internal Server Error`

---

### GET /api/registrations/:id
Fetch a single registration by ID.

**Responses:**
- `200 OK` — returns the registration object
- `404 Not Found` — no registration with that ID
- `500 Internal Server Error`

---

### DELETE /api/registrations/:id
Delete a registration by ID.

**Responses:**
- `200 OK` — returns the deleted registration object
- `404 Not Found`
- `500 Internal Server Error`

---

## Database Schema

```sql
CREATE TABLE IF NOT EXISTS registrations (
  id SERIAL PRIMARY KEY,
  full_name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  college VARCHAR(150) NOT NULL,
  year_of_study INTEGER NOT NULL CHECK (year_of_study BETWEEN 1 AND 6),
  skills TEXT[] NOT NULL,
  motivation TEXT NOT NULL CHECK (char_length(motivation) <= 500),
  created_at TIMESTAMP DEFAULT NOW()
);
```

### Why SQL over NoSQL?

Registration data is structured and predictable — every record has the same fields. SQL enforces this at the schema level. The UNIQUE constraint on email gives duplicate prevention for free at the database layer, independent of application code. MongoDB would work here too, but would require manual duplicate handling in code.

### Scalability Considerations

For thousands of registrations and multiple concurrent admins:

- **Indexes:** Add an index on `college` and `created_at` for faster filtering and sorting queries as the table grows. Currently only `email` is indexed (via UNIQUE constraint).
- **Connection pooling** is already implemented via `pg.Pool` — it handles concurrent admin sessions without opening a new DB connection per request.
- **Pagination:** The GET /api/registrations endpoint would need `LIMIT` and `OFFSET` to avoid sending thousands of rows at once. The frontend admin table would need page controls.
- **Authentication:** Multiple admins would need proper session-based or JWT auth on the `/admin` route and all admin API endpoints, rather than the current open access.
- **Deployment:** The backend would move to a managed PostgreSQL service (Railway, Supabase, or AWS RDS) instead of a local instance.

---

## Setup Instructions

### Prerequisites
- Node.js v18+
- PostgreSQL 17 (running locally)

### 1. Clone the repository
```bash
git clone <https://github.com/Tanmay-boop-hash/InnovateFest.git>
cd InnovateFest
```

### 2. Database (Production)
The production database is hosted on Render. Schema is already applied.
### OR
### Database (Local)
```bash
createdb innovatefest
psql -d innovatefest -f src/db/schema.sql
```

### 3. Configure environment variables
Create `backend/.env`:
PORT=3000
DB_USER=your_username
DB_HOST=localhost
DB_NAME=innovatefest
DB_PASSWORD=
DB_PORT=5432

### 4. Start the backend
```bash
cd backend
npm install
npm run dev
```
Server runs on http://localhost:3000

### 5. Start the frontend
```bash
cd frontend
npm install
npm run dev
```
Frontend runs on http://localhost:5173

---

## Q2 — Initiative Proposal

### 1. Department Alumni Experience Section Revamp
Audit and update the department experience sections across all department specific blogs on the SMP website. The current entries feature experiences from pre-COVID batches, which are significantly outdated given major curriculum changes that may have happened in various departments post-COVID. The initiative involves coordinating with SMPCs and DAMPCs to collect structured experience writeups from recent graduates (2023-2025 passouts) and updating the website to reflect current curriculum reality.
**Problem it solves**: Freshers rely on these pages to understand what their department journey looks like — course difficulty, research opportunities, internship culture. Pre-COVID experiences are outdated because course structures, grading patterns, and opportunities have changed substantially. Outdated content actively gives wrong guidance to students making real academic decisions. Also apart from just updating the content, we can improve the structure of how it's displayed. We can display experiences as cards with the person's name, batch year, maybe even where he/she got placed. This adds credibility (readers know how recent it is) and makes the page scannable instead of a wall of text. Also add a "Last Updated" timestamp on each department page so it's always clear how fresh the content is.
**Implementation approach**: Coordinate with SMPCs and DAMPCs to collect 2-3 alumni experience writeups per department from recent batches using a standardized Google Form to keep formatting consistent. Then we can restructure the experience section as a component that renders from a JSON or database entry rather than hardcoded HTML, making future updates a one-line data change instead of editing raw HTML every time. This also sets the foundation for the Unified DAMP Blog platform that is already planned for this tenure.

### 2. Fresher Performance Analytics Dashboard
The MIS portal aims to analyze fresher performance and help mentors track engagement. We can build the analytics layer specifically for better visualisation and a modern and clean look. A dashboard that aggregates fresher activity data — attendance, performance summary, peer review scores and presents it visually to mentors with trend graphs and alert flags for students needing attention.
**Implementation**: Backend aggregation queries in PostgreSQL using GROUP BY and window functions. Frontend charts using Recharts (library available in React). 

### 3. Minor implementations in the projects that we would be working on during our tenure.
- One thing I thought to add was search and filter layers in the Unified DAMP Blog platform so that it makes it easy finding a review of course/elective through their codes more easy and accessible, as finding good electives is a big hassle during registration period.
- Dark mode theme implementation on the SMP website could be a thing to implement (given that it is allowed and not done yet due to being missed out on).
Thats all from my side for now. Will try to think of more initiatives during the tenure (if I become web nom :)
Thank you!

---
