# How to Fix GitHub Pages 404 - Step by Step

## Method 1: Direct Link (Easiest)

1. **Click this direct link**: https://github.com/swetha4444/Personal_Website/settings/pages
2. You should see a section called **"Build and deployment"**
3. Under **"Source"**, you'll see a dropdown
4. Select **"Deploy from a branch"**
5. Then select:
   - **Branch**: `gh-pages`
   - **Folder**: `/ (root)`
6. Click **Save**

## Method 2: Manual Navigation

1. Go to: https://github.com/swetha4444/Personal_Website
2. Click the **Settings** tab (top right, next to "Insights")
3. In the left sidebar, scroll down and click **Pages**
4. You should see **"Build and deployment"** section
5. Under **"Source"**, click the dropdown
6. Select **"Deploy from a branch"**
7. Choose:
   - Branch: `gh-pages`
   - Folder: `/ (root)`
8. Click **Save**

## Method 3: If You Don't See "Pages" in Settings

If you don't see "Pages" in the left sidebar:
1. Make sure you're the repository owner (swetha4444)
2. The repository must be public (or you have GitHub Pro)
3. Try refreshing the page

## Method 4: Alternative - Use GitHub Actions

If the above doesn't work, we can set up automatic deployment via GitHub Actions.

## What to Look For

You should see something like:
```
Build and deployment
Source: [Dropdown] Deploy from a branch
Branch: [Dropdown] gh-pages
Folder: [Dropdown] / (root)
[Save] button
```

## Still Can't Find It?

Let me know what you see in the Settings page, and I'll help you navigate to the right place!


