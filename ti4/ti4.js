﻿/* Author: Stephane Demots */
var gLang = 0;
const LANG_EN = 0;
const LANG_FR = 1;
const LANG_DE = 2;
const LANG_RU = 3;
const LANG_SP = 4;

const PLANET_NAME = 0;
const PLANET_TYPE = 1;

var gPlanet = [
["Abaddon", "cultural"],
["Abyz", "hazardous"],
["Accoen", "industrial"],
["Acheron", "homeworld"],
["Alio Prima", "cultural"],
["Ang", "industrial"],
["Arc Prime", "homeworld"],
["Archon Tau", "homeworld"],
["Archon Ren", "homeworld"],
["Archon Vail", "hazardous"],
["Arcturus", "homeworld"],
["Arinam", "industrial"],
["Arnor", "industrial"],
["Arretze", "homeworld"],
["Ashtroth", "hazardous"],
["Atlas", "hazardous"],
["Avar", "homeworld"],
["Ba'kal", "industrial"],
["Bereg", "hazardous"],
["Cealdri", "cultural"],
["Centauri", "cultural"],
["Coorneeq", "cultural"],
["Cormund", "hazardous"],
["Creus Gate", "homeworld"],
["Creuss", "homeworld"],
["Dal Bootha", "cultural"],
["Darien", "homeworld"],
["The Dark", "homeworld"],
["Druaa", "homeworld"],
["Elysium", "homeworld"],
["Everra", "cultural"],
["Fria", "hazardous"],
["Gral", "industrial"],
["Hercant", "homeworld"],
["Hope's End", "hazardous"],
["Ixth", "homeworld"],
["Jeol Ir", "industrial"],
["Jol", "homeworld"],
["Jord", "homeworld"],
["Kamdorn", "homeworld"],
["Kraag", "hazardous"],
["Lazar", "industrial"],
["Lisis", "industrial"],
["Lisis II", "homeworld"],
["Lirta IV", "hazardous"],
["Lodor", "cultural"],
["Loki", "cultural"],
["Lor", "industrial"],
["Maaluuk", "homeworld"],
["Mallice", "cultural"],
["Mecatol Rex", "homeworld"],
["Meer", "hazardous"],
["Mehar Xull", "hazardous"],
["Mellon", "cultural"],
["Mirage", "cultural"],
["Moll Primus", "homeworld"],
["Mordai II", "homeworld"],
["Muaat", "homeworld"],
["Nar", "homeworld"],
["Naazir", "homeworld"],
["Nestphar", "homeworld"],
["New Albion", "industrial"],
["Perimeter", "industrial"],
["Primor", "cultural"],
["Quann", "cultural"],
["Quecen'n", "industrial"],
["Quinarra", "homeworld"],
["Ragh", "homeworld"],
["Rarron", "cultural"],
["Resculon", "cultural"],
["Retillion", "homeworld"],
["Rigel I", "hazardous"],
["Rigel II", "industrial"],
["Rigel III", "industrial"],
["Rokha", "homeworld"],
["Sakulag", "hazardous"],
["Saudor", "industrial"],
["Sem-Lore", "cultural"],
["Shalloq", "homeworld"],
["Siig", "hazardous"],
["Starpoint", "hazardous"],
["Tar'Mann", "industrial"],
["Tequ'ran", "hazardous"],
["Thibah", "industrial"],
["Torkan", "cultural"],
["Tren'Lak", "homeworld"],
["Valk", "homeworld"],
["Vega Major", "cultural"],
["Vega Minor", "cultural"],
["Vefut II", "hazardous"],
["Velnor", "industrial"],
["Vorhal", "cultural"],
["Wellon", "industrial"],
["Winnu", "homeworld"],
["Wren Terra", "homeworld"],
["Xanhact", "hazardous"],
["XXehan", "cultural"],
["Ylir", "homeworld"],
["Zohbat", "hazardous"],
["[0.0.0]", "homeworld"],
];

var gLaw = [
["Anti-Intellectual Revolution", "Révolution Anti-Intellectuelle", "Antiintellektuelle Revolution", "Анти-технологическая революция", "Revolución Anti-Intelectual"],
["Classified Document Leaks", "Fuites de documents classés", "Geheimnisverrat", "Утечка секретной информации", "Filtrar Documentos Clasificados"],
["Committee Formation", "Formation de comité", "Bilguns eines Komitees", "Формирование комитета", "Formar un Comité"],
["Conventions of War", "Conventions de guerre", "Kriegsrechtskonventionen", "Правила ведения войны", "Convenciones de Guerra"],
["Core Mining", "Minage de noyau", "Bergbau im Planetenkern", "Разработки ядра", "Explotación del Nucleo Planetario"],
["Demilitarized Zone", "Zone démilitarisée", "Entmilitarisierte Zone", "Демилитаризованная зона", "Zona Desmilitarizada"],
["Enforced Travel Ban", "Inderdiction de voyager", "Durchreiseverbot", "Ограничение на передвижение", "Prohibición de Viajes Espaciales"],
["Executive Sanctions", "Sanctions éxécutives", "Sanktionsdekret", "Ограничение полномочий", "Sanciones Ejecutivas"],
["Fleet Regulations", "Régulations de flotte", "Flottenabkommen", "Регулирование флота", "Normativa Naval"],
["Holy Planet of Ixth", "Planète sacrée d'Ixth", "Der heilige Planet Ixth", "Священная планета Икстов", "El Planeta Sagrado Ixth"],
["Homeland Defense Act", "Ordonnance de défense du territoire", "Heimatschutzgesetz", "Закон об обороне", "Ley de Defensa Nacional"],
["Imperial Arbiter", "Arbitre Impérial", "Imperialer Vermittler", "Имперский арбитр", "Arbitrador Imperial"],
["Minister of Commerce", "Ministre du Commerce", "Handelminister", "Министр торговли", "Ministro de Commercio"],
["Minister of Exploration", "Ministre de l'Exploration", "Raumfahrtminister", "Министр открытий", "Ministro de Exploración"],
["Minister of Industry", "Ministre de l'Industrie", "Industrieminister", "Министр промышленности", "Ministro de Industria"],
["Minister of Peace", "Ministre de la Paix", "Friedensminister", "Министр мира", "Ministro de Paz"],
["Minister of Policy", "Ministre de la Politique", "Minister für politische Strategie", "Министр политики", "Ministro de Política"],
["Minister of Sciences", "Ministre des Sciences", "Wissenschaftsminister", "Министр науки", "Ministro de Ciencia"],
["Minister of War", "Ministre de la Guerre", "Kriegsminister", "Министр войны", "Ministro de Guerra"],
["Prophecy of Ixth", "Prophétie d'Ixth", "Die Prophezeiung von Ixth", "Пророчество Икстов", "La Profecía de Ixth"],
["Publicize Weapon Schematics", "Publication de plans d'armes", "Freigabe von Waffenbauplänen", "Раскрытие военных чертежей", "Divulgar Planos de Armas"],
["Regulated Conscription", "Régularisation de la conscription", "Beschränkung der Wehrpflicht", "Плановый призыв", "Servicio Militar Compensatorio"],
["Representative Government ", "Gouvernement représentatif", "Repräsentative Regierung", "Галактический сенат", "Gobierno Representativo"],
["Research Team: Biotic", "Equipe de recherche: Biotique", "Forschungsgruppe Biotechnik", "Разработка: биотехнологии", "Equipo de Investigación: Biótica"],
["Research Team: Cybernetic", "Equipe de recherche: Cybernétique", "Forschungsgruppe Kybernetik", "Разработка: кибернетика", "Equipo de Investigación: Cibernética"],
["Research Team: Propulsion", "Equipe de recherche: Propulsion", "Forschungsgruppe Antriebstechnik", "Разработка: двигатели", "Equipo de Investigación: Propulsión"],
["Research Team: Warfare", "Equipe de recherche: Combat", "Forschungsgruppe Militärtechnik", "Разработка: оружие", "Equipo de Investigación: Guerra"],
["Senate Sanctuary", "Sanctuaire Sénatorial", "Senatssitz", "Убежище сената", "Santuario del Senado"],
["Shard of the Throne", "Fragment du Trône", "Scherbe des Throns", "Осколки трона", "Fragmento del Trono"],
["Shared Research", "Partage des connaissances", "gemeinsames Forschungsprojekt", "Совместные исследования", "Investigación Conjunta"],
["Terraforming Initiative", "Initiative de Terraformation", "Terraforming-Initiative", "Терраформирование", "Iniciativa de Terraformación"],
["The Crown of Emphidia", "La couronne d'Emphidia", "Die Krone von Emphidia", "Корона Эмфидии", "La Corona de Emphidia"],
["The Crown of Thalnos", "La couronne de Thanlos", "Die Krone von Thanlos", "Корона Талноса", "La Corona de Thanlos"],
["Wormhole Reconstruction", "Reconstruction de Trou de Ver", "Rekonstruktion von Wurmlöchern", "Перестройка чревоточин", "Reconstruir Agujero de Gusano"],
];

var gSecretObj = [
["Adapt New Strategies", "Adoptez de nouvelles stratégies", "Entwickle neue Strategie", "Разработайте новые стратегии", "Adoptar Nuevas Estrategias"],
["Become the Gatekeeper", "Devenez la sentinelle de la porte", "Bewache die Tore", "Станьте привратником", "Vigilar los Portales"],
["Control the Region", "Contrôlez la région", "Beherrsche die Region", "Контролируйте регион", "Controlar la Región"],
["Cut Supply Lines", "Coupez les lignes d'approvision.", "Blockiere die Versorgungswege", "Перекройте каналы поставок", "Cortar las Líneas de Suministro"],
["Destroy Their Greatest Ship", "Détruisez leur plus grand vaisseau", "Zerstöre Ihr mächtigstes Schiff", "Уничтожьте гордость флота", "Destruir su Nave Más Grande"],
["Establish a Perimeter", "Etablissez un périmètre", "Errichte einen Verteidigungsring", "Укрепите границы", "Establecer un Perímetro"],
["Forge an Alliance", "Forgez une alliance", "Schmiede ein Bündnis", "Создайте альянс", "Forjar una Alianza"],
["Form a Spy Network", "Formez un réseau d'espions", "Bilde ein Spionagenetzwerk", "Сформируйте шпионскую сеть", "Crear Una Red de Espionaje"],
["Fuel the War Machine", "Alimentez la Machine de Guerre", "Treibe die Kriegsmaschinerie an", "Разогрейте военную машину", "Alimentar la Maquinaria Bélica"],
["Gather a Mighty Fleet", "Rassemblez une puissante flotte", "Versammle eine mächtige Flotte", "Соберите мощный флот", "Reunir una Flota Formidable"],
["Learn Secrets of the Cosmos", "Apprenez les secrets du Cosmos", "Ergründe die Geheimnisse des Kosmos", "Познайте тайны космоса", "Desvelar los Secretos del Cosmos"],
["Monopolize Production", "Monopolisez la production", "Errichte ein Monopol", "Монополизируйте производство", "Monopolizar la Producción"],
["Make an Example of Their World", "Faites de leur monde un exemple", "Statuiere ein Exempel", "Преподайте урок", "Dar Ejemplo con su Planeta"],
["Master the Laws of Physics", "Maîtrisez les lois de la physique", "Beherrsche die Naturgesetze", "Изучите законы физики", "Dominar la Leyes de la Física"],
["Mine Rare Metals", "Extrayez des métaux rares", "Schürfe seltene Metalle", "Добывайте редкие металлы", "Extraer Metales Poco Comunes"],
["Occupy the Seat of the Empire", "Occupez le siege de l'empire", "Besetze die Thronwelt", "Захватите сердце Империи", "Ocupar la Capital Imperial"],
["Spark a Rebellion", "Déclenchez une rébellion", "Zettele eine Rebellion an", "Поднимите восстание", "Iniciar una Rebelión"],
["Threaten Enemies", "Menacez vos ennemies", "Bedränge den Feind", "Угрожайте врагам", "Intimidar a tus Enemigos"],
["Turn Their Fleets to Dust", "Réduisez leurs flottes en cendres", "Vernichte Ihre Flotten", "Обратите флот в пыль", "Reducir sus Flotas a Polvo"],
["Unveil Flagship", "Révélez un Vaisseau Amiral", "Enthülle dein Flagschiff", "Покажите флагман в деле", "Revelar Nave Insignia"],
];

var gStrategy = [
["Leadership", "Gouvern.", "Führungsstärke", "Лидерство", "Liderazgo"],
["Diplomacy", "Diplomacie", "Diplomatie", "Дипломатия", "Diplomacia"],
["Politics", "Politique", "Politik", "Политика", "Política"],
["Construction", "Construction", "Infrastruktur", "Строительство", "Construcción"],
["Trade", "Commerce", "Handel", "Торговля", "Comercio"],
["Warfare", "Guerre", "Kriegsführung", "Война", "Guerra"],
["Technology", "Techno.", "Technologie", "Исследования", "Tecnología"],
["Imperial", "Intrigue", "Imperium", "Экспансия", "Imperialismo"],
];

const FACTION_NAME_EN = 0;
const FACTION_NAME_FR = 1;
const FACTION_NAME_DE = 2;
const FACTION_NAME_RU = 3;
const FACTION_NAME_SP = 4;
const FACTION_ICON = 5;
const FACTION_FACE = 6;
const FACTION_SHORTNAME = 7;

var FACTION_NAME = FACTION_NAME_EN + gLang;

const IMG_FOLDER = "ti4/img/";
var factionList = [
["Arborec", "Arborec", "Arborec", "Арбореки", "Los Arborec", IMG_FOLDER + "arborec.png", "", "Arborec"],
["Barony of Letnev", "Baronnie de Letnev", "Baronat von Letnev", "Баронат Летнев", "La Baronía de Letnev", IMG_FOLDER + "letnev.png", "", "Letnev"],
["Clan of Saar", "Clan de Saar", "Clan der Zaar", "Клан Сааров", "El Clan de Saar", IMG_FOLDER + "saar.png", "", "Saar"],
["Embers of Muaat", "Braises de Muaat", "Glut von Muaat", "Тлеющие с Муаата", "Las Ascuas de Muaat", IMG_FOLDER + "muat.png", "", "Muaat"],
["Emirates of Hacan", "Emirats de Hacan", "Emirate von Hacan", "Хаканские Эмираты", "Los Emiratos de Hacan", IMG_FOLDER + "hacan.png", "", "Hacan"],
["Federation of Sol", "Fédération de Sol", "Sol Föderation", "Федерация Сол", "La Federación de Sol", IMG_FOLDER + "sol.png", "", "Sol"],
["Ghosts of Creuss", "Fantômes de Creuss", "Geister von Creuss", "Призраки Креусса", "Los Fantasmas de Creuss", IMG_FOLDER + "creuss.png", "", "Creuss"],
["L1z1x Mindnet", "Réseau d'Esprit L1z1x", "L1Z1X Gedankennetz", "Психосеть Л1З1КС", "La Red Mental L1z1x", IMG_FOLDER + "l1z1x.png", "", "L1z1x"],
["Mentak Coalition", "Coalition Mentak", "Mentak Koalition", "Коалиция Ментака", "La Coalición Mentak", IMG_FOLDER + "mentak.png", "", "Mentak"],
["Naalu Collective", "Collectif Naalu", "Naalo-Kollektiv", "Клубок Наалу", "El Colectivo Naalu", IMG_FOLDER + "naalu.png", "", "Naalu"],
["Nekro Virus", "Virus Nekro", "Nekro-Virus", "Некровирус", "El Virus Nekro", IMG_FOLDER + "nekro.png", "", "Nekro"],
["Sardak Norr", "Sardakk N'orr", "Sardakk N'orr", "Сардак Н’орр", "Los Sardak Norr", IMG_FOLDER + "sardak.png", "", "Sardak"],
["Universities of Jol-Nar", "Universités de Jol-Nar", "Universitiät von Jol-Nar", "Жол-Нарские университеты", "Las Universidades de Jol-Nar", IMG_FOLDER + "jol.png", "", "Jol"],
["Winnu", "Winnu", "Winnu", "Винну", "Los Winnu", IMG_FOLDER + "winnu.png", "", "Winnu"],
["Xxcha Kingdoms", "Royaume Xxcha", "Xxcha Königreich", "Королевство Ззча", "El Reino de Xxcha", IMG_FOLDER + "xxcha.png", "", "Xxcha"],
["Yin Brotherhood", "Fraternité de Yin", "Yin Brunderschaft", "Братство Инь", "La Hermandad del Yin", IMG_FOLDER + "yin.png", "", "Yin"],
["Yssaril Tribes", "Tribus Yssaril", "Yssaril-Stämme", "Племена Иссарилов", "Las Tribus de Yssaril", IMG_FOLDER + "yssrail.png", "", "Yssaril"],
["Argent Flight", "Argent Flight", "Argent Flight", "Argent Flight", "La Bandada Argéntea", IMG_FOLDER + "argent.png", "", "Argent"],
["Empyrean", "Empyrean", "Empyrean", "Empyrean", "Los Empíreos", IMG_FOLDER + "empyrean.png", "", "Empyrean"],
["Mahact Gene-Sorcerers", "Mahact Gene-Sorcerers", "Mahact Gene-Sorcerers", "Mahact Gene-Sorcerers", "Los Genechiceros de Mahact", IMG_FOLDER + "mahact.png", "", "Mahact"],
["Naaz-Rokha Alliance", "Naaz-Rokha Alliance", "Naaz-Rokha Alliance", "Naaz-Rokha Alliance", "La Alianza Naaz-Rokha", IMG_FOLDER + "naaz.png", "", "Naaz"],
["The Nomad", "The Nomad", "The Nomad", "The Nomad", "Los Nomadas", IMG_FOLDER + "nomad.png", "", "Nomad"],
["Titans of Ul", "Titans of Ul", "Titans of Ul", "Titans of Ul", "Los Titanes de Ul", IMG_FOLDER + "titans.png", "", "Titans"],
["Vuil'Raith Cabal", "Vuil'Raith Cabal", "Vuil'Raith Cabal", "Vuil'Raith Cabal", "La Cábala de Vuil'Raith", IMG_FOLDER + "vuil.png", "", "Vuil"],
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
["Proposal A", "Proposition A", "Vorschlag A", "Предложение A", "Propuesta A"],
["Proposal B", "Proposition B", "Vorschlag B", "Предложение B", "Propuesta B"],
["Proposal C", "Proposition B", "Vorschlag C", "Предложение C", "Propuesta C"],
["Proposal D", "Proposition D", "Vorschlag D", "Предложение D", "Propuesta D"],
["Proposal E", "Proposition E", "Vorschlag E", "Предложение E", "Propuesta E"],
["Proposal F", "Proposition F", "Vorschlag F", "Предложение F", "Propuesta F"],
["Proposal G", "Proposition G", "Vorschlag G", "Предложение G", "Propuesta G"],
["Proposal H", "Proposition H", "Vorschlag H", "Предложение H", "Propuesta H"],
];
