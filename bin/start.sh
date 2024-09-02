#!/bin/sh

# Create DB file if not exists
if [ ! -f "./db/sqlite3" ]; then
 sqlite3 ./db/site.sqlite "VACUUM;";
fi

# Get latest git changes
 git pull;

# Get Latest docker image
sudo docker compose pull;

# Stop and remove the existing container
sudo docker compose down;

# Start the container
sudo docker compose up -d;

