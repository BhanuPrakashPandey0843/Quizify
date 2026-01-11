FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install --only=production

COPY src ./src

ENV PORT=8082
EXPOSE 8082

CMD ["npm", "start"]


