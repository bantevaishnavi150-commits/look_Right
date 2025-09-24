const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listings.js");
const path = require("path");
const ejsmate = require("ejs-mate");
const multer = require("multer");
const cors = require("cors");
// const tf = require("@tensorflow/tfjs-node"); // only if you actually need ML

// --- Database Connection ---
const mongo_url = "mongodb://127.0.0.1:27017/female";
main()
  .then(() => console.log("✅ Connected to DB"))
  .catch((err) => console.log("❌ DB Error", err));

async function main() {
  await mongoose.connect(mongo_url);
}

// --- App Config ---
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.engine("ejs", ejsmate);

app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static(path.join(__dirname, "/public")));

//connecting frontend
// middleware to serve static files (css, js, images)
app.use(express.static(path.join(__dirname, "public")));

// serve index.html at root route
app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login.html"));
});
// serve signup.html at /signup route
app.get("/signup", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "signup.html"));
});
// serve dashboard.html at /dashboard route
app.get("/home", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "home.html"));
});
//serve css file


const port=8080;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

// --- Routes ---
// Index route
app.get("/listings", async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index.ejs", { allListings });
});

// Show route
app.get("/listings/:id", async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/show.ejs", { listing });
});

// --- Multer Storage ---
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// --- Fake Fashion DB ---
const fashionDB = {
  Hourglass: {
    casual: {
      outfit: "Wrap dress 👗",
      footwear: "Sneakers 👟",
      hairstyle: "Loose curls 💁‍♀️",
      accessories: "Crossbody bag 🎒",
    },
    party: {
      outfit: "Bodycon dress 💃",
      footwear: "High heels 👠",
      hairstyle: "Soft waves ✨",
      accessories: "Clutch & statement earrings 💎",
    },
  },
  Pear: {
    casual: {
      outfit: "A-line skirt with peplum top ✨",
      footwear: "Ballet flats 👠",
      hairstyle: "Braided half-up 💕",
      accessories: "Simple chain & bracelet ⛓️",
    },
  },
};

// --- Fake AI Detection ---
function detectBodyType() {
  const bodyTypes = [
    "Hourglass",
    "Pear",
    "Apple",
    "Rectangle",
    "Inverted Triangle",
  ];
  return bodyTypes[Math.floor(Math.random() * bodyTypes.length)];
}

// --- API: Upload and Scan ---
app.post("/scan", upload.single("photo"), (req, res) => {
  const occasion = req.body.occasion;
  const detectedType = detectBodyType();

  if (!fashionDB[detectedType] || !fashionDB[detectedType][occasion]) {
    return res.json({
      bodyType: detectedType,
      message: "No suggestions found for this combination.",
    });
  }

  res.json({
    bodyType: detectedType,
    suggestion: fashionDB[detectedType][occasion],
  });
});

// Root route
app.get("/", (req, res) => {
  res.send("Hi, I am the root route ✅");
});

// --- Start Server ---
const PORT = 8080;
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
