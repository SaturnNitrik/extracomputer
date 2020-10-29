/* Author: Stephane Demots */
var gLang = 0;
const LANG_EN = 0;
const LANG_FR = 1;
const LANG_DE = 2;
const LANG_RU = 3;

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
["Anti-Intellectual Revolution", "Révolution Anti-Intellectuelle", "Antiintellektuelle Revolution", "Анти-технологическая революция"],
["Classified Document Leaks",    "Fuites de documents classés", "Geheimnisverrat", "Утечка секретной информации"],
["Committee Formation",          "Formation de comité", "Bilguns eines Komitees", "Формирование комитета"],
["Conventions of War",           "Conventions de guerre", "Kriegsrechtskonventionen", "Правила ведения войны"],
["Core Mining",                  "Minage de noyau", "Bergbau im Planetenkern", "Разработки ядра"],
["Demilitarized Zone",           "Zone démilitarisée", "Entmilitarisierte Zone", "Демилитаризованная зона"],
["Enforced Travel Ban",          "Inderdiction de voyager", "Durchreiseverbot", "Ограничение на передвижение"],
["Executive Sanctions",          "Sanctions éxécutives", "Sanktionsdekret", "Ограничение полномочий"],
["Fleet Regulations",            "Régulations de flotte", "Flottenabkommen", "Регулирование флота"],
["Holy Planet of Ixth",          "Planète sacrée d'Ixth", "Der heilige Planet Ixth", "Священная планета Икстов"],
["Homeland Defense Act",         "Ordonnance de défense du territoire", "Heimatschutzgesetz", "Закон об обороне"],
["Imperial Arbiter",             "Arbitre Impérial", "Imperialer Vermittler", "Имперский арбитр"],
["Minister of Commerce",         "Ministre du Commerce", "Handelminister", "Министр торговли"],
["Minister of Exploration",      "Ministre de l'Exploration", "Raumfahrtminister", "Министр открытий"],
["Minister of Industry",         "Ministre de l'Industrie", "Industrieminister", "Министр промышленности"],
["Minister of Peace",            "Ministre de la Paix", "Friedensminister", "Министр мира"],
["Minister of Policy",           "Ministre de la Politique", "Minister für politische Strategie", "Министр политики"],
["Minister of Sciences",         "Ministre des Sciences", "Wissenschaftsminister", "Министр науки"],
["Minister of War",              "Ministre de la Guerre", "Kriegsminister", "Министр войны"],
["Prophecy of Ixth",             "Prophétie d'Ixth", "Die Prophezeiung von Ixth", "Пророчество Икстов"],
["Publicize Weapon Schematics",  "Publication de plans d'armes", "Freigabe von Waffenbauplänen", "Раскрытие военных чертежей"],
["Regulated Conscription",       "Régularisation de la conscription", "Beschränkung der Wehrpflicht", "Плановый призыв"],
["Representative Government ",   "Gouvernement représentatif", "Repräsentative Regierung", "Галактический сенат"],
["Research Team: Biotic",        "Equipe de recherche: Biotique", "Forschungsgruppe Biotechnik", "Разработка: биотехнологии"],
["Research Team: Cybernetic",    "Equipe de recherche: Cybernétique", "Forschungsgruppe Kybernetik", "Разработка: кибернетика"],
["Research Team: Propulsion",    "Equipe de recherche: Propulsion", "Forschungsgruppe Antriebstechnik", "Разработка: двигатели"],
["Research Team: Warfare",       "Equipe de recherche: Combat", "Forschungsgruppe Militärtechnik", "Разработка: оружие"],
["Senate Sanctuary",             "Sanctuaire Sénatorial", "Senatssitz", "Убежище сената"],
["Shard of the Throne",          "Fragment du Trône", "Scherbe des Throns", "Осколки трона"],
["Shared Research",              "Partage des connaissances", "gemeinsames Forschungsprojekt", "Совместные исследования"],
["Terraforming Initiative",      "Initiative de Terraformation", "Terraforming-Initiative", "Терраформирование"],
["The Crown of Emphidia",        "La couronne d'Emphidia", "Die Krone von Emphidia", "Корона Эмфидии"],
["The Crown of Thalnos",         "La couronne de Thanlos", "Die Krone von Thanlos", "Корона Талноса"],
["Wormhole Reconstruction",      "Reconstruction de Trou de Ver", "Rekonstruktion von Wurmlöchern", "Перестройка чревоточин"],
];

var gSecretObj = [
["Adapt New Strategies", "Adoptez de nouvelles stratégies", "Entwickle neue Strategie", "Разработайте новые стратегии"],
["Become the Gatekeeper", "Devenez la sentinelle de la porte", "Bewache die Tore", "Станьте привратником"],
["Control the Region", "Contrôlez la région", "Beherrsche die Region", "Контролируйте регион"],
["Cut Supply Lines", "Coupez les lignes d'approvision.", "Blockiere die Versorgungswege", "Перекройте каналы поставок"],
["Destroy Their Greatest Ship", "Détruisez leur plus grand vaisseau", "Zerstöre Ihr mächtigstes Schiff", "Уничтожьте гордость флота"],
["Establish a Perimeter", "Etablissez un périmètre", "Errichte einen Verteidigungsring", "Укрепите границы"],
["Forge an Alliance", "Forgez une alliance", "Schmiede ein Bündnis", "Создайте альянс"],
["Form a Spy Network", "Formez un réseau d'espions", "Bilde ein Spionagenetzwerk", "Сформируйте шпионскую сеть"],
["Fuel the War Machine", "Alimentez la Machine de Guerre", "Treibe die Kriegsmaschinerie an", "Разогрейте военную машину"],
["Gather a Mighty Fleet", "Rassemblez une puissante flotte", "Versammle eine mächtige Flotte", "Соберите мощный флот"],
["Learn Secrets of the Cosmos", "Apprenez les secrets du Cosmos", "Ergründe die Geheimnisse des Kosmos", "Познайте тайны космоса"],
["Monopolize Production", "Monopolisez la production", "Errichte ein Monopol", "Монополизируйте производство"],
["Make an Example of Their World", "Faites de leur monde un exemple", "Statuiere ein Exempel", "Преподайте урок"],
["Master the Laws of Physics", "Maîtrisez les lois de la physique", "Beherrsche die Naturgesetze", "Изучите законы физики"],
["Mine Rare Metals", "Extrayez des métaux rares", "Schürfe seltene Metalle", "Добывайте редкие металлы"],
["Occupy the Seat of the Empire", "Occupez le siege de l'empire", "Besetze die Thronwelt", "Захватите сердце Империи"],
["Spark a Rebellion", "Déclenchez une rébellion", "Zettele eine Rebellion an", "Поднимите восстание"],
["Threaten Enemies", "Menacez vos ennemies", "Bedränge den Feind", "Угрожайте врагам"],
["Turn Their Fleets to Dust", "Réduisez leurs flottes en cendres", "Vernichte Ihre Flotten", "Обратите флот в пыль"],
["Unveil Flagship", "Révélez un Vaisseau Amiral", "Enthülle dein Flagschiff", "Покажите флагман в деле"],
];

const FACTION_NAME_EN = 0;
const FACTION_NAME_FR = 1;
const FACTION_NAME_DE = 2;
const FACTION_NAME_RU = 3;
const FACTION_ICON = 4;
const FACTION_FACE = 5;
const FACTION_SHORTNAME = 6;

var FACTION_NAME = FACTION_NAME_EN + gLang;

const IMG_FOLDER = "ti4/img/";
var factionList = [
["Arborec", "Arborec", "Arborec", "Арбореки",  IMG_FOLDER + "arborec.png", "", "Arborec"],
["Barony of Letnev", "Baronnie de Letnev", "Baronat von Letnev", "Баронат Летнев", IMG_FOLDER + "letnev.png", "", "Letnev"],
["Clan of Saar", "Clan de Saar", "Clan der Zaar", "Клан Сааров", IMG_FOLDER + "saar.png", "", "Saar"],
["Embers of Muaat", "Braises de Muaat", "Glut von Muaat", "Тлеющие с Муаата", IMG_FOLDER + "muat.png", "", "Muaat"],
["Emirates of Hacan", "Emirats de Hacan", "Emirate von Hacan", "Хаканские Эмираты", IMG_FOLDER + "hacan.png", "", "Hacan"],
["Federation of Sol", "Fédération de Sol", "Sol Föderation", "Федерация Сол", IMG_FOLDER + "sol.png", "", "Sol"],
["Ghosts of Creuss", "Fantômes de Creuss", "Geister von Creuss", "Призраки Креусса", IMG_FOLDER + "creuss.png", "", "Creuss"],
["L1z1x Mindnet", "Réseau d'Esprit L1z1x", "L1Z1X Gedankennetz", "Психосеть Л1З1КС", IMG_FOLDER + "l1z1x.png", "", "L1z1x"],
["Mentak Coalition", "Coalition Mentak", "Mentak Koalition", "Коалиция Ментака", IMG_FOLDER + "mentak.png", "", "Mentak"],
["Naalu Collective", "Collectif Naalu", "Naalo-Kollektiv", "Клубок Наалу", IMG_FOLDER + "naalu.png", "", "Naalu"],
["Nekro Virus", "Virus Nekro", "Nekro-Virus", "Некровирус", IMG_FOLDER + "nekro.png", "", "Nekro"],
["Sardak Norr", "Sardakk N'orr", "Sardakk N'orr", "Сардак Н’орр", IMG_FOLDER + "sardak.png", "", "Sardak"],
["Universities of Jol-Nar", "Universités de Jol-Nar", "Universitiät von Jol-Nar", "Жол-Нарские университеты", IMG_FOLDER + "jol.png", "", "Jol"],
["Winnu", "Winnu", "Winnu", "Винну", IMG_FOLDER + "winnu.png", "", "Winnu"],
["Xxcha Kingdoms", "Royaume Xxcha", "Xxcha Königreich", "Королевство Ззча", IMG_FOLDER + "xxcha.png", "", "Xxcha"],
["Yin Brotherhood", "Fraternité de Yin", "Yin Brunderschaft", "Братство Инь", IMG_FOLDER + "yin.png", "", "Yin"],
["Yssaril Tribes", "Tribus Yssaril", "Yssaril-Stämme", "Племена Иссарилов", IMG_FOLDER + "yssrail.png", "", "Yssaril"],
["Argent Flight", "Argent Flight", "Argent Flight", "Argent Flight", IMG_FOLDER + "argent.png", "", "Argent"],
["Empyrean", "Empyrean", "Empyrean", "Empyrean", IMG_FOLDER + "empyrean.png", "", "Empyrean"],
["Mahact Gene-Sorcerers", "Mahact Gene-Sorcerers", "Mahact Gene-Sorcerers", "Mahact Gene-Sorcerers", IMG_FOLDER + "mahact.png", "", "Mahact"],
["Naaz-Rokha Alliance", "Naaz-Rokha Alliance", "Naaz-Rokha Alliance", "Naaz-Rokha Alliance", IMG_FOLDER + "naaz.png", "", "Naaz"],
["The Nomad", "The Nomad", "The Nomad", "The Nomad", IMG_FOLDER + "nomad.png", "", "Nomad"],
["Titans of Ul", "Titans of Ul", "Titans of Ul", "Titans of Ul", IMG_FOLDER + "titans.png", "", "Titans"],
["Vuil'Raith Cabal", "Vuil'Raith Cabal", "Vuil'Raith Cabal", "Vuil'Raith Cabal", IMG_FOLDER + "vuil.png", "", "Vuil"],
];

const HACAN_FACTION = 4;
const NAALU_FACTION = 9;
const NEKRO_FACTION = 10;
const WINNU_FACTION = 13;
const POK_FACTION = 17;


var playerColorList = [
"black",
"blue",
"green",
"purple",
"red",
"yellow",
"orange",
"hotpink"
];

var gGenericChoice = [
["Proposal A", "Proposition A", "Vorschlag A", "Предложение A"],
["Proposal B", "Proposition B", "Vorschlag B", "Предложение B"],
["Proposal C", "Proposition B", "Vorschlag C", "Предложение C"],
["Proposal D", "Proposition D", "Vorschlag D", "Предложение D"],
["Proposal E", "Proposition E", "Vorschlag E", "Предложение E"],
["Proposal F", "Proposition F", "Vorschlag F", "Предложение F"],
["Proposal G", "Proposition G", "Vorschlag G", "Предложение G"],
["Proposal H", "Proposition H", "Vorschlag H", "Предложение H"],
];
