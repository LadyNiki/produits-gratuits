const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const multer = require("multer");

const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "../public")));

const uploadDir = path.join(__dirname, "../public/uploads");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
  cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

const fichierProduits = path.join(__dirname, "produits.json");

let produits = [];

if (fs.existsSync(fichierProduits)) {
  produits = JSON.parse(fs.readFileSync(fichierProduits, "utf8"));
}

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

app.get("/api/produits", (req, res) => {
  res.json(produits);
});

app.post("/api/produits", upload.single("image"), (req, res) => {

  const produit = {
    nom: req.body.nom,
    categorie: req.body.categorie,
    prix: req.body.prix,
    lien: req.body.lien,
    image: req.file ? "/uploads/" + req.file.filename : ""
  };

  produits.push(produit);

  fs.writeFileSync(
    fichierProduits,
    JSON.stringify(produits, null, 2)
  );

  res.json({
    message: "Produit ajouté avec succès !"
  });

});

// Modifier un produit
app.put("/api/produits/:id", (req, res) => {

  const id = parseInt(req.params.id);

  if (id >= 0 && id < produits.length) {

    produits[id] = {
      ...produits[id],
      ...req.body
    };

    fs.writeFileSync(
      fichierProduits,
      JSON.stringify(produits, null, 2)
    );

    return res.json({
      message: "Produit modifié avec succès !"
    });

  }

  res.status(404).json({
    message: "Produit introuvable."
  });

});

// Supprimer un produit
app.delete("/api/produits/:id", (req, res) => {

  const id = parseInt(req.params.id);

  if (id >= 0 && id < produits.length) {

    produits.splice(id, 1);

    fs.writeFileSync(
      fichierProduits,
      JSON.stringify(produits, null, 2)
    );

    return res.json({
      message: "Produit supprimé."
    });

  }

  res.status(404).json({
    message: "Produit introuvable."
  });

});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Serveur lancé sur http://127.0.0.1:${PORT}`);
});
