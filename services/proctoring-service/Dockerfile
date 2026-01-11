FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install --only=production

COPY src ./src

ENV PORT=8085
EXPOSE 8085

CMD ["npm", "start"]


