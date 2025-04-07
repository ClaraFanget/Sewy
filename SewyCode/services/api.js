// Fonction pour créer un nouvel utilisateur
export const creerUtilisateur = (
  nom,
  prenom,
  pseudo,
  mot_de_passe,
  mail,
  taille
) => {
  // Crée un objet JSON avec le pseudo, le mot de passe et l'e-mail
  var data = JSON.stringify({
    nom: nom,
    prenom: prenom,
    pseudo: pseudo,
    mot_de_passe: mot_de_passe,
    mail: mail,
    taille: taille,
  });
  ("");

  // Envoie une requête POST à l'API pour créer un utilisateur
  return fetch("http://localhost:3000/api/utilisateurs", {
    method: "POST",
    body: data,
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Erreur");
    }
    return response.json(); // Renvoie les données JSON de la réponse
  });
};

//Fonction pour supprimer un utilisateur
export const supprimerUtilisateur = (id) => {
  // Envoie une requête Delete à l'API pour supprimer un utilisateur
  return fetch("http://localhost:3000/api/utilisateurs/" + id, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Erreur");
    }
    return response.json();
  });
};

//Fonction pour modifier un utilisateur
export const modifierUtilisateur = (id, nom, prenom, mail, mot_de_passe) => {
  var data = JSON.stringify({
    nom: nom,
    prenom: prenom,
    mot_de_passe: mot_de_passe,
    mail: mail,
  });
  ("");
  // Envoie une requête Delete à l'API pour modifier un utilisateur
  return fetch("http://localhost:3000/api/utilisateurs/" + id, {
    method: "PUT",
    body: data,
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Erreur");
    }
    return response.json();
  });
};

// Fonction permettant de récupérer les utilisateurs
export const getUtilisateurs = () => {
  return fetch("http://localhost:3000/api/utilisateurs", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Erreur");
    }
    return response.json();
  });
};

// Fonction permettant de récupérer un utilisateur en particulier
export const getUtilisateur = (id) => {
  return fetch("http://localhost:3000/api/utilisateurs" + id, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Erreur");
    }
    return response.json();
  });
};

// Fonction de connexion de l'utilisateur
export const logUser = (pseudo, mot_de_passe) => {
  var data = JSON.stringify({
    pseudo: pseudo,
    mot_de_passe: mot_de_passe,
  });

  return fetch("http://localhost:3000/api/utilisateurs/login", {
    method: "POST",
    body: data,
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => {
    if (!response.ok) {
      return false;
    }
    return response.json();
  });
};
