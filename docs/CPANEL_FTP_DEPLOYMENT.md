# cPanel FTP Deployment Guide

## Overview

This guide explains how to set up and configure automated deployment to cPanel via FTP using GitHub Actions.

## Prerequisites

- GitHub repository
- cPanel hosting account with FTP access
- FTP credentials (server, username, password)
- GitHub repository access (to add secrets)

---

## Step 1: Get Your FTP Credentials

### From cPanel:

1. Log in to your cPanel account
2. Go to **FTP Accounts** section
3. Create or use an existing FTP account:
   - **FTP Server/Host**: Usually `ftp.yourdomain.com` or your server IP
   - **FTP Username**: Your FTP username
   - **FTP Password**: Your FTP password
   - **Deployment Directory**: Typically `/public_html` for main domain

### Alternative - Using SSH/SFTP:
- Go to **SSH/Shell Access** for SSH credentials
- Note the server address (SSH host)

### Get Your Domain/Server Info:
- Go to **Addon Domains** or check your hosting details
- Note the directory where your website should be deployed

---

## Step 2: Add GitHub Secrets

### How to Add Secrets to GitHub:

1. Go to your GitHub repository
2. Click **Settings** (top right)
3. In the left sidebar, click **Secrets and variables** → **Actions**
4. Click **New repository secret**

### Required Secrets to Add:

Add these 3 secrets:

#### Secret 1: `FTP_SERVER`
- **Name**: `FTP_SERVER`
- **Value**: Your FTP server (e.g., `ftp.yourdomain.com` or `kashif.onequeue.com`)
- Click **Add secret**

#### Secret 2: `FTP_USERNAME`
- **Name**: `FTP_USERNAME`
- **Value**: Your FTP username (e.g., `kashif` or `kashif_portfolio`)
- Click **Add secret**

#### Secret 3: `FTP_PASSWORD`
- **Name**: `FTP_PASSWORD`
- **Value**: Your FTP password
- Click **Add secret**

#### Secret 4: `FTP_DEPLOY_DIR`
- **Name**: `FTP_DEPLOY_DIR`
- **Value**: Remote directory path (e.g., `/public_html` or `/public_html/portfolio`)
- Click **Add secret**

### Example Setup:

```
Secret Name          | Value
─────────────────────┼──────────────────────
FTP_SERVER           | ftp.kashif.onequeue.com
FTP_USERNAME         | kashif_portfolio
FTP_PASSWORD         | your-secret-password
FTP_DEPLOY_DIR       | /public_html/portfolio
```

---

## Step 3: Workflow Behavior

### Deployment Trigger

The workflow will automatically deploy when:
- You push code to the **`main`** branch
- CI/CD checks pass (linting, tests, build)

### Deployment Steps

1. **Checkout code** - Clone your repository
2. **Setup Node.js** - Install Node.js 18.x
3. **Install dependencies** - Run `npm ci`
4. **Build application** - Run `npm run build`
5. **Deploy via FTP** - Upload `build/` directory to cPanel via FTP

### What Gets Uploaded

Only the production build files from the `build/` directory are uploaded:
- Minified JavaScript
- Optimized CSS
- Static assets
- HTML files

---

## Step 4: How to Deploy

### Option A: Automatic Deployment

1. Make changes to your code
2. Commit and push to `main` branch:
```bash
git add .
git commit -m "feat: add new feature"
git push origin main
```

3. Go to GitHub → **Actions** tab
4. Watch the workflow run
5. Check the deployment status

### Option B: Manual Verification

1. Go to GitHub repository
2. Click **Actions** tab
3. Click the latest workflow run
4. View the **deploy-production** job for FTP upload logs

---

## Step 5: Verify Deployment

### Method 1: Check Your Website
1. Visit your domain: `https://yourdomain.com`
2. Verify your application is running
3. Check that your portfolio appears correctly

### Method 2: cPanel File Manager
1. Log in to cPanel
2. Go to **File Manager**
3. Navigate to your deployment directory
4. Verify the files are there:
   - `index.html`
   - `static/` folder
   - Other build files

### Method 3: GitHub Actions Log
1. Go to GitHub → **Actions**
2. Click the latest workflow run
3. Click **deploy-production** job
4. Look for messages like:
   - `Uploaded: index.html`
   - `Uploaded: static/js/...`
   - `Deployment complete`

---

## Troubleshooting

### Problem: "FTP connection failed"

**Cause**: Incorrect FTP credentials
**Solution**:
1. Verify FTP credentials in cPanel
2. Update GitHub secrets with correct values
3. Re-run the workflow

### Problem: "Permission denied" uploading files

**Cause**: FTP directory permissions issue
**Solution**:
1. In cPanel File Manager, set permissions to 755 on deployment directory
2. Ensure FTP user has write permissions
3. Try uploading manually via cPanel FTP first to verify

### Problem: "Directory not found"

**Cause**: Wrong deployment directory path
**Solution**:
1. Verify the correct path in cPanel
2. Update `FTP_DEPLOY_DIR` secret
3. Common paths:
   - `/public_html` (main domain)
   - `/public_html/subdomain` (subdomain)
   - `/addon_domain.com` (addon domain)

### Problem: "Build step failed"

**Cause**: Linting or test failures
**Solution**:
1. Check GitHub Actions log for error messages
2. Run locally: `npm run lint` and `npm test`
3. Fix issues and push again

### Problem: Website shows old version

**Cause**: Browser cache
**Solution**:
1. Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
2. Clear browser cache
3. Try incognito/private window
4. Wait a few minutes for CDN cache to clear

---

## Alternative: Deploy to Subdirectory

If you want to deploy to a subdirectory (e.g., `/portfolio`):

1. Update `FTP_DEPLOY_DIR` secret: `/public_html/portfolio`
2. Update `homepage` in `package.json`:
```json
{
  "homepage": "https://yourdomain.com/portfolio"
}
```

3. Rebuild and redeploy

---

## Security Best Practices

### ✅ Do's:
- ✅ Use GitHub secrets for FTP credentials (never in code)
- ✅ Use a dedicated FTP account for deployment
- ✅ Restrict FTP permissions to deployment directory only
- ✅ Rotate FTP passwords regularly
- ✅ Use strong, unique FTP passwords
- ✅ Limit FTP account to specific directories

### ❌ Don'ts:
- ❌ Don't commit FTP credentials to repository
- ❌ Don't share GitHub secrets
- ❌ Don't use main cPanel account for FTP deployment
- ❌ Don't use simple/weak passwords
- ❌ Don't store credentials in environment files

---

## Advanced Configuration

### Deploy Only on Version Tags

Change the trigger in `.github/workflows/ci-cd.yml`:

```yaml
on:
  push:
    tags:
      - 'v*'  # Deploy only on version tags (v1.0.0, v1.1.0, etc.)
```

Then deploy with:
```bash
git tag v1.0.0
git push origin v1.0.0
```

### Deploy to Multiple Environments

Add separate deployment jobs for staging and production:

```yaml
deploy-staging:
  # Deploy to staging environment
  if: github.ref == 'refs/heads/dev'
  # Similar steps but use different FTP_DEPLOY_DIR

deploy-production:
  # Deploy to production environment
  if: github.ref == 'refs/heads/main'
  # Current setup
```

### Add Slack Notification

Add to the deployment job:

```yaml
- name: Notify Slack on Deployment
  if: always()
  uses: slackapi/slack-github-action@v1
  with:
    payload: |
      {
        "text": "Deployment ${{ job.status }}",
        "blocks": [{
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": "Deployment to cPanel: ${{ job.status }}\nBranch: ${{ github.ref }}"
          }
        }]
      }
  env:
    SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK_URL }}
```

---

## Monitoring & Maintenance

### Monitor Deployments

1. Go to **Actions** tab regularly
2. Check for failed workflows
3. Review deployment logs

### Update Credentials

If you change FTP password or account:
1. Update the corresponding GitHub secrets
2. New deployments will use updated credentials

### Clean Up Old Deployments

Occasionally delete old build artifacts from cPanel:
1. Log in to cPanel File Manager
2. Navigate to deployment directory
3. Remove old/unused files

---

## Workflow Summary

```
Code Commit → Push to main → GitHub Actions Triggered
                                    ↓
                    Run Tests & Linting
                                    ↓
                    Build Application
                                    ↓
                    (If all pass)
                                    ↓
                    Deploy to cPanel via FTP
                                    ↓
                    Website Live ✅
```

---

## Support & Resources

### If Deployment Fails:

1. Check GitHub Actions log for error message
2. Verify all 4 secrets are configured
3. Test FTP connection manually:
   ```bash
   ftp ftp.yourdomain.com
   # Enter username and password
   # Try: put testfile.txt
   ```
4. Review logs in cPanel for file upload errors

### Useful Links:
- [GitHub Actions Secrets Documentation](https://docs.github.com/en/actions/security-guides/encrypted-secrets)
- [FTP Deploy Action GitHub](https://github.com/SamKirkland/FTP-Deploy-Action)
- [cPanel FTP Documentation](https://docs.cpanel.net/cpanel/files/ftp-accounts/)

---

## Next Steps

1. ✅ Gather FTP credentials from cPanel
2. ✅ Add 4 GitHub secrets (FTP_SERVER, FTP_USERNAME, FTP_PASSWORD, FTP_DEPLOY_DIR)
3. ✅ Push code to `main` branch
4. ✅ Monitor GitHub Actions for deployment
5. ✅ Verify website is live

---

**Your deployment pipeline is now automated!** 🚀

Every push to `main` will automatically:
- Run quality checks
- Build your application
- Deploy to cPanel via FTP

Enjoy hands-free deployments! 🎉
