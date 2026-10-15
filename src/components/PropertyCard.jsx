import { useState } from "react";
import { Link } from "react-router-dom";
import { formatPrice } from "../utils.js";

export default function PropertyCard({ listing, saved, onToggleSave }) {
  const [imgFailed, setImgFailed] = useState(false);
  const isLand = listing.type === "land";
  const address = "/property/" + listing.id;

  return (
    <article className="card">
      <div className="card-media">
        <Link to={address} className="card-media-link" aria-label={"View " + listing.title}>
          {imgFailed ? (
            <div className="card-placeholder">{listing.type}</div>
          ) : (
            <img
              src={import.meta.env.BASE_URL + listing.image}
              alt={listing.title}
              loading="lazy"
              onError={() => setImgFailed(true)}
            />
          )}
        </Link>

        <span className={"tag tag-" + listing.status}>For {listing.status}</span>

        <button
          className={saved ? "heart saved" : "heart"}
          aria-label={saved ? "Remove from saved" : "Save property"}
          aria-pressed={saved}
          onClick={() => onToggleSave(listing.id)}
        >
          {saved ? "♥" : "♡"}
        </button>
      </div>

      <div className="card-body">
        <p className="card-price">{formatPrice(listing.price, listing.status)}</p>
        <h3>
          <Link className="card-title" to={address}>
            {listing.title}
          </Link>
        </h3>
        <p className="card-area">
          {listing.area}, {listing.city}
        </p>
        <ul className="card-meta">
          {!isLand && <li>{listing.beds} bed</li>}
          {!isLand && <li>{listing.baths} bath</li>}
          <li>{listing.size} sqm</li>
        </ul>
      </div>
    </article>
  );
}