CREATE TABLE posts (
    id INT PRIMARY KEY,
    userId INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    body TEXT NOT NULL
);