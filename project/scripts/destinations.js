const destinations = [
  {
    name: "Congo River",
    region: "water",
    tag: "River",
    image: "https://picsum.photos/seed/congo-river/600/400",
    description:
      "The second-longest river in Africa and the deepest in the world, carrying life through the heart of the country.",
  },
  {
    name: "Virunga National Park",
    region: "wildlife",
    tag: "Wildlife",
    image: "https://picsum.photos/seed/virunga/600/400",
    description:
      "Africa's oldest national park, home to mountain gorillas, active volcanoes, and unmatched biodiversity.",
  },
  {
    name: "Mount Nyiragongo",
    region: "landscape",
    tag: "Volcano",
    image: "https://picsum.photos/seed/nyiragongo/600/400",
    description:
      "A towering stratovolcano famous for the largest lava lake on Earth, drawing hikers from around the world.",
  },
  {
    name: "Kinshasa",
    region: "city",
    tag: "City",
    image: "https://picsum.photos/seed/kinshasa/600/400",
    description:
      "The vibrant capital on the riverbank, known for its music scene, markets, and lively street life.",
  },
  {
    name: "Salonga National Park",
    region: "wildlife",
    tag: "Wildlife",
    image: "https://picsum.photos/seed/salonga/600/400",
    description:
      "The largest tropical rainforest reserve in Africa and a haven for bonobos and forest elephants.",
  },
  {
    name: "Lake Kivu",
    region: "water",
    tag: "Lake",
    image: "https://picsum.photos/seed/lake-kivu/600/400",
    description:
      "A calm, deep lake along the eastern border, surrounded by hills and ideal for relaxed waterfront stays.",
  },
];

const grid = document.querySelector("#destination-grid");
const countElement = document.querySelector("#result-count");
const filterButtons = document.querySelectorAll(".filter-btn");

function createCard(destination) {
  return `
    <article class="card">
      <img src="${destination.image}" alt="${destination.name}" width="600" height="400" loading="lazy">
      <div class="card-body">
        <span class="tag">${destination.tag}</span>
        <h3>${destination.name}</h3>
        <p>${destination.description}</p>
      </div>
    </article>
  `;
}

function renderDestinations(list) {
  if (list.length === 0) {
    grid.innerHTML = `<p>No destinations match this filter yet.</p>`;
  } else {
    grid.innerHTML = list.map(createCard).join("");
  }
  countElement.textContent = `Showing ${list.length} of ${destinations.length} destinations.`;
}

function filterDestinations(region) {
  if (region === "all") {
    return destinations;
  }
  return destinations.filter((destination) => destination.region === region);
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    renderDestinations(filterDestinations(button.dataset.region));
  });
});

renderDestinations(destinations);
