# CI/CD Workflows

This directory contains GitHub Actions workflows for continuous integration and deployment.

## Workflows

### 1. CI - Build and Test (`ci.yml`)

**Triggers:**
- Push to `main` or `develop` branches
- Pull requests to `main` or `develop` branches

**Jobs:**
- **Backend Build**: Builds Spring Boot application, runs tests with MySQL and MongoDB services
- **Frontend Build**: Builds React application, runs linter, creates production build
- **Docker Build**: Builds Docker images for both backend and frontend

**Artifacts:**
- Backend JAR file
- Frontend build files

### 2. CD - Deploy (`cd.yml`)

**Triggers:**
- Push to `main` branch
- Tags starting with `v*` (e.g., `v1.0.0`)
- Manual workflow dispatch

**Jobs:**
- Builds and pushes Docker images to GitHub Container Registry
- Tags images with commit SHA and `latest`
- Optional: Deploys to production server (configure secrets)

## Setup Instructions

### 1. Enable GitHub Actions

1. Go to your repository on GitHub
2. Navigate to **Settings** → **Actions** → **General**
3. Enable "Allow all actions and reusable workflows"

### 2. Configure Secrets (for deployment)

If you want to deploy to a server, add these secrets in **Settings** → **Secrets and variables** → **Actions**:

- `HOST`: Your server IP or domain
- `USERNAME`: SSH username
- `SSH_KEY`: Private SSH key for deployment

### 3. GitHub Container Registry

Images are automatically pushed to `ghcr.io/your-username/your-repo-name`.

To use the images:
```bash
docker pull ghcr.io/your-username/your-repo-name-backend:latest
docker pull ghcr.io/your-username/your-repo-name-frontend:latest
```

### 4. Local Testing

Test the CI/CD workflows locally:

```bash
# Test backend build
cd backend
mvn clean package

# Test frontend build
npm ci
npm run build

# Test Docker builds
docker-compose build
docker-compose up
```

## Workflow Status

View workflow runs at: `https://github.com/your-username/your-repo/actions`

## Troubleshooting

### Backend tests failing
- Ensure MySQL and MongoDB services are running
- Check database connection strings in `application.properties`

### Frontend build failing
- Run `npm ci` to ensure dependencies are installed
- Check for linting errors: `npm run lint`

### Docker build failing
- Ensure Dockerfile exists in `backend/` directory
- Check that `Dockerfile.frontend` exists in root directory

