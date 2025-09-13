// ------------------ SIGNUP ------------------
const signupForm = document.getElementById("signupForm");
if (signupForm) {
  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("signupName").value;
    const email = document.getElementById("signupEmail").value;
    const password = document.getElementById("signupPassword").value;

    localStorage.setItem("user", JSON.stringify({ name, email, password }));
    alert("Signup successful! Please login.");
    window.location.href = "index.html";
  });
}

// ------------------ LOGIN ------------------
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;
    const user = JSON.parse(localStorage.getItem("user"));

    if (user && user.email === email && user.password === password) {
      localStorage.setItem("loggedIn", "true");
      window.location.href = "home.html";
    } else {
      alert("Invalid credentials!");
    }
  });
}

// ------------------ HOME PAGE ------------------
if (window.location.pathname.includes("home.html")) {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!localStorage.getItem("loggedIn")) {
    window.location.href = "index.html";
  }

  // Show user name
  document.getElementById("userName").textContent = user?.name || "User";

  // Outfit data (sample URLs for demo)
  const fashionData = {
    clothes: [
      "https://picsum.photos/300/400?random=100",
      "https://picsum.photos/300/400?random=101",
      "https://picsum.photos/300/400?random=102",
    ],
    jewellery: [
      "https://picsum.photos/300/300?random=200",
      "https://picsum.photos/300/300?random=201",
      "https://picsum.photos/300/300?random=202",
    ],
    hairstyle: [
      "https://picsum.photos/300/350?random=300",
      "https://picsum.photos/300/350?random=301",
      "https://picsum.photos/300/350?random=302",
    ],
    footwear: [
      "https://picsum.photos/300/250?random=400",
      "https://picsum.photos/300/250?random=401",
      "https://picsum.photos/300/250?random=402",
    ],
  };

  // Helper to pick random items
  function getRandomImages(arr, count = 3) {
    let shuffled = arr.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }

  // Render category images
  function renderCategory(category, images) {
    const section = document.querySelector(`#${category} .grid`);
    if (section) {
      section.innerHTML = ""; // clear existing
      images.forEach((src) => {
        const img = document.createElement("img");
        img.src = src;
        img.alt = category;
        section.appendChild(img);
      });
    }
  }

  renderCategory("clothes", getRandomImages(fashionData.clothes));
  renderCategory("jewellery", getRandomImages(fashionData.jewellery));
  renderCategory("hairstyle", getRandomImages(fashionData.hairstyle));
  renderCategory("footwear", getRandomImages(fashionData.footwear));

  // Logout
  document.getElementById("logoutBtn").addEventListener("click", () => {
    localStorage.removeItem("loggedIn");
    window.location.href = "index.html";
  });
}
//image uploader
// ------------------ IMAGE UPLOADER & SCANNER ------------------
const photoInput = document.getElementById("photoInput");
const photoPreview = document.getElementById("photoPreview");
const scanBtn = document.getElementById("scanBtn");
const suggestionResult = document.getElementById("suggestionResult");
const occasionSelect = document.getElementById("occasionSelect");

// Preview uploaded image
if (photoInput) {
  photoInput.addEventListener("change", () => {
    const file = photoInput.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        photoPreview.src = e.target.result;
        photoPreview.style.display = "block";
      };
      reader.readAsDataURL(file);
    }
  });
}

// Suggestions based on occasion
const fashionSuggestions = {
  casual: [
    "Denim jacket with casual tee 👕",
    "Floral sundress 👗",
    "Kurti with leggings ✨"
  ],
  party: [
    "Shiny cocktail dress ✨",
    "Sequin top with black skirt 👠",
    "Bold jumpsuit 👜"
  ],
  wedding: [
    "Traditional Saree 💃",
    "Heavy Lehenga ✨",
    "Anarkali suit 👑"
  ],
  office: [
    "Formal Blazer & Trousers 👔",
    "Pencil skirt with blouse 👩‍💼",
    "Kurta with palazzo pants 👗"
  ]
};

// Handle Scan & Suggest
/*if (scanBtn) {
  scanBtn.addEventListener("click", () => {
    const occasion = occasionSelect.value;
    const suggestions = fashionSuggestions[occasion];
    const randomSuggestion = suggestions[Math.floor(Math.random() * suggestions.length)];
    
    suggestionResult.innerHTML = `
      <h3>🎉 Fashion Suggestion for ${occasion.toUpperCase()}:</h3>
      <p>${randomSuggestion}</p>
    `;
  });
}
const photoInput = document.getElementById("photoInput");
const photoPreview = document.getElementById("photoPreview");
const scanBtn = document.getElementById("scanBtn");
const scanResult = document.getElementById("scanResult");
const occasionSelect = document.getElementById("occasionSelect");*/

// Preview uploaded image
if (photoInput) {
  photoInput.addEventListener("change", () => {
    const file = photoInput.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        photoPreview.src = e.target.result;
        photoPreview.style.display = "block";
      };
      reader.readAsDataURL(file);
    }
  });
}

// Body types
const bodyTypes = ["Hourglass", "Pear", "Apple", "Rectangle", "Inverted Triangle"];

// Fashion suggestions based on body type + occasion
// Fashion suggestions based on body type + occasion (FULL LOOKS)
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
    wedding: {
      outfit: "Saree with waist cinch 👗",
      footwear: "Traditional sandals 👡",
      hairstyle: "Elegant bun with gajra 🌸",
      accessories: "Gold jewelry set 👑",
    },
    office: {
      outfit: "Pencil skirt & blouse 👩‍💼",
      footwear: "Block heels 👞",
      hairstyle: "Straight ponytail 🎀",
      accessories: "Smart watch & studs ⌚",
    }
  },

  Pear: {
    casual: {
      outfit: "A-line skirt with peplum top ✨",
      footwear: "Ballet flats 👠",
      hairstyle: "Braided half-up style 💕",
      accessories: "Simple chain & bracelet ⛓️",
    },
    party: {
      outfit: "Off-shoulder gown 💃",
      footwear: "Stilettos 👠",
      hairstyle: "Messy bun 🌸",
      accessories: "Dangling earrings & clutch ✨",
    },
    wedding: {
      outfit: "Lehenga with flared skirt 👑",
      footwear: "Traditional mojaris 👡",
      hairstyle: "Braided bun with maang tikka 💍",
      accessories: "Heavy jewelry set 💎",
    },
    office: {
      outfit: "Blazer with straight pants 👔",
      footwear: "Formal loafers 👞",
      hairstyle: "Low bun 🎀",
      accessories: "Minimal necklace & studs",
    }
  },
  Apple: {
    casual: {
      outfit: "A-line skirt with peplum top ✨",
      footwear: "Ballet flats 👠",
      hairstyle: "Braided half-up style 💕",
      accessories: "Simple chain & bracelet ⛓️",
    },
    party: {
      outfit: "Off-shoulder gown 💃",
      footwear: "Stilettos 👠",
      hairstyle: "Messy bun 🌸",
      accessories: "Dangling earrings & clutch ✨",
    },
    wedding: {
      outfit: "Lehenga with flared skirt 👑",
      footwear: "Traditional mojaris 👡",
      hairstyle: "Braided bun with maang tikka 💍",
      accessories: "Heavy jewelry set 💎",
    },
    office: {
      outfit: "Blazer with straight pants 👔",
      footwear: "Formal loafers 👞",
      hairstyle: "Low bun 🎀",
      accessories: "Minimal necklace & studs",
    }
  },
  Rectangle: {
    casual: {
      outfit: "A-line skirt with peplum top ✨",
      footwear: "Ballet flats 👠",
      hairstyle: "Braided half-up style 💕",
      accessories: "Simple chain & bracelet ⛓️",
    },
    party: {
      outfit: "Off-shoulder gown 💃",
      footwear: "Stilettos 👠",
      hairstyle: "Messy bun 🌸",
      accessories: "Dangling earrings & clutch ✨",
    },
    wedding: {
      outfit: "Lehenga with flared skirt 👑",
      footwear: "Traditional mojaris 👡",
      hairstyle: "Braided bun with maang tikka 💍",
      accessories: "Heavy jewelry set 💎",
    },
    office: {
      outfit: "Blazer with straight pants 👔",
      footwear: "Formal loafers 👞",
      hairstyle: "Low bun 🎀",
      accessories: "Minimal necklace & studs",
    }
  },
  Inverted_Triangle: {
    casual: {
      outfit: "A-line skirt with peplum top ✨",
      footwear: "Ballet flats 👠",
      hairstyle: "Braided half-up style 💕",
      accessories: "Simple chain & bracelet ⛓️",
    },
    party: {
      outfit: "Off-shoulder gown 💃",
      footwear: "Stilettos 👠",
      hairstyle: "Messy bun 🌸",
      accessories: "Dangling earrings & clutch ✨",
    },
    wedding: {
      outfit: "Lehenga with flared skirt 👑",
      footwear: "Traditional mojaris 👡",
      hairstyle: "Braided bun with maang tikka 💍",
      accessories: "Heavy jewelry set 💎",
    },
    office: {
      outfit: "Blazer with straight pants 👔",
      footwear: "Formal loafers 👞",
      hairstyle: "Low bun 🎀",
      accessories: "Minimal necklace & studs",
    }
  }

  // 👉 You can continue the same for Apple, Rectangle, Inverted Triangle
};
//classify shouldeers waist heaps and all
async function loadPoseNetAndScan(imageElement, occasion) {
  const net = await posenet.load(); // load PoseNet model

  // Run pose detection
  const pose = await net.estimateSinglePose(imageElement, {
    flipHorizontal: false
  });

  // Extract keypoints for body shape calculation
  const keypoints = {};
  pose.keypoints.forEach(kp => {
    keypoints[kp.part] = kp.position;
  });

  // Simple heuristic for body shape classification
  let bodyType = "Rectangle";
  if (keypoints.leftShoulder && keypoints.leftHip) {
    const shoulderWidth = Math.abs(keypoints.rightShoulder.x - keypoints.leftShoulder.x);
    const hipWidth = Math.abs(keypoints.rightHip.x - keypoints.leftHip.x);

    if (shoulderWidth > hipWidth * 1.2) {
      bodyType = "Inverted Triangle";
    } else if (hipWidth > shoulderWidth * 1.2) {
      bodyType = "Pear";
    } else if (Math.abs(shoulderWidth - hipWidth) < 30) {
      bodyType = "Rectangle";
    } else {
      bodyType = "Hourglass"; // fallback
    }
  }

  // Pick suggestions from DB
  const suggestion = fashionDB[bodyType][occasion];

  scanResult.innerHTML = `
    <h3>Detected Body Type: ${bodyType}</h3>
    <h4>✨ Fashion Suggestion for ${occasion.toUpperCase()}:</h4>
    <ul>
      <li><strong>Outfit:</strong> ${suggestion.outfit}</li>
      <li><strong>Footwear:</strong> ${suggestion.footwear}</li>
      <li><strong>Hairstyle:</strong> ${suggestion.hairstyle}</li>
      <li><strong>Accessories:</strong> ${suggestion.accessories}</li>
    </ul>
  `;
}



// Handle scan
/*if (scanBtn) {
  scanBtn.addEventListener("click", () => {
    // Pick random body type (simulate scanning)
    const detectedType = bodyTypes[Math.floor(Math.random() * bodyTypes.length)];
    const occasion = occasionSelect.value;
    const suggestions = fashionDB[detectedType][occasion];

    scanResult.innerHTML = `
      <h3>Detected Body Type: ${detectedType}</h3>
      <h4>👗 Fashion Suggestions for ${occasion.toUpperCase()}:</h4>
      <ul>${suggestions.map(s => `<li>${s}</li>`).join("")}</ul>
    `;
  });
}*/
//scan button logic
scanBtn.addEventListener("click", () => {
  const detectedType = bodyTypes[Math.floor(Math.random() * bodyTypes.length)];
  const occasion = occasionSelect.value;
  const suggestion = fashionDB[detectedType][occasion];

  scanResult.innerHTML = `
    <h3>Detected Body Type: ${detectedType}</h3>
    <h4>✨ Fashion Suggestion for ${occasion.toUpperCase()}:</h4>
    <ul>
      <li><strong>Outfit:</strong> ${suggestion.outfit}</li>
      <li><strong>Footwear:</strong> ${suggestion.footwear}</li>
      <li><strong>Hairstyle:</strong> ${suggestion.hairstyle}</li>
      <li><strong>Accessories:</strong> ${suggestion.accessories}</li>
    </ul>
  `;
});
if (scanBtn) {
  scanBtn.addEventListener("click", async () => {
    const file = photoInput.files[0];
    const occasion = occasionSelect.value;

    if (!file) {
      alert("Please upload an image first!");
      return;
    }

    const formData = new FormData();
    formData.append("photo", file);
    formData.append("occasion", occasion);

    const res = await fetch("http://localhost:5000/scan", {
      method: "POST",
      body: formData
    });

    const data = await res.json();

    scanResult.innerHTML = `
      <h3>Detected Body Type: ${data.bodyType}</h3>
      <h4>✨ Fashion Suggestion for ${occasion.toUpperCase()}:</h4>
      <ul>
        <li><strong>Outfit:</strong> ${data.suggestion.outfit}</li>
        <li><strong>Footwear:</strong> ${data.suggestion.footwear}</li>
        <li><strong>Hairstyle:</strong> ${data.suggestion.hairstyle}</li>
        <li><strong>Accessories:</strong> ${data.suggestion.accessories}</li>
      </ul>
    `;
  });
}
//scan button
if (scanBtn) {
  scanBtn.addEventListener("click", () => {
    const occasion = occasionSelect.value;
    if (!photoPreview.src) {
      alert("Please upload a full-body photo first!");
      return;
    }
    loadPoseNetAndScan(photoPreview, occasion);
  });
}




