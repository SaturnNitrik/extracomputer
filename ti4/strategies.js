/* Author: Stephane Demots */
// Configuration values

// global variables
var gActivePlayer = 0;
var gPlayerChooseCount = 0;

var gTurnCounter = 0;
var gRoundCounter = 0;
var gNaaluStrategy = 255;
var gTelephaticPlayer = 255;
var gbEndOfStrategyPhase = false;

const STRATEGY_DISABLED = 0;
const STRATEGY_AVAILABLE = 1;
const STRATEGY_PLAYED = 2;
const STRATEGY_PASSED = 3;
const STRATEGY_SECONDPICK = 100;
var strategyList = [
 ["idNaaluFr", "idNaaluFr", "idNaaluFr", "idNaaluFr", "idNaaluFr", "idNaaluFr", 255, STRATEGY_DISABLED, "red", 0],
 ["Leadership", "Gouvern.", "Führungsstärke", "Лидерство", "Liderazgo", "领导力",  255, STRATEGY_AVAILABLE, "red", 0],
 ["Diplomacy", "Diplomacie", "Diplomatie", "Дипломатия", "Diplomacia", "外交",  255, STRATEGY_AVAILABLE, "orange", 0],
 ["Politics", "Politique", "Politik", "Политика", "Política", "政治",  255, STRATEGY_AVAILABLE, "yellow", 0],
 ["Construct.", "Construct.", "Infrastruktur", "Строительство", "Construcción", "建设",  255, STRATEGY_AVAILABLE, "green", 0],
 ["Trade", "Commerce", "Handel", "Торговля", "Comercio", "贸易",  255, STRATEGY_AVAILABLE, "Cyan", 0],
 ["Warfare", "Guerre", "Kriegsführung", "Война", "Guerra", "战争",  255, STRATEGY_AVAILABLE, "dodgerBlue", 0],
 ["Technology", "Techno.", "Technologie", "Исследования", "Tecnología", "科技",  255, STRATEGY_AVAILABLE, "blue", 0],
 ["Imperial", "Intrigue", "Imperium", "Экспансия", "Imperialismo", "皇权",  255, STRATEGY_AVAILABLE, "purple", 0]
];
const STRATEGY_NAME_EN = 0;
const STRATEGY_NAME_FR = 1;
const STRATEGY_NAME_GE = 2;
const STRATEGY_NAME_RU = 3;
const STRATEGY_NAME_SP = 4;
const STRATEGY_NAME_CN = 5;
var   STRATEGY_NAME =  0;
const STRATEGY_PLAYER = 6;
const STRATEGY_STATUS = 7;
const STRATEGY_COLOR = 8;
const STRATEGY_TG = 9;

var gActivePhase = 255;
const PHASE_GALAXY = 1;
const PHASE_STRATEGY = 2;
const PHASE_ACTION = 3;
const PHASE_STATUS = 4;
const PHASE_AGENDA = 5;
const PHASE_INIT = 0;
const PHASE_END = 10; //10 to use first digit as memory

var gCurrentAction = 0;
const ACTION_STRAT_1 = 1;
const ACTION_STRAT_2 = 2;
const ACTION_STRAT_OTHER = 3;



// Get the modal
var modal = document.getElementById('myModal');

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    /*if (event.target == modal) {
        modal.style.display = "none";
    }*/
}

function loadTurnOrderPage()
{
    var i, colorIdx, cln, cln2, varSetSpeaker;

    STRATEGY_NAME = STRATEGY_NAME_EN + gLang;

    /* Hide Naalu*/
    document.getElementById("idNaaluFr").style.display = "none";
    document.getElementById("idNaaluFr").style.backgroundImage = 'url(ti4/img/naalu.png)';
    document.getElementById("idStrategyDone").style.display = "none";

    /* Load strategy display */
    var clStrategyFrame = document.getElementsByClassName("classStrategyFrame");
    var clStrategyNameText = document.getElementsByClassName("classStrategyNameText");
    var clStrategy2NameText = document.getElementsByClassName("classStrategy2NameText");
    var clStrategyRankText = document.getElementsByClassName("classStrategyRankText");
    for(i=0; i < clStrategyFrame.length; i++)
    {
        clStrategyFrame[i].setAttribute("id", strategyList[i][STRATEGY_NAME]);
        clStrategyFrame[i].style.borderColor=strategyList[i][STRATEGY_COLOR];
        clStrategyNameText[i].textContent = strategyList[i][STRATEGY_NAME];
        clStrategyRankText[i].textContent = i;
        clStrategy2NameText[i].textContent = "";
    }

    /* Populate Speaker and Telepathic */
    var clSetPlayerFrame = document.getElementById("idGameTable").getElementsByClassName("classSetPlayerFrame");
    var clPlayerRaceName = document.getElementById("idGameTable").getElementsByClassName("classPlayerRaceName");
    for(i=0; i < clSetPlayerFrame.length; i++)
    {
        cln = clSetPlayerFrame[i].cloneNode(true);
        cln2 = clSetPlayerFrame[i].cloneNode(true);
        colorIdx = fctGetColorIdx(clSetPlayerFrame[i]);
        cln.className = "classPlayerFrame";
        cln2.className = "classPlayerFrame";
        varSetSpeaker = "fctPickPlayer(\"" + clPlayerRaceName[i].textContent + "\")";
        cln.setAttribute( "onClick", varSetSpeaker);
        cln2.setAttribute( "onClick", varSetSpeaker);
        if(clPlayerRaceName[i].textContent == "Set player")
        {
            cln.style.display ="none";
            cln2.style.display ="none";
        }
        else
        {
            w3AddClass(cln, playerColorList[colorIdx]);
            w3AddClass(cln2, playerColorList[colorIdx]);
            cln.style.display ="block";
            cln2.style.display ="block";
        }
        document.getElementById("idSpeakerPlayers").appendChild(cln);
        document.getElementById("idTelephaticPlayers").appendChild(cln2);
    }
}

function fctNewTurn()
{
    gTurnCounter++;
    gRoundCounter = 1;
    fctSetPhase(PHASE_STRATEGY);

    /* Open Speaker window on First turn */
    if(gTurnCounter == 1)
        fctShowSpeaker(1);
    else
        fctShowSpeaker(2);

}

function fctSetPhase(p)
{
    var t = "Round " + gTurnCounter;
    var ph;
    switch(p)
    {
        case PHASE_GALAXY: ph=gWord[W_PHASE_GALAXY][gLang]; break;
        case PHASE_STRATEGY: ph=gWord[W_PHASE_STRATEGY][gLang]; break;
        case PHASE_ACTION: ph=gWord[W_PHASE_ACTION][gLang]; break;
        case PHASE_STATUS: ph=gWord[W_PHASE_STATUS][gLang]; break;
        case PHASE_AGENDA: ph=gWord[W_PHASE_AGENDA][gLang]; break;
        case PHASE_END: t=gWord[W_PHASE_END][gLang]; ph=gWord[W_CONCLUSION][gLang]; break;
    }

    document.getElementById("idPhaseFrame").textContent = t + " - " + ph;
    document.getElementById("idTransitionTurn").textContent = t;
    document.getElementById("idTransitionPhase").textContent = ph;

    /* Show then hide Transition */
    document.getElementById("idModalTransition").style.display = "block";
    setTimeout(function(){ document.getElementById("idModalTransition").style.display = "none"; }, 2000);

    if(p != PHASE_END)
        gActivePhase = p;
    else
        gActivePhase += p;

    fctSaveItem("gActivePhase", gActivePhase);

    fctClock('on');
}

function fctGetPhase()
{
    return gActivePhase;
}

function fctShowSpeaker(w)
{
    /* Open Speaker window */
    if( (w==1) || (gSpeakerPlayerIdx ==255))
        document.getElementById("idSetSpeaker").style.display = "block";
    /* Only show the token */
    else
        fctCloseSpeaker();
}


function fctRandomSpeaker()
{
    gSpeakerPlayerIdx = (Math.floor(Math.random() * gSetupNbPlayer));

    fctCloseSpeaker();
}

function fctPickPlayer(Faction)
{
    var i,p;
    for(i=0; i < gSetupNbPlayer; i++)
        if( getPlayerFaction(i,FACTION_NAME) == Faction)
            p = i;

    /* Speaker windows is opened */
    if(document.getElementById("idSetSpeaker").style.display == "block")
    {
        gSpeakerPlayerIdx = p;
        fctCloseSpeaker();
    }
    /* Telepathic */
    else
    {
        fctSetTelephatic(p);
    }
}

function fctCloseSpeaker()
{
    var i;

    if( fctGetPhase() == PHASE_STRATEGY) fctInitStrategyPhase();
    else if(fctGetPhase() == PHASE_AGENDA) fctCallPlayerVote();

    /* update token */
    document.getElementById("idSpeakerOwner").textContent = getPlayerFaction(gSpeakerPlayerIdx,FACTION_SHORTNAME);
    document.getElementById("idSpeakerToken").style.display = "block";

    /* Update VP bar */
    for(i=0; i < gSetupNbPlayer;i++)
        document.getElementById("idVP" + ((gSpeakerPlayerIdx+i)%gSetupNbPlayer)).style.order = i*2*1;

    var clSpeakerBg = document.getElementsByClassName("clSpeakerBg");

    if( clSpeakerBg.length > 0)
        w3RemoveClass(document.getElementsByClassName("clSpeakerBg")[0], "clSpeakerBg");

    w3AddClass(document.getElementById("idVP" + gSpeakerPlayerIdx), "clSpeakerBg");

    /* Set top bar arrow order */
    var clArrow2 = document.getElementsByClassName("clArrow2");
    for(i=0; i < clArrow2.length; i++)
        if(i < (gSetupNbPlayer-1))
        {
            clArrow2[i].style.order = (i*2)+1;
            clArrow2[i].style.display = "inline";
        }
        else
            clArrow2[i].style.display = "none";

    /* Hide speaker window */
    document.getElementById("idSetSpeaker").style.display = "none";
}

function fctLockSpeaker()
{
    document.getElementById("idSpeakerToken").style.display = "none";

    if(gPreviousSpeaker != gSpeakerPlayerIdx)
        gPlayerData[gSpeakerPlayerIdx][PLAYER_NBSPEAKER]++;
    gPreviousSpeaker = gSpeakerPlayerIdx;
}

function fctInitStrategyPhase()
{
    var i;

    gActivePlayer = gSpeakerPlayerIdx;
    gPlayerChooseCount = 0;
    gNaaluStrategy = 255;
    gbEndOfStrategyPhase = false;

    document.getElementById("idPlayerToChoose").textContent = getPlayerFaction(gActivePlayer,FACTION_NAME) + gWord[W_SELECT_STRATEGY][gLang];

    var classStrategyFrame = document.getElementsByClassName("classStrategyFrame");
    var classStrategyNameText = document.getElementsByClassName("classStrategyNameText");
    var classStrategy2NameText = document.getElementsByClassName("classStrategy2NameText");
    var classFactionIcon = document.getElementsByClassName("classFactionIcon");
    var clTrade = document.getElementsByClassName("clTrade");
    var clTradeNb = document.getElementsByClassName("clTradeNb");
    for( i=0; i< classStrategyFrame.length; i++)
    {
        classFactionIcon[i].src = "";
        classStrategyFrame[i].style.borderColor=strategyList[i][STRATEGY_COLOR];
        classStrategyNameText[i].textContent = strategyList[i][STRATEGY_NAME];
        classStrategyNameText[i].style.backgroundColor = "transparent";
        classStrategy2NameText[i].style.backgroundColor = "transparent";
        classStrategy2NameText[i].textContent = "";

        if(strategyList[i][STRATEGY_TG] > 0)
        {
            clTradeNb[i].textContent = "+" + strategyList[i][STRATEGY_TG];
            clTrade[i].className = clTrade[i].className.replace("clOpacity0", "clOpacity1");
        }
        else
            clTrade[i].className = clTrade[i].className.replace("clOpacity1", "clOpacity0");
    }

    var clTrade = document.getElementsByClassName("clTrade");
    for(i=0; i < clTrade.length; i++)
        clTrade[i].style.display = "";

    /* Reset links */
    var clLink = document.getElementsByClassName("clLink");
    for(i=0; i < clLink.length; i++)
        clLink[i].style.display = "";

    /* Hide action bar */
    document.getElementById("idPlayerFocus").style.display = "none";

    /* Hide buttons */
    var StratButton = document.getElementsByClassName("StratButton");
    for(i=0; i < StratButton.length; i++)
    {
        StratButton[i].style.display = "none";
    }

    /* Hide all effects */
    var clCard = document.getElementsByClassName("clCard");
    for( i=1; i<clCard.length ; i++)
    {
        clCard[i].style.display = "none";
    }

    /* reset Naalu */
    document.getElementById("idNaaluFr").style.display = "none";
    document.getElementById("idNaaluFactionChooser").textContent = factionList[NAALU_FACTION][FACTION_NAME] ;
    strategyList[0][STRATEGY_STATUS] = STRATEGY_DISABLED;

    for( i=0; i<gPlayerData.length ; i++)
    {
        switch((gPlayerData[i][PLAYER_FACTION]*1))
        {
            case HACAN_FACTION: document.getElementById("idQuantumDatahubNodeCard").style.display = "initial"; break;
            case NAALU_FACTION: document.getElementById("idTelepathicCard").style.display = "initial"; break;
            case WINNU_FACTION: document.getElementById("idAcquiescenceCard").style.display = "initial"; break;
        }
    }

    // Reset player timer
    gCurrentPlayerTimer = 0;

    fctSaveGame();
    flexFont();
}

// Click in Strategy Frame
function fctStrategyFrame (evt)
{
    var i;

    /* Strategy not selected */
    if( (evt.className == "classStrategyFrame") && (gbEndOfStrategyPhase == false))
    {
        fctLockSpeaker();

        /* Show faction name and icon */
        fctAssignStrategy(evt.cellIndex, gActivePlayer)

        /* Set class name */
        evt.className += "Selected";

        gPlayerChooseCount++;

        gPlayerData[gActivePlayer][PLAYER_CLOCK] += gCurrentPlayerTimer;
        gCurrentPlayerTimer = 0;

        if (
            /* All players got 1 strategy (5 or more players) */
           ((gPlayerChooseCount >= gSetupNbPlayer) && (gSetupNbPlayer > 4))
           || /* OR, At 4 or less players, each player selected 2 strategy */
           ( (gPlayerChooseCount >= (gSetupNbPlayer*2)) && (gSetupNbPlayer <= 4)) )

        {
            /* Show End of phase button */
            var clStratEndButton = document.getElementsByClassName("clStratEndButton");
            for(i=0; i< clStratEndButton.length; i++)
                clStratEndButton[i].style.display = "inline";

            gTelephaticPlayer = 255;
            gbEndOfStrategyPhase = true;

            flexFont();
        }
        /* Continue */
        else
        {
            gActivePlayer++;
            /* Next player */
            if(gActivePlayer >= gSetupNbPlayer)
                gActivePlayer = 0;

            /* Update instruction */
            document.getElementById("idPlayerToChoose").textContent = getPlayerFaction(gActivePlayer,FACTION_NAME) + gWord[W_SELECT_STRATEGY][gLang];
        }
    }
    /* Swap effect */
    else if ( (evt.classList.contains("clSwap")) && (!evt.classList.contains("clSwapSelect")))
    {
        w3AddClass(evt, "clSwapSelect");

        var clSwapSelect = document.getElementsByClassName("clSwapSelect");

        if(clSwapSelect.length == 2)
        {
            var itm = document.getElementsByClassName("clSwap");
            var StratA = 255, StratB = 255;

            /* Get strategies */
            for(i=0; i < strategyList.length; i++)
                if(itm[i].classList.contains("clSwapSelect"))
                    if(StratA == 255) StratA = i;
                    else              StratB = i

            /* Swap the strategy owners */
            var PlayerA = strategyList[StratA][STRATEGY_PLAYER];
            var PlayerB = strategyList[StratB][STRATEGY_PLAYER];

            fctAssignStrategy(StratA, PlayerB);
            fctAssignStrategy(StratB, PlayerA);

            w3RemoveClass(itm[StratA], "clSwapSelect");
            w3RemoveClass(itm[StratB], "clSwapSelect");
        }
    }
    else
    {
        /* nothing to do */
    }

    fctClock('on');
}

function fctAssignStrategy(i, p)
{
    var c = document.getElementsByClassName("classFactionChooser");
    c[i].textContent = getPlayerFaction(p,FACTION_NAME);

    var el = document.getElementsByClassName("classFactionIcon");
    el[i].src = factionList[gPlayerData[p][PLAYER_FACTION]][FACTION_ICON];

    if(getPlayerFaction(p,FACTION_NAME) == factionList[NAALU_FACTION][FACTION_NAME])
        gNaaluStrategy = i;

    /* Assign the player to the strategy */
    strategyList[i][STRATEGY_PLAYER] = p;
    strategyList[i][STRATEGY_STATUS] = STRATEGY_AVAILABLE;

    var tg = document.getElementsByClassName("clTrade");

    /* TG */
    if (strategyList[i][STRATEGY_TG] > 0)
    {
        tg[i].className = tg[i].className.replace("clOpacity1", "clOpacity0");
    }

    strategyList[i][STRATEGY_TG] = 0;
}

function fctEffectStrategyPhase(d)
{
    document.getElementById("idStrategyEnd").style.display = d;
}

function fctStrategyEndEffect(idx)
{
    document.getElementById("idStrategyEnd").style.display = "none";

    switch(idx)
    {
        case 0: fctSwapInit(); break;
        case 1: fctTelephaticInit(); break;
    }
}

function fctSwapInit()
{
    var i,el;

    document.getElementById("idPlayerToChoose").textContent = gWord[W_SWAP_STRATEGIES][gLang];
    document.getElementById("idStrategyDone").style.display = "block";
    fctDisplayAll("clStratEndButton", "");

    el = document.getElementsByClassName("classStrategyFrameSelected");

    for(i=0; i< el.length; i++)
        w3AddClass(el[i], "clSwap");

    el = document.getElementsByClassName("classStrategyFrame");

    for(i=0; i< el.length; i++)
    {
        w3AddClass(el[i], "clSwap");
        el[i].style.display = "none";
    }
}

function fctStrategyDone()
{
    var el;

    document.getElementById("idStrategyDone").style.display = "none";
    document.getElementById("idStrategyEnd").style.display = "block";

    el = document.getElementsByClassName("classStrategyFrameSelected");

    for(i=0; i< el.length; i++)
        w3RemoveClass(el[i], "clSwap");

    el = document.getElementsByClassName("classStrategyFrame");

    for(i=0; i< el.length; i++)
    {
        w3RemoveClass(el[i], "clSwap");
        w3RemoveClass(el[i], "clDisplayNone");
        el[i].style.display = "block";
    }

    fctDisplayAll("clStratEndButton", "inline");
}

function fctTelephaticInit()
{
    document.getElementById("idTelepathic").style.display = "block";
}

function fctSetTelephatic(p)
{
    for(var i=0; i< strategyList.length ; i++)
        if(strategyList[i][STRATEGY_PLAYER] == p)
            gNaaluStrategy = i;

    document.getElementById("idTelepathic").style.display = "none";
    document.getElementById("idStrategyEnd").style.display = "block";
}

function fctEndStrategyPhase()
{
    var el, tg, nb, i;

    document.getElementById("idStrategyEnd").style.display = "none";
    document.getElementById("idStrategyDone").style.display = "none";

    fctDisplayAll("clStratEndButton", "");

    /* TG update */
    tg = document.getElementsByClassName("clTrade");
    nb = document.getElementsByClassName("clTradeNb");

    for(i=1; i < strategyList.length; i++)
    {
        /* Strategies unpicked */
        if(strategyList[i][STRATEGY_PLAYER] == 255)
        {
            strategyList[i][STRATEGY_TG]++;
        }
    }

    /* Naalu are in game */
    if(gNaaluStrategy != 255)
    {
        fctNaaluChoice(gNaaluStrategy);
    }
    /* No Naalu, hide the frame */
    else
    {
        document.getElementById("idNaaluFr").style.display = "none";

    }
    fctInitActionPhase();
    FctNextPlayerAction();
}

function fctNaaluChoice(idx)
{
    strategyList[0][STRATEGY_STATUS] = STRATEGY_AVAILABLE;
    strategyList[0][STRATEGY_PLAYER] = strategyList[idx][STRATEGY_PLAYER];
    strategyList[0][STRATEGY_COLOR] = strategyList[idx][STRATEGY_COLOR];
    strategyList[0][STRATEGY_NAME] = strategyList[idx][STRATEGY_NAME];
    document.getElementById("idNaaluFr").style.display = "table-cell";
    document.getElementById("idNaaluFr").className += "Selected";
    document.getElementById("idNaaluStrategy").textContent = strategyList[idx][STRATEGY_NAME] ;
    document.getElementById("idNaaluFactionChooser").textContent = getPlayerFaction(strategyList[idx][STRATEGY_PLAYER],FACTION_NAME);
    document.getElementById("idNaaluFactionIcon").src = factionList[gPlayerData[strategyList[idx][STRATEGY_PLAYER]][PLAYER_FACTION]][FACTION_ICON];

    strategyList[idx][STRATEGY_STATUS] = STRATEGY_DISABLED;
    strategyList[idx][STRATEGY_PLAYER]= 255;

    var el = document.getElementById("idStrategyTable").getElementsByTagName("td");
    el[idx].className = el[idx].className.replace("Selected", "");
}

function fctRstStrategyPhase()
{
    var i;
    document.getElementById("idStrategyEnd").style.display = "none";
    document.getElementById("idStrategyDone").style.display = "none";

    fctRstFrames();
    fctInitStrategyPhase();
}

function fctInitActionPhase()
{
    var i,j;
    fctSetPhase(PHASE_ACTION);

    var clStrategyNameText = document.getElementsByClassName("classStrategyNameText");


    if(gSetupNbPlayer <= 4)
    {
        var classStrategy2NameText = document.getElementsByClassName("classStrategy2NameText");

        /* For each strategies, find twin */
        for(i=0; i < (strategyList.length-1); i++)
        {
            if(strategyList[i][STRATEGY_PLAYER] < 8)
            {
                /* find twin */
                for(j=(i+1); j < strategyList.length; j++)
                {
					if(strategyList[i][STRATEGY_PLAYER] == strategyList[j][STRATEGY_PLAYER] )
                    {
                        strategyList[j][STRATEGY_PLAYER] = STRATEGY_SECONDPICK + strategyList[i][STRATEGY_PLAYER];

                        /* revert classname */
                        var stratFrame=  document.getElementById(strategyList[j][STRATEGY_NAME]);
                        stratFrame.className = stratFrame.className.replace("Selected", "");

                        /* Add name to first strategy */
                        if(strategyList[j][STRATEGY_STATUS] == STRATEGY_AVAILABLE)
                            classStrategy2NameText[i].textContent = strategyList[j][STRATEGY_NAME];
                        else /* else for loading game */
                            classStrategy2NameText[i].textContent = "";
						classStrategy2NameText[i].style.backgroundColor = strategyList[j][STRATEGY_COLOR];
						clStrategyNameText[i].style.backgroundColor = strategyList[i][STRATEGY_COLOR];
                    }
                }
            }
        }
    }

    for(i=0; i < (strategyList.length); i++)
    {
        if(strategyList[i][STRATEGY_STATUS] == STRATEGY_AVAILABLE)
            clStrategyNameText[i].style.backgroundColor = strategyList[i][STRATEGY_COLOR];
        else /* else for loading game */
            clStrategyNameText[i].textContent = "";
    }

    var clLink = document.getElementsByClassName("clLink");
    for(i=0; i < strategyList.length; i++)
        if(strategyList[i][STRATEGY_PLAYER] < 8)
        {
            clLink[i].style.display = "inline";
            clLink[i].style.opacity = 0;
        }


    /* hide remaining Strategies */
    fctDisplayAll("classStrategyFrame", "none");

    /* Disable unused strats */
    for(i=0; i < strategyList.length; i++)
    {
        if(strategyList[i][STRATEGY_PLAYER] == 255)
            strategyList[i][STRATEGY_STATUS] = STRATEGY_DISABLED;
    }

    fctDisplayAll("clTrade", "none");

    /* Set display on selected strategies */
    for(i=0; i < strategyList.length; i++)
    {
        if(strategyList[i][STRATEGY_PLAYER] < 8)
        {
            if(i > 0)
                var StratFrame = document.getElementById(strategyList[i][STRATEGY_NAME]);
            else
                var StratFrame = document.getElementById("idNaaluFr");
            StratFrame.style.borderColor = playerColorList[gPlayerData[strategyList[i][STRATEGY_PLAYER]][PLAYER_COLOR]];
            StratFrame.className = StratFrame.className.replace("Selected", "Active");
        }
    }

    /* Show action bar */
    document.getElementById("idPlayerFocus").style.display = "";

    fctDisplayAll("StratButton", "");

    flexFont();

    /* Set first player */
    i=0;
    while(strategyList[i][STRATEGY_PLAYER] == 255)
        i++;
    gActivePlayer = i-1; /* because real player will be loaded on incoming call of FctNextPlayerAction */
    gCurrentPlayerTimer = 0;
}

function fctSetActionButtons(ply)
{
    var clActionButton = document.getElementsByClassName("clActionButton");
    for(i=0; i < clActionButton.length; i++)
    {
        clActionButton[i].disabled = false;
        clActionButton[i].classList.remove("clActionActive");
    }

    var secondStrat;
    var idActionS1 = document.getElementById("idActionS1");
    var idActionS2 = document.getElementById("idActionS2");
    var NbActiveStrat = 0;

    /* Set Strat 1 */
    idActionS1.textContent = strategyList[ply][STRATEGY_NAME];

    if(strategyList[ply][STRATEGY_STATUS] == STRATEGY_PLAYED)
        idActionS1.disabled = true;

    /* Set Strat 2 */
    if(gSetupNbPlayer <= 4)
    {
        /* find twin */
        secondStrat = fctGetSecondStrat(ply);

        /* Set button text */
        idActionS2.style.display = "";
        idActionS2.textContent = strategyList[secondStrat][STRATEGY_NAME];

        if(strategyList[secondStrat][STRATEGY_STATUS] == STRATEGY_PLAYED)
            idActionS2.disabled = true;
    }
    else
    {
        idActionS2.style.display = "none";
    }

    /* Set Pass */
    if( (idActionS1.disabled == false) || ((idActionS2.disabled == false) &&  (gSetupNbPlayer <= 4)))
    {
        document.getElementById("idActionPass").disabled = true;
    }

    /* Set End */
    document.getElementById("idActionEnd").disabled = true;

    fctActionTxt();
}

function fctActionTxt()
{
    var clActionActive = document.getElementsByClassName("clActionActive");
    var t = document.getElementById("idNbAction");

    if(clActionActive.length == 0)
    {
        t.textContent = gWord[W_CHOOSEACTION][gLang];
        document.getElementById("idSpin").style.display = "none";
    }
    else
    {
        t.textContent = gWord[W_RESOLVEACTIONS][gLang];
        document.getElementById("idSpin").style.display = "";
    }
}

function FctAction(el)
{
    var s1Played = false;
    var s2Played = false;

    el.classList.toggle("clActionActive");

    var idActionS1 = document.getElementById("idActionS1");
    var idActionS2 = document.getElementById("idActionS2");

    /* Get S1 adn S2 state */
    if( idActionS1.classList.contains("clActionActive") || idActionS1.disabled == true)
        s1Played = true;

    if( gSetupNbPlayer <= 4 )
    {
        if(idActionS2.classList.contains("clActionActive") || idActionS2.disabled == true)
            s2Played = true;
    }
    else
        s2Played = true

    /* Enable or not the Pass Action */
    if( s1Played && s2Played)
        document.getElementById("idActionPass").disabled = false;
    else
        document.getElementById("idActionPass").disabled = true;

    var clActionActive = document.getElementsByClassName("clActionActive");

    /* Enable or not the End button */
    if(clActionActive.length > 0)
        document.getElementById("idActionEnd").disabled = false;
    else
        document.getElementById("idActionEnd").disabled = true;

    /* Update nb actions */
    fctActionTxt();
}

function fctResolveAction()
{
    var i,a=0;
    var classStrategyNameText;

    i = gActivePlayer;

    /* In case speaker changed previously */
    fctLockSpeaker();

    /* Get all active action and resolve each */
    var clActionActive = document.getElementsByClassName("clActionActive");
    do
    {
        /* Strat action */
        if( (clActionActive[a].id == "idActionS1") || (clActionActive[a].id == "idActionS2"))
        {
            if (clActionActive[a].id == "idActionS1")
            {
                classStrategyNameText = document.getElementsByClassName("classStrategyNameText");
            }
            else if (clActionActive[a].id == "idActionS2")
            {
                i = fctGetSecondStrat(gActivePlayer);
                classStrategyNameText = document.getElementsByClassName("classStrategy2NameText");
            }

            /* Plays Strategy */
            if( strategyList[i][STRATEGY_STATUS] == STRATEGY_AVAILABLE)
            {
                /* UPdate table */
                strategyList[i][STRATEGY_STATUS] = STRATEGY_PLAYED;

                classStrategyNameText[gActivePlayer].textContent = "";

                /* If POLITICS select new SPEAKER */
                if(i == 3)
                    fctShowSpeaker(1);
            }
        }
        /* Plays Pass */
        else if(clActionActive[a].id == "idActionPass")
        {
            if(gSetupNbPlayer > 4)
            {
                /* Deactive it */
                var classStrategyFrameCurrent = document.getElementsByClassName("classStrategyFrameCurrent");
                classStrategyFrameCurrent[0].style.backgroundImage = "none";
                classStrategyFrameCurrent[0].className = classStrategyFrameCurrent[0].className.replace("Current", "Selected");

                strategyList[i][STRATEGY_STATUS] = STRATEGY_PASSED;
            }
            else
            {
                if( (strategyList[gActivePlayer][STRATEGY_STATUS] == STRATEGY_PLAYED)
                 && (strategyList[fctGetSecondStrat(gActivePlayer)][STRATEGY_STATUS] == STRATEGY_PLAYED))
                {
                    /* Deactive it */
                    var classStrategyFrameCurrent = document.getElementsByClassName("classStrategyFrameCurrent");
                    classStrategyFrameCurrent[0].style.backgroundImage = "none";
                    classStrategyFrameCurrent[0].className = classStrategyFrameCurrent[0].className.replace("Current", "Selected");
                    strategyList[gActivePlayer][STRATEGY_STATUS] = STRATEGY_PASSED;
                    strategyList[fctGetSecondStrat(gActivePlayer)][STRATEGY_STATUS] = STRATEGY_PASSED;
                }
            }
        }
        /* Other actions */
        else
        {
            /* Nothing to do */
        }

        a++;

    }while( a < clActionActive.length);


    /* Save player timer */
    gPlayerData[strategyList[gActivePlayer][STRATEGY_PLAYER]][PLAYER_CLOCK] += gCurrentPlayerTimer;
    gCurrentPlayerTimer = 0;

    FctNextPlayerAction();
}

function fctGetSecondStrat(p)
{
    for( var j=0; j < strategyList.length; j++)
    {
        if(strategyList[j][STRATEGY_PLAYER] == (strategyList[p][STRATEGY_PLAYER] + STRATEGY_SECONDPICK))
            return j;
    }
    return 255;
}

function FctNextPlayerAction()
{
    var i;

    /* Get next player */
    var SafeCounter = 0
    do
    {
        SafeCounter++;
        gActivePlayer++;
        if(gActivePlayer >= 9)
        {
            gActivePlayer = 0;
            gRoundCounter++;
        }
    }while( ((strategyList[gActivePlayer][STRATEGY_STATUS] != STRATEGY_AVAILABLE)
             && (strategyList[gActivePlayer][STRATEGY_STATUS] != STRATEGY_PLAYED)
             && (SafeCounter < 10) )
         || (strategyList[gActivePlayer][STRATEGY_PLAYER] >= 8));


    /* Clear Red frame */
    for(i=0; i < 9; i++)
        document.getElementsByClassName("classStrategyRankText")[i].style.opacity = 1;

    /* Reset links */
    var clLink = document.getElementsByClassName("clLink");
    for(i=0; i < clLink.length; i++)
        clLink[i].style.opacity = 0;

    /* Not all strategies were played */
    if (SafeCounter < 10)
    {
        /* Reset Highlighted strategy */
        var classStrategyFrameCurrent = document.getElementsByClassName("classStrategyFrameCurrent");
        if (classStrategyFrameCurrent.length > 0)
            classStrategyFrameCurrent[0].className = classStrategyFrameCurrent[0].className.replace("Current", "Active");

        /* Highlight strategy frame */
        if(gActivePlayer != 0)
            var classStrategyFrame = document.getElementById(strategyList[gActivePlayer][STRATEGY_NAME]);
        else
            var classStrategyFrame = document.getElementById("idNaaluFr");
        classStrategyFrame.className = classStrategyFrame.className.replace("Active", "Current");

        /* Update sentence */
        document.getElementById("idPlayerToChoose").textContent = "";
        document.getElementById("idFactionFocus").textContent = getPlayerFaction(strategyList[gActivePlayer][STRATEGY_PLAYER],FACTION_NAME);
        document.getElementById("idFactionIcon").style.backgroundImage = 'url('+factionList[gPlayerData[strategyList[gActivePlayer][STRATEGY_PLAYER]][PLAYER_FACTION]][FACTION_ICON]+')';

        var color = playerColorList[gPlayerData[strategyList[gActivePlayer][STRATEGY_PLAYER]][PLAYER_COLOR]];

        clLink[gActivePlayer].style.opacity = 1;
        clLink[gActivePlayer].style.backgroundColor = color;
        document.getElementById("idPlayerFocus").style.borderColor = color;
        document.getElementById("idFactoinClk").textContent = fctTransformTime(gPlayerData[strategyList[gActivePlayer][STRATEGY_PLAYER]][PLAYER_CLOCK]);

        fctSetActionButtons(gActivePlayer);

        fctSaveGame();
    }
    /* End of turn */
    else
    {
        /* Show all */
        fctDisplayAll("classStrategyFrame", "table-cell");

        fctStatusPhase();

        /* Reset Frames */
        fctRstFrames();
    }

    fctClock('on');
}

function fctRstFrames()
{
    var classStrategyFrame = document.getElementsByClassName("classStrategyFrameSelected");
    var classFactionChooser = document.getElementsByClassName("classFactionChooser");
    for(i=0; i < 9; i++)
    {
        var classStrategyFrame = document.getElementsByClassName("classStrategyFrameSelected");
        if(classStrategyFrame.length > 0)
        {
            classStrategyFrame[0].className = classStrategyFrame[0].className.replace("Selected", "");
        }

        strategyList[i][STRATEGY_PLAYER] = 255;
        classFactionChooser[i].textContent = "";
    }
}



