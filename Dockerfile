# build app image from a node image
FROM node:12.10.0-alpine

# define where the app code will be place inside the container
WORKDIR /usr/app

# copy package.json to the container
# and install all the app dependencies in the image
COPY package*.json ./
RUN npm install

# copy the app source code to the container
COPY . .

# define which ports will be exposed
EXPOSE 3000

# inform the npm script to run the node server
CMD ["npm", "start"]
