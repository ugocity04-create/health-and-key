// Turns 185000000 into "₦185,000,000" and adds "/ year" for rentals
export function formatPrice(amount, status) {
  const text = "₦" + amount.toLocaleString("en-NG");
  return status === "rent" ? text + " / year" : text;
}

export const typeLabels = {
  house: "Houses",
  apartment: "Apartments",
  land: "Land",
};

// ---------- Contact details ----------
// CHANGE THIS to the agent's real WhatsApp number: country code first,
// no plus sign, no spaces. Example: 2348012345678
export const WHATSAPP_NUMBER = "2348086987293";
export const PHONE_DISPLAY = "+234 7070145768";
export const EMAIL = "akunashachibuike0@gmail.com";
export const ADDRESS = "12 Admiralty Way, Lekki Phase 1, Lagos";
export const OPENING_HOURS = "Mon to Sat, 9am to 4pm";

// Opens WhatsApp with a ready-written message about one property
export function enquiryLink(item) {
  const text =
    "Hello Hearth & Key, I'm interested in \"" + item.title + "\" in " +
    item.area + ", " + item.city + " (" + formatPrice(item.price, item.status) +
    "). Is it still available?";
  return "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(text);
}

// A general enquiry (not about one property)
export function generalLink() {
  const text = "Hello Hearth & Key, I would like help finding a property.";
  return "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(text);
}