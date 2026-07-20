document.getElementById("formProduit").addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData();

  formData.append("nom", document.getElementById("nom").value);
  formData.append("categorie", document.getElementById("categorie").value);
  formData.append("prix", document.getElementById("prix").value);
  formData.append("lien", document.getElementById("lien").value);

  const image = document.getElementById("image").files[0];

  if (image) {
    formData.append("image", image);
  }

  try {
    const reponse = await fetch("/api/produits", {
      method: "POST",
      body: formData
    });

    const resultat = await reponse.json();

    alert(resultat.message);

    document.getElementById("formProduit").reset();

  } catch (erreur) {
    console.error(erreur);
    alert("Erreur lors de l'ajout du produit.");
  }
});
