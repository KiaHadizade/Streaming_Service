USE StreamDB

-- ************************************************
-- Drop Tables in Dependency Order (Children First)
-- ************************************************

DROP TABLE IF EXISTS History
DROP TABLE IF EXISTS Review
DROP TABLE IF EXISTS Rating
DROP TABLE IF EXISTS Performed_by
DROP TABLE IF EXISTS Categorized_as
DROP TABLE IF EXISTS Genre
DROP TABLE IF EXISTS Actor
DROP TABLE IF EXISTS Favorites
DROP TABLE IF EXISTS Payment
DROP TABLE IF EXISTS Subscription
DROP TABLE IF EXISTS SubscriptionPlan
DROP TABLE IF EXISTS Download
DROP TABLE IF EXISTS Episode
DROP TABLE IF EXISTS Content

-- ***************
-- Creating Tables
-- ***************

-- 1. Users
DROP TABLE IF EXISTS Users
CREATE TABLE Users (
    user_id INT NOT NULL IDENTITY(1,1),
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    role VARCHAR(10) NOT NULL DEFAULT 'user',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id)
)
-- CHECK constraint for User's role column
ALTER TABLE Users ADD CONSTRAINT CK_Users_Role CHECK (role IN ('user', 'admin'))

-- 2. Content
DROP TABLE IF EXISTS Content
CREATE TABLE Content (
	content_id INT NOT NULL IDENTITY(1,1),
    title VARCHAR(255) NOT NULL,
    description VARCHAR(MAX), -- Or TEXT
    release_year INT, -- Or SMALLINT
    score DECIMAL(3,1),
    type VARCHAR(10) NOT NULL DEFAULT 'movie',
    duration INT NULL,
    status VARCHAR(10) DEFAULT 'finished',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (content_id)
)
-- CHECK constraint for Content's type & status column
ALTER TABLE Content ADD CONSTRAINT CK_Content_Type CHECK (type IN ('movie', 'series'))
ALTER TABLE Content ADD CONSTRAINT CK_Content_Status CHECK (status IN ('finished', 'ongoing', 'upcoming'))

-- 3. Genre
DROP TABLE IF EXISTS Genre
CREATE TABLE Genre (
	genre_id INT NOT NULL IDENTITY(1,1),
    name VARCHAR(50) NOT NULL UNIQUE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (genre_id)
)

-- 4. Actor
DROP TABLE IF EXISTS Actor
CREATE TABLE Actor (
    actor_id INT IDENTITY(1,1),
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    birth_date DATE,
    bio VARCHAR(MAX), -- Or TEXT
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (actor_id)
)

-- 5. SubscriptionPlan
DROP TABLE IF EXISTS SubscriptionPlan
CREATE TABLE SubscriptionPlan (
    plan_id INT IDENTITY(1,1),
    plan_name VARCHAR(20) UNIQUE,
    duration INT NOT NULL,
    price DECIMAL(8,2) NOT NULL,

    PRIMARY KEY(plan_id)
)

-- 6. Subscription
DROP TABLE IF EXISTS Subscription
CREATE TABLE Subscription (
    subscription_id INT IDENTITY(1,1),
    user_id INT NOT NULL,
    plan_id INT NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
	status VARCHAR(10) DEFAULT 'pending',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (subscription_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY(plan_id) REFERENCES SubscriptionPlan(plan_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
)
-- CHECK constraint for Subscription's status column
ALTER TABLE Subscription ADD CONSTRAINT CK_Subscription_Status CHECK (status IN ('active','expired','cancelled','pending'))

-- 7.Episode
DROP TABLE IF EXISTS Episode
CREATE TABLE Episode (
	episode_id INT IDENTITY(1,1),
    content_id INT NOT NULL,
    season_number INT NOT NULL,
    episode_number INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    duration INT NOT NULL,
    release_date DATE,
    added_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (episode_id),
    UNIQUE (content_id, season_number, episode_number),
    FOREIGN KEY (content_id) REFERENCES Content(content_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
)

-- 8. Review
DROP TABLE IF EXISTS Review
CREATE TABLE Review (
    review_id INT IDENTITY(1,1),
    user_id INT NOT NULL,
    content_id INT NOT NULL,
    parent_id INT DEFAULT NULL,
    comment VARCHAR(MAX) NOT NULL, -- Or TEXT
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    edited_at DATETIME NULL,
    PRIMARY KEY (review_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (content_id) REFERENCES Content(content_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (parent_id) REFERENCES Review(review_id)
        ON DELETE NO ACTION -- (ON DELETE SET NULL) When a Review is deleted, keep replies but set parent_id = NULL
        ON UPDATE NO ACTION
)

-- 9. Payment
DROP TABLE IF EXISTS Payment
CREATE TABLE Payment (
    payment_id INT IDENTITY(1,1),
    subscription_id INT NOT NULL,
    amount DECIMAL(8,2) NOT NULL,
    status VARCHAR(10) DEFAULT 'pending',
    payment_method VARCHAR(15) DEFAULT 'credit_card',
    transaction_id VARCHAR(100) DEFAULT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    paid_at DATETIME NULL,
	PRIMARY KEY (payment_id),
    FOREIGN KEY (subscription_id) REFERENCES Subscription(subscription_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
)
-- CHECK constraint for Payment's method & status column
ALTER TABLE Payment ADD CONSTRAINT CK_Payment_Status CHECK (status IN ('pending','completed','failed'))
ALTER TABLE Payment ADD CONSTRAINT CK_Payment_Method CHECK (payment_method IN ('credit_card','paypal','bank_transfer','other'))

-- 10. Rating
DROP TABLE IF EXISTS Rating
CREATE TABLE Rating (
    user_id INT NOT NULL,
    content_id INT NOT NULL,
    rating TINYINT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, content_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (content_id) REFERENCES Content(content_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    CHECK (rating BETWEEN 1 AND 10)
)

-- 11. Favorites
DROP TABLE IF EXISTS Favorites
CREATE TABLE Favorites (
    user_id INT NOT NULL,
    content_id INT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, content_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (content_id) REFERENCES Content(content_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
)

-- 12. History
DROP TABLE IF EXISTS History
CREATE TABLE History (
    history_id INT IDENTITY(1,1),
    user_id INT NOT NULL,
    content_id INT NOT NULL,
    episode_id INT DEFAULT NULL,
    watched_at DATETIME DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (history_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (content_id) REFERENCES Content(content_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (episode_id) REFERENCES Episode(episode_id)
        ON DELETE NO ACTION
        ON UPDATE NO ACTION
)

-- 13. Download
DROP TABLE IF EXISTS Download
CREATE TABLE Download (
    download_id INT IDENTITY(1,1),
    user_id INT NOT NULL,
    content_id INT DEFAULT NULL,
    episode_id INT DEFAULT NULL,
    quality VARCHAR(10) NOT NULL DEFAULT '720p',
    size INT NOT NULL,
    download_link VARCHAR(255) NOT NULL,
    downloaded_at DATETIME DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (download_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (content_id) REFERENCES Content(content_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (episode_id) REFERENCES Episode(episode_id)
        ON DELETE NO ACTION
        ON UPDATE NO ACTION
)
-- CHECK constraint for Download's quality column
ALTER TABLE Download ADD CONSTRAINT CK_Download_quality CHECK (quality IN ('480p','720p','1080p','4K'))

-- 14. Categorized_as - (ContentGenre)
DROP TABLE IF EXISTS Categorized_as
CREATE TABLE Categorized_as (
    content_id INT NOT NULL,
    genre_id INT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (content_id, genre_id),
    FOREIGN KEY (content_id) REFERENCES Content(content_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (genre_id) REFERENCES Genre(genre_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
)

-- 15. Performed_by - (ContentActor)
DROP TABLE IF EXISTS Performed_by
CREATE TABLE Performed_by (
    content_id INT NOT NULL,
    actor_id INT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (content_id, actor_id),
    FOREIGN KEY (content_id) REFERENCES Content(content_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (actor_id) REFERENCES Actor(actor_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
)
