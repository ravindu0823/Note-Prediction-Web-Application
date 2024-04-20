FROM oven/bun:1.1.4

ENV VITE_BASEURL=http://159.223.74.216:3000

WORKDIR /app

COPY package.json .

RUN bun install

COPY . .

RUN bun run build

EXPOSE 8080

CMD [ "bun", "run", "preview" ]