CREATE TABLE passwords (
    userId INT PRIMARY KEY,
    password VARCHAR(100) NOT NULL,
    FOREIGN KEY (userId) REFERENCES users(id)
);
