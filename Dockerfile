# ----- Stage 1: Build Stage -----
FROM --platform=$BUILDPLATFORM node:16.8.0-alpine AS builder

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

# ----- Stage 2: Production Stage -----
FROM node:16.8.0-alpine AS production

WORKDIR /app
ENV NODE_ENV=production

COPY package.json package-lock.json ./
RUN npm install --only=production

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/server.js .
COPY --from=builder /app/utilsServer ./utilsServer
COPY --from=builder /app/utils ./utils
COPY --from=builder /app/api ./api

EXPOSE 3000
USER node
CMD ["node", "server.js"]
