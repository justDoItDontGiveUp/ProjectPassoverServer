CREATE TABLE comments (
    id INT PRIMARY KEY,
    postId INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL,
    body TEXT NOT NULL
);