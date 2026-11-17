const topics = [
  {
    title: "How a web page loads",
    category: "web",
    tag: "Web",
    icon: "WEB",
    description:
      "A browser requests files from a server, then combines HTML structure, CSS styling, and JavaScript behavior into the page you see.",
  },
  {
    title: "HTML, CSS, and JavaScript",
    category: "web",
    tag: "Web",
    icon: "CODE",
    description:
      "HTML gives content meaning, CSS controls presentation, and JavaScript reacts to events and changes the page after it loads.",
  },
  {
    title: "What an operating system does",
    category: "computing",
    tag: "Computing",
    icon: "OS",
    description:
      "An operating system manages memory, files, devices, and applications so several programs can share one machine safely.",
  },
  {
    title: "How a processor runs instructions",
    category: "computing",
    tag: "Computing",
    icon: "CPU",
    description:
      "A processor fetches simple instructions, carries them out, and repeats billions of times per second to run every program.",
  },
  {
    title: "Machine learning in plain language",
    category: "ai",
    tag: "AI",
    icon: "AI",
    description:
      "Instead of following only written rules, a machine learning model adjusts itself until it can spot patterns in examples.",
  },
  {
    title: "Generative AI and its limits",
    category: "ai",
    tag: "AI",
    icon: "GEN",
    description:
      "Generative models produce new text, images, or code from patterns they learned, but they can still invent confident errors.",
  },
  {
    title: "Passwords and two-factor authentication",
    category: "security",
    tag: "Security",
    icon: "KEY",
    description:
      "Long unique passwords and a second verification step stop most attackers even when one password is exposed.",
  },
  {
    title: "Recognizing phishing messages",
    category: "security",
    tag: "Security",
    icon: "SEC",
    description:
      "Check the sender, the link destination, and urgent wording before you sign in or share personal information.",
  },
  {
    title: "How data is stored and protected",
    category: "data",
    tag: "Data",
    icon: "DATA",
    description:
      "Databases organize information in tables or documents, while encryption and backups keep it readable only by the right people.",
  },
];

const topicGrid = document.querySelector("#topic-grid");
const resultCount = document.querySelector("#result-count");
const filterButtons = document.querySelectorAll(".filter-btn");

function createTopicCard(topic) {
  return `
    <article class="card">
      <span class="icon-tile" aria-hidden="true">${topic.icon}</span>
      <span class="tag">${topic.tag}</span>
      <h3>${topic.title}</h3>
      <p>${topic.description}</p>
    </article>
  `;
}

function renderTopics(list) {
  if (list.length === 0) {
    topicGrid.innerHTML = `<p>No guides match this category yet.</p>`;
  } else {
    topicGrid.innerHTML = list.map(createTopicCard).join("");
  }
  resultCount.textContent = `Showing ${list.length} of ${topics.length} guides.`;
}

function filterTopics(category) {
  if (category === "all") {
    return topics;
  }
  return topics.filter((topic) => topic.category === category);
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    renderTopics(filterTopics(button.dataset.category));
  });
});

renderTopics(topics);
