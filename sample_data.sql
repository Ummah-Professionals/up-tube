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
INSERT INTO Videos (title, user_id, duration_seconds, time_uploaded, thumbnail, video_path, num_views, description)
SELECT
    'Video Title ' || i,
    (SELECT id FROM Users ORDER BY RANDOM() LIMIT 1),
    FLOOR(RANDOM() * 600 + 60), -- Duration between 60 and 660 seconds
    NOW() - INTERVAL '1 day' * FLOOR(RANDOM() * 365), -- Random date within the last year
    'https://picsum.photos/' || i || '/10/200/300',
    CASE
        WHEN i % 10 = 1 THEN 'https://www.w3schools.com/html/mov_bbb.mp4'
        WHEN i % 10 = 2 THEN 'https://www.w3schools.com/html/movie.mp4'
        WHEN i % 10 = 3 THEN 'https://www.w3schools.com/html/mov_bbb.mp4'
        WHEN i % 10 = 4 THEN 'https://www.w3schools.com/html/movie.mp4'
        WHEN i % 10 = 5 THEN 'https://www.w3schools.com/html/mov_bbb.mp4'
        WHEN i % 10 = 6 THEN 'https://www.w3schools.com/html/movie.mp4'
        WHEN i % 10 = 7 THEN 'https://www.w3schools.com/html/mov_bbb.mp4'
        WHEN i % 10 = 8 THEN 'https://www.w3schools.com/html/movie.mp4'
        WHEN i % 10 = 9 THEN 'https://www.w3schools.com/html/mov_bbb.mp4'
        ELSE 'https://www.w3schools.com/html/movie.mp4'
    END,
    FLOOR(RANDOM() * 10000), -- Random number of views between 0 and 9999
    'This is the description for video ' || i
FROM generate_series(1, 500) AS s(i);
