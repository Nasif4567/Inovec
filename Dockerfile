# Stage 1: Builder
FROM node:20-alpine AS builder
WORKDIR /app

# Accept DATABASE_URL as build argument
ARG DATABASE_URL="postgresql://postgres:NAK!31469@db.rmuhdcbeitaxgrddjepr.supabase.co:5432/postgres"
ENV DATABASE_URL=$DATABASE_URL

# Install dependencies
COPY package*.json ./
COPY prisma ./prisma/
RUN npm ci

# Copy the rest of the app
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Build Next.js app while ignoring TypeScript errors
RUN npm run build -- --ignore-build-errors

# Stage 2: Runner
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV production

# Copy only the necessary files from builder
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Expose Next.js port
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
