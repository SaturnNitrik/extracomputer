/* Author: Stephane Demots */
const L_EN = 0;
const L_FR = 1;
const L_DE = 2;

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
const W_ADD_PROPOSAL = 21;
const W_CAST_VOTE = 22;
const W_ABSTAIN = 23;
const W_PHASE_END = 24;
const W_CONCLUSION = 25;
const W_CHOOSEACTION = 26;
const W_RESOLVEACTIONS = 27;

var gWord = [
  ["Set player", "", "Spieler Auswahl"],
  [" strategy", "", " Strategie"],
  ["Pass", "Passer", "Passen"],
  [", select your Strategy", ", choisir une Stratégie", ", strategiekarte wählen"],
  ["Select 2 strategies to swap", "Choisir 2 strategies à inverser", "2 Strategien zum Tauschen auswählen"],
  ["The Custodians left Mecatol Rex", "Les Gardiens ont quitté Mecatol Rex", "Die Hüter haben Mecatol Rex verlassen"],
  ["The Custodians are still guarding Mecatol Rex", "Les Gardiens sont toujours sur Mecatol Rex", "Die Hüter bewachen Mecatol Rex noch"],
  ["Galaxy Phase", "Phase Galaxie", "Galaxy-Phase"],
  ["Strategy Phase", "Phase Stratégie", "Strategie-Phase"],
  ["Action Phase", "Phase d'Action", "Aktions-Phase"],
  ["Status Phase", "Phase de Status", "Status-Phase"],
  ["Agenda Phase", "Phase de projet", "Agenda-Phase"],
  [", perform your Action", ", resoudre votre Action", ", führe deine Action aus"],
  ["End of the vote", "Fin du vote", "Ende der Abstimmung"],
  ["First Agenda", "Premier projet", "Erste Agenda"],
  ["Second Agenda", "Second projet", "Zweite Agenda"],
  ["For", "Pour", "Dafür"],
  ["Against", "Contre", "Dagegen"],
  ["Add Planet", "Ajouter Planète", "Füge Planeten hinzu"],
  ["Add Law", "Ajouter Loi", "Füge Gesetz hinzu"],
  ["Add Objective", "Ajouter Objectif", "GER"],
  ["Add Proposal", "Ajouter Proposition", "GER"],
  [", cast your vote", " doit voter", ", gebe deine Stimme ab"],
  ["Abstain", "Abstention", "Enthalten"],
  ["Game ends", "Fin de partie", "Spiel zu Ende"],
  ["A new age begins...", "Un nouvel âge commence...", "Ein neues Zeitalter beginnt"],
  ["Choosing action", "Choix d'action", "Wähle Aktion"],
  ["Resolving action(s)...", "Résolution d'action(s)...", "Aktionen ausführen"],
  ["", "", ""],
];