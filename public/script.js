let produits = [];

async function chargerProduits() {
  try {
    const reponse = await fetch("/api/produits");
    produits = await reponse.json();
    afficherProduits(produits);
  } catch (erreur) {
    console.error("Erreur :", erreur);
  }
}

function afficherProduits(liste) {
  const div = document.getElementById("products");
  div.innerHTML = "";

  liste.forEach((produit) => {

    div.innerHTML += `
      <div class="card">

        <img src="${produit.image}" alt="${produit.nom}" width="200">

        <h3>${produit.nom}</h3>

        <p>${produit.categorie}</p>

        <p>${produit.prix}</p>

        <a href="${produit.lien}" target="_blank">
          Voir l'offre
        </a>

      </div>
    `;

  });
}

document.getElementById("search").addEventListener("input", function () {

  const texte = this.value.toLowerCase();

  const resultat = produits.filter(produit =>
  produit.nom &&
  produit.nom.toLowerCase().includes(texte)
);

  afficherProduits(resultat);

});

chargerProduits();

document.getElementById("tri").addEventListener("change", function () {

  const valeur = this.value;

  if (valeur === "nom") {
    produits.sort((a, b) => a.nom.localeCompare(b.nom));
  } else if (valeur === "categorie") {
    produits.sort((a, b) => a.categorie.localeCompare(b.categorie));
  }

  afficherProduits(produits);

});

function filtrerCategorie(categorie) {

  if (categorie === "Tous") {
    afficherProduits(produits);
    return;
  }

  const resultat = produits.filter(produit =>
    produit.categorie.toLowerCase() === categorie.toLowerCase()
  );

  afficherProduits(resultat);

}
