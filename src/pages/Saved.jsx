import { Link } from "react-router-dom";
import PropertyCard from "../components/PropertyCard.jsx";
import { listings } from "../data/listings.js";

export default function Saved({ savedIds, onToggleSave }) {
  const saved = listings.filter((item) => savedIds.includes(item.id));

  return (
    <main className="container page">
      <div className="page-head">
        <p className="eyebrow">Your shortlist</p>
        <h1>Saved properties</h1>
      </div>

      {saved.length > 0 ? (
        <div className="grid">
          {saved.map((item) => (
            <PropertyCard
              key={item.id}
              listing={item}
              saved={true}
              onToggleSave={onToggleSave}
            />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>Nothing saved yet</h2>
          <p>Tap the heart on any property to keep it here for later.</p>
          <Link className="btn" to="/properties">Browse properties</Link>
        </div>
      )}
    </main>
  );
}