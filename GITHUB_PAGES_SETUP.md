# GitHub Pages Setup Instructions

## Issue: 404 Error After Deployment

If you're seeing a 404 error, you need to configure GitHub Pages settings in your repository.

## Steps to Fix:

### 1. Go to Your Repository Settings
1. Visit: https://github.com/swetha4444/Personal_Website
2. Click on **Settings** (top right of the repository)
3. Scroll down to **Pages** in the left sidebar

### 2. Configure GitHub Pages
1. Under **Source**, select:
   - **Branch**: `gh-pages`
   - **Folder**: `/ (root)`
2. Click **Save**

### 3. Wait for Deployment
- GitHub Pages may take 1-5 minutes to build and deploy
- You'll see a green checkmark when it's ready
- The site will be available at: https://swetha4444.github.io/Personal_Website

### 4. Verify Deployment
- Check the **Actions** tab to see if the deployment is running
- The site should be live within a few minutes

## Alternative: If gh-pages branch doesn't work

If the above doesn't work, try:
1. In GitHub Pages settings, try selecting **main** branch and **/docs** folder
2. Move the build folder to a `docs` folder and commit it
3. Or use GitHub Actions for automatic deployment

## Current Status
- ✅ Build completed successfully
- ✅ gh-pages branch exists
- ⚠️ Need to configure GitHub Pages settings in repository


