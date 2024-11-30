import { Router } from "express";
import Account from "../Models/AccountModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { body, validationResult } from "express-validator";

const router = Router();

// Inscription utilisateur
router.post(
  "/register",
  [
    // Ajouter les validations pour chaque champ
    body("firstname").trim().notEmpty().withMessage("Le prénom est requis."),
    body("lastname").trim().notEmpty().withMessage("Le nom est requis."),
    body("email").trim().isEmail().withMessage("Doit être un email valide."),
    body("password")
      .trim()
      .isLength({ min: 6 })
      .withMessage("Le mot de passe doit contenir au moins 6 caractères."),
  ],
  async (req, res) => {
    // Vérifie les erreurs de validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // Vérifie si l'email n'est pas déja présent
      const existingAccount = await Account.findOne({ email: req.body.email });
      if (existingAccount) {
        return res
          .status(400)
          .json({ errors: [{ msg: "This email is already in use." }] });
      }

      // Création de l'instance Account
      const newAccount = new Account({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password,
      });

      // Sauvegarde de l'account
      const savedAccount = await newAccount.save();

      // On retire le mot de passe de la réponse
      const { password, ...accountWithoutPassword } = savedAccount.toObject();

      res.status(201).json(accountWithoutPassword);
    } catch (err) {
      res.status(400).json({ message: "Registration error", error: err });
    }
  }
);

// Connexion Utilisateur
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Chercher l'utilisateur via l'email sinon renvoie un erreur
    const account = await Account.findOne({ email });
    if (!account) {
      return res.status(404).json({ message: "Utilisateur inconnu" });
    }

    // Vérifie le mdp sinon renvoie une erreur
    const isMatch = await bcrypt.compare(password, account.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Mot de passe incorrect" });
    }

    const payload = { id: account._id, email: account.email };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    const {
      password: _,
      createdAt,
      updatedAt,
      __v,
      _id,
      ...userWithoutSensitiveInfo
    } = account.toObject();

    // Définir le cookie HTTP-only
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: false, // true en production
      sameSite: "strict",
      maxAge: 3600000, // 1 heure en millisecondes
    });

    // Renvoyer un token
    res.status(200).json({ account: userWithoutSensitiveInfo });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
});

// Mise à jour de l'utilisateur
router.put("/update/:id", async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    // Vérifie si l'utilisateur existe
    const account = await Account.findById(id);
    if (!account) {
      return res.status(404).json({ message: "Utilisateur inconnu" });
    }

    // Met à jour l'utilisateur
    const updatedAccount = await Account.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ message: "Mise à jour réussie", updatedAccount });
  } catch (err) {
    res.status(500).json({ message: "Error during update", error: err });
  }
});

// Vérification du token
router.get("/verify", async (req, res) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).json({ message: "Non authentifié" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const account = await Account.findById(decoded.id);

    if (!account) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    const {
      password,
      createdAt,
      updatedAt,
      __v,
      _id,
      ...userWithoutSensitiveInfo
    } = account.toObject();

    res.status(200).json({ account: userWithoutSensitiveInfo });
  } catch (error) {
    res.status(401).json({ message: "Token invalide" });
  }
});

// Déconnexion
router.post("/logout", (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
    secure: false, // true en production
    sameSite: "strict",
  });

  res.status(200).json({ message: "Déconnecté avec succès" });
});

export default router;
