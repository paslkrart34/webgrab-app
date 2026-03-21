# WebGrab PWA - Deployment Guide

Your WebGrab app is now packaged as a Progressive Web App (PWA) that works offline on iOS!

## 📁 What's Included

- `index.html` - Main app file (with PWA features added)
- `assets/` - JavaScript and CSS files
- `manifest.json` - PWA configuration for installation
- `sw.js` - Service worker for offline functionality
- `icon-192.png` & `icon-512.png` - App icons (you can replace these)

## 🚀 Deployment Instructions (GitHub Pages - FREE)

### Step 1: Create a GitHub Account
1. Go to https://github.com/signup
2. Create a free account (if you don't have one)

### Step 2: Create a New Repository
1. Click the "+" icon (top right) → "New repository"
2. Repository name: `webgrab-app` (or any name you like)
3. Make it **Public** (required for free GitHub Pages)
4. Click "Create repository"

### Step 3: Upload Your Files
1. On the repository page, click "uploading an existing file"
2. Drag and drop ALL files from this `webgrab-pwa` folder:
   - index.html
   - manifest.json
   - sw.js
   - icon-192.png
   - icon-512.png
   - The entire `assets` folder (it will maintain the folder structure)
3. Scroll down and click "Commit changes"

### Step 4: Enable GitHub Pages
1. In your repository, click "Settings" (top menu)
2. Scroll down to "Pages" (left sidebar under "Code and automation")
3. Under "Source", select "Deploy from a branch"
4. Under "Branch", select "main" (or "master"), folder "/ (root)"
5. Click "Save"
6. Wait 1-2 minutes for deployment

### Step 5: Get Your App URL
1. GitHub will show: "Your site is live at https://YOUR-USERNAME.github.io/webgrab-app/"
2. Copy this URL

## 📱 Install on iPhone

### Method 1: Add to Home Screen
1. On your iPhone, open **Safari** (must be Safari, not Chrome)
2. Go to your GitHub Pages URL (e.g., https://YOUR-USERNAME.github.io/webgrab-app/)
3. Tap the **Share** button (square with arrow pointing up)
4. Scroll down and tap **"Add to Home Screen"**
5. Name it "WebGrab" → tap "Add"
6. You'll now have a WebGrab icon on your home screen!

### Method 2: Bookmark for Quick Access
If "Add to Home Screen" doesn't appear:
1. Visit the URL in Safari
2. Tap the bookmark icon
3. Save to favourites

## ✅ Testing Offline Functionality

1. Open the app once while connected to the internet (this caches all files)
2. Turn on Airplane Mode on your iPhone
3. Open the app from your home screen
4. It should work completely offline! ✨

## 🔄 Updating the App

If you make changes later:
1. Go back to your GitHub repository
2. Click on the file you want to update
3. Click the pencil icon (Edit)
4. Make your changes
5. Commit changes
6. Wait 1-2 minutes, then refresh the app on your iPhone

## 🎨 Customising Icons (Optional)

The included icons are placeholders. To use custom icons:
1. Create 192x192px and 512x512px PNG images
2. Name them `icon-192.png` and `icon-512.png`
3. Upload them to your GitHub repository (replace the existing ones)
4. Clear Safari cache on your iPhone and re-add to home screen

## 🆘 Troubleshooting

**"Add to Home Screen" option doesn't appear:**
- Make sure you're using Safari (not Chrome or other browsers)
- iOS requires the site to be served over HTTPS (GitHub Pages does this automatically)
- Try visiting the site, waiting 30 seconds, then trying again

**App doesn't work offline:**
- Open the app once while online to cache files
- Check Safari settings: Settings → Safari → Advanced → Enable JavaScript

**Files missing after upload:**
- Make sure you uploaded the `assets` folder as a folder (not as loose files)
- The structure should be:
  ```
  webgrab-app/
  ├── index.html
  ├── manifest.json
  ├── sw.js
  ├── icon-192.png
  ├── icon-512.png
  └── assets/
      ├── index-CnkgfX3h.js
      └── index-Ddu1hthN.css
  ```

## 📧 Need Help?

If you run into issues, check:
- GitHub Pages is enabled in repository settings
- All files uploaded correctly
- Using Safari on iOS (other browsers don't support "Add to Home Screen" for PWAs)

---

**Enjoy your offline WebGrab app! 🎉**
