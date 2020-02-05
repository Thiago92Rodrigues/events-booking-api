# base image
FROM node:12.10.0-alpine

# set working directory
WORKDIR /usr/app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /usr/app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /usr/app/package.json
RUN npm install --silent
RUN npm install react-scripts@3.0.1 -g --silent

EXPOSE 3000

# start app
CMD ["npm", "start"]
