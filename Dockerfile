
FROM node:22-alpine
WORKDIR /app/src/
COPY package*.json ./
RUN npm install && npm cache clean --force
COPY . .
CMD ["npm", "run", "start:dev"]




