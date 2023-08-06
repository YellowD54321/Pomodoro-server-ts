CREATE DATABASE IF NOT EXISTS pomodoro;

CREATE TABLE IF NOT EXISTS `pomodoro`.`users` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `google_id` INT,
    PRIMARY KEY(`id`)
);