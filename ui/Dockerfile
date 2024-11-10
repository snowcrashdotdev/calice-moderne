FROM node:23-slim

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable

WORKDIR /src

COPY ./app/package.json ./app/pnpm-lock.yaml ./
RUN pnpm install

COPY ./app /src

CMD ["pnpm", "dev", "-p", "80", "-H", "0.0.0.0"]