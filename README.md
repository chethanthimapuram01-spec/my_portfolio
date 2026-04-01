# Portfolio

Personal portfolio site built with Next.js and deployed on Vercel.

## Stack

- Next.js 14+ (App Router)
- TypeScript
- Tailwind CSS
- Vercel (deployment)

## Setup

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Build

```bash
npm run build
npm start
```

## Deploy

Connect repo to Vercel. Auto-deploys on push to main.

Set environment variables in Vercel dashboard if using contact form.

## Structure

```
app/              # Next.js app router pages
components/       # React components
  sections/       # Page sections (header, footer, hero)
  ui/            # Reusable UI components
config/          # Site config and data
lib/             # Utils and types
public/          # Static assets
styles/          # Additional styles
```

## Todo

- [ ] Add content to config files
- [ ] Implement contact form
- [ ] Add projects
- [ ] Setup analytics (optional)
- [ ] Add dark mode
- [ ] Optimize images

## License

MIT