CREATE TABLE IF NOT EXISTS surveys (
  id INTEGER PRIMARY KEY,
  shop varchar(255) NOT NULL,
  order_id varchar(255) NOT NULL UNIQUE,
  rating int(11) NOT NULL,
  question_1 varchar(255),
  question_2 varchar(255),
  comment varchar(255)
);

CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY,
  username varchar(255) NOT NULL UNIQUE,
  password varchar(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS sessions (
    id TEXT NOT NULL PRIMARY KEY,
    expires_at INTEGER NOT NULL,
    user_id TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
)
