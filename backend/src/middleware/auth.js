// ============================================================
// FICHIER : src/middleware/auth.js
// RÔLE    : Middleware d'authentification pour les routes admin.
//
// Mode démo  : vérifie la clé API via l'en-tête Authorization.
//              Bearer <ADMIN_API_KEY>
// Mode Firebase : vérifie le token Firebase ID.
// ============================================================

const FIREBASE_READY = !!process.env.FIREBASE_PROJECT_ID;

async function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization || "";

  if (!authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Non autorisé. En-tête Authorization manquant." });
  }

  const token = authHeader.slice(7);

  if (!FIREBASE_READY) {
    const adminKey = process.env.DEMO_ADMIN_KEY || "dev-secret";
    if (token !== adminKey) {
      return res.status(401).json({ error: "Clé API invalide." });
    }
    return next();
  }

  // Mode Firebase : vérification du token ID
  try {
    const { auth } = require("../config/firebase");
    const decoded = await auth.verifyIdToken(token);
    req.user = decoded;
    return next();
  } catch {
    return res.status(401).json({ error: "Token invalide ou expiré." });
  }
}

module.exports = { requireAuth };
