# Server Project

This project is a Node.js backend using Express, Redis, PostgreSQL, and TypeORM. The database is managed through TypeORM migrations, and the server is containerized with Docker for easy setup and deployment.

## Prerequisites

Ensure you have the following installed on your system:

- **Docker**: For containerizing PostgreSQL.
- **Node.js** (v18 or higher) and **npm**: For running the backend.
- **npm**: Package manager for managing dependencies.

## Project Setup

### Step 1: Start Docker Services and Server

The backend is configured to run with PostgreSQL and Redis through Docker. First, ensure that Docker is installed and running, then start the PostgreSQL and Redis containers using Docker Compose.

Navigate to the `server` directory and run:

```bash
docker compose up -d

npm install

npm run build

npm run migration:run

npm run start
```

### Step 2 Start Angular app

The ui is configured with Angular app, to run the application navigate to qna folder and do

```bash
 npm run start
```

### Step 3. Test question update lock

Angular on init generates unique uuid, to test lock you need to open new browser or incognito tab and navigate to the same question, if you try to update the question you will see the error message.
