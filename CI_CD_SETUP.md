# CI/CD Setup Guide

This guide explains how to set up and use GitHub Actions CI/CD for this project.

## 📋 Prerequisites

1. GitHub repository
2. GitHub Actions enabled (enabled by default)
3. Docker (for local testing)

## 🚀 Quick Start

### 1. Push to GitHub

```bash
# Initialize git if not already done
git init

# Add remote repository
# 1. Add remote (if not already added)
git remote add origin https://github.com/Theuher/StoreProductProject.git

# 2. Add all files
git add .

# 3. Commit
git commit -m "Add CI/CD pipeline with GitHub Actions"

# 4. Push to GitHub
git push -u origin main

### 2. Verify Workflows

1. Go to your GitHub repository
2. Click on the **Actions** tab
3. You should see workflows running automatically

## 📁 Workflow Files

### `.github/workflows/ci.yml`
- **Purpose**: Continuous Integration
- **Triggers**: Push/PR to main/develop branches
- **Actions**:
  - Builds backend (Spring Boot)
  - Builds frontend (React)
  - Runs tests
  - Creates Docker images

### `.github/workflows/cd.yml`
- **Purpose**: Continuous Deployment
- **Triggers**: Push to main, tags, or manual
- **Actions**:
  - Builds and pushes Docker images
  - Deploys to production (if configured)

## 🔧 Configuration

### Environment Variables

The workflows use these environment variables (set in GitHub Secrets if needed):

- `SPRING_DATASOURCE_URL`: MySQL connection string
- `SPRING_DATASOURCE_USERNAME`: MySQL username
- `SPRING_DATASOURCE_PASSWORD`: MySQL password
- `SPRING_DATA_MONGODB_URI`: MongoDB connection string

### GitHub Secrets Setup

1. Go to **Settings** → **Secrets and variables** → **Actions**
2. Click **New repository secret**
3. Add secrets for deployment (optional):
   - `HOST`: Server IP/domain
   - `USERNAME`: SSH username
   - `SSH_KEY`: Private SSH key

## 🐳 Docker Setup

### Local Development

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Stop and remove volumes
docker-compose down -v
```

### Production Deployment

```bash
# Pull latest images
docker pull ghcr.io/your-username/your-repo-backend:latest
docker pull ghcr.io/your-username/your-repo-frontend:latest

# Run with docker-compose
docker-compose -f docker-compose.prod.yml up -d
```

## 📊 Monitoring

### View Workflow Runs

1. Go to **Actions** tab in GitHub
2. Click on a workflow run to see details
3. Check logs for each job

### Workflow Status Badge

Add this to your README.md:

```markdown
![CI](https://github.com/your-username/your-repo/workflows/CI%20-%20Build%20and%20Test/badge.svg)
```

## 🔍 Troubleshooting

### Workflow Not Running

- Check if GitHub Actions is enabled in repository settings
- Verify workflow files are in `.github/workflows/` directory
- Check branch name matches trigger conditions

### Build Failures

**Backend:**
```bash
# Test locally
cd backend
mvn clean package
```

**Frontend:**
```bash
# Test locally
npm ci
npm run build
```

### Docker Issues

```bash
# Check Docker is running
docker ps

# Test Dockerfile
docker build -t test-backend ./backend
docker build -t test-frontend -f Dockerfile.frontend .
```

## 📝 Best Practices

1. **Branch Protection**: Enable branch protection rules for `main` branch
2. **Code Review**: Require PR reviews before merging
3. **Testing**: Always run tests before pushing
4. **Versioning**: Use semantic versioning for tags (v1.0.0)
5. **Secrets**: Never commit secrets to repository

## 🎯 Next Steps

1. ✅ Push code to GitHub
2. ✅ Verify CI workflow runs successfully
3. ✅ Configure deployment secrets (if deploying)
4. ✅ Set up branch protection rules
5. ✅ Add workflow status badge to README

## 📚 Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Docker Documentation](https://docs.docker.com/)
- [Spring Boot Deployment](https://spring.io/guides/gs/spring-boot-docker/)
- [React Deployment](https://create-react-app.dev/docs/deployment/)

