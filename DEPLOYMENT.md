# Deployment Guide

## Quick Start - Deploy to GitHub Pages

### Option 1: Using GitHub CLI (if installed)

```bash
gh repo create rangeway-test --public --source=. --remote=origin
git push -u origin main
```

Then visit your GitHub repo and enable Pages (see step 3 below).

### Option 2: Manual Setup

**1. Create a new repository on GitHub**
- Go to https://github.com/new
- Repository name: `rangeway-test`
- Description: `Modern single-page Rangeway Energy site with HyWatts-inspired design`
- Visibility: Public
- Do NOT initialize with README, .gitignore, or license (we already have these)
- Click "Create repository"

**2. Push your local code to GitHub**

```bash
git remote add origin https://github.com/YOUR_USERNAME/rangeway-test.git
git branch -M main
git push -u origin main
```

**3. Enable GitHub Pages**
- Go to your repository on GitHub
- Click "Settings" tab
- Click "Pages" in the left sidebar
- Under "Build and deployment":
  - Source: Select "GitHub Actions"
  - The workflow is already configured in `.github/workflows/jekyll.yml`
- Click "Save"

**4. Wait for deployment**
- Go to the "Actions" tab to see the build progress
- Once complete (green checkmark), your site will be live at:
  `https://YOUR_USERNAME.github.io/rangeway-test/`

## Custom Domain (Optional)

To use a custom domain like `test.rangeway.energy`:

1. Add a `CNAME` file with your domain:
```bash
echo "test.rangeway.energy" > CNAME
git add CNAME
git commit -m "Add custom domain"
git push
```

2. Configure DNS with your domain provider:
- Add a CNAME record pointing to: `YOUR_USERNAME.github.io`

3. In GitHub repository settings > Pages:
- Enter your custom domain
- Enable "Enforce HTTPS"

## Local Development

To test locally before deploying:

```bash
# Install dependencies (may require sudo or rbenv/rvm)
bundle install

# Serve locally
bundle exec jekyll serve

# Visit http://localhost:4000
```

**Note:** If you encounter permission errors with `bundle install`, you can:
- Use rbenv or rvm to manage Ruby versions
- Or just push to GitHub and let GitHub Pages build it automatically

## Troubleshooting

### Build fails on GitHub
- Check the Actions tab for error details
- Ensure all image paths are correct
- Verify Jekyll frontmatter syntax

### Images not loading
- Ensure images are in the `images/` directory
- Check that paths use `{{ '/images/filename.jpg' | relative_url }}`

### Newsroom not loading
- Check browser console for CORS errors
- Verify the newsroom API endpoint is accessible
- The newsroom loads client-side, so it's normal to see a loading state initially

## Next Steps

After deployment:
- Visit your site and test all sections
- Check mobile responsiveness
- Verify smooth scrolling navigation works
- Test newsroom integration
- Share the URL for feedback!
