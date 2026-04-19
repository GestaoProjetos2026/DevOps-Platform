# ---------- build ----------
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package info
COPY package*.json ./
# Install ALL dependencies (including devDependencies needed for typescript)
RUN npm install

# Copy source code
COPY . .

# Build typescript code
RUN npm run build

# ---------- runtime ----------
FROM node:18-alpine

WORKDIR /app

# Copy package info for runtime install
COPY package*.json ./
# Install ONLY production dependencies (reduces image size)
RUN npm install --omit=dev

# Copy compiled code from builder
COPY --from=builder /app/dist ./dist
# Note: In production, the DB path should be mounted to a persistent volume
# if using SQLite, but usually it would be connecting to Postgres anyway.

# Expose backend port
EXPOSE 3001
ENV PORT=3001
ENV DB_TYPE=sqlite

CMD ["npm", "start"]
