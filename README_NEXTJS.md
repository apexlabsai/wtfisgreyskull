# Fitness Archetype Selector - Next.js App

This is a React/Next.js application that replaces the dropdown movie selection with a visual archetype selection system.

## 🚀 Quick Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Add sample images:**
   Place these images in the `public/archetypes/` directory:
   - `lean.png` - Lean/Athletic archetype
   - `bulky.png` - Bulky/Powerlifter archetype  
   - `bodybuilder.png` - Classic Bodybuilder archetype
   - `kpop.png` - K-pop Aesthetic archetype
   - `superhero.png` - Hollywood Superhero archetype

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to `http://localhost:3000`

## 📁 File Structure

```
├── components/
│   └── ArchetypeSelector.jsx    # Main archetype selection component
├── pages/
│   ├── _app.js                  # App wrapper with global styles
│   └── index.js                 # Main page component
├── public/
│   └── archetypes/              # Place your sample images here
│       ├── lean.png
│       ├── bulky.png
│       ├── bodybuilder.png
│       ├── kpop.png
│       └── superhero.png
├── styles/
│   └── globals.css              # Global Tailwind styles
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── next.config.js
```

## 🎨 Features

- **Visual Archetype Selection**: Grid-based selection with images
- **Responsive Design**: Works on mobile, tablet, and desktop
- **Interactive States**: Hover effects and selection highlighting
- **Fallback Images**: Colored gradients if images fail to load
- **Form Integration**: Maintains existing form functionality
- **Clean UI**: Minimal, modern design with Tailwind CSS

## 🔧 Customization

### Adding New Archetypes
Edit `components/ArchetypeSelector.jsx` and add new objects to the `archetypes` array:

```javascript
{
  id: 'your_archetype_id',
  name: 'Your Archetype Name',
  image: '/public/archetypes/your_image.png',
  description: 'Description of this archetype'
}
```

### Styling
- Main styles are in `styles/globals.css`
- Component-specific styles use Tailwind classes
- Color schemes can be modified in `tailwind.config.js`

### Image Requirements
- **Format**: PNG or JPG
- **Aspect Ratio**: 3:4 (portrait orientation)
- **Size**: 400x600px recommended
- **Location**: `public/archetypes/` directory

## 🚀 Deployment

1. **Build the app:**
   ```bash
   npm run build
   ```

2. **Start production server:**
   ```bash
   npm start
   ```

Or deploy to platforms like Vercel, Netlify, or any Node.js hosting service.

## 📝 Notes

- The component maintains the same form submission logic as the original
- Selected archetype is stored in state and passed to form submission
- Images have fallback colored backgrounds if they fail to load
- Only one archetype can be selected at a time
- Visual feedback shows which archetype is currently selected
