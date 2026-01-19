# 🚀 cPanel FTP Deployment - Quick Setup

## What Was Updated

Your CI/CD workflow now automatically:
1. ✅ Installs dependencies (`npm ci`)
2. ✅ Runs linting and tests
3. ✅ Creates production build (`npm run build`)
4. ✅ **Deploys to cPanel via FTP** 🎉

---

## ⚡ Quick Setup (5 Minutes)

### Step 1: Get FTP Credentials (2 min)

From your cPanel account:
- **FTP Server**: `ftp.yourdomain.com` (or your server)
- **FTP Username**: Your FTP username
- **FTP Password**: Your FTP password  
- **Deploy Directory**: `/public_html` (usually)

### Step 2: Add GitHub Secrets (3 min)

Go to GitHub Repository → **Settings** → **Secrets and variables** → **Actions** → **New repository secret**

Add these 4 secrets:

| Secret Name | Value | Example |
|---|---|---|
| `FTP_SERVER` | FTP server address | `ftp.kashif.onequeue.com` |
| `FTP_USERNAME` | FTP username | `kashif_portfolio` |
| `FTP_PASSWORD` | FTP password | `your-secure-password` |
| `FTP_DEPLOY_DIR` | Remote directory | `/public_html/portfolio` |

---

## 🎯 How It Works

```
Git Push to main
    ↓
GitHub Actions Triggers
    ↓
Install Dependencies ✅
    ↓
Run Tests & Linting ✅
    ↓
Build Application ✅ (creates /build folder)
    ↓
Deploy /build to cPanel via FTP ✅
    ↓
Your Website is LIVE 🎉
```

---

## 📝 Deployment Workflow Details

### When Deployment Happens

✅ **Automatic**: Every push to `main` branch
✅ **After**: All tests pass & build succeeds
✅ **What Gets Uploaded**: Only the `build/` folder

### What's Uploaded

- Minified JavaScript
- Optimized CSS & Images
- HTML files
- All static assets
- Portfolio + Algorithm Visualizer

---

## 🔐 Security Notes

✅ **Safe**: FTP credentials stored as GitHub secrets (encrypted)
✅ **Secure**: Never commit credentials to code
✅ **Isolated**: Use dedicated FTP account (not main cPanel)
✅ **Protected**: Only deploy from `main` branch

---

## ✅ Deployment Checklist

- [ ] FTP credentials gathered from cPanel
- [ ] 4 GitHub secrets added (FTP_SERVER, USERNAME, PASSWORD, DEPLOY_DIR)
- [ ] Code pushed to `main` branch
- [ ] GitHub Actions workflow runs (check Actions tab)
- [ ] Website is live at your domain

---

## 📊 Workflow Status

Check deployment status: **GitHub → Actions Tab**

Each push will show:
- ✅ **Linting** status
- ✅ **Testing** status
- ✅ **Build** status
- ✅ **FTP Deployment** status

---

## 🆘 Troubleshooting

### "FTP connection failed"
- Verify secrets are correct in GitHub
- Test FTP manually: `ftp ftp.yourdomain.com`
- Check FTP account is active in cPanel

### "Permission denied"
- In cPanel, set directory permissions to 755
- Ensure FTP user has write permissions

### "Directory not found"
- Verify deployment directory path
- Common: `/public_html` or `/public_html/portfolio`
- Check in cPanel File Manager

### Website shows old content
- Hard refresh: **Ctrl+Shift+R** (Windows) or **Cmd+Shift+R** (Mac)
- Clear browser cache
- Wait a few minutes for CDN cache

---

## 📖 Documentation

For detailed setup & troubleshooting, see: [CPANEL_FTP_DEPLOYMENT.md](CPANEL_FTP_DEPLOYMENT.md)

---

## 🎯 Next Steps

1. **Gather Credentials** - Get from cPanel FTP section
2. **Add Secrets** - GitHub Settings → Secrets (4 secrets)
3. **Push Code** - `git push origin main`
4. **Monitor** - Check GitHub Actions tab
5. **Verify** - Visit your website

---

## 🎉 That's It!

Your deployment pipeline is now **automated**. Every time you push to `main`:

```bash
git add .
git commit -m "your changes"
git push origin main
# ✅ Automatically builds and deploys to cPanel!
```

No more manual uploads needed! 🚀

---

## 📞 Need Help?

See [CPANEL_FTP_DEPLOYMENT.md](CPANEL_FTP_DEPLOYMENT.md) for:
- Complete setup guide
- Advanced configuration
- Detailed troubleshooting
- Security best practices
- Monitoring & maintenance

---

**Happy Deploying!** 🎊
