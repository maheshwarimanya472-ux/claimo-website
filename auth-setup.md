# Claimo Login Setup

This file documents the authentication setup required for the Claimo website.

## Recommended authentication

Use Supabase Auth for email/password and Google Sign-In. Do not store passwords in Google Sheets, Analytics, or website code.

## Required environment variables in Vercel

- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`

The anon key is intended for browser use. Never add a Supabase service-role key to frontend code.

## What the login system will provide

- Sign up with name, email and password
- Login with email and password
- Optional Google Sign-In
- Logout
- Persistent session in the browser
- A user profile containing the user's name and email
- Login/sign-up events for analytics

## Important privacy rule

Only collect identity information users voluntarily provide. Never collect or expose passwords. Visitor analytics should remain separate from personally identifying information unless the user has authenticated and the product has a legitimate reason to associate the session with the account.
