import { Link } from "react-router-dom";
import Hero from "../components/Hero.jsx";
import PropertyCard from "../components/PropertyCard.jsx";
import { listings, types } from "../data/listings.js";
import { typeLabels, generalLink } from "../utils.js";

const reasons = [
  {
    title: "Verified listings",
    text: "We check the documents and the location before a property goes on the site, so what you see is what you get.",
  },
  {
    title: "Honest pricing",
    text: "The price on the page is the price we start from. No hidden charges added later, and we explain every fee.",
  },
  {
    title: "Support all the way",
    text: "From the first viewing to collecting the keys, one person from our team stays with you.",
  },
];

const steps = [
  { title: "Search", text: "Choose your city, the type of property and whether you want to buy or rent." },
  { title: "View", text: "Save your favourites, then message us to book a viewing at a time that suits you." },
  { title: "Move in", text: "We take care of the paperwork with you, and hand over the keys." },
];

export default function Home({ savedIds, onToggleSave }) {
  const featured = listings.filter((item) => item.featured);

  return (
    <>
      <Hero />

      <section className="section container">
        <div className="section-head">
          <div>
            <p className="eyebrow">Hand-picked</p>
            <h2>Featured properties</h2>
          </div>
          <Link className="btn btn-outline" to="/properties">
            View all
          </Link>
        </div>

        <div className="grid">
          {featured.map((item) => (
            <PropertyCard
              key={item.id}
              listing={item}
              saved={savedIds.includes(item.id)}
              onToggleSave={onToggleSave}
            />
          ))}
        </div>
      </section>

      <section className="section container">
        <div className="section-head">
          <div>
            <p className="eyebrow">Explore</p>
            <h2>Browse by type</h2>
          </div>
        </div>

        <div className="type-grid">
          {types.map((type) => {
            const sample = listings.find((item) => item.type === type);
            const count = listings.filter((item) => item.type === type).length;
            return (
              <Link
                key={type}
                className="type-tile"
                to={"/properties?type=" + type}
                style={{ backgroundImage: "url(" + import.meta.env.BASE_URL + sample.image + ")" }}
              >
                <span className="type-tile-text">
                  <strong>{typeLabels[type]}</strong>
                  <small>{count} available</small>
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="why">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="eyebrow">Why Hearth &amp; Key</p>
              <h2>Buying and renting, made calmer</h2>
            </div>
          </div>
          <div className="why-grid">
            {reasons.map((reason, index) => (
              <div className="why-card" key={reason.title}>
                <span className="why-number">0{index + 1}</span>
                <h3>{reason.title}</h3>
                <p>{reason.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section container">
        <div className="section-head">
          <div>
            <p className="eyebrow">Simple process</p>
            <h2>How it works</h2>
          </div>
        </div>
        <div className="steps">
          {steps.map((step, index) => (
            <div className="step" key={step.title}>
              <span className="step-dot">{index + 1}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="cta">
        <div className="container cta-inner">
          <div>
            <h2>Not sure where to start?</h2>
            <p>Tell us what you are looking for and we will send you a short list.</p>
          </div>
          <a className="btn" href={generalLink()} target="_blank" rel="noreferrer">
            Chat with us on WhatsApp
          </a>
        </div>
      </section>
    </>
  );
}