import { Link, useParams } from "react-router-dom";
import Gallery from "../components/Gallery.jsx";
import PropertyCard from "../components/PropertyCard.jsx";
import { listings } from "../data/listings.js";
import { formatPrice, enquiryLink, PHONE_DISPLAY, WHATSAPP_NUMBER } from "../utils.js";

export default function Detail({ savedIds, onToggleSave }) {
  // The number at the end of the address: /property/4
  const { id } = useParams();
  const item = listings.find((entry) => entry.id === Number(id));

  // If the property cannot be found, show a friendly message
  if (!item) {
    return (
      <main className="container page">
        <div className="empty">
          <h2>We could not find that property</h2>
          <p>It may have been sold or removed.</p>
          <Link className="btn" to="/properties">Back to properties</Link>
        </div>
      </main>
    );
  }

  const isLand = item.type === "land";
  const saved = savedIds.includes(item.id);
  const similar = listings
    .filter((entry) => entry.id !== item.id && entry.type === item.type)
    .slice(0, 3);

  return (
    <main className="container page">
      <Link className="back" to="/properties">&larr; Back to properties</Link>

      <div className="detail">
        <div className="detail-main">
          <Gallery
            key={item.id}
            cover={item.image}
            title={item.title}
            type={item.type}
            status={item.status}
          />

          <h2 className="detail-heading">About this property</h2>
          <p className="detail-text">{item.description}</p>

          <h2 className="detail-heading">Features</h2>
          <ul className="features">
            {item.features.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
        </div>

        <aside className="detail-card">
          <p className="detail-price">{formatPrice(item.price, item.status)}</p>
          <h1 className="detail-title">{item.title}</h1>
          <p className="card-area">{item.area}, {item.city}</p>

          <dl className="facts">
            {!isLand && (
              <div>
                <dt>Bedrooms</dt>
                <dd>{item.beds}</dd>
              </div>
            )}
            {!isLand && (
              <div>
                <dt>Bathrooms</dt>
                <dd>{item.baths}</dd>
              </div>
            )}
            <div>
              <dt>Size</dt>
              <dd>{item.size} sqm</dd>
            </div>
            <div>
              <dt>Type</dt>
              <dd className="cap">{item.type}</dd>
            </div>
          </dl>

          <a className="btn btn-block" href={enquiryLink(item)} target="_blank" rel="noreferrer">
            Enquire on WhatsApp
          </a>
          <a className="btn btn-outline btn-block" href={"tel:+" + WHATSAPP_NUMBER}>
            Call {PHONE_DISPLAY}
          </a>
          <button className="btn btn-outline btn-block" onClick={() => onToggleSave(item.id)}>
            {saved ? "♥ Saved" : "♡ Save property"}
          </button>
        </aside>
      </div>

      {similar.length > 0 && (
        <section className="similar">
          <h2>You may also like</h2>
          <div className="grid">
            {similar.map((entry) => (
              <PropertyCard
                key={entry.id}
                listing={entry}
                saved={savedIds.includes(entry.id)}
                onToggleSave={onToggleSave}
              />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}