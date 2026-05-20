CREATE TABLE IF NOT EXISTS registrations (
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    college VARCHAR(150) NOT NULL,
    year_of_study INTEGER NOT NULL CHECK (year_of_study between 1 and 6),
    skills TEXT[] NOT NULL,
    motivation TEXT NOT NULL CHECK (char_length(motivation) <= 500),
    created_at TIMESTAMP DEFAULT NOW()
);