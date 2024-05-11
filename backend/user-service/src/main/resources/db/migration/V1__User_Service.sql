CREATE TABLE IF NOT EXISTS Contiq_Bootcamp.user (
    id int NOT NULL AUTO_INCREMENT,
    name varchar(254) NOT NULL,
    email varchar(254) NOT NULL,
    password varchar(254) NOT NULL,
    notification_count int DEFAULT 0 NOT NULL,
    PRIMARY KEY (id),
    UNIQUE KEY email (email)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;