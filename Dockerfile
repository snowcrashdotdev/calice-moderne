FROM node:18-slim

ENV NODE_ENV development

WORKDIR /app
RUN corepack enable
RUN corepack prepare pnpm@latest --activate

COPY package*.json ./
COPY pnpm*.yaml ./

RUN pnpm i