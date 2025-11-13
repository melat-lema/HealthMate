# backend/Dockerfile
FROM node:18

WORKDIR /app

# Fix: remove 'timeout' — it's not a valid npm config
RUN npm config set registry https://registry.npmjs.org/ && \
    npm config set strict-ssl true

# Install deps
COPY package*.json ./
RUN npm ci

# Generate Prisma Client
COPY prisma/schema.prisma ./prisma/
RUN npx prisma generate

# Copy app
COPY . .

EXPOSE 5000
CMD ["npm", "run", "dev"]