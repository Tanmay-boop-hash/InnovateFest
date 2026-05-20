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
git clone <your-repo-url>
cd innovatefest
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

### Peer Mentorship Matching Portal

**What:** A web platform where juniors fill out a form listing their interests, goals, and areas they want guidance in. SMP matches them with senior student mentors based on those inputs. Both parties can view their match and access a simple messaging or scheduling interface.

**Problem it solves:** Currently mentorship at SMP happens informally — juniors reach out randomly or not at all. Many students who need guidance don't know who to approach, and many seniors willing to help have no structured way to offer it.

**Benefit to SMP and students:** Increases the actual impact of SMP's mentorship mission beyond events. Juniors get targeted guidance. Seniors build leadership experience. SMP gets a concrete, trackable output from its mentorship vertical.

**Implementation approach:**
- Two registration flows — mentor and mentee — each with a profile form
- A simple matching algorithm based on shared tags (branch, interests, career goals)
- Admin view to review and confirm matches
- Email notification when a match is made
- Built on the same stack as this project — Node.js backend, PostgreSQL, React frontend
