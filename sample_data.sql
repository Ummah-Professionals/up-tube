-- Empty the database tables before repopulating them
TRUNCATE TABLE Users RESTART IDENTITY CASCADE;
TRUNCATE TABLE Videos RESTART IDENTITY CASCADE;

-- Create sample data for Users table with alternating profile picture URLs
INSERT INTO Users (username, profile_pic_path)
SELECT
    'user_' || i,
    CASE
        WHEN i % 2 = 1 THEN 'https://randomuser.me/api/portraits/men/' || i || '.jpg'
        ELSE 'https://randomuser.me/api/portraits/women/' || i || '.jpg'
    END
FROM generate_series(1, 100) AS s(i);

-- Create sample data for Videos table with real URLs for thumbnails and video paths
WITH RandomUsers AS (
    SELECT id AS user_id,
           ROW_NUMBER() OVER () AS rn
    FROM Users
    ORDER BY RANDOM()
),
VideoData AS (
    SELECT
        'Video Title ' || s.i AS title,
        ru.user_id,
        FLOOR(RANDOM() * 600 + 60) AS duration_seconds, -- Duration between 60 and 660 seconds
        NOW() - INTERVAL '1 day' * FLOOR(RANDOM() * 365) AS time_uploaded, -- Random date within the last year
        'https://loremflickr.com/200/200?random=' || s.i AS thumbnail,
        CASE
            WHEN s.i % 10 = 1 THEN 'https://www.w3schools.com/html/mov_bbb.mp4'
            WHEN s.i % 10 = 2 THEN 'https://www.w3schools.com/html/movie.mp4'
            WHEN s.i % 10 = 3 THEN 'https://www.w3schools.com/html/mov_bbb.mp4'
            WHEN s.i % 10 = 4 THEN 'https://www.w3schools.com/html/movie.mp4'
            WHEN s.i % 10 = 5 THEN 'https://www.w3schools.com/html/mov_bbb.mp4'
            WHEN s.i % 10 = 6 THEN 'https://www.w3schools.com/html/movie.mp4'
            WHEN s.i % 10 = 7 THEN 'https://www.w3schools.com/html/mov_bbb.mp4'
            WHEN s.i % 10 = 8 THEN 'https://www.w3schools.com/html/movie.mp4'
            WHEN s.i % 10 = 9 THEN 'https://www.w3schools.com/html/mov_bbb.mp4'
            ELSE 'https://www.w3schools.com/html/movie.mp4'
        END AS video_path,
        FLOOR(RANDOM() * 10000) AS num_views, -- Random number of views between 0 and 9999
        'This is the description for video ' || s.i AS description,
        ROW_NUMBER() OVER () AS row_num
    FROM generate_series(1, 500) AS s(i)
    CROSS JOIN RandomUsers ru
    WHERE ru.rn = (s.i % (SELECT COUNT(*) FROM RandomUsers) + 1)
)
INSERT INTO Videos (title, user_id, duration_seconds, time_uploaded, thumbnail, video_path, num_views, description)
SELECT title, user_id, duration_seconds, time_uploaded, thumbnail, video_path, num_views, description
FROM VideoData;
