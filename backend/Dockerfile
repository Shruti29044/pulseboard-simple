FROM node:20-alpine
WORKDIR /app

# Install deps (includes pm2)
COPY package.json package-lock.json* ./
RUN npm install --production=false

# Copy source
COPY src ./src
COPY data ./data
COPY ecosystem.config.js ./ecosystem.config.js

ENV NODE_ENV=production
ENV PORT=8080
EXPOSE 8080

# Use PM2 for proper signal handling & auto-restart
CMD ["pm2-runtime", "ecosystem.config.js"]
