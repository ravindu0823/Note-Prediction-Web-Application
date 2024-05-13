FROM node:20.11.1

ENV NEXT_PUBLIC_SERVER_BASEURL=http://139.59.12.43:3000

WORKDIR /app

# RUN apt-get update && apt-get install -y python python-pip make g++

RUN npm install -g pnpm

COPY package.json .

RUN pnpm install

COPY . .

RUN pnpm run build

EXPOSE 5000

CMD [ "pnpm", "run", "start" ]