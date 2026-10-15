import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { cities, types } from "../data/listings.js";
import { typeLabels } from "../utils.js";

export default function Hero() {
  const navigate = useNavigate();
  const [city, setCity] = useState("");
  const [type, setType] = useState("");
  const [status, setStatus] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    // Build an address like /properties?city=Lagos&type=house
    const params = new URLSearchParams();
    if (city) params.set("city", city);
    if (type) params.set("type", type);
    if (status) params.set("status", status);
    const query = params.toString();
    navigate("/properties" + (query ? "?" + query : ""));
  }

  return (
    <section className="hero">
      <div className="container hero-inner">
        <p className="eyebrow">Lagos &amp; Abuja</p>
        <h1>Find a home you'll be proud to own.</h1>
        <p className="hero-sub">
          Verified houses, apartments and land, with honest prices and
          people who pick up the phone.
        </p>

        <form className="search" onSubmit={handleSubmit}>
          <label>
            City
            <select value={city} onChange={(e) => setCity(e.target.value)}>
              <option value="">Any city</option>
              {cities.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </label>

          <label>
            Property type
            <select value={type} onChange={(e) => setType(e.target.value)}>
              <option value="">Any type</option>
              {types.map((t) => (
                <option key={t} value={t}>{typeLabels[t]}</option>
              ))}
            </select>
          </label>

          <label>
            Buy or rent
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="">Buy or rent</option>
              <option value="sale">Buy</option>
              <option value="rent">Rent</option>
            </select>
          </label>

          <button className="btn" type="submit">Search</button>
        </form>
      </div>
    </section>
  );
}