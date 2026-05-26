# ---------- build ----------
FROM node:20-alpine AS builder

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
FROM node:20-alpine

WORKDIR /app

# Copy package info for runtime install
COPY package*.json ./
ENV NODE_ENV=production
# Install ONLY production dependencies (reduces image size)
RUN npm install --omit=dev

# Copy compiled code from builder
COPY --from=builder /app/dist ./dist

# Expose backend port
EXPOSE 3001
ENV PORT=3001
ENV DB_TYPE=postgres

CMD ["npm", "start"]
