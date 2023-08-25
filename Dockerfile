FROM node:16-slim 

# Create app directory
WORKDIR /app

# Copy file to /app directory
COPY package*.json /app 

# install pm2
RUN npm install

# RUN npm install && npm install pm2 -g 
COPY . /app
RUN npm run build

RUN npm prune --production

# RUN npm run build  && npm prune --production --silent 

ENV TZ Asia/Jakarta

EXPOSE 8080

# CMD npm run start:prod
CMD ["node", "dist/main", "0.0.0.0"]
