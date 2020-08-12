/* Author: Stephane Demots */
var gLang = 0;
const LANG_EN = 0;
const LANG_FR = 1;
const LANG_DE = 2;

const PLANET_NAME = 0;
const PLANET_TYPE = 1;

var gPlanet = [
["Abyz", "hazardous"],
["Arc Prime", "homeworld"],
["Archon Tau", "homeworld"],
["Archon Ren", "homeworld"],
["Arinam", "industrial"],
["Arnor", "industrial"],
["Arretze", "homeworld"],
["Bereg", "hazardous"],
["Centauri", "cultural"],
["Coorneeq", "cultural"],
["Creus Gate", "homeworld"],
["Creuss", "homeworld"],
["Dal Bootha", "cultural"],
["Darien", "homeworld"],
["Druaa", "homeworld"],
["Fria", "hazardous"],
["Gral", "industrial"],
["Hercant", "homeworld"],
["Jol", "homeworld"],
["Jord", "homeworld"],
["Kamdorn", "homeworld"],
["Lazar", "industrial"],
["Lisis II", "homeworld"],
["Lirta IV", "hazardous"],
["Lodor", "cultural"],
["Lor", "industrial"],
["Maaluuk", "homeworld"],
["Mecatol Rex", "homeworld"],
["Meer", "hazardous"],
["Mehar Xull", "hazardous"],
["Mellon", "cultural"],
["Moll Primus", "homeworld"],
["Mordai II", "homeworld"],
["Muaat", "homeworld"],
["Nar", "homeworld"],
["NestPhar", "homeworld"],
["New Albion", "industrial"],
["Quann", "cultural"],
["Quecen'n", "industrial"],
["Quinarra", "homeworld"],
["Ragh", "homeworld"],
["Rarron", "cultural"],
["Resculon", "cultural"],
["Retillion", "homeworld"],
["Sakulag", "hazardous"],
["Saudor", "industrial"],
["Shalloq", "homeworld"],
["Starpoint", "hazardous"],
["Tar'Mann", "industrial"],
["Tequ'ran", "hazardous"],
["Thibah", "industrial"],
["Torkan", "cultural"],
["Tren'Lak", "homeworld"],
["Vefut II", "hazardous"],
["Wellon", "industrial"],
["Winnu", "homeworld"],
["Wren Terra", "homeworld"],
["XXehan", "cultural"],
["Zohbat", "hazardous"],
["[0.0.0]", "homeworld"],
];


var gLaw = [
["Anti-Intellectual Revolution", "Révolution Anti-Intellectuelle", "Antiintellektuelle Revolution"],
["Classified Document Leaks",    "Fuites de documents classés", "Geheimnisverrat"],
["Committee Formation",          "Formation de comité", "Bilguns eines Komitees"],
["Conventions of War",           "Conventions de guerre", "Kriegsrechtskonventionen"],
["Core Mining",                  "Minage de noyau", "Bergbau im Planetenkern"],
["Demilitarized Zone",           "Zone démilitarisée", "Entmilitarisierte Zone"],
["Enforced Travel Ban",          "Inderdiction de voyager", "Durchreiseverbot"],
["Executive Sanctions",          "Sanctions éxécutives", "Sanktionsdekret"],
["Fleet Regulations",            "Régulations de flotte", "Flottenabkommen"],
["Holy Planet of Ixth",          "Planète sacrée d'Ixth", "Der heilige Planet Ixth"],
["Homeland Defense Act",         "Ordonnance de défense du territoire", "Heimatschutzgesetz"],
["Imperial Arbiter",             "Arbitre Impérial", "Imperialer Vermittler"],
["Minister of Commerce",         "Ministre du Commerce", "Handelminister"],
["Minister of Exploration",      "Ministre de l'Exploration", "Raumfahrtminister"],
["Minister of Industry",         "Ministre de l'Industrie", "Industrieminister"],
["Minister of Peace",            "Ministre de la Paix", "Friedensminister"],
["Minister of Policy",           "Ministre de la Politique", "Minister für politische Strategie"],
["Minister of Sciences",         "Ministre des Sciences", "Wissenschaftsminister"],
["Minister of War",              "Ministre de la Guerre", "Kriegsminister"],
["Prophecy of Ixth",             "Prophétie d'Ixth", "Die Prophezeiung von Ixth"],
["Publicize Weapon Schematics",  "Publication de plans d'armes", "Freigabe von Waffenbauplänen"],
["Regulated Conscription",       "Régularisation de la conscription", "Beschränkung der Wehrpflicht"],
["Representative Government ",   "Gouvernement représentatif", "Repräsentative Regierung"],
["Research Team: Biotic",        "Equipe de recherche: Biotique", "Forschungsgruppe Biotechnik"],
["Research Team: Cybernetic",    "Equipe de recherche: Cybernétique", "Forschungsgruppe Kybernetik"],
["Research Team: Propulsion",    "Equipe de recherche: Propulsion", "Forschungsgruppe Antriebstechnik"],
["Research Team: Warfare",       "Equipe de recherche: Combat", "Forschungsgruppe Militärtechnik"],
["Senate Sanctuary",             "Sanctuaire Sénatorial", "Senatssitz"],
["Shard of the Throne",          "Fragment du Trône", "Scherbe des Throns"],
["Shared Research",              "Partage des connaissances", "gemeinsames Forschungsprojekt"],
["Terraforming Initiative",      "Initiative de Terraformation", "Terraforming-Initiative"],
["The Crown of Emphidia",        "La couronne d'Emphidia", "Die Krone von Emphidia"],
["The Crown of Thalnos",         "La couronne de Thanlos", "Die Krone von Thanlos"],
["Wormhole Reconstruction",      "Reconstruction de Trou de Ver", "Rekonstruktion von Wurmlöchern"],
];

var gSecretObj = [
["Adapt New Strategies", "Adoptez de nouvelles stratégies", "Entwickle neue Strategie"],
["Become the Gatekeeper", "Devenez la sentinelle de la porte", "Bewache die Tore"],
["Control the Region", "Contrôlez la région", "Beherrsche die Region"],
["Cut Supply Lines", "Coupez les lignes d'approvision.", "Blockiere die Versorgungswege"],
["Destroy Their Greatest Ship", "Détruisez leur plus grand vaisseau", "Zerstöre Ihr mächtigstes Schiff"],
["Establish a Perimeter", "Etablissez un périmètre", "Errichte einen Verteidigungsring"],
["Forge an Alliance", "Forgez une alliance", "Schmiede ein Bündnis"],
["Form a Spy Network", "Formez un réseau d'espions", "Bilde ein Spionagenetzwerk"],
["Fuel the War Machine", "Alimentez la Machine de Guerre", "Treibe die Kriegsmaschinerie an"],
["Gather a Mighty Fleet", "Rassemblez une puissante flotte", "Versammle eine mächtige Flotte"],
["Learn Secrets of the Cosmos", "Apprenez les secrets du Cosmos", "Ergründe die Geheimnisse des Kosmos"],
["Monopolize Production", "Monopolisez la production", "Errichte ein Monopol"],
["Make an Example of Their World", "Faites de leur monde un exemple", "Statuiere ein Exempel"],
["Master the Laws of Physics", "Maîtrisez les lois de la physique", "Beherrsche die Naturgesetze"],
["Mine Rare Metals", "Extrayez des métaux rares", "Schürfe seltene Metalle"],
["Occupy the Seat of the Empire", "Occupez le siege de l'empire", "Besetze die Thronwelt"],
["Spark a Rebellion", "Déclenchez une rébellion", "Zettele eine Rebellion an"],
["Threaten Enemies", "Menacez vos ennemies", "Bedränge den Feind"],
["Turn Their Fleets to Dust", "Réduisez leurs flottes en cendres", "Vernichte Ihre Flotten"],
["Unveil Flagship", "Révélez un Vaisseau Amiral", "Enthülle dein Flagschiff"],
];

const FACTION_NAME_EN = 0;
const FACTION_NAME_FR = 1;
const FACTION_NAME_DE = 2;
const FACTION_ICON = 3;
const FACTION_FACE = 4;
const FACTION_SHORTNAME = 5;

var FACTION_NAME = FACTION_NAME_EN + gLang;

const IMG_FOLDER = "ti4/img/";
var factionList = [
["Arborec", "Arborec", "Arborec", IMG_FOLDER + "arborec.png", "", "Arborec"],
["Barony of Letnev", "Baronnie de Letnev", "Baronat von Letnev", IMG_FOLDER + "letnev.png", "", "Letnev"],
["Clan of Saar", "Clan de Saar", "Clan der Zaar", IMG_FOLDER + "saar.png", "", "Saar"],
["Embers of Muaat", "Braises de Muaat", "Glut von Muaat", IMG_FOLDER + "muat.png", "", "Muaat"],
["Emirates of Hacan", "Emirats de Hacan", "Emirate von Hacan", IMG_FOLDER + "hacan.png", "", "Hacan"],
["Federation of Sol", "Fédération de Sol", "Sol Föderation", IMG_FOLDER + "sol.png", "", "Sol"],
["Ghosts of Creuss", "Fantômes de Creuss", "Geister von Creuss", IMG_FOLDER + "creuss.png", "", "Creuss"],
["L1z1x Mindnet", "Réseau d'Esprit L1z1x", "L1Z1X Gedankennetz", IMG_FOLDER + "l1z1x.png", "", "L1z1x"],
["Mentak Coalition", "Coalition Mentak", "Mentak Koalition", IMG_FOLDER + "mentak.png", "", "Mentak"],
["Naalu Collective", "Collectif Naalu", "Naalo-Kollektiv", IMG_FOLDER + "naalu.png", "", "Naalu"],
["Nekro Virus", "Virus Nekro", "Nekro-Virus", IMG_FOLDER + "nekro.png", "", "Nekro"],
["Sardak Norr", "Sardakk N'orr", "Sardakk N'orr", IMG_FOLDER + "sardak.png", "", "Sardak"],
["Universities of Jol-Nar", "Universités de Jol-Nar", "Universitiät von Jol-Nar", IMG_FOLDER + "jol.png", "", "Jol-Nar"],
["Winnu", "Winnu", "Winnu", IMG_FOLDER + "winnu.png", "", "Winnu"],
["Xxcha Kingdoms", "Royaume Xxcha", "Xxcha Königreich", IMG_FOLDER + "xxcha.png", "", "Xxcha"],
["Yin Brotherhood", "Fraternité de Yin", "Yin Brunderschaft", IMG_FOLDER + "yin.png", "", "Yin"],
["Yssaril Tribes", "Tribus Yssaril", "Yssaril-Stämme", IMG_FOLDER + "yssrail.png", "", "Yssaril"]
];

const HACAN_FACTION = 4;
const NAALU_FACTION = 9;
const NEKRO_FACTION = 10;
const WINNU_FACTION = 13;


var playerColorList = [
"black",
"blue",
"green",
"purple",
"red",
"yellow",
"orange",
"grey"
];

var gGenericChoice = [
["Proposal A", "Proposition A", "Vorschlag A"],
["Proposal B", "Proposition B", "Vorschlag B"],
["Proposal C", "Proposition B", "Vorschlag C"],
["Proposal D", "Proposition D", "Vorschlag D"],
["Proposal E", "Proposition E", "Vorschlag E"],
["Proposal F", "Proposition F", "Vorschlag F"],
["Proposal G", "Proposition G", "Vorschlag G"],
["Proposal H", "Proposition H", "Vorschlag H"],
];
