FROM alpine AS builder

RUN apk update && apk add nodejs npm

WORKDIR /app

COPY package.json package.json
COPY package-lock.json package-lock.json

RUN npm install

COPY . .

RUN npm run build

# --- Runner stage
FROM alpine AS runner

RUN apk update && apk add nodejs npm

WORKDIR /app

ENV PORT=3000

# Copy built output from builder
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/public /public
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000
ENTRYPOINT ["node", "server.js"]