/*
Activité 2
*/

// Liste des liens Web à afficher. Un lien est défini par :
// - son titre
// - son URL
// - son auteur (la personne qui l'a publié)
var listeLiens = [{
		titre: "So Foot",
		url: "http://sofoot.com",
		auteur: "yann.usaille"
	},
	{
		titre: "Guide d'autodéfense numérique",
		url: "http://guide.boum.org",
		auteur: "paulochon"
	},
	{
		titre: "L'encyclopédie en ligne Wikipedia",
		url: "http://Wikipedia.org",
		auteur: "annie.zette"
	}
];

var contenu = document.getElementById("contenu");


// Crée et renvoie un élément DOM affichant les données d'un lien
// Le paramètre lien est un objet JS représentant un lien
function creerElementLien(lien) {
	var titreLien = document.createElement("a");
	titreLien.href = lien.url;
	titreLien.style.color = "#428bca";
	titreLien.style.textDecoration = "none";
	titreLien.style.marginRight = "5px";
	titreLien.appendChild(document.createTextNode(lien.titre));

	var urlLien = document.createElement("span");
	urlLien.appendChild(document.createTextNode(lien.url));

	// Cette ligne contient le titre et l'URL du lien
	var ligneTitre = document.createElement("h4");
	ligneTitre.style.margin = "0px";
	ligneTitre.appendChild(titreLien);
	ligneTitre.appendChild(urlLien);

	// Cette ligne contient l'auteur
	var ligneDetails = document.createElement("span");
	ligneDetails.appendChild(document.createTextNode("Ajouté par " + lien.auteur));

	var divLien = document.createElement("div");
	divLien.classList.add("lien");
	divLien.appendChild(ligneTitre);
	divLien.appendChild(ligneDetails);

	return divLien;
}

// Parcours de la liste des liens et ajout d'un élément au DOM pour chaque lien
var generationListLiens = function() {
	listeLiens.forEach(function(lien) {
		var elementLien = creerElementLien(lien);
		contenu.appendChild(elementLien);
	});
};
// execute la fonction précedement créée
generationListLiens();


var control = document.getElementById('control');
var formContainer = document.getElementById('form-container');
var formBtn = document.getElementById('afficher-form');

// Affichage du form permettant d'ajouter nouveau lien
var createLinkForm = function() {
	this.style.display = "none";

	var newForm = document.createElement('form');

	var wantedLinkAuthor = document.createElement('input');
	wantedLinkAuthor.type = "text";
	wantedLinkAuthor.required = true;
	wantedLinkAuthor.placeholder = "Author";

	var wantedLinkTitle = document.createElement('input');
	wantedLinkTitle.type = "text";
	wantedLinkTitle.required = false;
	wantedLinkTitle.placeholder = "Link Title";

	var wantedLinkUrl = document.createElement('input');
	wantedLinkUrl.type = "text";
	wantedLinkUrl.required = true;
	wantedLinkUrl.placeholder = "Link Url";

	var wantedAddBtn = document.createElement("input");
	wantedAddBtn.type = "submit";
	wantedAddBtn.id = "add-link";
	wantedAddBtn.value = "Ajouter";
	wantedAddBtn.addEventListener("click", function(e) {

		// Verification de l'Url, si pas de http:// ou https:// ajoute http://
		var newUrl;
		if (wantedLinkUrl.value.search(/http:\/\/|https:\/\//) === -1) {
			newUrl = "http://" + wantedLinkUrl.value;
		} else {
			newUrl = wantedLinkUrl.value;
		}

		// Regroupe les info du nouveau lien dans un objet
		var newLinkData = {
			titre: wantedLinkTitle.value,
			url: newUrl,
			auteur: wantedLinkAuthor.value
		};

		// Ajoute l'objet contenant le nouveau lien au tableau contenant la liste des liens
		listeLiens.unshift(newLinkData);

		// Vide la l'element "contenu" au cas où il comporte du HTML
		contenu.textContent = "";

		// Regenère la liste des liens avec le nouvel élément
		generationListLiens();

		// Supprime le formulaire
		newForm.parentNode.removeChild(newForm);

		// Fait réapparaitre le bouton affichant le formulaire
		formBtn.style.display = "block";

		linkAdded(wantedLinkTitle);
		e.preventDefault();
	});

	// Intègre les elements du formulaire dans le HTML
	formContainer.appendChild(newForm);
	newForm.appendChild(wantedLinkAuthor);
	newForm.appendChild(wantedLinkTitle);
	newForm.appendChild(wantedLinkUrl);
	newForm.appendChild(wantedAddBtn);
};

// Function affichant un message confirmant l'ajout du nouveau lien
var linkAdded = function(linkTitle) {
	var linkAddedDiv = document.createElement("p");
	linkAddedDiv.setAttribute("id", "link-added");
	linkAddedDiv.textContent = "Le lien \"" + linkTitle.value + "\" a bien été ajouté !";
	control.insertBefore(linkAddedDiv, formContainer);

	// Au bout de 2 secondes, le message doit être supprimé du HMTL
	setTimeout(function() {
		control.removeChild(linkAddedDiv);
	}, 2000);
};

// Appelle la fonction générant le formulaire
formBtn.addEventListener('click', createLinkForm);
