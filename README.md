# 🎨 Three.js AI T-Shirt Customizer

A modern 3D T-shirt customization application built with React, Three.js, and OpenAI's DALL-E for AI-generated designs.

## ✨ Features

- 🎨 **3D T-Shirt Preview** - Real-time 3D rendering with Three.js and React Three Fiber
- 🤖 **AI-Generated Designs** - Create unique designs using OpenAI's DALL-E API
- 🖼️ **Custom Image Upload** - Upload your own logos and designs
- 🎨 **Color Picker** - Choose from unlimited colors for your t-shirt
- 📱 **Responsive Design** - Works on desktop and mobile devices
- ✨ **Smooth Animations** - Built with Framer Motion
- 🌙 **Glassmorphism UI** - Modern, sleek interface design

## 🚀 Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Three.js** - 3D graphics library
- **@react-three/fiber** - React renderer for Three.js
- **@react-three/drei** - Useful helpers for R3F
- **Framer Motion** - Animation library
- **Tailwind CSS** - Utility-first CSS framework
- **valtio** - State management
- **react-color** - Color picker component

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **OpenAI** - AI image generation (DALL-E)
- **Cloudinary** - Image storage
- **MongoDB** - Database (via Mongoose)
- **CORS** - Cross-origin resource sharing

## 📦 Installation

### Prerequisites
- Node.js 18+ installed
- OpenAI API key ([Get one here](https://platform.openai.com/api-keys))

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/Affan-Ghouri/T-Shirt-Customizer.git
   cd T-Shirt-Customizer
   ```

2. **Install dependencies**

   Client:
   ```bash
   cd client
   npm install
   ```

   Server:
   ```bash
   cd ../server
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the `server` directory:

   ```env
   OPENAI_API_KEY=your_openai_api_key_here
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   ```

4. **Start the application**

   In two separate terminals:

   Terminal 1 (Server):
   ```bash
   cd server
   npm start
   ```

   Terminal 2 (Client):
   ```bash
   cd client
   npm run dev
   ```

   The app will be available at `http://localhost:5173`

## 🌐 Deployment

### Vercel (Recommended)

1. Fork this repository
2. Go to [vercel.com](https://vercel.com) and import your repository
3. Vercel will auto-detect the project configuration
4. Add environment variables in Vercel dashboard
5. Deploy!

### Netlify

1. Fork this repository
2. Go to [netlify.com](https://netlify.com) and import your repository
3. Set build command: `cd client && npm run build`
4. Set publish directory: `client/dist`
5. Add environment variables
6. Deploy!

### GitHub Pages

1. Fork this repository
2. Update `vite.config.js` base path:
   ```js
   export default defineConfig({
     base: '/T-Shirt-Customizer/',
     plugins: [react()],
   })
   ```
3. Push to GitHub
4. Enable GitHub Pages in repository settings
5. Build and deploy with GitHub Actions

## 📖 Usage

1. **Customize Your T-Shirt**
   - Click "Customize It" on the home screen
   - Choose from three editing options:
     - 🎨 **Color Picker** - Change t-shirt color
     - 📁 **File Picker** - Upload your own image/logo
     - 🤖 **AI Picker** - Generate designs with AI

2. **AI Image Generation**
   - Click the AI tab
   - Enter a prompt describing your desired design
   - Wait for generation (takes 10-30 seconds)
   - The design will be applied to your t-shirt

3. **Filter Tabs**
   - Switch between logo texture (small) and full texture (full shirt)

4. **Download**
   - Click the download button to save your customized t-shirt as an image

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|-----------|
| `OPENAI_API_KEY` | Your OpenAI API key for DALL-E | Yes |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name | Optional |
| `CLOUDINARY_API_KEY` | Cloudinary API key | Optional |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret | Optional |

### API Endpoints

- `GET /api/v1/dalle` - Health check
- `POST /api/v1/dalle` - Generate AI image
  - Body: `{ prompt: string }`
  - Response: `{ photo: base64_string }`

## 🎯 Roadmap

- [ ] Add multiple t-shirt models (hoodies, long-sleeve, etc.)
- [ ] Save and load customizations
- [ ] Share designs on social media
- [ ] Order custom t-shirts (e-commerce integration)
- [ ] User accounts and saved designs database
- [ ] More AI models (Midjourney, Stable Diffusion)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

**Affan Ahmed Ghouri (Notjerry)**
- GitHub: [Affan-Ghouri](https://github.com/Affan-Ghouri)
- Open Source Contributor

## 🙏 Acknowledgments

- Three.js community for the amazing 3D library
- OpenAI for the DALL-E API
- React Three Fiber team for the React renderer

## 📸 Screenshots

![Demo](https://github.com/user-attachments/assets/a0ec767d-594e-42b7-8e9f-d0dc639e88ac)

---

**⭐ Star this repository if you like it!**
