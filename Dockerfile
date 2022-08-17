FROM node:14-alpine
WORKDIR /usr/src/app
COPY package*.json ./
COPY ./.env ./
RUN npm i
COPY . .
RUN npm run build
EXPOSE 5000
CMD ["npm", "start"]