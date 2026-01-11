FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install --only=production

COPY src ./src

ENV PORT=8096
EXPOSE 8096

CMD ["npm", "start"]


