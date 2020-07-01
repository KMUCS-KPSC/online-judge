FROM node:12.8.1
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 9090
ADD https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh ./
RUN ["chmod", "+x", "./wait-for-it.sh"]
