-- Start transaction
BEGIN;

-- Drop tables if they exist
DROP TABLE IF EXISTS notes;
DROP TABLE IF EXISTS resources;
DROP TABLE IF EXISTS users;

-- Create the users table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  password TEXT NOT NULL,
  admin BOOLEAN NOT NULL DEFAULT false,
  email TEXT NOT NULL
);

-- Create the resources table
CREATE TABLE resources (
  id SERIAL PRIMARY KEY,
  language TEXT NOT NULL,
  user_id INTEGER REFERENCES users(id),
  topics TEXT NOT NULL,
  type TEXT NOT NULL,
  youtube_id TEXT NOT NULL
);

-- Create the notes table
CREATE TABLE notes (
  id SERIAL PRIMARY KEY,
  timestamp INTEGER NOT NULL,
  heading TEXT NOT NULL,
  content TEXT NOT NULL,
  language TEXT NOT NULL,
  topic TEXT NOT NULL,
  user_id INTEGER REFERENCES users(id),
  resource_id INTEGER REFERENCES resources(id)
);

-- Insert records into users
INSERT INTO users (email, name, password) VALUES
('test1@test.com', 'test1', '123456'),
('test2@test.com', 'test2', '123456'),
('test3@test.com', 'test3', '123456'),
('test4@test.com', 'test4', '123456');

-- Insert records into resources
INSERT INTO resources (language, user_id, topics, type, youtube_id) VALUES
('Python', 1, 'Topic1', 'Type1', 'QDvQsATJ2bg'),
('Django', 1, 'Topic2', 'Type2', 'QDvQsATJ2bg'),
('JavaScript', 2, 'Topic1', 'Type1', 'QDvQsATJ2bg'),
('React', 2, 'Topic2', 'Type2', 'QDvQsATJ2bg'),
('Java', 3, 'Topic1', 'Type1', 'QDvQsATJ2bg'),
('Spring Boot', 3, 'Topic2', 'Type2', 'QDvQsATJ2bg'),
('C++', 4, 'Topic1', 'Type1', 'QDvQsATJ2bg'),
('.NET', 4, 'Topic2', 'Type2', 'QDvQsATJ2bg');

-- Insert records into notes
INSERT INTO notes (timestamp, heading, content, language, topic, user_id, resource_id) VALUES
(100, 'Heading1', 'Content1', 'Python', 'Topic1', 1, 1),
(120, 'Heading2', 'Content2', 'Python', 'Topic1', 1, 1),
(140, 'Heading3', 'Content3', 'Python', 'Topic1', 1, 1),
(160, 'Heading4', 'Content4', 'Python', 'Topic1', 1, 1),
(180, 'Heading5', 'Content5', 'Python', 'Topic1', 1, 1),

(100, 'Heading1', 'Content1', 'Django', 'Topic2', 1, 2),
(120, 'Heading2', 'Content2', 'Django', 'Topic2', 1, 2),
(140, 'Heading3', 'Content3', 'Django', 'Topic2', 1, 2),
(160, 'Heading4', 'Content4', 'Django', 'Topic2', 1, 2),
(180, 'Heading5', 'Content5', 'Django', 'Topic2', 1, 2),

(100, 'Heading1', 'Content1', 'JavaScript', 'Topic1', 2, 3),
(120, 'Heading2', 'Content2', 'JavaScript', 'Topic1', 2, 3),
(140, 'Heading3', 'Content3', 'JavaScript', 'Topic1', 2, 3),
(160, 'Heading4', 'Content4', 'JavaScript', 'Topic1', 2, 3),
(180, 'Heading5', 'Content5', 'JavaScript', 'Topic1', 2, 3),

(100, 'Heading1', 'Content1', 'React', 'Topic2', 2, 4),
(120, 'Heading2', 'Content2', 'React', 'Topic2', 2, 4),
(140, 'Heading3', 'Content3', 'React', 'Topic2', 2, 4),
(160, 'Heading4', 'Content4', 'React', 'Topic2', 2, 4),
(180, 'Heading5', 'Content5', 'React', 'Topic2', 2, 4),

(100, 'Heading1', 'Content1', 'Java', 'Topic1', 3, 5),
(120, 'Heading2', 'Content2', 'Java', 'Topic1', 3, 5),
(140, 'Heading3', 'Content3', 'Java', 'Topic1', 3, 5),
(160, 'Heading4', 'Content4', 'Java', 'Topic1', 3, 5),
(180, 'Heading5', 'Content5', 'Java', 'Topic1', 3, 5),

(100, 'Heading1', 'Content1', 'Spring Boot', 'Topic2', 3, 6),
(120, 'Heading2', 'Content2', 'Spring Boot', 'Topic2', 3, 6),
(140, 'Heading3', 'Content3', 'Spring Boot', 'Topic2', 3, 6),
(160, 'Heading4', 'Content4', 'Spring Boot', 'Topic2', 3, 6),
(180, 'Heading5', 'Content5', 'Spring Boot', 'Topic2', 3, 6),

(100, 'Heading1', 'Content1', 'C++', 'Topic1', 4, 7),
(120, 'Heading2', 'Content2', 'C++', 'Topic1', 4, 7),
(140, 'Heading3', 'Content3', 'C++', 'Topic1', 4, 7),
(160, 'Heading4', 'Content4', 'C++', 'Topic1', 4, 7),
(180, 'Heading5', 'Content5', 'C++', 'Topic1', 4, 7),

(100, 'Heading1', 'Content1', '.NET', 'Topic2', 4, 8),
(120, 'Heading2', 'Content2', '.NET', 'Topic2', 4, 8),
(140, 'Heading3', 'Content3', '.NET', 'Topic2', 4, 8),
(160, 'Heading4', 'Content4', '.NET', 'Topic2', 4, 8),
(180, 'Heading5', 'Content5', '.NET', 'Topic2', 4, 8);
