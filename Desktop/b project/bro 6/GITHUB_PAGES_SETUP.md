# GitHub Pages Setup Guide

## Step-by-Step Instructions

### 1. Enable GitHub Pages in Repository Settings

1. Go to your repository: https://github.com/irshad9747/bro-code
2. Click on **Settings** (top menu bar)
3. Scroll down to **Pages** in the left sidebar
4. Under **Source**, select:
   - **Source**: `GitHub Actions` (NOT "Deploy from a branch")
5. Click **Save**

### 2. Check GitHub Actions Workflow

1. Go to the **Actions** tab in your repository
2. You should see a workflow called "Deploy to GitHub Pages"
3. Click on it to see if it's running or has completed
4. If it shows a ❌ (red X), click on it to see the error
5. If it shows a ✅ (green checkmark), the deployment was successful

### 3. Trigger the Workflow (if needed)

If the workflow hasn't run automatically, you can trigger it:

1. Go to **Actions** tab
2. Click on "Deploy to GitHub Pages" workflow
3. Click "Run workflow" button (if available)
4. Or make a small change and push to trigger it

### 4. Wait for Deployment

- The workflow usually takes 2-5 minutes to complete
- After it completes successfully, wait 1-2 minutes for GitHub Pages to update
- Your site will be available at: **https://irshad9747.github.io/bro-code/**

## Troubleshooting

### If you still see 404:

1. **Check if Pages is enabled:**
   - Go to Settings → Pages
   - Make sure "Source" is set to "GitHub Actions"

2. **Check the Actions workflow:**
   - Go to Actions tab
   - Look for any failed workflows
   - Check the error messages

3. **Verify the workflow file exists:**
   - Make sure `.github/workflows/deploy.yml` exists in your repository
   - If not, the workflow won't run

4. **Check the build output:**
   - In the Actions workflow, check the "Build" step
   - Make sure `npm run build` completed successfully
   - The `dist` folder should be created

5. **Wait a bit longer:**
   - Sometimes GitHub Pages takes a few minutes to propagate
   - Try accessing the site after 5-10 minutes

### Common Issues:

- **"Workflow not found"**: Make sure the workflow file is committed and pushed
- **"Build failed"**: Check if all dependencies are in package.json
- **"Permission denied"**: Make sure Pages permissions are enabled in repository settings

## Your Site URL

Once deployed, your site will be available at:
**https://irshad9747.github.io/bro-code/**

## Need Help?

If you're still having issues:
1. Check the Actions tab for error messages
2. Verify all files are committed and pushed
3. Make sure GitHub Pages is enabled in Settings → Pages
4. Try re-running the workflow manually

