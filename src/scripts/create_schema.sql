CREATE DATABASE IF NOT EXISTS pomodoro;

CREATE TABLE IF NOT EXISTS `pomodoro`.`users` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `google_id` INT,
    PRIMARY KEY(`id`)
);

CREATE TABLE IF NOT EXISTS `pomodoro`.`durations` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `start_time` DATETIME NOT NULL,
    `end_time` DATETIME,
    `interrupt_times` INT DEFAULT 0,
    `focus_seconds` INT DEFAULT 0,
    `type` ENUM('work', 'rest', 'pause'),
    `description` VARCHAR(200) DEFAULT '',
    PRIMARY KEY(`id`)
);