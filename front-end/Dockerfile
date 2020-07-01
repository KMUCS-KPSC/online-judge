FROM node:12.8.1
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
CMD ["yarn", "start"]