# GitHub Setup Instructions

## After creating your GitHub repository, run these commands:

1. Add the remote repository (replace YOUR_USERNAME with your GitHub username):
```bash
git remote add origin https://github.com/YOUR_USERNAME/brocomplain.git
```

2. Rename the branch to main (if needed):
```bash
git branch -M main
```

3. Push your code to GitHub:
```bash
git push -u origin main
```

## If you need to authenticate:
- GitHub may ask for your username and password
- For password, use a Personal Access Token (not your account password)
- Create a token at: https://github.com/settings/tokens
- Select "repo" scope when creating the token

## Alternative: Using SSH (if you have SSH keys set up)
```bash
git remote add origin git@github.com:YOUR_USERNAME/brocomplain.git
git branch -M main
git push -u origin main
```

