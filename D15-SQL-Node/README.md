## CREATE MIGRATION

npx knex migrate:make init --migrations-directory src/dao/db/migrations

## UPLOAD MIGRATIONS

npx knex migrate:latest --knexfile src/dao/db/knexfile.js

## ROLLBACK LAST BATCH OF MIGRATIONS

npx knex migrate:down --knexfile src/dao/db/knexfile.js
