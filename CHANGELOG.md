# Changelog - mern-chat

## 2026-04-29

### Fixed (Critical)

**backend/server.js: dotenv loaded after process.env.PORT was read**

The original called dotenv.config() on line 17, but PORT was read on line 12. The .env PORT value was never loaded. Fixed by using import 'dotenv/config' as the very first line.

**backend/server.js: CORS hardcoded to localhost:5173**

Any production deployment would fail with CORS errors. Fixed by reading CORS_ORIGIN from the environment (supports comma-separated multiple origins). Falls back to localhost:5173 in development.

**backend/server.js: Express 5 deprecated string wildcard route**

Express 5 dropped support for the string pattern '/(.*)', which causes deprecation warnings and may break in future versions. Changed to the correct regex form /(.*)/

### Fixed (Minor)

**backend/server.js: console.log hardcoded port 5000**

Changed to use the PORT variable so logs match the actual port in all environments.

**backend/server.js: connectToDB not awaited**

Changed the listen callback to async and await connectToDB() so the server only logs ready after the DB is actually connected.

### Removed

**package.json: react-icons dependency**

react-icons is a frontend-only package. Having it in the root/backend package.json caused unnecessary installation on the server. Moved out entirely (it lives in frontend/package.json).

### Added

- .env.example: Documents all required environment variables
- README.md: Full project documentation with stack, features, and setup instructions
