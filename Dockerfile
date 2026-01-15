# Stage 1: Builder
FROM node:20-alpine AS builder
WORKDIR /app

# Accept DATABASE_URL as build argument
ARG DATABASE_URL="postgresql://postgres:NAK!31469@db.rmuhdcbeitaxgrddjepr.supabase.co:5432/postgres"
ENV DATABASE_URL=$DATABASE_URL

COPY package*.json ./
COPY prisma ./prisma/
RUN npm ci
COPY . .

# Now Prisma has access to DATABASE_URL
RUN npx prisma generate
RUN npm run build

# Stage 2: Runner
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV production

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000
CMD ["npm", "start"]
