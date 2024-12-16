FROM node:22

WORKDIR /zumi-backend

COPY package*.json pnpm-lock.yaml ./

RUN npm install -g pnpm
RUN npm install -g pm2
RUN pnpm install

COPY . .

RUN pnpm prisma:generate_client

RUN pnpm run build

