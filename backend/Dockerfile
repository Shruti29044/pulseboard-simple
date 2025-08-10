FROM node:20-alpine
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm install --production=false
COPY src ./src
COPY data ./data
EXPOSE 8080
CMD ["npm","start"]
