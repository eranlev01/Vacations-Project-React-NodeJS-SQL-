CREATE DATABASE Travely;

USE Travely;

CREATE TABLE users(
	id INT AUTO_INCREMENT,
    isAdmin BOOLEAN DEFAULT FALSE,
    f_name VARCHAR(255) NOT NULL,
    l_name VARCHAR(255) NOT NULL,
    u_name VARCHAR(255) NOT NULL,
    password TEXT(255) NOT NULL,
    PRIMARY KEY(id)
);


CREATE TABLE vacations(
	id INT AUTO_INCREMENT,
    destination VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    img_url TEXT,
    from_date DATE,
    until_date DATE,
    price INT,
    PRIMARY KEY(id)
);

INSERT INTO vacations(destination, description, img_url, from_date, until_date, price)
VALUES('Orlando', 'A destination where children and grownups alike can enjoy once-in-alifetime expriences.',
'https://cdn.pixabay.com/photo/2014/01/05/13/22/walt-disney-world-239144_1280.jpg','2020-07-10','2020-07-20',1280),
('Cancun', 'From Mayan ruins to 5-star oceanside resorts, this paradise will transport you bliss.',
'https://cdn.pixabay.com/photo/2016/03/10/21/16/cancun-1249301_1280.jpg','2020-06-15','2020-06-23',1500),
('Miami', "One of the world's liveliest, most popular vacation spots with enticements for everyone for everyone.",
'https://images.unsplash.com/photo-1571041804726-53e8bf082096?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80','2020-09-20','2020-09-27',1350),
('London', "London is a diverse and exciting city with some of the world's best sights, attractions and activities. With so much to do, it's hard to narrow down the long list of reasons to visit, but below you'll find our top 10.",
'https://cdn.pixabay.com/photo/2014/11/13/23/34/london-530055_1280.jpg','2020-05-05','2020-05-15',800);



CREATE TABLE followers(
	id INT AUTO_INCREMENT,
	u_id INT NOT NULL,
    v_id INT NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY(u_id) REFERENCES users(id) ON DELETE CASCADE,
	FOREIGN KEY(v_id) REFERENCES vacations(id) ON DELETE CASCADE
)