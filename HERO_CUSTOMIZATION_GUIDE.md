# Hero Section Customization Guide

## 🎨 Overview
Your new hero section features:
- ✅ Infinite sliding image carousel background
- ✅ Professional typography matching the reference design
- ✅ Smooth animations and parallax effects
- ✅ Responsive design for all screen sizes
- ✅ Premium glow effects and floating text animation
- ✅ Scroll-down indicator with smooth scrolling

## 📸 How to Add Your Own Carousel Images

### Option 1: Using Local Images (Recommended)

1. **Create an images folder** (if not exists):
   ```
   client/public/hero-carousel/
   ```

2. **Add your images** to this folder:
   ```
   client/public/hero-carousel/
   ├── image1.jpg
   ├── image2.jpg
   ├── image3.jpg
   ├── image4.jpg
   ├── image5.jpg
   └── image6.jpg
   ```

3. **Update the Hero component** (`client/src/components/Hero.jsx`):
   
   Find this section (around line 30):
   ```javascript
   const carouselImages = [
     'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&h=600&fit=crop',
     'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&h=600&fit=crop',
     // ... more placeholder images
   ];
   ```

   Replace it with:
   ```javascript
   const carouselImages = [
     '/hero-carousel/image1.jpg',
     '/hero-carousel/image2.jpg',
     '/hero-carousel/image3.jpg',
     '/hero-carousel/image4.jpg',
     '/hero-carousel/image5.jpg',
     '/hero-carousel/image6.jpg',
   ];
   ```

### Option 2: Using External URLs

Simply replace the URLs in the `carouselImages` array with your image URLs:

```javascript
const carouselImages = [
  'https://your-domain.com/image1.jpg',
  'https://your-domain.com/image2.jpg',
  'https://your-domain.com/image3.jpg',
  'https://your-domain.com/image4.jpg',
  'https://your-domain.com/image5.jpg',
  'https://your-domain.com/image6.jpg',
];
```

## 🎯 Image Recommendations

### Best Practices:
- **Resolution**: 1920x1080px or higher
- **Aspect Ratio**: 16:9 or 4:3 works best
- **File Format**: JPG (for photos), PNG (for graphics)
- **File Size**: Optimize to 200-500KB per image for fast loading
- **Number of Images**: 4-8 images recommended
- **Content**: Industrial equipment, machinery, workplace, products

### Image Optimization Tools:
- [TinyPNG](https://tinypng.com/) - Compress images
- [Squoosh](https://squoosh.app/) - Advanced image optimization
- [ImageOptim](https://imageoptim.com/) - Mac app for optimization

## 🎨 Customization Options

### Change Text Content

Edit `client/src/components/Hero.jsx` (around line 55):

```javascript
<p className="hero-welcome">WELCOME TO</p>
<h1 className="hero-title">OCEANR</h1>
<p className="hero-subtitle">ENTERPRISES</p>
```

### Adjust Overlay Color

Edit `client/src/components/Hero.css` (around line 46):

```css
.hero-overlay {
  background: linear-gradient(
    135deg,
    rgba(30, 58, 138, 0.85) 0%,    /* Dark blue - adjust RGB values */
    rgba(37, 99, 235, 0.75) 50%,   /* Medium blue */
    rgba(59, 130, 246, 0.7) 100%   /* Light blue */
  );
}
```

**Color Suggestions:**
- **Darker overlay**: Increase opacity (0.85 → 0.95)
- **Lighter overlay**: Decrease opacity (0.85 → 0.65)
- **Different color**: Change RGB values (e.g., for purple: `rgba(88, 28, 135, 0.85)`)

### Adjust Carousel Speed

Edit `client/src/components/Hero.css` (around line 26):

```css
.carousel-track {
  animation: infiniteSlide 40s linear infinite;  /* Change 40s to adjust speed */
}
```

- **Slower**: Increase seconds (e.g., `60s`)
- **Faster**: Decrease seconds (e.g., `25s`)

### Change Text Size

Edit `client/src/components/Hero.css`:

```css
/* Main title size (around line 115) */
.hero-title {
  font-size: 9rem;  /* Adjust this value */
}

/* Subtitle size (around line 130) */
.hero-subtitle {
  font-size: 2.5rem;  /* Adjust this value */
}

/* Welcome text size (around line 100) */
.hero-welcome {
  font-size: 1.5rem;  /* Adjust this value */
}
```

### Disable Animations (Optional)

If you want to disable specific animations, edit `client/src/components/Hero.css`:

```css
/* Disable floating text animation */
.hero-text {
  animation: none;
}

/* Disable glow pulse */
.text-glow {
  animation: none;
}

/* Disable parallax effect */
/* Remove the parallax useEffect in Hero.jsx */
```

## 📱 Mobile Responsiveness

The hero section is fully responsive. If you need to adjust mobile sizes:

Edit `client/src/components/Hero.css` (around line 200):

```css
@media (max-width: 640px) {
  .hero-title {
    font-size: 3.5rem;  /* Adjust mobile title size */
  }
}
```

## 🚀 Performance Tips

1. **Optimize Images**: Always compress images before uploading
2. **Lazy Loading**: Images load efficiently with the current setup
3. **Reduce Images**: Use 4-6 images instead of 8+ for faster loading
4. **WebP Format**: Convert images to WebP for better compression

## 🎬 Animation Controls

### Fade-in Duration
Edit `client/src/components/Hero.css` (around line 75):

```css
@keyframes fadeInUp {
  /* Animation happens over 1.2s - adjust as needed */
}
```

### Floating Animation Speed
Edit `client/src/components/Hero.css` (around line 95):

```css
.hero-text {
  animation: floatText 6s ease-in-out infinite;  /* Change 6s */
}
```

## 🔧 Troubleshooting

### Images Not Showing?
1. Check image paths are correct
2. Ensure images are in the `public` folder
3. Clear browser cache (Ctrl+Shift+R)
4. Check browser console for errors

### Carousel Not Moving?
1. Check CSS animation is not disabled
2. Verify browser supports CSS animations
3. Check for JavaScript errors in console

### Text Not Visible?
1. Increase overlay opacity
2. Check text color is white
3. Ensure z-index is correct

## 📞 Need Help?

If you encounter any issues:
1. Check browser console for errors (F12)
2. Verify all files are saved
3. Restart the development server
4. Clear browser cache

## 🎉 You're All Set!

Your hero section is now ready with:
- ✅ Professional design matching the reference
- ✅ Infinite carousel background
- ✅ Modern animations
- ✅ Full responsiveness
- ✅ Premium visual effects

Enjoy your new hero section! 🚀
