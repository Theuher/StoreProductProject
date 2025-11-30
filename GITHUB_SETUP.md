# GitHub Repository Setup Guide

Your repository: [https://github.com/Theuher/StoreProductProject.git](https://github.com/Theuher/StoreProductProject.git)

## 🚀 Quick Start - Push CI/CD to GitHub

### Step 1: Initialize Git (if not already done)

```bash
# Check if git is initialized
git status

# If not initialized, run:
git init
```

### Step 2: Add Remote Repository

```bash
# Add your GitHub repository as remote
git remote add origin https://github.com/Theuher/StoreProductProject.git

# Or if remote already exists, update it:
git remote set-url origin https://github.com/Theuher/StoreProductProject.git

# Verify remote
git remote -v
```

### Step 3: Add All Files

```bash
# Add all files including CI/CD workflows
git add .

# Check what will be committed
git status
```

### Step 4: Commit Changes

```bash
git commit -m "Add CI/CD pipeline with GitHub Actions

- Add GitHub Actions workflows for CI/CD
- Add Docker configuration files
- Add docker-compose for local and production
- Update documentation"
```

### Step 5: Push to GitHub

```bash
# Push to main branch
git push -u origin main

# If you get an error about upstream, use:
git push -u origin main --force
# (Only use --force if you're sure, or create a new branch first)
```

## ✅ Verify CI/CD is Working

1. **Go to your repository**: https://github.com/Theuher/StoreProductProject
2. **Click on "Actions" tab**
3. **You should see workflows running**:
   - "CI - Build and Test" workflow
   - "CD - Deploy" workflow (on main branch pushes)

## 📦 Docker Images Location

After the CD workflow runs, your Docker images will be available at:

- **Backend**: `ghcr.io/theuher/storeproductproject-backend:latest`
- **Frontend**: `ghcr.io/theuher/storeproductproject-frontend:latest`

To pull and use them:

```bash
# Pull images
docker pull ghcr.io/theuher/storeproductproject-backend:latest
docker pull ghcr.io/theuher/storeproductproject-frontend:latest

# Or use docker-compose.prod.yml
GITHUB_REPOSITORY=theuher/storeproductproject docker-compose -f docker-compose.prod.yml up -d
```

## 🔐 Enable GitHub Container Registry

1. Go to **Settings** → **Actions** → **General**
2. Under "Workflow permissions", select:
   - ✅ **Read and write permissions**
   - ✅ **Allow GitHub Actions to create and approve pull requests**
3. Save changes

## 📊 View Workflow Status

Add a status badge to your README.md:

```markdown
![CI](https://github.com/Theuher/StoreProductProject/workflows/CI%20-%20Build%20and%20Test/badge.svg)
![CD](https://github.com/Theuher/StoreProductProject/workflows/CD%20-%20Deploy/badge.svg)
```

## 🐛 Troubleshooting

### Issue: "Workflow not running"
- Check that files are in `.github/workflows/` directory
- Verify GitHub Actions is enabled in repository settings
- Check branch name matches workflow triggers (main/develop)

### Issue: "Permission denied" for Container Registry
- Go to Settings → Actions → General
- Enable "Read and write permissions"
- Re-run the workflow

### Issue: "Docker build failed"
- Check that Dockerfile exists in `backend/` directory
- Verify `Dockerfile.frontend` exists in root directory
- Check build logs in Actions tab

## 📝 Next Steps

1. ✅ Push code to GitHub
2. ✅ Verify workflows are running
3. ✅ Check Docker images in GitHub Container Registry
4. ✅ (Optional) Set up production deployment secrets
5. ✅ Add workflow badges to README

## 🔗 Useful Links

- **Repository**: https://github.com/Theuher/StoreProductProject
- **Actions**: https://github.com/Theuher/StoreProductProject/actions
- **Packages**: https://github.com/Theuher/StoreProductProject/pkgs/container/storeproductproject-backend
- **CI/CD Setup Guide**: [CI_CD_SETUP.md](./CI_CD_SETUP.md)

