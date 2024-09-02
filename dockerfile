FROM node:18 AS base

WORKDIR /app

COPY . .

VOLUME ./db/survey.sqlite:/app/db/survey.sqlite

RUN corepack enable pnpm && pnpm i --frozen-lockfile

RUN pnpm run build


