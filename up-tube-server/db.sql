
CREATE TABLE Users (
    id UUID PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    profile_pic_path VARCHAR(255)
);

CREATE TABLE Videos (
    id UUID PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    user_id UUID REFERENCES Users(id),
    duratiion_seconds INT NOT NULL,
    time_uploaded TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    thumbnail VARCHAR(255),
    vidoe_path VARCHAR(255) NOT NULL,
    num_of_views INT DEFAULT 0,
    description TEXT
);