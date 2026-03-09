# Deployment Guide

This guide will help you deploy the T-Shirt Customizer application to various platforms.

## Prerequisites

- Node.js 18+ installed
- OpenAI API key
- GitHub account
- (Optional) Vercel/Netlify accounts

## Platform-Specific Deployment

### 1. Vercel (Recommended)

Vercel is the easiest deployment platform for this project.

#### Steps:

1. **Prepare your repository**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository: `T-Shirt-Customizer`
   - Framework Preset: Vite (auto-detected)
   - Root Directory: `./` (leave default)
   - Build Command: `cd client && npm run build`
   - Output Directory: `client/dist`

3. **Add Environment Variables**
   In Vercel Project Settings → Environment Variables:
   ```
   OPENAI_API_KEY = your_openai_api_key
   VITE_API_URL = https://your-project.vercel.app/api
   ```

4. **Deploy**
   - Click "Deploy"
   - Wait for build (~2-3 minutes)
   - Your app will be live!

#### Serverless Function for Vercel:

Vercel automatically converts Express routes to serverless functions. No additional configuration needed.

---

### 2. Netlify

Netlify is another excellent option for deployment.

#### Steps:

1. **Prepare for Deployment**
   ```bash
   cd client
   npm run build
   ```

2. **Deploy to Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Connect to GitHub
   - Select your repository: `T-Shirt-Customizer`
   - Build settings:
     - **Branch to deploy:** `main`
     - **Build command:** `cd client && npm run build`
     - **Publish directory:** `client/dist`

3. **Configure Environment Variables**
   In Site Settings → Environment Variables:
   ```
   OPENAI_API_KEY = your_openai_api_key
   VITE_API_URL = https://your-site.netlify.app/api
   ```

4. **Deploy**
   - Click "Deploy site"
   - Wait for build
   - Your site is live!

#### Serverless Functions:

For Netlify, create `netlify/functions/dalle.js`:

```javascript
import { Configuration, OpenAIApi } from 'openai';

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

export default async (req, context) => {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  try {
    const { prompt } = await req.json();

    const response = await openai.createImage({
      prompt,
      n: 1,
      size: '1024x1024',
      response_format: 'b64_json'
    });

    const image = response.data.data[0].b64_json;

    return new Response(
      JSON.stringify({ photo: image }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ message: "Something went wrong" }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
};

export const config = {
  path: '/api/v1/dalle'
};
```

---

### 3. GitHub Pages

Free hosting for static sites with CI/CD.

#### Steps:

1. **Update Vite Config**
   
   Edit `client/vite.config.js`:
   ```javascript
   import { defineConfig } from 'vite'
   import react from '@vitejs/plugin-react'
   
   export default defineConfig({
     base: '/T-Shirt-Customizer/',
     plugins: [react()],
     server: {
       port: 5173,
     }
   })
   ```

2. **Enable GitHub Pages**
   - Go to your repository on GitHub
   - Settings → Pages
   - Source: **GitHub Actions**
   - The workflow in `.github/workflows/deploy.yml` will automatically build and deploy

3. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Update for GitHub Pages"
   git push origin main
   ```

4. **Wait for Deployment**
   - GitHub Actions will build your project
   - Go to Actions tab to see progress
   - Once complete, your site will be at:
     ```
     https://your-username.github.io/T-Shirt-Customizer/
     ```

#### Note:
- GitHub Pages only hosts the frontend (static files)
- For backend functionality, you'll need a separate API deployment
- Consider using Vercel/Netlify for full-stack deployment

---

### 4. Self-Hosted (VPS/Cloud)

Deploy to your own server (DigitalOcean, AWS, Heroku, etc.)

#### Server Setup:

1. **Prepare Production Environment**
   ```bash
   # On your server
   git clone https://github.com/Affan-Ghouri/T-Shirt-Customizer.git
   cd T-Shirt-Customizer
   
   # Install dependencies
   npm run install:all
   ```

2. **Configure Environment**
   ```bash
   cd server
   cp .env.example .env
   # Edit .env with your production values
   ```

3. **Start Services**

   Using PM2 (recommended):
   ```bash
   # Install PM2
   npm install -g pm2
   
   # Start server
   cd server
   pm2 start index.js --name "tshirt-api"
   
   # Start client (if needed)
   cd ../client
   npm run build
   # Use nginx to serve client/dist
   ```

4. **Configure Reverse Proxy (Nginx)**
   
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;
   
       # Frontend
       location / {
           root /path/to/T-Shirt-Customizer/client/dist;
           try_files $uri $uri/ /index.html;
       }
   
       # Backend API
       location /api {
           proxy_pass http://localhost:8080;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

5. **Enable HTTPS**
   ```bash
   sudo certbot --nginx -d your-domain.com
   ```

---

## Environment Variables Reference

### Required for All Deployments:

| Variable | Description | Example |
|----------|-------------|----------|
| `OPENAI_API_KEY` | OpenAI API key for DALL-E | `sk-proj-...` |

### Optional Variables:

| Variable | Description | Example |
|----------|-------------|----------|
| `VITE_API_URL` | Backend API URL | `https://api.example.com` |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name | `my-cloud` |
| `CLOUDINARY_API_KEY` | Cloudinary API key | `1234567890` |
| `CLOUDINARY_API_SECRET` | Cloudinary secret | `abc123def456` |

---

## Troubleshooting

### Issue: Build fails on Vercel/Netlify

**Solution:**
- Ensure `package.json` scripts are correct
- Check Node.js version compatibility (18+)
- Review build logs for specific errors

### Issue: API requests fail in production

**Solution:**
- Verify `VITE_API_URL` environment variable
- Check CORS settings on backend
- Ensure backend is deployed and accessible
- Test API endpoint directly first

### Issue: 3D model doesn't load

**Solution:**
- Verify `shirt_baked.glb` is in `client/public/`
- Check file path references in code
- Ensure proper MIME types are served

### Issue: Images don't save on download

**Solution:**
- Check WebGL renderer configuration: `gl={{ preserveDrawingBuffer: true }}`
- Verify download helper function works in production
- Test in different browsers

---

## Best Practices

1. **Always use environment variables** - Never hardcode API keys
2. **Enable HTTPS** - Required for secure connections
3. **Monitor API usage** - OpenAI API has costs
4. **Set rate limits** - Prevent abuse of your API
5. **Add analytics** - Track user behavior and errors
6. **Use CDN** - Serve static assets faster
7. **Implement caching** - Reduce API calls and improve performance

---

## Cost Considerations

### OpenAI API:
- DALL-E 3: ~$0.04 per image
- DALL-E 2: ~$0.02 per image
- Set limits to control costs

### Hosting:
- Vercel: Free tier (100GB bandwidth/month)
- Netlify: Free tier (100GB bandwidth/month)
- GitHub Pages: Free (unlimited)

---

## Performance Optimization

1. **Lazy load 3D model** - Load only when needed
2. **Compress images** - Reduce file sizes
3. **Use CDN** - Serve assets faster
4. **Implement caching** - Reduce API calls
5. **Optimize build** - Code splitting and minification

---

Need help? Check the [GitHub Issues](https://github.com/Affan-Ghouri/T-Shirt-Customizer/issues) or open a new one!

---

**Happy Deploying!** 🚀
