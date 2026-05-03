FROM node:20-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY src ./src
EXPOSE 4000
HEALTHCHECK --interval=15s --timeout=5s --start-period=10s \
  CMD wget -qO- http://localhost:4000/health || exit 1
CMD ["node", "src/index.js"]
