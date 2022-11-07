FROM node:16 as builder

WORKDIR /app
COPY package.json .
COPY package-lock.json .

RUN npm ci

COPY . .
EXPOSE 3004
CMD ["npm", "start"]