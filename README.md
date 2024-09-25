"# testProject" 

# Application de nouvelles

## Description
Cette application web permet de récupérer, stocker et afficher en temps réel les actualités de Google News, avec des notifications pour les nouveaux articles.

## Instructions d'installation

### Prérequis
- Node.js 
- MongoDB
- Git

### Installation

1. Clonez le dépôt :
   ```bash
   git clone https://github.com/Akram2205/testProject.git

2. Accédez au répertoire du projet

3. Installez les dépendances du backend :
    cd backend
    npm install

4. Installez les dépendances du frontend :
    cd ../frontend
    npm install

5. Démarrez le serveur backend :
    cd ../backend
    node server.js

6. Démarrez le frontend :
    cd ../frontend
    npm run dev

#### Choix techniques et justification
    Express.js : Utilisé pour créer l'API backend, car il est léger et flexible.
    MongoDB : Choisi pour sa capacité à gérer des données non structurées et sa scalabilité.
    Next.js : Utilisé pour le frontend, permettant un rendu côté serveur et une excellente performance.
    Socket.io : Implémenté pour fournir des notifications en temps réel au frontend.

##### Difficultés rencontrées et solutions apportées
    Parsing du flux RSS : J'ai rencontré des erreurs de parsing en raison de caractères non encodés. J'ai résolu cela en utilisant une bibliothèque de parsing plus robuste.
    Problèmes CORS : Initialement, j'avais des problèmes avec les requêtes cross-origin. J'ai configuré le middleware CORS dans Express.js pour résoudre ces problèmes.
    Gestion des notifications en temps réel : La mise en place de Socket.io a nécessité une configuration minutieuse, mais cela a été résolu grâce à la documentation.

##### Pistes d'amélioration potentielles
    Ajouter un système d'authentification pour que les utilisateurs puissent sauvegarder leurs articles préférés.
    Intégrer un système de filtrage par catégorie pour améliorer l'expérience utilisateur.
    Optimiser le code en ajoutant des tests unitaires pour garantir la qualité du projet.
    Améliorer la performance en mettant en cache les résultats des requêtes les plus fréquentes.
    Ajouter des options de personnalisation pour l'affichage des articles (thème clair/sombre).

# Auteur
hamlaoui akram
