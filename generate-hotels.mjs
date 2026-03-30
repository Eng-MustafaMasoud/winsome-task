import { writeFile } from "node:fs/promises";

const hotelPrefixes = [
  "Grand",
  "Royal",
  "Golden",
  "Elite",
  "Luxury",
  "Sunset",
  "Blue",
  "Emerald",
  "Crystal",
  "Palm",
];
const hotelTypes = [
  "Hotel",
  "Resort",
  "Suites",
  "Inn",
  "Palace",
  "Retreat",
  "Lodge",
  "Stay",
  "Plaza",
  "Residence",
];
const locations = [
  "Cairo, Egypt",
  "Giza, Egypt",
  "Alexandria, Egypt",
  "Hurghada, Egypt",
  "Sharm El Sheikh, Egypt",
  "Luxor, Egypt",
  "Aswan, Egypt",
  "Ain Sokhna, Egypt",
  "Marsa Alam, Egypt",
  "El Gouna, Egypt",
];

function randomFrom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomPrice(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomRating(min, max) {
  return +(Math.random() * (max - min) + min).toFixed(1);
}

const hotels = Array.from({ length: 100 }, (_, index) => {
  const id = index + 1;

  return {
    id,
    name: `${randomFrom(hotelPrefixes)} ${randomFrom(hotelTypes)} ${id}`,
    price: randomPrice(50, 500),
    rating: randomRating(3.0, 5.0),
    location: randomFrom(locations),
    image: `https://picsum.photos/seed/hotel-${id}/600/400`,
  };
});

await writeFile("db.json", JSON.stringify({ hotels }, null, 2), "utf-8");

console.log("db.json with 100 hotels created successfully.");
