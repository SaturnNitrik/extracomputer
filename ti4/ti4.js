﻿/* Author: Stephane Demots */
var gLang = 0;
const LANG_EN = 0;
const LANG_FR = 1;
const LANG_DE = 2;
const LANG_RU = 3;
const LANG_SP = 4;
const LANG_CN = 5;
const LANG_PL = 6;

const PLANET_NAME = 0;
const PLANET_TYPE = 1;

var gPlanet = [
["Abaddon", "cultural" ,""],
["Abyz", "hazardous" ,""],
["Accoen", "industrial" ,""],
["Acheron", "homeworld" ,""],
["Alio Prima", "cultural" ,""],
["Ang", "industrial" ,""],
["Arc Prime", "homeworld" ,""],
["Archon Tau", "homeworld" ,""],
["Archon Ren", "homeworld" ,""],
["Archon Vail", "hazardous" ,""],
["Arcturus", "homeworld" ,""],
["Arinam", "industrial" ,""],
["Arnor", "industrial" ,""],
["Arretze", "homeworld" ,""],
["Ashtroth", "hazardous" ,""],
["Atlas", "hazardous" ,""],
["Avar", "homeworld" ,""],
["Ba'kal", "industrial" ,""],
["Bereg", "hazardous" ,""],
["Cealdri", "cultural" ,""],
["Centauri", "cultural" ,""],
["Coorneeq", "cultural" ,""],
["Cormund", "hazardous" ,""],
["Creus Gate", "homeworld" ,""],
["Creuss", "homeworld" ,""],
["Dal Bootha", "cultural" ,""],
["Darien", "homeworld" ,""],
["The Dark", "homeworld" ,""],
["Druaa", "homeworld" ,""],
["Elysium", "homeworld" ,""],
["Everra", "cultural" ,""],
["Fria", "hazardous" ,""],
["Gral", "industrial" ,""],
["Hercant", "homeworld" ,""],
["Hope's End", "hazardous" ,""],
["Ixth", "homeworld" ,""],
["Jeol Ir", "industrial" ,""],
["Jol", "homeworld" ,""],
["Jord", "homeworld" ,""],
["Kamdorn", "homeworld" ,""],
["Kraag", "hazardous" ,""],
["Lazar", "industrial" ,""],
["Lisis", "industrial" ,""],
["Lisis II", "homeworld" ,""],
["Lirta IV", "hazardous" ,""],
["Lodor", "cultural" ,""],
["Loki", "cultural" ,""],
["Lor", "industrial" ,""],
["Maaluuk", "homeworld" ,""],
["Mallice", "cultural" ,""],
["Mecatol Rex", "homeworld" ,""],
["Meer", "hazardous" ,""],
["Mehar Xull", "hazardous" ,""],
["Mellon", "cultural" ,""],
["Mirage", "cultural" ,""],
["Moll Primus", "homeworld" ,""],
["Mordai II", "homeworld" ,""],
["Muaat", "homeworld" ,""],
["Nar", "homeworld" ,""],
["Naazir", "homeworld" ,""],
["Nestphar", "homeworld" ,""],
["New Albion", "industrial" ,""],
["Perimeter", "industrial" ,""],
["Primor", "cultural" ,""],
["Quann", "cultural" ,""],
["Quecen'n", "industrial" ,""],
["Quinarra", "homeworld" ,""],
["Ragh", "homeworld" ,""],
["Rarron", "cultural" ,""],
["Resculon", "cultural" ,""],
["Retillion", "homeworld" ,""],
["Rigel I", "hazardous" ,""],
["Rigel II", "industrial" ,""],
["Rigel III", "industrial" ,""],
["Rokha", "homeworld" ,""],
["Sakulag", "hazardous" ,""],
["Saudor", "industrial" ,""],
["Sem-Lore", "cultural" ,""],
["Shalloq", "homeworld" ,""],
["Siig", "hazardous" ,""],
["Starpoint", "hazardous" ,""],
["Tar'Mann", "industrial" ,""],
["Tequ'ran", "hazardous" ,""],
["Thibah", "industrial" ,""],
["Torkan", "cultural" ,""],
["Tren'Lak", "homeworld" ,""],
["Valk", "homeworld" ,""],
["Vega Major", "cultural" ,""],
["Vega Minor", "cultural" ,""],
["Vefut II", "hazardous" ,""],
["Velnor", "industrial" ,""],
["Vorhal", "cultural" ,""],
["Wellon", "industrial" ,""],
["Winnu", "homeworld" ,""],
["Wren Terra", "homeworld" ,""],
["Xanhact", "hazardous" ,""],
["XXehan", "cultural" ,""],
["Ylir", "homeworld" ,""],
["Zohbat", "hazardous" ,""],
["[0.0.0]", "homeworld" ,""],
];

var gLaw = [
["Anti-Intellectual Revolution", "Révolution Anti-Intellectuelle", "Antiintellektuelle Revolution", "Анти-технологическая революция", "Revolución Anti-Intelectual", "反智发展法", "Cenzura polityczna"],
["Articles of War", "Articles of War", "Articles of War", "Articles of War", "Articles of War", "战争条例", "Górnictwo rdzeniowe"],
["Parliamentary system", "Parliamentary system", "Parliamentary system", "Parliamentary system", "Parliamentary system", "议会制度", "Imperialny Arbiter"],
["Checks and Balances", "Checks and Balances", "Checks and Balances", "Checks and Balances", "Checks and Balances", "制衡", "Inicjatywa terraformacyjna"],
["Classified Document Leaks", "Fuites de documents classés", "Geheimnisverrat", "Утечка секретной информации", "Filtrar Documentos Clasificados", "公文泄密", "Konwencja Wojenna"],
["Committee Formation", "Formation de comité", "Bilguns eines Komitees", "Формирование комитета", "Formar un Comité", "委员会结成", "Konwencja wojenna"],
["Conventions of War", "Conventions de guerre", "Kriegsrechtskonventionen", "Правила ведения войны", "Convenciones de Guerra", "战争公约", "Korona Emfidii"],
["Core Mining", "Minage de noyau", "Bergbau im Planetenkern", "Разработки ядра", "Explotación del Nucleo Planetario", "矿业中心", "Korona Thalnosa"],
["Demilitarized Zone", "Zone démilitarisée", "Entmilitarisierte Zone", "Демилитаризованная зона", "Zona Desmilitarizada", "非武装地区", "Minister Eksploracji Przestrzeni"],
["Enforced Travel Ban", "Inderdiction de voyager", "Durchreiseverbot", "Ограничение на передвижение", "Prohibición de Viajes Espaciales", "虫洞旅行禁令", "Minister Handlu"],
["Executive Sanctions", "Sanctions éxécutives", "Sanktionsdekret", "Ограничение полномочий", "Sanciones Ejecutivas", "管理许可", "Minister Nauki"],
["Fleet Regulations", "Régulations de flotte", "Flottenabkommen", "Регулирование флота", "Normativa Naval", "舰队规章", "Minister Pokoju"],
["Holy Planet of Ixth", "Planète sacrée d'Ixth", "Der heilige Planet Ixth", "Священная планета Икстов", "El Planeta Sagrado Ixth", "手握圣地", "Minister Polityki Wewnętrznej"],
["Homeland Defense Act", "Ordonnance de défense du territoire", "Heimatschutzgesetz", "Закон об обороне", "Ley de Defensa Nacional", "家园防卫规章", "Minister Przemysłu"],
["Imperial Arbiter", "Arbitre Impérial", "Imperialer Vermittler", "Имперский арбитр", "Arbitrador Imperial", "帝国权贵", "Minister Wojny"],
["Minister of Commerce", "Ministre du Commerce", "Handelminister", "Министр торговли", "Ministro de Commercio", "商贸大臣", "Nakaz rewizji"],
["Minister of Exploration", "Ministre de l'Exploration", "Raumfahrtminister", "Министр открытий", "Ministro de Exploración", "勘探大臣", "Normy poborowe"],
["Minister of Industry", "Ministre de l'Industrie", "Industrieminister", "Министр промышленности", "Ministro de Industria", "工业大臣", "Prawo flotowe"],
["Minister of Peace", "Ministre de la Paix", "Friedensminister", "Министр мира", "Ministro de Paz", "和平大臣", "Proroctwo Ixthian"],
["Minister of Policy", "Ministre de la Politique", "Minister für politische Strategie", "Министр политики", "Ministro de Política", "内政大臣", "Przymusowy zakaz podróżowania"],
["Minister of Sciences", "Ministre des Sciences", "Wissenschaftsminister", "Министр науки", "Ministro de Ciencia", "科技大臣", "Rekonstrukcja tuneli czasoprzestrzennych"],
["Minister of War", "Ministre de la Guerre", "Kriegsminister", "Министр войны", "Ministro de Guerra", "军事大臣", "Reprezentatywny system rządów"],
["Nexus Sovereignty", "Nexus Sovereignty", "Nexus Sovereignty", "Nexus Sovereignty", "Nexus Sovereignty", "连结主权", "Rewolucja Antyintelektualna"],
["Political Censure", "Political Censure", "Political Censure", "Political Censure", "Political Censure", "政治谴责", "Równowaga Polityczna"],
["Prophecy of Ixth", "Prophétie d'Ixth", "Die Prophezeiung von Ixth", "Пророчество Икстов", "La Profecía de Ixth", "神的预言", "Sankcje wykonawcze"],
["Publicize Weapon Schematics", "Publication de plans d'armes", "Freigabe von Waffenbauplänen", "Раскрытие военных чертежей", "Divulgar Planos de Armas", "宣传先进武器", "Siedziba senatu"],
["Regulated Conscription", "Régularisation de la conscription", "Beschränkung der Wehrpflicht", "Плановый призыв", "Servicio Militar Compensatorio", "征兵管制", "Strefa zdemilitaryzowana"],
["Representative Government ", "Gouvernement représentatif", "Repräsentative Regierung", "Галактический сенат", "Gobierno Representativo", "代议政体", "Strzępki władzy"],
["Research Team: Biotic", "Equipe de recherche: Biotique", "Forschungsgruppe Biotechnik", "Разработка: биотехнологии", "Equipo de Investigación: Biótica", "研究团队：生化学", "Suwerenność węzła"],
["Research Team: Cybernetic", "Equipe de recherche: Cybernétique", "Forschungsgruppe Kybernetik", "Разработка: кибернетика", "Equipo de Investigación: Cibernética", "研究团队：模控学", "Upublicznienie planów broni"],
["Research Team: Propulsion", "Equipe de recherche: Propulsion", "Forschungsgruppe Antriebstechnik", "Разработка: двигатели", "Equipo de Investigación: Propulsión", "研究团队：推力学", "Ustawa o obronie Ojczyzny"],
["Research Team: Warfare", "Equipe de recherche: Combat", "Forschungsgruppe Militärtechnik", "Разработка: оружие", "Equipo de Investigación: Guerra", "研究团队：战争学", "Ustrój poselski"],
["Search Warrant", "Search Warrant", "Search Warrant", "Search Warrant", "Search Warrant", "搜查令", "Utworzenie komitetu"],
["Senate Sanctuary", "Sanctuaire Sénatorial", "Senatssitz", "Убежище сената", "Santuario del Senado", "评议会圣所", "Współdzielone badania"],
["Shard of the Throne", "Fragment du Trône", "Scherbe des Throns", "Осколки трона", "Fragmento del Trono", "王座的碎片", "Wyciek tajnych dokumentów"],
["Shared Research", "Partage des connaissances", "gemeinsames Forschungsprojekt", "Совместные исследования", "Investigación Conjunta", "研发天幕", "Zespół badawczy: biotyka"],
["Terraforming Initiative", "Initiative de Terraformation", "Terraforming-Initiative", "Терраформирование", "Iniciativa de Terraformación", "地貌开发", "Zespół badawczy: cybernetyka"],
["The Crown of Emphidia", "La couronne d'Emphidia", "Die Krone von Emphidia", "Корона Эмфидии", "La Corona de Emphidia", "因菲迪亚之冠", "Zespół badawczy: napędy"],
["The Crown of Thalnos", "La couronne de Thanlos", "Die Krone von Thanlos", "Корона Талноса", "La Corona de Thanlos", "塔洛斯之冠", "Zespół badawczy: wojna"],
["Wormhole Reconstruction", "Reconstruction de Trou de Ver", "Rekonstruktion von Wurmlöchern", "Перестройка чревоточин", "Reconstruir Agujero de Gusano", "虫洞修复", "Święta planeta Ixthian"],
];

var gSecretObj = [
["Adapt New Strategies", "Adoptez de nouvelles stratégies", "Entwickle neue Strategie", "Разработайте новые стратегии", "Adoptar Nuevas Estrategias", "调整新战略", "Dyktuj politykę"],
["Become a Martyr", "Become a Martyr", "Become a Martyr", "Become a Martyr", "Become a Martyr", "成为殉道者", "Kontroluj region"],
["Become the Gatekeeper", "Devenez la sentinelle de la porte", "Bewache die Tore", "Станьте привратником", "Vigilar los Portales", "虫洞门神", "Obróć ich flotę w pył"],
["Betray a Friend", "Betray a Friend", "Betray a Friend", "Betray a Friend", "Betray a Friend", "背后插刀", "Okupuj granice"],
["Brave the Void", "Brave the Void", "Brave the Void", "Brave the Void", "Brave the Void", "直面虚空", "Okupuj stolicę imperium"],
["Control the Region", "Contrôlez la région", "Beherrsche die Region", "Контролируйте регион", "Controlar la Región", "地区控制", "Opanuj prawa fizyki"],
["Cut Supply Lines", "Coupez les lignes d'approvision.", "Blockiere die Versorgungswege", "Перекройте каналы поставок", "Cortar las Líneas de Suministro", "截断补给", "Opracuj nowe strategie"],
["Darken the Skies", "Darken the Skies", "Darken the Skies", "Darken the Skies", "Darken the Skies", "重兵压境", "Oprzyj się czasowi i przestrzeni"],
["Defy Space and Time", "Defy Space and Time", "Defy Space and Time", "Defy Space and Time", "Defy Space and Time", "挑战时空", "Poprowadź debatę"],
["Demonstrate Your Power", "Demonstrate Your Power", "Demonstrate Your Power", "Demonstrate Your Power", "Demonstrate Your Power", "展示力量", "Poznaj sekrety kosmosu"],
["Destroy Heretical Works", "Destroy Heretical Works", "Destroy Heretical Works", "Destroy Heretical Works", "Destroy Heretical Works", "销毁异端", "Produkuj na masową skalę"],
["Destroy Their Greatest Ship", "Détruisez leur plus grand vaisseau", "Zerstöre Ihr mächtigstes Schiff", "Уничтожьте гордость флота", "Destruir su Nave Más Grande", "擒贼先擒王", "Promuj jedność"],
["Dictate Policy", "Dictate Policy", "Dictate Policy", "Dictate Policy", "Dictate Policy", "指鹿为马", "Przerwij linie zaopatrzeniowe"],
["Drive the Debate", "Drive the Debate", "Drive the Debate", "Drive the Debate", "Drive the Debate", "运筹帷幄", "Przetestuj okręt wojenny"],
["Establish a Perimeter", "Etablissez un périmètre", "Errichte einen Verteidigungsring", "Укрепите границы", "Establecer un Perímetro", "部署阵地", "Rozkręć machinę wojenna"],
["Establish Hegemony", "Establish Hegemony", "Establish Hegemony", "Establish Hegemony", "Establish Hegemony", "霸气初现", "Rozpal iskrę rebelii"],
["Fight With Precision", "Fight With Precision", "Fight With Precision", "Fight With Precision", "Fight With Precision", "百步穿杨", "Rozpocznij wydobycie rzadkich metali"],
["Forge an Alliance", "Forgez une alliance", "Schmiede ein Bündnis", "Создайте альянс", "Forjar una Alianza", "假造同盟", "Rzuć wyzwanie"],
["Form a Spy Network", "Formez un réseau d'espions", "Bilde ein Spionagenetzwerk", "Сформируйте шпионскую сеть", "Crear Una Red de Espionaje", "建立间谍网", "Rzuć wyzwanie pustce"],
["Foster Cohesion", "Foster Cohesion", "Foster Cohesion", "Foster Cohesion", "Foster Cohesion", "培养凝聚力", "Uczyń ich świat przykładem"],
["Fuel the War Machine", "Alimentez la Machine de Guerre", "Treibe die Kriegsmaschinerie an", "Разогрейте военную машину", "Alimentar la Maquinaria Bélica", "战争机器", "Udowodnij wytrwałość"],
["Gather a Mighty Fleet", "Rassemblez une puissante flotte", "Versammle eine mächtige Flotte", "Соберите мощный флот", "Reunir una Flota Formidable", "征招强力船舰", "Ustanów hegemonię"],
["Hoard Raw Materials", "Hoard Raw Materials", "Hoard Raw Materials", "Hoard Raw Materials", "Hoard Raw Materials", "地大物博", "Ustanów perymeter"],
["Learn Secrets of the Cosmos", "Apprenez les secrets du Cosmos", "Ergründe die Geheimnisse des Kosmos", "Познайте тайны космоса", "Desvelar los Secretos del Cosmos", "学习宇宙的奥秘", "Walcz precyzyjnie"],
["Monopolize Production", "Monopolisez la production", "Errichte ein Monopol", "Монополизируйте производство", "Monopolizar la Producción", "产品垄断", "Wzmocnij więzi"],
["Mechanize the Army", "Mechanize the Army", "Mechanize the Army", "Mechanize the Army", "Mechanize the Army", "机械化军队", "Zaciemnij niebo"],
["Make an Example of Their World", "Faites de leur monde un exemple", "Statuiere ein Exempel", "Преподайте урок", "Dar Ejemplo con su Planeta", "杀一儆百", "Zademonstruj potęgę"],
["Master the Laws of Physics", "Maîtrisez les lois de la physique", "Beherrsche die Naturgesetze", "Изучите законы физики", "Dominar la Leyes de la Física", "物理法则大师", "Zagróź wrogom"],
["Mine Rare Metals", "Extrayez des métaux rares", "Schürfe seltene Metalle", "Добывайте редкие металлы", "Extraer Metales Poco Comunes", "开采稀有金属", "Zawrzyj przymierze"],
["Occupy the Seat of the Empire", "Occupez le siege de l'empire", "Besetze die Thronwelt", "Захватите сердце Империи", "Ocupar la Capital Imperial", "占领帝国王座", "Załóż siatkę szpiegowską"],
["Occupy Borders", "Occupy Borders", "Occupy Borders", "Occupy Borders", "Occupy Borders", "占领边界", "Zbuduj potężną flotę"],
["Produce En Masse", "Produce En Masse", "Produce En Masse", "Produce En Masse", "Produce En Masse", "批量生产", "Zdobądź symbol"],
["Prove Endurance", "Prove Endurance", "Prove Endurance", "Prove Endurance", "Prove Endurance", "坚持到底", "Zdradź przyjaciela"],
["Seize An Icon", "Seize An Icon", "Seize An Icon", "Seize An Icon", "Seize An Icon", "抢占圣地", "Zmagazynuj rzadkie surowce"],
["Spark a Rebellion", "Déclenchez une rébellion", "Zettele eine Rebellion an", "Поднимите восстание", "Iniciar una Rebelión", "革命的火苗", "Zmechanizuj armię"],
["Stake your Claim", "Stake your Claim", "Stake your Claim", "Stake your Claim", "Stake your Claim", "兵临城下", "Zmonopolizuj produkcję"],
["Strengthen Bonds", "Strengthen Bonds", "Strengthen Bonds", "Strengthen Bonds", "Strengthen Bonds", "加强债券", "Zniszcz ich najpotężniejszy okręt"],
["Threaten Enemies", "Menacez vos ennemies", "Bedränge den Feind", "Угрожайте врагам", "Intimidar a tus Enemigos", "恐吓敌人", "Zniszcz heretyckie dzieła"],
["Turn Their Fleets to Dust", "Réduisez leurs flottes en cendres", "Vernichte Ihre Flotten", "Обратите флот в пыль", "Reducir sus Flotas a Polvo", "化敌船为齑粉", "Zostań męczennikiem"],
["Unveil Flagship", "Révélez un Vaisseau Amiral", "Enthülle dein Flagschiff", "Покажите флагман в деле", "Revelar Nave Insignia", "旗舰开幕式", "Zostań strażnikiem bramy"],
];

var gStrategy = [
["Leadership", "Gouvern.", "Führungsstärke", "Лидерство", "Liderazgo", "领导力", "Przywództwo"],
["Diplomacy", "Diplomacie", "Diplomatie", "Дипломатия", "Diplomacia", "外交", "Dyplomacja"],
["Politics", "Politique", "Politik", "Политика", "Política", "政治", "Polityka"],
["Construction", "Construction", "Infrastruktur", "Строительство", "Construcción", "建设", "Budowa"],
["Trade", "Commerce", "Handel", "Торговля", "Comercio", "贸易", "Handel"],
["Warfare", "Guerre", "Kriegsführung", "Война", "Guerra", "战争", "Wojna"],
["Technology", "Techno.", "Technologie", "Исследования", "Tecnología", "科技", "Technologia"],
["Imperial", "Intrigue", "Imperium", "Экспансия", "Imperialismo", "皇权", "Imperium"],
];

const FACTION_NAME_EN = 0;
const FACTION_NAME_FR = 1;
const FACTION_NAME_DE = 2;
const FACTION_NAME_RU = 3;
const FACTION_NAME_SP = 4;
const FACTION_NAME_CN = 5;
const FACTION_NAME_PL = 6;
const FACTION_ICON = 7;
const FACTION_FACE = 8;
const FACTION_SHORTNAME = 9;

var FACTION_NAME = FACTION_NAME_EN + gLang;

const IMG_FOLDER = "ti4/img/";
var factionList = [
["Arborec", "Arborec", "Arborec", "Арбореки", "Los Arborec", "昂博瑞克", "Arborekowie", IMG_FOLDER + "arborec.png", "", "Arborec"],
["Barony of Letnev", "Baronnie de Letnev", "Baronat von Letnev", "Баронат Летнев", "La Baronía de Letnev", "蓝特涅夫领地", "Baronia Letnev", IMG_FOLDER + "letnev.png", "", "Letnev"],
["Clan of Saar", "Clan de Saar", "Clan der Zaar", "Клан Сааров", "El Clan de Saar", "萨尔氏族", "Klan Saar", IMG_FOLDER + "saar.png", "", "Saar"],
["Embers of Muaat", "Braises de Muaat", "Glut von Muaat", "Тлеющие с Муаата", "Las Ascuas de Muaat", "穆亚特灰烬", "Żagwie Muaat", IMG_FOLDER + "muat.png", "", "Muaat"],
["Emirates of Hacan", "Emirats de Hacan", "Emirate von Hacan", "Хаканские Эмираты", "Los Emiratos de Hacan", "哈肯酋长国", "Emiraty Hakanów", IMG_FOLDER + "hacan.png", "", "Hacan"],
["Federation of Sol", "Fédération de Sol", "Sol Föderation", "Федерация Сол", "La Federación de Sol", "太阳系联邦", "Federacja Sol", IMG_FOLDER + "sol.png", "", "Sol"],
["Ghosts of Creuss", "Fantômes de Creuss", "Geister von Creuss", "Призраки Креусса", "Los Fantasmas de Creuss", "克洛斯幽灵", "Widma z Creussa", IMG_FOLDER + "creuss.png", "", "Creuss"],
["L1z1x Mindnet", "Réseau d'Esprit L1z1x", "L1Z1X Gedankennetz", "Психосеть Л1З1КС", "La Red Mental L1z1x", "拉萨斯智慧体", "Współjaźń L1z1x", IMG_FOLDER + "l1z1x.png", "", "L1z1x"],
["Mentak Coalition", "Coalition Mentak", "Mentak Koalition", "Коалиция Ментака", "La Coalición Mentak", "曼塔克联盟", "Koalicja Mentaka", IMG_FOLDER + "mentak.png", "", "Mentak"],
["Naalu Collective", "Collectif Naalu", "Naalo-Kollektiv", "Клубок Наалу", "El Colectivo Naalu", "纳鲁集团", "Kolektyw Naalu", IMG_FOLDER + "naalu.png", "", "Naalu"],
["Nekro Virus", "Virus Nekro", "Nekro-Virus", "Некровирус", "El Virus Nekro", "奈克洛病毒", "Nekrowirus", IMG_FOLDER + "nekro.png", "", "Nekro"],
["Sardak Norr", "Sardakk N'orr", "Sardakk N'orr", "Сардак Н’орр", "Los Sardak Norr", "萨达克诺里", "Sardakk N'orr", IMG_FOLDER + "sardak.png", "", "Sardak"],
["Universities of Jol-Nar", "Universités de Jol-Nar", "Universitiät von Jol-Nar", "Жол-Нарские университеты", "Las Universidades de Jol-Nar", "乔纳学盟", "Uniwersytety Jol-Nar", IMG_FOLDER + "jol.png", "", "Jol"],
["Winnu", "Winnu", "Winnu", "Винну", "Los Winnu", "维努人", "Winnu", IMG_FOLDER + "winnu.png", "", "Winnu"],
["Xxcha Kingdoms", "Royaume Xxcha", "Xxcha Königreich", "Королевство Ззча", "El Reino de Xxcha", "艾克私恰王国", "Królestwo Xxcha", IMG_FOLDER + "xxcha.png", "", "Xxcha"],
["Yin Brotherhood", "Fraternité de Yin", "Yin Brunderschaft", "Братство Инь", "La Hermandad del Yin", "伊恩兄弟会", "Bractwo Yin", IMG_FOLDER + "yin.png", "", "Yin"],
["Yssaril Tribes", "Tribus Yssaril", "Yssaril-Stämme", "Племена Иссарилов", "Las Tribus de Yssaril", "伊萨利尔部落", "Plemiona Yssaril", IMG_FOLDER + "yssrail.png", "", "Yssaril"],
["Argent Flight", "Nuée Argentée", "Argent Flight", "Argent Flight", "La Bandada Argéntea", "银色飞翼", "Srebrny klucz", IMG_FOLDER + "argent.png", "", "Argent"],
["Empyrean", "Empyréens", "Empyrean", "Empyrean", "Los Empíreos", "最高天", "Niebianie", IMG_FOLDER + "empyrean.png", "", "Empyrean"],
["Mahact Gene-Sorcerers", "Sorciers Mahact", "Mahact Gene-Sorcerers", "Mahact Gene-Sorcerers", "Los Genechiceros de Mahact", "玛哈克特-基因术士", "Geno-Czarownicy Mahactów", IMG_FOLDER + "mahact.png", "", "Mahact"],
["Naaz-Rokha Alliance", "Alliance Naaz-Rokha", "Naaz-Rokha Alliance", "Naaz-Rokha Alliance", "La Alianza Naaz-Rokha", "纳兹-洛克哈联盟", "Sojusz Naaz-Rokha", IMG_FOLDER + "naaz.png", "", "Naaz"],
["The Nomad", "Le Nomade", "The Nomad", "The Nomad", "Los Nomadas", "游牧民/流浪者", "Nomada", IMG_FOLDER + "nomad.png", "", "Nomad"],
["Titans of Ul", "Titans d'Ul", "Titans of Ul", "Titans of Ul", "Los Titanes de Ul", "提坦复苏/泰坦", "Tytani UL", IMG_FOLDER + "titans.png", "", "Titans"],
["Vuil'Raith Cabal", "Cabale de Vuil'Raith", "Vuil'Raith Cabal", "Vuil'Raith Cabal", "La Cábala de Vuil'Raith", "乌尔莱斯之祸/鳄鱼", "Koteria Vuil'Raith", IMG_FOLDER + "vuil.png", "", "Vuil"],
["The Council Keleres", "Le Conseil Keleres", "The Council Keleres", "The Council Keleres", "The Council Keleres", "克勒雷斯理事会", "The Council Keleres", IMG_FOLDER + "keleres.png", "", "Keleres"],
];

const HACAN_FACTION = 4;
const NAALU_FACTION = 9;
const NEKRO_FACTION = 10;
const WINNU_FACTION = 13;
const POK_FACTION = 17;
const CODEX_FACTION = 24;


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
["Proposal A", "Proposition A", "Vorschlag A", "Предложение A", "Propuesta A" ,"提案A", "Propozycja A"],
["Proposal B", "Proposition B", "Vorschlag B", "Предложение B", "Propuesta B" ,"提案B", "Propozycja B"],
["Proposal C", "Proposition B", "Vorschlag C", "Предложение C", "Propuesta C" ,"提案C", "Propozycja C"],
["Proposal D", "Proposition D", "Vorschlag D", "Предложение D", "Propuesta D" ,"提案D", "Propozycja D"],
["Proposal E", "Proposition E", "Vorschlag E", "Предложение E", "Propuesta E" ,"提案E", "Propozycja E"],
["Proposal F", "Proposition F", "Vorschlag F", "Предложение F", "Propuesta F" ,"提案F", "Propozycja F"],
["Proposal G", "Proposition G", "Vorschlag G", "Предложение G", "Propuesta G" ,"提案G", "Propozycja G"],
["Proposal H", "Proposition H", "Vorschlag H", "Предложение H", "Propuesta H" ,"提案H", "Propozycja H"],
];
