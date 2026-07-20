async function chargerProduits() {

  try {

    const reponse = await fetch("/api/produits");
    const produits = await reponse.json();
document.getElementById("nbProduits").textContent = produits.length;

const categories = [
  ...new Set(produits.map(p => p.categorie))
];

document.getElementById("nbCategories").textContent =
  categories.length;

    const div = document.getElementById("listeProduits");

    div.innerHTML = "";

    produits.forEach((produit, index) => {

      div.innerHTML += `
        <div class="card">

          <img
  src="${produit.image || 'https://via.placeholder.com/300x200?text=Pas+d%27image'}"
  width="200"
  alt="${produit.nom}"
>

          <h3>${produit.nom}</h3>

          <p>${produit.categorie}</p>

          <p>${produit.prix}</p>

          <a href="${produit.lien}" target="_blank">
            Voir l'offre
          </a>

          <br><br>

          <button onclick="modifierProduit(${index})">
            ✏️ Modifier
          </button>

          <button onclick="supprimerProduit(${index})">
            🗑️ Supprimer
          </button>

        </div>
      `;

    });

  } catch (erreur) {

    console.error(erreur);

  }

}

function modifierProduit(index) {
  window.location.href = `modifier.html?id=${index}`;
}

async function supprimerProduit(index) {

  if (!confirm("Supprimer ce produit ?")) return;

  await fetch(`/api/produits/${index}`, {
    method: "DELETE"
  });

  chargerProduits();

}
function deconnexion() {
  localStorage.removeItem("admin");
  window.location.href = "login.html";
}
chargerProduits();
