import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

app.use(express.static('public'));

const CONDO_ADDRESS = '1440 23rd Street, Santa Monica, CA 90404';
const CONTACT_EMAIL = 'info@liefproductions.com';
const CALENDLY_URL = 'https://calendly.com/gonulaldogan/30min';

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
    .highlights { display: flex; flex-wrap: wrap; gap: 10px; justify-content: center; padding: 28px 20px 0; max-width: 960px; margin: 0 auto; }
    .highlights span { display: inline-block; padding: 8px 16px; background: #f5f5f5; border-radius: 2px; font-size: 0.75em; letter-spacing: 2px; text-transform: uppercase; color: #444; }
    nav { background: #ffffff; padding: 18px; text-align: center; border-bottom: 1px solid #eaeaea; margin-top: 28px; }
    nav a { margin: 0 22px; color: #000000; text-decoration: none; font-weight: 500; font-size: 0.9em; letter-spacing: 2px; text-transform: uppercase; }
    nav a:hover { opacity: 0.6; }
    main { max-width: 960px; margin: 40px auto; padding: 0 20px 60px; background: #ffffff; }
    .gallery { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 18px; margin: 20px 0; }
    .gallery img { width: 100%; height: 240px; object-fit: cover; border-radius: 2px; transition: transform 0.3s; }
    .gallery img:hover { transform: scale(1.01); }
    .info { background: #ffffff; padding: 32px; border-radius: 2px; border: 1px solid #eaeaea; margin-top: 24px; }
    .info h2 { margin-top: 0; color: #000000; font-size: 1.8em; }
    .info p { line-height: 1.7; color: #000000; }
    .info p + p { margin-top: 16px; }
    .info ul { line-height: 1.9; padding-left: 20px; margin: 12px 0; }
    .info li { margin-bottom: 4px; }
    .quick-facts { display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 24px; margin-top: 16px; }
    .quick-facts div { text-align: center; }
    .quick-facts .num { font-family: Georgia, serif; font-size: 2.2em; display: block; line-height: 1; margin-bottom: 6px; }
    .quick-facts .label { font-size: 0.7em; letter-spacing: 2px; text-transform: uppercase; color: #888; }
    .email-btn { display: inline-block; background: #000000; color: #ffffff; padding: 16px 32px; border-radius: 2px; text-decoration: none; font-weight: 500; margin: 16px 8px 0; font-size: 0.85em; letter-spacing: 3px; text-transform: uppercase; }
    .email-btn.outline { background: #ffffff; color: #000000; border: 1px solid #000000; }
    .email-btn:hover { background: #333333; color: #ffffff; }
    .email-btn.outline:hover { background: #000000; color: #ffffff; }
    .empty { text-align: center; color: #888888; padding: 40px; background: #ffffff; border: 1px solid #eaeaea; border-radius: 2px; }
    a { color: #000000; }
  </style>
</head>
<body>
  <header>
    <h1>Luxury Furnished 2 Bedroom + 2 Bathroom Condo</h1>
    <p>Available in Santa Monica</p>
  </header>
  <div class="highlights">
    <span>Beautifully Maintained Courtyards</span>
    <span>Spa-Inspired Primary Suite</span>
  </div>
  <nav>
    <a href="/">Home</a>
    <a href="/schedule">Schedule</a>
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
    images = fs.readdirSync(imageDir).filter(f => /\.(jpe?g|png|webp|gif|avif)$/i.test(f));
  } catch (e) {}
  const gallery = images.length
    ? `<div class="gallery">${images.map(f => `<img src="/images/${encodeURIComponent(f)}" alt="">`).join('')}</div>`
    : `<div class="empty">Add photos to <code>public/images</code> and refresh.</div>`;
  res.send(layout('Home', `
    ${gallery}
    <div class="info">
      <h2>Quick facts</h2>
      <div class="quick-facts">
        <div><span class="num">2</span><span class="label">Bedrooms</span></div>
        <div><span class="num">2</span><span class="label">Bathrooms</span></div>
        <div><span class="num">972</span><span class="label">Sq Ft</span></div>
        <div><span class="num">2</span><span class="label">Parking</span></div>
      </div>
    </div>
    <div class="info">
      <h2>About this home</h2>
      <p>This beautifully appointed 2-bedroom, 2-bathroom first-floor condo at 1440 23rd Street offers the perfect blend of comfort, style, and location in one of Los Angeles's most sought-after neighborhoods. Available fully furnished and move-in ready.</p>
      <p>Inside, you'll find a beautifully appointed living area, a well-equipped kitchen with dishwasher, microwave, refrigerator, and stove, and an in-unit all-in-one washer/dryer for effortless living. Both bathrooms have been fully renovated to a high standard, with the spa-inspired primary suite featuring radiant heated flooring that brings a touch of luxury to every morning. Each room is equipped with its own mini-split air conditioning system for personalized, year-round comfort.</p>
      <p>The 1440 23rd Street community offers resort-style amenities including a lounge area, a fitness/exercise room, gated security, and beautifully maintained courtyards. Tandem parking for 2 cars is included.</p>
      <p>Location is everything here. You are just steps from Providence Saint John's Health Center, Universal Music Group, and The Water Garden Business District. The Metro Station is a short distance away, making commuting effortless. Venice Beach, Third Street Promenade, Santa Monica College, Topanga State Park, LAX, and freeway access are all within easy reach.</p>
      <p>This is an exceptional opportunity to live in a luxury Santa Monica condo at an incredible value. Association dues are included in the rent. Pets considered with restrictions.</p>
    </div>
    <div class="info">
      <h2>Inside the home</h2>
      <ul>
        <li>2 bedrooms, 2 full bathrooms &mdash; 972 sqft, first floor</li>
        <li>Fully furnished and move-in ready</li>
        <li>Spa-inspired primary suite with radiant heated flooring</li>
        <li>Tile flooring in primary bathroom</li>
        <li>Mini-split air conditioning in every room</li>
        <li>Central heating</li>
        <li>Kitchen with dishwasher, microwave, refrigerator, and stove</li>
        <li>In-unit all-in-one washer/dryer</li>
      </ul>
    </div>
    <div class="info">
      <h2>Building &amp; amenities</h2>
      <ul>
        <li>Beautifully maintained courtyards</li>
        <li>Resident lounge area</li>
        <li>Fitness / exercise room</li>
        <li>Gated security</li>
        <li>Tandem parking for 2 cars</li>
        <li>Association dues included in the rent</li>
        <li>Pets considered with restrictions</li>
        <li>Built in 1973</li>
      </ul>
    </div>
    <div class="info">
      <h2>Location</h2>
      <p>Steps from Providence Saint John's Health Center, Universal Music Group, and The Water Garden Business District. Close to the Metro Station for easy commuting. Venice Beach, Third Street Promenade, Santa Monica College, Topanga State Park, LAX, and freeway access are all within easy reach.</p>
    </div>
    <div class="info">
      <h2>Lease terms</h2>
      <p>Long-term (1+ year) preferred. Short-term stays are available &mdash; pricing is flexible based on length of stay. Please reach out for a custom quote.</p>
    </div>
    <div class="info">
      <h2>Address</h2>
      <p>${CONDO_ADDRESS}</p>
    </div>
    <div class="info" style="text-align:center;">
      <h2>Interested?</h2>
      <p>Schedule a private viewing or send a message &mdash; happy to answer any questions.</p>
      <a class="email-btn" href="/schedule">Schedule a Viewing</a>
      <a class="email-btn outline" href="/contact">Send Message</a>
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
    <div class="info" style="text-align:center; margin-top:24px;">
      <h2>Prefer to schedule a viewing?</h2>
      <p>Pick a time that works for you.</p>
      <a class="email-btn" href="/schedule">Open Calendar</a>
    </div>
  `));
});

app.get('/schedule', (req, res) => {
  res.send(layout('Schedule a Viewing', `
    <div class="info">
      <h2 style="text-align:center;">Schedule a Viewing</h2>
      <p style="text-align:center; color:#666;">Pick a time that works for you &mdash; the calendar below shows real-time availability.</p>
      <div class="calendly-inline-widget" data-url="${CALENDLY_URL}" style="min-width:320px;height:780px;"></div>
      <script type="text/javascript" src="https://assets.calendly.com/assets/external/widget.js" async></script>
    </div>
  `));
});

app.listen(process.env.PORT || 3000, () => console.log('Server running'));
