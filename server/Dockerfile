FROM node:20.11.1

WORKDIR /app

COPY package*.json ./

RUN yarn

COPY . .

ENV ATLAS_URI=mongodb+srv://dhanu:dhanu751@note-recognition-web-ap.uilojgs.mongodb.net/?retryWrites=true&w=majority
ENV DUMMY_ATLAS_URI=mongodb+srv://dhanu:dhanu751@linkedin.vmlw5fb.mongodb.net/?retryWrites=true&w=majority
ENV JWT_SECRET=fc6b436fb79612607f5032a7455cc73c1ad1ff0a4ca1fddf2a0d4fa746d5c8f3
ENV PORT=3000
ENV LOCALHOST=http://localhost:5000
ENV REMOTEHOST=http://68.183.93.34:5000

EXPOSE 3000

CMD [ "yarn", "start" ]