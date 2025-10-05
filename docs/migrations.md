# Prisma Migrations (Supabase Postgres)

Ensure your `.env` (or `.env-example` copied to `.env`) contains a valid `DATABASE_URL` pointing to your Supabase Postgres instance.

```bash
# Install dependencies (if not already)
npm install

# Generate Prisma client
npm run prisma:generate

# Create and apply a new migration (interactive name prompt)
npm run prisma:migrate

# Alternatively, specify a migration name directly
npx prisma migrate dev --name init_tenant

# View your database in Prisma Studio
npm run prisma:studio
```

Notes:
- Supabase requires SSL; include `?sslmode=require` in your `DATABASE_URL` if needed.
- After changing the schema in `prisma/schema.prisma`, re-run `prisma migrate dev` and then `prisma generate` (or use the scripts above). 