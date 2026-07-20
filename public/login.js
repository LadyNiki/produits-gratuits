function connexion() {

  const motdepasse = document.getElementById("motdepasse").value;

  if (motdepasse === "admin123") {

    localStorage.setItem("admin", "oui");

    window.location.href = "gestion.html";

  } else {

    document.getElementById("message").textContent =
      "❌ Mot de passe incorrect.";

  }

}
