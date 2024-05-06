FROM node:20.11.1

ENV VITE_BASEURL=http://159.223.74.216:3000

WORKDIR /app

# RUN apt-get update && apt-get install -y python python-pip make g++

RUN npm install -g pnpm

COPY package.json .

RUN pnpm install

COPY . .

RUN pnpm run build

EXPOSE 8080

CMD [ "pnpm", "run", "preview" ]