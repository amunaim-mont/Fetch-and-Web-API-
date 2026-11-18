document.querySelector("#searchForm")
  .addEventListener("submit", searchCharacters);

async function searchCharacters(event) {
  event.preventDefault();

  let name = document.querySelector("#characterName").value.trim();
  let species = document.querySelector("#species").value;
  let message = document.querySelector("#message");
  let results = document.querySelector("#results");

  results.innerHTML = "";
  message.textContent = "";

  // JavaScript validation
  if (name.length < 2) {
    message.textContent =
      "Please enter at least two characters for the name.";
    message.style.color = "red";
    return;
  }

  let url =
    `https://rickandmortyapi.com/api/character/?name=${encodeURIComponent(name)}`;

  if (species !== "") {
    url += `&species=${encodeURIComponent(species)}`;
  }

  try {
    message.textContent = "Loading characters...";
    message.style.color = "black";

    let response = await fetch(url);

    if (!response.ok) {
      throw new Error("No characters found");
    }

    let data = await response.json();

    message.textContent =
      `Found ${data.results.length} character(s).`;
    message.style.color = "green";

    for (let character of data.results) {
      let card = document.createElement("article");
      card.className = "character-card";

      card.innerHTML = `
        <img src="${character.image}" alt="${character.name}">
        <h2>${character.name}</h2>
        <p><strong>Status:</strong> ${character.status}</p>
        <p><strong>Species:</strong> ${character.species}</p>
        <p><strong>Origin:</strong> ${character.origin.name}</p>
      `;

      results.appendChild(card);
    }

  } catch (error) {
    message.textContent =
      "No characters were found. Try another search.";
    message.style.color = "red";
    console.error(error);
  }
}