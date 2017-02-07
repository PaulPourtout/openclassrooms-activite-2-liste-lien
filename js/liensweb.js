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

var contenu = document.getElementById("contenu");
// Parcours de la liste des liens et ajout d'un élément au DOM pour chaque lien
listeLiens.forEach(function(lien) {
	var elementLien = creerElementLien(lien);
	contenu.appendChild(elementLien);
});



// Affichage du form permettant d'ajouter nouveau lien
var formContainer = document.getElementById('form-container');
var formBtn = document.getElementById('afficher-form');



var createLinkForm = function() {
	this.style.display = "none";

	var newForm = document.createElement('form');

	var wantedLinkAuthor = document.createElement('input');
	wantedLinkAuthor.type = "text";
	// wantedLinkAuthor.requested = true;
	wantedLinkAuthor.placeholder = "Author";

	var wantedLinkTitle = document.createElement('input');
	wantedLinkTitle.type = "text";
	wantedLinkTitle.placeholder = "Link Title";

	var wantedLinkUrl = document.createElement('input');
	wantedLinkUrl.type = "text";
	wantedLinkUrl.placeholder = "Link Url";

	var wantedAddBtn = document.createElement("input");
	wantedAddBtn.type = "submit";
	wantedAddBtn.id = "add-link";
	wantedAddBtn.value = "Ajouter";
	wantedAddBtn.addEventListener("click", function(e){
		var newLinkContainer = document.createElement("div");
		newLinkContainer.classList.add("lien");
		var newLinkTitle = document.createElement("h4");
		newLinkTitle.textContent = wantedLinkTitle.value;
		contenu.appendChild(newLinkContainer);
		newLinkContainer.appendChild(newLinkTitle);
		e.preventDefault();
	});

	formContainer.appendChild(newForm);
	newForm.appendChild(wantedLinkAuthor);
	newForm.appendChild(wantedLinkTitle);
	newForm.appendChild(wantedLinkUrl);
	newForm.appendChild(wantedAddBtn);
};



formBtn.addEventListener('click', createLinkForm);
