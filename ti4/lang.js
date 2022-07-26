/* Author: Stephane Demots */
const L_EN = 0;
const L_FR = 1;
const L_DE = 2;
const L_RU = 3;
const L_SP = 4;
const L_CN = 5;

const W_SET_PLAYER = 0;
const W_STRATEGY = 1;
const W_PASS = 2;
const W_SELECT_STRATEGY = 3;
const W_SWAP_STRATEGIES = 4;
const W_CUSTODIANS_LEFT = 5;
const W_CUSTODIANS_STILL = 6;
const W_PHASE_GALAXY = 7;
const W_PHASE_STRATEGY = 8;
const W_PHASE_ACTION = 9;
const W_PHASE_STATUS = 10;
const W_PHASE_AGENDA = 11;
const W_PERFORM_ACTION = 12;
const W_END_VOTE = 13;
const W_FIRST_AGENDA = 14;
const W_SECOND_AGENDA= 15;
const W_FOR = 16;
const W_AGAINST = 17;
const W_ADD_PLANET = 18;
const W_ADD_LAW = 19;
const W_ADD_OBJECTIVE = 20;
const W_ADD_STRATEGY = 21;
const W_ADD_PROPOSAL = 22;
const W_CAST_VOTE = 23;
const W_ABSTAIN = 24;
const W_PHASE_END = 25;
const W_CONCLUSION = 26;
const W_CHOOSEACTION = 27;
const W_RESOLVEACTIONS = 28;

var gWord = [
    ["Set player", "", "Spieler Auswahl", "Выберите игрока", "Seleccione Jugador", "起始玩家"],
    [" strategy", "", " Strategie", "стратегия", "Estrategia" ,"策略"],
    ["Pass", "Passer", "Passen", "Пас", "Pasar" ,"跳过"],
    [", select your Strategy", ", choisir une Stratégie", ", strategiekarte wählen", ", выберите карту стратегии", ", Selecciona tu Estrategia" ,"选择策略卡"],
    ["Select 2 strategies to swap", "Choisir 2 strategies à inverser", "2 Strategien zum Tauschen auswählen", "Поменяйте местами две карты стратегии", "Elige 2 Estrategias para intercambiar" ,"选择两个策略卡进行交换"],
    ["The Custodians left Mecatol Rex", "Les Gardiens ont quitté Mecatol Rex", "Die Hüter haben Mecatol Rex verlassen", "Хранители покинули Мекатол Рекс", "Los Custodios han dejado Mecatol Rex" ,"托管人标记还在麦卡托雷克斯"],
    ["The Custodians are still guarding Mecatol Rex", "Les Gardiens sont toujours sur Mecatol Rex", "Die Hüter bewachen Mecatol Rex noch", "Хранители все еще защищают Мекатол Рекс", "Los Custodios siguen cuidando Mecatol Rex" ,"托管人标记已从麦卡托雷克斯移除"],
    ["Galaxy Phase", "Phase Galaxie", "Galaxy-Phase", "Галактическая фаза", "Fase de la Galaxia" ,"設置星系阶段"],
    ["Strategy Phase", "Phase Stratégie", "Strategie-Phase", "Фаза стратегии", "Fase de Estrategia" ,"策略阶段"],
    ["Action Phase", "Phase d'Action", "Aktions-Phase", "Фаза действий", "Fase de  Acción" ,"行动阶段"],
    ["Status Phase", "Phase de Status", "Status-Phase", "Фаза статуса", "Fase de Estado" ,"势态阶段"],
    ["Agenda Phase", "Phase de projet", "Agenda-Phase", "Фаза политики", "Fase de Consejo Galáctico" ,"议程阶段"],
    [", perform your Action", ", resoudre votre Action", ", führe deine Action aus", "выполните ваше дейсвтие", "Realiza tu Acción" ,"开始行动"],
    ["End of the vote", "Fin du vote", "Ende der Abstimmung", "Закончить голосование", "Fin de la Votación" ,"结束投票"],
    ["First Agenda", "Premier projet", "Erste Agenda", "Первая карта политики", "Primera Carta del Consejo Galáctico" ,"第一个议程"],
    ["Second Agenda", "Second projet", "Zweite Agenda", "Вторая карта политики", "Segunda Carta del Consejo Galáctico" ,"第二个议程"],
    ["For", "Pour", "Dafür", "За", "A Favor" ,"赞同"],
    ["Against", "Contre", "Dagegen", "Против", "En Contra" ,"反对"],
    ["Add Planet", "Ajouter Planète", "Füge Planeten hinzu", "Добавить планету", "Añadir Planeta" ,"增加星球"],
    ["Add Law", "Ajouter Loi", "Füge Gesetz hinzu", "Добавить закон", "Añadir Ley" ,"增加法律"],
    ["Add Objective", "Ajouter Objectif", "Add Objective", "Добавить цель", "Añadir Objetivo" ,"增加目标"],
    ["Add Strategy", "Ajouter Strategie", "Add Strategy", "Add Strategy", "Add Strategy" ,"增加策略"],
    ["Add Proposal", "Ajouter Proposition", "Add Proposal", "Добавить предложение", "Añadir Propuesta" ,"增加提案"],
    [", cast your vote", " doit voter", ", gebe deine Stimme ab", "проголосуйте", "Haz tu Voto" ,"请投票"],
    ["Abstain", "Abstention", "Enthalten", "Воздержаться", "Abstención" ,"Abstain"],
    ["Game ends", "Fin de partie", "Spiel zu Ende", "Конец игры", "Fin del Juego" ,"游戏结束"],
    ["A new age begins...", "Un nouvel âge commence...", "Ein neues Zeitalter beginnt", "Начало новой эпохи...", "Una Nueva Era Comienza..." ,"新纪元开始..."],
    ["Choosing action", "Choix d'action", "Wähle Aktion", "Выбор действия", "Elige tu Acción" ,"选择行动"],
    ["Resolving action(s)...", "Résolution d'action(s)...", "Aktionen ausführen", "Выполнение действия...", "Resolviendo Acción(es)..." ,"请行动..."],
  ["", "", ""],
];
