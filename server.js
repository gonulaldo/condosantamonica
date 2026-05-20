import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

app.use(express.static('public'));

const CONDO_ADDRESS = '1440 23rd Street, Santa Monica, CA 90404';
const CONTACT_EMAIL = 'info@liefproductions.com';

const layout = (title, body) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${title}</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Helvetica Neue', sans-serif; margin: 0; background: #ffffff; color: #000000; letter-spacing: 0.2px; }
    h1, h2 { font-family: Georgia, 'Cormorant Garamond', serif; font-weight: 400; letter-spacing: 0.5px; }
    header { background: #ffffff; color: #000000; padding: 70px 20px; text-align: center; border-bottom: 1px solid #eaeaea; }
    header h1 { margin: 0; font-size: 2.2em; font-style: italic; line-height: 1.2; }
    header p { margin: 14px 0 0; opacity: 0.7; font-size: 1em; letter-spacing: 2px; text-transform: uppercase; }
    nav { background: #ffffff; padding: 18px; text-align: center; border-bottom: 1px solid #eaeaea; }
    nav a { margin: 0 24px; color: #000000; text-decoration: none; font-weight: 500; font-size: 0.95em; letter-spacing: 2px; text-transform: uppercase; }
    nav a:hover { opacity: 0.6; }
    main { max-width: 960px; margin: 40px auto; padding: 0 20px 60px; background: #ffffff; }
    .gallery { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 18px; margin: 20px 0; }
    .gallery img { width: 100%; height: 240px; object-fit: cover; border-radius: 2px; transition: transform 0.3s; }
    .gallery img:hover { transform: scale(1.01); }
    .info { background: #ffffff; padding: 32px; border-radius: 2px; border: 1px solid #eaeaea; margin-top: 24px; }
    .info h2 { margin-top: 0; color: #000000; font-size: 1.8em; }
    .info p { line-height: 1.7; color: #000000; }
    .email-btn { display: inline-block; background: #000000; color: #ffffff; padding: 16px 36px; border-radius: 2px; text-decoration: none; font-weight: 500; margin-top: 16px; font-size: 0.9em; letter-spacing: 3px; text-transform: uppercase; }
    .email-btn:hover { background: #333333; }
    .empty { text-align: center; color: #888888; padding: 40px; background: #ffffff; border: 1px solid #eaeaea; border-radius: 2px; }
    a { color: #000000; }
  </style>
</head>
<body>
  <header>
    <h1>Furnished 2 Bedroom + 2 Bathroom Condo</h1>
    <p>Available in Santa Monica</p>
  </header>
  <nav>
    <a href="/">Home</a>
    <a href="/contact">Contact</a>
  </nav>
  <main>${body}</main>
</body>
</html>
`;

app.get('/', (req, res) => {
  const imageDir = path.join(__dirname, 'public', 'images');
  let images = [];
  try {
    images = fs.readdirSync(imageDir).filter(f => /\.(jpe?g|png|webp|gif)$/i.test(f));
  } catch (e) {}
  const gallery = images.length
    ? `<div class="gallery">${images.map(f => `<img src="/images/${encodeURIComponent(f)}" alt="">`).join('')}</div>`
    : `<div class="empty">Add photos to <code>public/images</code> and refresh.</div>`;
  res.send(layout('Home', `
    ${gallery}
    <div class="info">
      <h2>Address</h2>
      <p>${CONDO_ADDRESS}</p>
    </div>
    <div class="info">
      <h2>Interested?</h2>
      <p>Visit the <a href="/contact">Contact</a> page to get in touch.</p>
    </div>
  `));
});

app.get('/contact', (req, res) => {
  res.send(layout('Contact', `
    <div class="info" style="text-align:center;">
      <h2>Get in touch</h2>
      <p>Click below to email me directly. Your email app will open with my address filled in.</p>
      <a class="email-btn" href="mailto:${CONTACT_EMAIL}?subject=Condo%20Rental%20Inquiry">Email Me</a>
      <p style="margin-top:24px; color:#888888; font-size:0.9em;">Or copy directly: ${CONTACT_EMAIL}</p>
    </div>
  `));
});

app.listen(3000, () => console.log('Server running at http://localhost:3000'));
