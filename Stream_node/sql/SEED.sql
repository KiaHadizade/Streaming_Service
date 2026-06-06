USE StreamDB

-- *********
-- SEED DATA
-- *********

-- Users
INSERT INTO Users (username, password, email, name, last_name, role) VALUES
('kia_hdzd', '9999', 'kia@gmail.com', 'Amirhossein', 'Hadizade', 'admin'),
('ali_nj', '8888', 'ali@gmail.com', 'Ali', 'Najafi', 'admin'),
('ashkan_mo', '1234', 'ashkan@gmail.com', 'Ashkan', 'Mohammadi', 'user'),
('fatima_sz', '1234', 'fatima@gmail.com', 'Fatima', 'Sadeghzadeh', 'user'),
('saeed_ab', '333', 'saeed@gmail.com', 'Saeed', 'Abbasi', 'user')


-- Content
INSERT INTO Content (title, description, release_year, score, type, duration, status) VALUES
('Inception', 'A mind-bending sci-fi thriller about dreams', 2010, 8.8, 'movie', 148, 'Finished'),
('Interstellar', 'A journey through space and time to save humanity', 2014, 8.6, 'movie', 169, 'Finished'),
('The Dark Knight', 'Batman faces the Joker in Gotham City', 2008, 9.0, 'movie', 152, 'Finished'),
('Parasite', 'A dark comedy thriller about social class', 2019, 8.6, 'movie', 132, 'Finished'),
('The Matrix', 'A hacker discovers the truth about reality', 1999, 8.7, 'movie', 136, 'Finished'),
('Breaking Bad', 'A chemistry teacher turns into a drug lord', 2008, 9.5, 'series', 47, 'Finished'),
('Game of Thrones', 'Noble families fight for control of the throne', 2011, 9.2, 'series', 55, 'Finished'),
('Stranger Things', 'Supernatural events in a small town', 2016, 8.7, 'series', 50, 'Finished'),
('The Witcher', 'A monster hunter in a dark fantasy world', 2019, 8.1, 'series', 60, 'Ongoing'),
('The Odyssey', 'Odysseus, king of Ithaca, embarks on a perilous journey to return home after the Trojan war', 2026, 7.7, 'movie', 85, 'Upcoming'),
('Avengers: Doomsday', 'Groups of heroes from different universe converge to face the existential threat of Doctor Doom', 2026, 9.2, 'movie', 120, 'Upcoming'),
('Sherlock', 'A modern adaptation of Sherlock Holmes', 2010, 9.1, 'series', 90, 'Finished')

-- Genre
INSERT INTO Genre (name) VALUES
('Action'),
('Adventure'),
('Comedy'),
('Drama'),
('Thriller'),
('Sci-Fi'),
('Fantasy'),
('Horror'),
('Mystery'),
('Romance'),
('Crime'),
('Animation'),
('Documentary'),
('Family')

-- Actor
INSERT INTO Actor (first_name, last_name, birth_date, bio) VALUES
('Leonardo', 'DiCaprio', '1974-11-11', 'American actor known for dramatic and intense roles'),
('Joseph', 'Gordon-Levitt', '1981-02-17', 'American actor and filmmaker'),
('Christian', 'Bale', '1974-01-30', 'Welsh actor famous for portraying Batman'),
('Heath', 'Ledger', '1979-04-04', 'Australian actor best known for The Dark Knight'),
('Keanu', 'Reeves', '1964-09-02', 'Canadian actor known for action and sci-fi films'),
('Bryan', 'Cranston', '1956-03-07', 'American actor known for Breaking Bad'),
('Aaron', 'Paul', '1979-08-27', 'American actor portraying Jesse Pinkman'),
('Emilia', 'Clarke', '1986-10-23', 'English actress known for Game of Thrones'),
('Henry', 'Cavill', '1983-05-05', 'British actor known for The Witcher and Superman'),
('Benedict', 'Cumberbatch', '1976-07-19', 'English actor known for Sherlock'),
('Matthew', 'McConaughey', '1969-11-04', '...'),
('Timothee', 'Chalamet', '1995-12-27', 'American-French actor known for playing Dune'),
('Cho', 'Yeo-jeong', '1981-02-10', 'South Korean actress'),
('Millie', 'Bobby Brown', '2004-02-19', 'A British actress who gained international recognition for playing Eleven'),
('Finn', 'Wolfhard', '2002-12-23', 'Canadian actor and musician'),
('Matt', 'Damon', '1970-10-08', 'American actor and film producer who was one of the highest-grossing actors of all time'),
('Anne', 'Hathaway', '1982-11-12', 'American actress who was among the worlds highest-paid actresses in 2015'),
('Chris', 'Evans', '1981-06-13', 'American actor known for portraying Steve Rogers / Capitan America'),
('Robert', 'Downey Jr.', '1965-04-04', 'American actor known for portraying Iron Man / Tonny Stark')

-- Categorized_as - (ContentGenre)
INSERT INTO Categorized_as (content_id, genre_id) VALUES
-- Inception
(1, 1),  -- Action
(1, 5),  -- Thriller
(1, 6),  -- Sci-Fi
-- Interstellar
(2, 2),  -- Adventure
(2, 4),  -- Drama
(2, 6),  -- Sci-Fi
-- The Dark Knight
(3, 1),  -- Action
(3, 5),  -- Thriller
(3, 11), -- Crime
-- Parasite
(4, 4),  -- Drama
(4, 5),  -- Thriller
-- The Matrix
(5, 1),  -- Action
(5, 6),  -- Sci-Fi
-- Breaking Bad
(6, 4),  -- Drama
(6, 11), -- Crime
-- Game of Thrones
(7, 2),  -- Adventure
(7, 4),  -- Drama
(7, 7),  -- Fantasy
-- Stranger Things
(8, 6),  -- Sci-Fi
(8, 8),  -- Horror
(8, 9),  -- Mystery
-- The Witcher
(9, 1),  -- Action
(9, 7),  -- Fantasy
-- The Odyssey
(10, 1), -- Action
(10, 7),  -- Fantasy
-- Avengers: Doomsday
(11, 6), -- Sci-Fi
(11, 1), -- Action
-- Sherlock
(12, 9), -- Mystery
(12, 11)-- Crime


-- performed_by - (ContentActor)
INSERT INTO Performed_by (content_id, actor_id) VALUES
-- Inception
(1, 1),		-- Leonardo DiCaprio
(1, 2),		-- Joseph Gordon-Levitt
-- Interstellar
(2, 11),	-- Matthew MacConaughey
(2, 12),	-- Timothee Chalamet
-- The Dark Knight
(3, 3),		-- Christian Bale
(3, 4),		-- Heath Ledger
-- Parasite
(4, 13),	-- Cho Yeo-jeong
-- The Matrix
(5, 5),		-- Keanu Reeves
-- Breaking Bad
(6, 6),		-- Bryan Cranston
(6, 7),		-- Aaron Paul
-- Game of Thrones
(7, 8),		-- Emilia Clarke
-- Stranger Things
(8, 14),	-- Millie Bobby Brown
(8, 15),	-- Finn Wolfhard
-- The Witcher
(9, 9),		-- Henry Cavill
-- The Odyssey
(10, 16),	-- Matt Damon
(10, 17),	-- Anne Hathaway
-- Avengers: Doomsday
(11, 18),	-- Chris Evans
(11, 19),	-- Robert Downey Jr.
-- Sherlock
(12, 10)	-- Benedict Cumberbatch

-- SubscriptionPlan
INSERT INTO SubscriptionPlan (plan_name, duration, price) VALUES
('Basic', 30, 5.99),
('Standard', 30, 9.99),
('Premium', 30, 14.99)

-- Subscription
INSERT INTO Subscription (user_id, plan_id, start_date, end_date, status) VALUES
(3, 1, '2025-11-15', '2025-12-15', 'expired'),
(4, 2, '2025-12-10', '2026-01-09', 'active'),
(5, 3, '2025-07-01', '2025-12-28', 'cancelled')

-- Payment
INSERT INTO Payment (subscription_id, amount, status, payment_method, transaction_id, paid_at) VALUES
(1, 9.99, 'completed', 'credit_card', 'TXN10001', '2025-11-15 10:00:00'),
(2, 9.99, 'completed', 'paypal', 'TXN10002', '2025-12-10 14:30:00'),
(3, 59.99, 'failed', 'bank_transfer', 'TXN10003', NULL)

-- Rating
INSERT INTO Rating (user_id, content_id, rating) VALUES
(3, 1, 9),	-- Ashkan -> Inception
(3, 6, 10),	-- Ashkan -> Breaking Bad
(4, 2, 8),	-- Fatima -> Interstellar
(4, 7, 9),	-- Fatima -> Game of Thrones
(5, 3, 10),	-- Saeed -> The Dark Knight
(5, 8, 8)	-- Saeed -> Stranger Things

-- Review
INSERT INTO Review (user_id, content_id, comment) VALUES
(3, 1, 'Amazing movie with mind-bending plot!'),			-- Ashkan -> Inception
(4, 2, 'Great visuals and story, but a bit long.'),			-- Fatima -> Interstellar
(5, 3, 'Best Batman movie ever!'),							-- Saeed -> The Dark Knight
(3, 6, 'Breaking Bad is a masterpiece.'),					-- Ashkan -> Breaking Bad
(4, 7, 'Game of Thrones kept me on the edge of my seat.')	-- Fatima -> Game of Thrones

INSERT INTO Review (user_id, content_id, parent_id, comment) VALUES
(5, 1, 1, 'Totally agree! The ending blew my mind.')	-- Saeed -> Inception -> 'Amazing movie with mind-bending plot!'

-- Favorites
INSERT INTO Favorites (user_id, content_id) VALUES
(3, 1),		-- Ashkan -> Inception
(3, 6),		-- Ashkan -> Breaking Bad
(4, 2),		-- Fatima -> Interstellar
(4, 7),		-- Fatima -> Game of Thrones
(5, 3),		-- Saeed -> The Dark Knight
(5, 8)		-- Saeed -> Stranger Things

-- Episode
INSERT INTO Episode (content_id, season_number, episode_number, title, description, duration, release_date) VALUES
(6, 1, 1, 'Pilot', 'Introduction to Walter White and his family', 58, '2008-01-20'),						-- Breaking Bad S01E01
(6, 1, 2, 'Cat''s in the Bag...', 'Walter deals with the consequences of his actions', 48, '2008-01-27'),	-- Breaking Bad S01E02
(7, 1, 1, 'Winter Is Coming', 'Noble families are introduced', 62, '2011-04-17'),							-- GoT S01E01
(7, 1, 2, 'The Kingsroad', 'The journey begins', 56, '2011-04-24'),											-- GoT S01E02
(8, 1, 1, 'Chapter One: The Vanishing', 'Will disappears mysteriously', 47, '2016-07-15'),					-- Stranger Things S01E01
(8, 1, 2, 'Chapter Two: The Weirdo', 'New characters appear', 55, '2016-07-15'),							-- Stranger Things S01E02
(9, 1, 1, 'The End''s Beginning', 'Geralt fights monsters', 60, '2019-12-20'),								-- The Witcher S01E01
(9, 1, 2, 'Four Marks', 'Geralt faces political intrigue', 60, '2019-12-27'),								-- The Witcher S01E02
(12, 1, 1, 'A Study in Pink', 'Sherlock investigates a mysterious case', 90, '2010-07-25')					-- Sherlock S01E01

-- History
INSERT INTO History (user_id, content_id, episode_id, watched_at) VALUES
(3, 1, NULL, '2025-12-01 20:00:00'),	-- Ashkan -> Inception
(3, 6, 1, '2025-12-05 18:30:00'),		-- Ashkan -> Breaking Bad S01E01
(3, 6, 2, '2025-12-05 19:30:00'),		-- Ashkan -> Breaking Bad S01E02
(4, 2, NULL, '2025-12-02 21:00:00'),	-- Fatima -> Interstellar
(4, 7, 1, '2025-12-06 19:00:00'),		-- Fatima -> GoT S01E01
(4, 7, 2, '2025-12-06 20:00:00'),		-- Fatima -> GoT S01E02
(5, 3, NULL, '2025-12-03 22:00:00'),	-- Saeed -> The Dark Knight
(5, 8, 1, '2025-12-07 20:30:00'),		-- Saeed -> Stranger Things S01E01
(5, 8, 2, '2025-12-07 21:30:00')		-- Saeed -> Stranger Things S01E02

-- Download
INSERT INTO Download (user_id, content_id, episode_id, quality, size, download_link) VALUES
(3, 1, NULL, '1080p', 1500, 'https://streaming.com/download/inception_1080p.mp4'),		-- Ashkan -> Inception
(3, 6, 1, '720p', 800, 'https://streaming.com/download/bb_s1e1_720p.mp4'),				-- Ashkan -> Breaking Bad S01E01
(3, 6, 2, '720p', 820, 'https://streaming.com/download/bb_s1e2_720p.mp4'),				-- Ashkan -> Breaking Bad S01E02
(4, 2, NULL, '1080p', 1600, 'https://streaming.com/download/interstellar_1080p.mp4'),	-- Fatima -> Interstellar
(4, 7, 1, '720p', 900, 'https://streaming.com/download/got_s1e1_720p.mp4'),				-- Fatima -> GoT S01E01
(4, 7, 2, '720p', 880, 'https://streaming.com/download/got_s1e2_720p.mp4'),				-- Fatima -> GoT S01E02
(5, 3, NULL, '1080p', 1450, 'https://streaming.com/download/darkknight_1080p.mp4'),		-- Saeed -> The Dark Knight
(5, 8, 1, '720p', 850, 'https://streaming.com/download/stranger_s1e1_720p.mp4'),		-- Saeed -> Stranger Things S01E01
(5, 8, 2, '720p', 870, 'https://streaming.com/download/stranger_s1e2_720p.mp4');		-- Saeed -> Stranger Things S01E02