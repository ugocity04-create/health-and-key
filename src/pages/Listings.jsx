import { useSearchParams } from "react-router-dom";
import PropertyCard from "../components/PropertyCard.jsx";
import { listings, cities, types } from "../data/listings.js";
import { typeLabels } from "../utils.js";

export default function Listings({ savedIds, onToggleSave }) {
  // The filters live in the web address, e.g. /properties?city=Lagos&type=land
  const [params, setParams] = useSearchParams();
  const city = params.get("city") || "";
  const type = params.get("type") || "";
  const status = params.get("status") || "";
  const minBeds = Number(params.get("beds")) || 0;
  const sort = params.get("sort") || "default";

  // change one filter and keep the others as they are
  function update(key, value) {
    const next = new URLSearchParams(params);
    if (value) {
      next.set(key, value);
    } else {
      next.delete(key);
    }
    setParams(next, { replace: true });
  }

  function reset() {
    setParams({}, { replace: true });
  }

  // 1. keep only the properties that match every filter
  const results = listings.filter(
    (item) =>
      (!city || item.city === city) &&
      (!type || item.type === type) &&
      (!status || item.status === status) &&
      item.beds >= minBeds
  );

  // 2. sort the results (results is a fresh array, so sorting it is safe)
  if (sort === "low") results.sort((a, b) => a.price - b.price);
  if (sort === "high") results.sort((a, b) => b.price - a.price);

  const hasFilters = city || type || status || minBeds > 0 || sort !== "default";

  return (
    <main className="container page">
      <div className="page-head">
        <p className="eyebrow">Browse</p>
        <h1>Properties for sale and rent</h1>
      </div>

      <div className="filters">
        <label>
          City
          <select value={city} onChange={(e) => update("city", e.target.value)}>
            <option value="">Any city</option>
            {cities.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </label>

        <label>
          Type
          <select value={type} onChange={(e) => update("type", e.target.value)}>
            <option value="">Any type</option>
            {types.map((t) => (
              <option key={t} value={t}>{typeLabels[t]}</option>
            ))}
          </select>
        </label>

        <label>
          Buy or rent
          <select value={status} onChange={(e) => update("status", e.target.value)}>
            <option value="">Buy or rent</option>
            <option value="sale">Buy</option>
            <option value="rent">Rent</option>
          </select>
        </label>

        <label>
          Bedrooms
          <select value={minBeds} onChange={(e) => update("beds", e.target.value === "0" ? "" : e.target.value)}>
            <option value={0}>Any</option>
            <option value={1}>1+</option>
            <option value={2}>2+</option>
            <option value={3}>3+</option>
            <option value={4}>4+</option>
          </select>
        </label>

        <label>
          Sort by
          <select value={sort} onChange={(e) => update("sort", e.target.value === "default" ? "" : e.target.value)}>
            <option value="default">Recommended</option>
            <option value="low">Price: low to high</option>
            <option value="high">Price: high to low</option>
          </select>
        </label>
      </div>

      <div className="results-bar">
        <p>
          <strong>{results.length}</strong>{" "}
          {results.length === 1 ? "property" : "properties"} found
        </p>
        {hasFilters && (
          <button className="link-btn" onClick={reset}>Clear filters</button>
        )}
      </div>

      {results.length > 0 ? (
        <div className="grid">
          {results.map((item) => (
            <PropertyCard
              key={item.id}
              listing={item}
              saved={savedIds.includes(item.id)}
              onToggleSave={onToggleSave}
            />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No properties match that search</h2>
          <p>Try a different city or type, or clear the filters.</p>
          <button className="btn" onClick={reset}>Clear filters</button>
        </div>
      )}
    </main>
  );
}