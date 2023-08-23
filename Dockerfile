# # Initiate a container to build the application in.
# FROM node:16-alpine as build
# ENV NODE_ENV=build
# WORKDIR /app

# # Copy the package.json into the container.
# COPY package*.json ./

# # Install the dependencies required to build the application.
# RUN npm install

# # Copy the application source into the container.
# COPY . .

# # Build the application.
# RUN npm run build

# # Uninstall the dependencies not required to run the built application.
# RUN npm prune --production

# # Initiate a new container to run the application in.
# FROM node:16-alpine
# ENV NODE_ENV=production
# WORKDIR /app


# # RUN npm install mongodb
# # Copy everything required to run the built application into the new container.
# COPY --from=build /app/package*.json ./
# COPY --from=build /app/node_modules/ ./node_modules/
# COPY --from=build /app/dist/ ./dist/

# # Expose the web server's port.
# EXPOSE 8080

# # Run the application.
# CMD npm run start:prod
# # CMD ["node", "dist/main"]

# FROM  node:19.6.0-slim
FROM node:16-alpine 



# Create app directory
WORKDIR /app

# Copy file to /app directory
COPY package*.json /app 
# COPY package-lock.json /app

# RUN apk add 
# RUN apt-get update -y

# install pm2
RUN npm install

# RUN npm install && npm install pm2 -g 
COPY . /app
RUN npm run build

RUN npm prune --production

# RUN npm run build  && npm prune --production --silent 

ENV TZ Asia/Jakarta

CMD npm run start:prod
