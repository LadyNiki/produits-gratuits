const params = new URLSearchParams(window.location.search);
const id = params.get("id");

async function chargerProduit() {

  const reponse = await fetch("/api/produits");
  const produits = await reponse.json();

  const produit = produits[id];

  document.getElementById("nom").value = produit.nom;
  document.getElementById("categorie").value = produit.categorie;
  document.getElementById("prix").value = produit.prix;
  document.getElementById("lien").value = produit.lien;

}

document.getElementById("formModifier").addEventListener("submit", async (e) => {

  e.preventDefault();

  const produit = {
    nom: document.getElementById("nom").value,
    categorie: document.getElementById("categorie").value,
    prix: document.getElementById("prix").value,
    lien: document.getElementById("lien").value
  };

  const reponse = await fetch(`/api/produits/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(produit)
  });

  const resultat = await reponse.json();

  alert(resultat.message);

  window.location.href = "gestion.html";

});

chargerProduit();
