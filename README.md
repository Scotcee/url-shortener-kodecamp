# url-shortener-kodecamp
a url shortener web app built with boostrap only using api from cleanurl


A responsive URL shortener built with vanilla JavaScript and Node.js, using the CleanURI API.

🔗 **Live Demo:** [url-shortener-kodecamp.vercel.app](https://url-shortener-kodecamp.vercel.app)

## Tech Stack used in production and deployment
- Frontend: HTML, CSS, Vanilla JavaScript, Bootstrap 5
- Backend: Node.js, Express
- API: CleanURI
- Deployed on: Vercel

## Getting Started

```bash
git clone https://github.com/Scotcee/url-shortener-kodecamp.git
cd url-shortener-kodecamp
npm install
node server.js
```

Open `http://localhost:3000`

## How It Works
1. User enters a URL and clicks **Shorten It!**
2. Frontend validates the URL and auto-adds `https://` if missing
3. A POST request is sent to `/shorten` on the backend
4. The backend calls CleanURI server-side (bypassing CORS after nights of struggling) and returns the short link
5. The result appears as a card with a one-click copy button

## Why a Backend?
CleanURI blocks direct browser requests due to CORS. The backend acts as a middleman, making the request server-to-server where CORS is bypassed.

## Deployment
Every push to `main` auto-deploys to Vercel. To deploy your own:
1. Fork the repo
2. Go to [vercel.com](https://vercel.com) and import the repo
3. Click Deploy
