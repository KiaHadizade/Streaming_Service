USE StreamDB

-- ************************************************
-- Drop Tables in Dependency Order (Children First)
-- ************************************************

DROP TABLE IF EXISTS WatchHistory
DROP TABLE IF EXISTS Review
DROP TABLE IF EXISTS Rating
DROP TABLE IF EXISTS ContentActor
DROP TABLE IF EXISTS ContentGenre
DROP TABLE IF EXISTS Genre
DROP TABLE IF EXISTS Actor
DROP TABLE IF EXISTS UserFavorite
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
    role VARCHAR(10) NOT NULL CHECK (role IN ('user', 'admin')) DEFAULT 'user',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id)
)

-- 2. Content
DROP TABLE IF EXISTS Content
CREATE TABLE Content (
	content_id INT NOT NULL IDENTITY(1,1),
    title VARCHAR(255) NOT NULL,
    description VARCHAR(MAX), -- Or TEXT
    release_year INT NOT NULL CHECK (release_year >= 1888 AND release_year <= YEAR(GETDATE()) + 5), -- Or SMALLINT
    score DECIMAL(3,1) CHECK (score BETWEEN 0 AND 10),
    type VARCHAR(10) NOT NULL CHECK (type IN ('movie', 'series')) DEFAULT 'movie',
    duration INT NULL,
    status VARCHAR(10) CHECK (status IN ('finished', 'ongoing', 'upcoming')) DEFAULT 'finished',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (content_id)
)
-- CHECK constraint
ALTER TABLE Content ADD CONSTRAINT CK_Content_duration CHECK((type = 'movie' AND duration > 0) OR (type = 'series'))

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
	UNIQUE(first_name, last_name, birth_date),
    PRIMARY KEY (actor_id)
)

-- 5. SubscriptionPlan
DROP TABLE IF EXISTS SubscriptionPlan
CREATE TABLE SubscriptionPlan (
    plan_id INT IDENTITY(1,1),
    plan_name VARCHAR(20) UNIQUE NOT NULL,
    duration INT NOT NULL CHECK (duration > 0),
    price DECIMAL(8,2) NOT NULL CHECK (price >= 0),
    PRIMARY KEY(plan_id)
)

-- 6. Subscription
DROP TABLE IF EXISTS Subscription
CREATE TABLE Subscription (
    subscription_id INT IDENTITY(1,1),
    user_id INT NOT NULL,
    plan_id INT NOT NULL,
	plan_price DECIMAL(8,2) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
	status VARCHAR(10) NOT NULL CHECK (status IN ('active','expired','cancelled','pending')) DEFAULT 'pending',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (subscription_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
        ON DELETE CASCADE,
    FOREIGN KEY(plan_id) REFERENCES SubscriptionPlan(plan_id)
)
-- CHECK constraint
ALTER TABLE Subscription ADD CONSTRAINT CK_Subscription_end_date CHECK (end_date > start_date)

-- 7.Episode
DROP TABLE IF EXISTS Episode
CREATE TABLE Episode (
	episode_id INT IDENTITY(1,1),
    content_id INT NOT NULL,
    season_number INT NOT NULL,
    episode_number INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description VARCHAR(MAX),
    duration INT NOT NULL,
    release_date DATE,
    added_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (episode_id),
    UNIQUE (content_id, season_number, episode_number),
    FOREIGN KEY (content_id) REFERENCES Content(content_id)
        ON DELETE CASCADE
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
        ON DELETE CASCADE,
    FOREIGN KEY (content_id) REFERENCES Content(content_id)
        ON DELETE CASCADE,
    FOREIGN KEY (parent_id) REFERENCES Review(review_id)
        ON DELETE NO ACTION -- (ON DELETE SET NULL) When a Review is deleted, keep replies but set parent_id = NULL
)

-- 9. Payment
DROP TABLE IF EXISTS Payment
CREATE TABLE Payment (
    payment_id INT IDENTITY(1,1),
    subscription_id INT NOT NULL,
    amount DECIMAL(8,2) NOT NULL CHECK (amount >= 0),
    status VARCHAR(10) CHECK (status IN ('pending', 'completed', 'failed')) DEFAULT 'pending',
    payment_method VARCHAR(15) CHECK (payment_method IN ('credit_card', 'paypal', 'bank_transfer', 'other')) DEFAULT 'credit_card',
    transaction_id VARCHAR(100) DEFAULT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    paid_at DATETIME NULL,
	PRIMARY KEY (payment_id),
    FOREIGN KEY (subscription_id) REFERENCES Subscription(subscription_id)
        ON DELETE CASCADE
)

-- 10. Rating
DROP TABLE IF EXISTS Rating
CREATE TABLE Rating (
    user_id INT NOT NULL,
    content_id INT NOT NULL,
    rating TINYINT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, content_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
        ON DELETE CASCADE,
    FOREIGN KEY (content_id) REFERENCES Content(content_id)
        ON DELETE CASCADE,
    CHECK (rating BETWEEN 1 AND 10)
)

-- 11. UserFavorite
DROP TABLE IF EXISTS UserFavorite
CREATE TABLE UserFavorite (
    user_id INT NOT NULL,
    content_id INT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, content_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
        ON DELETE CASCADE,
    FOREIGN KEY (content_id) REFERENCES Content(content_id)
        ON DELETE CASCADE
)

-- 12. WatchHistory
DROP TABLE IF EXISTS WatchHistory
CREATE TABLE WatchHistory (
    history_id INT IDENTITY(1,1),
    user_id INT NOT NULL,
    content_id INT NOT NULL,
    episode_id INT DEFAULT NULL,
    watched_at DATETIME DEFAULT CURRENT_TIMESTAMP,
	--UNIQUE(user_id, content_id, episode_id),
	PRIMARY KEY (history_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
        ON DELETE CASCADE,
    FOREIGN KEY (content_id) REFERENCES Content(content_id)
        ON DELETE CASCADE,
    FOREIGN KEY (episode_id) REFERENCES Episode(episode_id)
        ON DELETE NO ACTION
)

-- 13. Download
DROP TABLE IF EXISTS Download
CREATE TABLE Download (
    download_id INT IDENTITY(1,1),
    user_id INT NOT NULL,
    content_id INT DEFAULT NULL,
    episode_id INT DEFAULT NULL,
    quality VARCHAR(10) NOT NULL CHECK (quality IN ('480p','720p','1080p','4K')) DEFAULT '720p',
    size INT NOT NULL CHECK (size > 0),
    download_link VARCHAR(255) NOT NULL,
    downloaded_at DATETIME DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (download_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
        ON DELETE CASCADE,
    FOREIGN KEY (content_id) REFERENCES Content(content_id)
        ON DELETE CASCADE,
    FOREIGN KEY (episode_id) REFERENCES Episode(episode_id)
        ON DELETE NO ACTION
)
-- CHECK constraint
ALTER TABLE Download ADD CONSTRAINT CK_Download_download CHECK (
    content_id IS NOT NULL
    OR
    episode_id IS NOT NULL
)

-- 14. ContentGenre
DROP TABLE IF EXISTS ContentGenre
CREATE TABLE ContentGenre (
    content_id INT NOT NULL,
    genre_id INT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (content_id, genre_id),
    FOREIGN KEY (content_id) REFERENCES Content(content_id)
        ON DELETE CASCADE,
    FOREIGN KEY (genre_id) REFERENCES Genre(genre_id)
        ON DELETE CASCADE
)

-- 15. ContentActor
DROP TABLE IF EXISTS ContentActor
CREATE TABLE ContentActor (
    content_id INT NOT NULL,
    actor_id INT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (content_id, actor_id),
    FOREIGN KEY (content_id) REFERENCES Content(content_id)
        ON DELETE CASCADE,
    FOREIGN KEY (actor_id) REFERENCES Actor(actor_id)
        ON DELETE CASCADE
)
