// PRODUKTER (data)
const slides = document.querySelectorAll(".slide");
console.log(slides);

let currentIndex = 0;

function displayImageNumber(displayNumber) {
  currentIndex = displayNumber;
  // skjuler alle billeder
  slides.forEach((slide) => {
    slide.style.display = "none";
  });

  if (currentIndex > slides.length - 1) {
    currentIndex = 0;
  } else if (currentIndex < 0) {
    currentIndex = slides.length - 1;
  }

  slides[currentIndex].style.display = "block";
}

displayImageNumber(0);

const btnNext = document.querySelector(".next");
const btnPrev = document.querySelector(".prev");

btnNext.addEventListener("click", () => {
  displayImageNumber(currentIndex + 1);
});

btnPrev.addEventListener("click", () => {
  displayImageNumber(currentIndex - 1);
});

const produkter = [
  {
    navn: "Jordbær Is",
    pris: 25,
    kategori: "dessert",
    beskrivelse: "En frisk jordbæris med sød smag.",
  },
  {
    navn: "Chokolade Is",
    pris: 30,
    kategori: "dessert",
    beskrivelse: "Cremet is med chokolade.",
  },
  {
    navn: "Bubble Tea Mango",
    pris: 35,
    kategori: "drink",
    beskrivelse: "Mango bubble tea med tapiokaperler.",
  },
  {
    navn: "Milkshake Vanilje",
    pris: 40,
    kategori: "drink",
    beskrivelse: "Klassisk vanilje milkshake.",
  },
];

// KURV (starter tom)
let kurv = [];

// DOM ELEMENTER (finder ting fra HTML)
const produktContainer = document.querySelector("#product-container");
const kurvListe = document.querySelector("#cart-items");
const totalTekst = document.querySelector("#total");
const bestilKnap = document.querySelector("#order-btn");
const statusTekst = document.querySelector("#status");
const filterKnapper = document.querySelectorAll(".filters button");
const toggleKurvKnap = document.querySelector("#toggle-cart-btn");
const kurvBox = document.querySelector("#cart-box");
const menuBtn = document.querySelector("#menuBtn");
const closeBtn = document.querySelector("#closeBtn");
const offcanvasMenu = document.querySelector("#offcanvasmenu");

// VIS PRODUKTER
function visProdukter(liste) {
  produktContainer.innerHTML = "";

  liste.forEach(function (produkt) {
    const kort = document.createElement("div");
    kort.classList.add("product-card");

    kort.innerHTML = `
      <h3>${produkt.navn}</h3>
      <p>${produkt.beskrivelse}</p>
      <p>Kategori: ${produkt.kategori}</p>
      <p>Pris: ${produkt.pris} kr</p>
      <button>Tilføj til kurv</button>
    `;

    const knap = kort.querySelector("button");

    knap.addEventListener("click", function () {
      tilføjTilKurv(produkt);
    });

    produktContainer.appendChild(kort);
  });
}

// TILFØJ TIL KURV
function tilføjTilKurv(produkt) {
  kurv.push(produkt);
  opdaterKurv();
}

// OPDATER KURV
function opdaterKurv() {
  kurvListe.innerHTML = "";

  let total = 0;

  kurv.forEach(function (produkt) {
    const li = document.createElement("li");
    li.textContent = `${produkt.navn} - ${produkt.pris} kr`;
    kurvListe.appendChild(li);

    total += produkt.pris;
  });

  totalTekst.textContent = `Total: ${total} kr`;
}

// FILTRERING
filterKnapper.forEach(function (knap) {
  knap.addEventListener("click", function () {
    const kategori = knap.dataset.category;

    if (kategori === "all") {
      visProdukter(produkter);
    } else {
      const filtreredeProdukter = produkter.filter(function (produkt) {
        return produkt.kategori === kategori;
      });

      visProdukter(filtreredeProdukter);
    }
  });
});

// ÅBNINGSTIDER
function tjekÅbningstid() {
  const nu = new Date();
  const time = nu.getHours();

  if (time >= 10 && time < 20) {
    statusTekst.textContent = "Status: Vi har åbent";
    return true;
  } else {
    statusTekst.textContent = "Status: Vi har lukket";
    return false;
  }
}

// BESTIL
bestilKnap.addEventListener("click", function () {
  const erÅben = tjekÅbningstid();

  if (kurv.length === 0) {
    return;
  }

  if (!erÅben) {
    return;
  }

  kurv = [];
  opdaterKurv();
});

// VIS / SKJUL KURV
toggleKurvKnap.addEventListener("click", function () {
  kurvBox.classList.toggle("hidden");
});

menuBtn.addEventListener("click", function () {
  offcanvasMenu.classList.add("open");
});

closeBtn.addEventListener("click", function () {
  offcanvasMenu.classList.remove("open");
});
// START
visProdukter(produkter);
tjekÅbningstid();
