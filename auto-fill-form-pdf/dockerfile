FROM node:20-alpine

WORKDIR /app

# copy everything from package.json and package-lock.json to app (working directory)
COPY package*.json .

RUN npm install

COPY . . 

EXPOSE 3000

CMD npm run dev