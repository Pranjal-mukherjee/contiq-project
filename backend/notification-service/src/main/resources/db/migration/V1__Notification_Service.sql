CREATE TABLE IF NOT EXISTS Contiq_Bootcamp.notification (
    id int NOT NULL AUTO_INCREMENT,
    created_at datetime NOT NULL,
    user_id int NOT NULL,
     message varchar(554) NOT NULL,
   is_read boolean  NOT NULL,
    PRIMARY KEY (id)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;