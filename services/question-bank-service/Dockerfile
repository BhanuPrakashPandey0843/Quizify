FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install --only=production

COPY src ./src

ENV PORT=8097
EXPOSE 8097

CMD ["npm", "start"]


