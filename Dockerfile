FROM node:18-slim

ENV USER=node
ENV PATH="/home/node/.npm-global/bin:${PATH}"
ENV NPM_CONFIG_PREFIX="/home/node/.npm-global"

USER "${USER}"
WORKDIR /app
RUN npm install -g pnpm
RUN pnpm config set store-dir /home/node/.local/share/pnpm/store

COPY . .
RUN pnpm i

CMD [ "pnpm", "dev", "--host=0.0.0.0", "--port=3000" ]