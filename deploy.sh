#!/bin/bash

npx prisma generate

npx prisma migrate diff --from-empty --to-schema-datamodel prisma/schema.prisma --script > baseline.sql

npx prisma migrate resolve --applied 20250307140501_base

npx prisma migrate deploy