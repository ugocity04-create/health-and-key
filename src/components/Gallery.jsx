import { useState } from "react";

// The most photos shown for one property, cover included
const MAX_PHOTOS = 4;

// "images/house-1.jpg" becomes:
// images/house-1.jpg, images/house-1-2.jpg, images/house-1-3.jpg, images/house-1-4.jpg
function galleryImages(cover) {
  const dot = cover.lastIndexOf(".");
  const base = cover.slice(0, dot);
  const ext = cover.slice(dot);
  const list = [cover];
  for (let n = 2; n <= MAX_PHOTOS; n++) {
    list.push(base + "-" + n + ext);
  }
  return list;
}

export default function Gallery({ cover, title, type, status }) {
  const all = galleryImages(cover);
  const [failed, setFailed] = useState([]);
  const [active, setActive] = useState(0);

  // Photos that do not exist are simply left out
  const photos = all.filter((photo) => !failed.includes(photo));
  const index = Math.min(active, photos.length - 1);

  function markFailed(photo) {
    setFailed((current) => (current.includes(photo) ? current : [...current, photo]));
  }

  function show(photo) {
    return import.meta.env.BASE_URL + photo;
  }

  const many = photos.length > 1;

  return (
    <div className="gallery">
      <div className="detail-media">
        {photos.length === 0 ? (
          <div className="card-placeholder">{type}</div>
        ) : (
          <img
            key={photos[index]}
            src={show(photos[index])}
            alt={title}
            onError={() => markFailed(photos[index])}
          />
        )}

        <span className={"tag tag-" + status}>For {status}</span>

        {many && (
          <>
            <button
              className="gal-btn gal-prev"
              aria-label="Previous photo"
              onClick={() => setActive((index - 1 + photos.length) % photos.length)}
            >
              &#8249;
            </button>
            <button
              className="gal-btn gal-next"
              aria-label="Next photo"
              onClick={() => setActive((index + 1) % photos.length)}
            >
              &#8250;
            </button>
            <span className="gal-count">
              {index + 1} / {photos.length}
            </span>
          </>
        )}
      </div>

      {many && (
        <div className="thumbs">
          {photos.map((photo, i) => (
            <button
              key={photo}
              className={i === index ? "thumb active" : "thumb"}
              aria-label={"Show photo " + (i + 1)}
              onClick={() => setActive(i)}
            >
              <img src={show(photo)} alt="" onError={() => markFailed(photo)} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}