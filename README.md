# Hearth & Key

A real estate listings website for homes, apartments and land in Lagos and Abuja, built with React.

**Live demo:** https://ugocity04-create.github.io/health-and-key/

> This is a concept project built for my portfolio. The properties, prices and contact details are sample data.

## What it does

- **Search from the home page** by city, property type and buy or rent
- **Filter and sort** the properties by city, type, buy or rent, and number of bedrooms, with sorting by price. The filters live in the web address, so a filtered page can be shared or refreshed
- **Property pages** with a photo gallery (up to 4 photos), features, facts and similar properties
- **Enquire on WhatsApp** opens WhatsApp with a ready-written message about that exact property
- **Save properties** with the heart button. They are stored on the visitor's device and shown on the Saved page
- **Fully responsive**, with a mobile menu and layouts that adapt from phone to desktop
- **Browser Back button and direct links** work, because every page has its own address

## Built with

- React 19 and Vite
- React Router (hash routing, so it works on GitHub Pages)
- Plain CSS with custom properties, no UI library
- `localStorage` for the saved list
- GitHub Actions to build and publish the site automatically

## Run it on your computer

```bash
git clone https://github.com/ugocity04-create/health-and-key.git
cd health-and-key
npm install
npm run dev
```

Then open the address shown in the terminal, usually http://localhost:5173.

To make a production build:

```bash
npm run build
```

## Project structure

```
public/
  images/            property photos
src/
  components/        Header, Footer, Hero, PropertyCard, Gallery
  pages/             Home, Listings, Detail, Saved
  data/listings.js   all the properties
  utils.js           price formatting, contact details, WhatsApp links
  App.jsx            routes and saved-properties state
```

## Adding a property

1. Add a new block to `src/data/listings.js` with a unique `id`.
2. Put the cover photo in `public/images/`, for example `house-5.jpg`.
3. Optional gallery photos: add `house-5-2.jpg`, `house-5-3.jpg` and `house-5-4.jpg` in the same folder. The gallery finds them by name, so no code change is needed.

## Deployment

Every push to the `main` branch builds the site and publishes it to GitHub Pages through the workflow in `.github/workflows/deploy.yml`.

## Author

Built by **Chibuike**, web developer in Nigeria.
**Contact**
**email:** akunashachibuike0@gmail.com 
**WhatsApp:** 234 8086987293 
**Tel:** 234 7070145768
