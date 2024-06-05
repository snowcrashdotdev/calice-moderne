FROM node:18-slim

ENV NODE_ENV development

WORKDIR /app
RUN corepack enable
RUN corepack prepare pnpm@latest --activate
RUN pnpm config set store-dir /app/.pnpm-store/v3 --global

COPY package*.json ./
COPY pnpm*.yaml ./

RUN pnpm i