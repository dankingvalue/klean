export const BUSINESS = {
  name: "Quicklean & General Supply Enterprise",
  short: "Quicklean",
  phoneDisplay: "0792 331 927",
  whatsapp: "254792331927",
  address: "Wallet Business Centre, Ground Floor, Nasra Gardens Estate",
  landmark: "Opposite Shujaa Mall, Kangundo Road, Nairobi",
  mapsUrl:
    "https://maps.google.com/?q=" +
    encodeURIComponent("Wallet Business Centre, Nasra Gardens, Kangundo Road, Nairobi"),
  hours: "Mon – Sat: 7:00 AM – 7:00 PM · Sun: 9:00 AM – 5:00 PM",
};

export const waLink = (msg: string) =>
  `https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(msg)}`;

export type CatalogItem = { id: string; name: string; price: number; unit?: string };
export type CatalogGroup = { title: string; items: CatalogItem[] };

/* Real shop price list (from the printed wall sheet) */
export const CATALOG: CatalogGroup[] = [
  {
    title: "Laundry — Wash, Dry & Fold",
    items: [
      { id: "mixed", name: "Mixed clothes", price: 200, unit: "kg" },
      { id: "duvet66l", name: "Duvet 6×6 large", price: 700 },
      { id: "duvet66a", name: "Duvet 6×6 average", price: 650 },
      { id: "duvet56l", name: "Duvet 5×6 large", price: 600 },
      { id: "duvet56a", name: "Duvet 5×6 average", price: 550 },
    ],
  },
  {
    title: "Dry Cleaning",
    items: [
      { id: "suit3", name: "Suit — 3 pieces", price: 600 },
      { id: "suit2", name: "Suit — 2 pieces", price: 500 },
      { id: "trench", name: "Trench coat", price: 300 },
      { id: "trouser-dc", name: "Trouser", price: 200 },
      { id: "kanzu-dc", name: "Kanzu", price: 200 },
      { id: "jacket", name: "Jacket", price: 200 },
      { id: "shirt-dc", name: "Shirt", price: 150 },
    ],
  },
  {
    title: "Ironing",
    items: [
      { id: "suit-iron", name: "Suit (bag + hanger)", price: 250 },
      { id: "kanzu-iron", name: "Kanzu", price: 70 },
      { id: "shirt-iron", name: "Shirt", price: 50 },
      { id: "trouser-iron", name: "Trouser", price: 50 },
    ],
  },
];

export const SERVICE_OPTIONS = [
  "Laundry & Dry Cleaning",
  "Property & Space Cleaning",
  "Deep Carpet & Sofa Cleaning",
  "Cleaning Detergents Supply",
] as const;
