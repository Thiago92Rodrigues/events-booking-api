# base image
FROM node:12.10.0-alpine

# set working directory
WORKDIR /usr/app

# install dependencies
COPY package*.json yarn.lock ./
RUN npm install

COPY . .

EXPOSE 3000

# start app
CMD ["npm", "start"]
