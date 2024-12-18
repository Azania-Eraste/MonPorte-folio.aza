// Attendre que le DOM soit chargé avant d'exécuter le script
document.addEventListener('DOMContentLoaded', () => {

    /** ---------------------------------
     *  Déclarations des sélecteurs DOM
     * ---------------------------------*/

    const nav_button = document.getElementById("header-nav"); // Bouton de navigation (menu burger)
    const sunToggle = document.getElementById("sun");         // Icône du mode clair
    const moonToggle = document.getElementById("moon");       // Icône du mode sombre

    // Tous les liens dans la barre de navigation (sauf le lien CV avec `download`)
    const navLinks = document.querySelectorAll('ul li a:not([download])');

    // Boutons de filtre des projets (sauf les boutons de type "submit")
    const project_button = document.querySelectorAll('.row-btn button:not([type=submit])');

    // Cartes de projet à afficher/masquer selon le filtre
    const card_project = document.querySelectorAll('.card-project');

    // Sections de la page pour la gestion de l'état actif des liens au défilement
    const sections = document.querySelectorAll(".section");

    // switch du mode mobile

    const toggleInput = document.getElementById('toggle');


    /** ---------------------------------------
     *  Gestion de la navigation (menu burger)
     * ---------------------------------------*/

    const active_nav_bar = () =>{
        const nav_elt = document.getElementById("header-nav-item"); // Liste des éléments du menu
        nav_button.classList.toggle("active"); // Alterne l'état actif du bouton
        nav_elt.classList.toggle("show");      // Alterne l'affichage du menu
    }

    nav_button.addEventListener('click', () => {
        active_nav_bar();
    });

    /** ---------------------------------------
     *  Gestion du thème (mode clair/sombre)
     * ---------------------------------------*/

    // Activer le mode clair
    const activateLightMode = () => {
        document.body.classList.remove("dark-mode"); // Retirer le mode sombre
        sunToggle.classList.add("selected-theme");   // Activer l'icône soleil
        moonToggle.classList.remove("selected-theme"); // Désactiver l'icône lune
    };

    // Activer le mode sombre
    const activateDarkMode = () => {
        document.body.classList.add("dark-mode"); // Ajouter le mode sombre
        moonToggle.classList.add("selected-theme"); // Activer l'icône lune
        sunToggle.classList.remove("selected-theme"); // Désactiver l'icône soleil
    };

    // Ajouter des écouteurs d'événements sur les icônes pour changer le thème
    sunToggle.addEventListener("click", activateLightMode);
    moonToggle.addEventListener("click", activateDarkMode);

    toggleInput.addEventListener('change', () => {
        if (toggleInput.checked) {
            activateDarkMode();
        } else {
            activateLightMode(); 
        }
        active_nav_bar();
    });

    /** --------------------------------------------------
     *  Gestion de l'état actif des liens de navigation
     * --------------------------------------------------*/

    // Fonction pour changer l'état actif au clic sur un lien
    const handleSelection = (event) => {
        navLinks.forEach(link => link.classList.remove('selected-page')); // Supprime l'état actif sur tous les liens
        event.target.classList.add('selected-page'); // Ajoute l'état actif sur le lien cliqué
    };

    // Ajouter un écouteur d'événements pour chaque lien
    navLinks.forEach(link => {
        link.addEventListener('click', handleSelection);
    });

    // Fonction pour activer le lien correspondant à la section visible
    const activateLink = () => {
        let index = sections.length;

        // Identifier la section visible à partir de sa position verticale
        while (--index >= 0 && window.scrollY + 100 < sections[index].offsetTop) {}

        if (index >= 0) { // Vérifie que l'index est valide
            console.log(index);
            navLinks.forEach(link => link.classList.remove("selected-page")); // Supprime l'état actif de tous les liens
            navLinks[index].classList.add("selected-page"); // Ajoute l'état actif au lien correspondant
        }
    
    };

    // Ajouter un écouteur pour gérer l'état actif lors du défilement
    window.addEventListener("scroll", activateLink);


    /** ---------------------------------------------------
     *  Gestion des filtres de projets (affichage dynamique)
     * ---------------------------------------------------*/

    const projectSelection = (event) => {
        project_button.forEach(btn => {
            btn.classList.remove('selected-button'); // Supprime l'état actif de tous les boutons
        });

        event.target.classList.add('selected-button'); // Ajoute l'état actif au bouton cliqué

        const id = event.target.id; // Récupère l'identifiant du bouton cliqué

        card_project.forEach(card => {
            if (card.classList.contains(id)) {
                card.style.display = 'flex'; // Affiche les cartes correspondant au filtre
            } else {
                card.style.display = 'none'; // Masque les autres cartes
            }
        });

        // Si le bouton n'a pas d'identifiant (par exemple, "Tous"), afficher toutes les cartes
        if (id === '') {
            card_project.forEach(card => {
                card.style.display = 'flex';
            });
        }
    };

    // Ajouter un écouteur sur chaque bouton de filtre
    project_button.forEach(btn => {
        btn.addEventListener('click', projectSelection);
    });


    // Ajoutez votre ID EmailJS ici
emailjs.init("R4koxqwV76YGM3Imr");

document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Empêche le rechargement de la page

    // Données dynamiques à envoyer
    const templateParams = {
        user_name: document.getElementById('Nom').value,
        user_contact: document.getElementById('Contact').value,
        user_subject: document.getElementById('Sujet').value,
        user_message: document.getElementById('message').value,
    };

    // Envoi des données via EmailJS
    emailjs.send('service_ocn801b', 'template_y3zvim7', templateParams)
        .then(function(response) {
            console.log('E-mail envoyé !', response.status, response.text);
            alert('Votre message a été envoyé avec succès.');
        }, function(error) {
            console.error('Erreur lors de l\'envoi...', error);
            alert('Une erreur est survenue. Veuillez réessayer.');
        });
});


});
