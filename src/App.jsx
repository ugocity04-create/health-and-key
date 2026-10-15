import { useState, useEffect } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import Listings from "./pages/Listings.jsx";
import Saved from "./pages/Saved.jsx";
import Detail from "./pages/Detail.jsx";

// Read the saved properties from the visitor's device (empty list if none)
function loadSaved() {
  try {
    return JSON.parse(localStorage.getItem("hk-saved")) || [];
  } catch {
    return [];
  }
}

function NotFound() {
  return (
    <main className="container page">
      <div className="empty">
        <h2>Page not found</h2>
        <p>That page does not exist.</p>
        <Link className="btn" to="/">Go to the home page</Link>
      </div>
    </main>
  );
}

export default function App() {
  const [savedIds, setSavedIds] = useState(loadSaved);
  const { pathname } = useLocation();

  // Every time the saved list changes, store it on the device
  useEffect(() => {
    try {
      localStorage.setItem("hk-saved", JSON.stringify(savedIds));
    } catch {
      /* storage blocked: the site still works, it just forgets */
    }
  }, [savedIds]);

  // Start at the top of the page whenever the page (not just the filters) changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  function toggleSave(id) {
    setSavedIds((current) =>
      current.includes(id) ? current.filter((x) => x !== id) : [...current, id]
    );
  }

  return (
    <>
      <Header savedCount={savedIds.length} />

      <Routes>
        <Route path="/" element={<Home savedIds={savedIds} onToggleSave={toggleSave} />} />
        <Route path="/properties" element={<Listings savedIds={savedIds} onToggleSave={toggleSave} />} />
        <Route path="/saved" element={<Saved savedIds={savedIds} onToggleSave={toggleSave} />} />
        <Route path="/property/:id" element={<Detail savedIds={savedIds} onToggleSave={toggleSave} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </>
  );
}