/*  Execute this file from the command line by typing:
 *    sqlite3 items.db < schema.sql
 *  to create the database and the tables.*/
DROP DATABASE IF EXISTS grocerylist;
CREATE DATABASE grocerylist;

USE grocerylist;

CREATE TABLE list (
  id int not null auto_increment primary key,
  name varchar(255) not null unique,
  quantity int not null
);
