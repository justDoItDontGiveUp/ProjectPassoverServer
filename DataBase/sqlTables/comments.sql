CREATE TABLE comments (
    id INT AUTO_INCREMENT,
    postId INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL,
    body TEXT NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY (postId) REFERENCES posts(id)
 
);
