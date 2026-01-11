FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install --only=production

COPY src ./src

ENV PORT=8086
EXPOSE 8086

CMD ["npm", "start"]


