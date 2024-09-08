# Server Project

This project is a Node.js backend using Express, Redis, PostgreSQL, and TypeORM. The database is managed through TypeORM migrations, and the server is containerized with Docker for easy setup and deployment.

## Prerequisites

Ensure you have the following installed on your system:

- **Docker**: For containerizing PostgreSQL.
- **Node.js** (v18 or higher) and **npm**: For running the backend.
- **npm**: Package manager for managing dependencies.

## Project Setup

### Step 1: Start Docker Services

The backend is configured to run with PostgreSQL and Redis through Docker. First, ensure that Docker is installed and running, then start the PostgreSQL and Redis containers using Docker Compose.

Navigate to the `server` directory and run:

```bash
docker compose up -d

npm install

npm run build

npm run migration:run

npm run start
```
