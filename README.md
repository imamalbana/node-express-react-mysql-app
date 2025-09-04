## Running the Project with Docker

This project is set up to run both the client and server using Docker and Docker Compose. Below are the specific instructions and requirements for this setup.

### Project-Specific Docker Requirements
- **Node.js Version:** Both client and server use Node.js `22.13.1-slim` (as specified in the Dockerfiles).
- **Build Tools:** The client uses Vite for building and previewing the frontend. The server uses Prisma for ORM (client generated during build).

### Environment Variables
- Both services support environment variables via `.env` files:
  - **Client:** Place environment variables in `./client/.env` (an example file is provided as `.env.example`).
  - **Server:** Place environment variables in `./server/.env`.

### Ports Exposed
- **Client (js-client):**
  - Exposes port `4173` (Vite preview server)
- **Server (js-server):**
  - Exposes port `4000` (API server)

### Build and Run Instructions
1. **Ensure Docker and Docker Compose are installed.**
2. **Set up environment variables:**
   - Copy `.env.example` to `.env` in the `client` directory and fill in any required values.
   - Create or update `.env` in the `server` directory as needed.
3. **Build and start the services:**
   ```sh
   docker compose up --build
   ```
   This will build and start both the client and server containers.

### Special Configuration Notes
- **Networks:** Both services are connected via the `appnet` bridge network (defined in `docker-compose.yml`).
- **No external database or cache is configured by default.** If you add a database, update `docker-compose.yml` accordingly.
- **Non-root user:** Both containers run as a non-root user for improved security.

---
_This section was updated to reflect the current Docker setup for this project. If you add new services or dependencies, update these instructions accordingly._