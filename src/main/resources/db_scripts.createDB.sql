create schema if not exists funny_login;

use funny_login;

create table if not exists service_user (
    id int primary key not null auto_increment,
    username varchar(100) not null,
    password varchar(100) not null,
    phone varchar(10) not null
);

