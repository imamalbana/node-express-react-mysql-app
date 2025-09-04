#!/bin/sh
# tunggu db ready
echo "Menunggu database..."
sleep 5

# generate prisma client
npx prisma generate

# migrate db
npx prisma migrate deploy

# start server
npm run dev
