/* Author: Stephane Demots */
const cVERSION = (6)*100 + (2);
const cOFFLINE = 0;

var gClockRun = 0;
var gGameDuration = 0;
var gLastActivity = 0;
var gCurrentPlayerTimer = 0;
var gDecisionTimer = 10;

function pageInit()
{
    document.getElementById("idLoading").style.display = "none";

    // ABOUT to right side
    // document.getElementById("idAboutTabButton").style.cssFloat="right";
    document.getElementById("idVersion").textContent= (cVERSION/100);

    /* Hide all tabs at init */
    var i, tab;
    tab = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tab.length; i++) {
        tab[i].style.display = "none";
    }

    document.getElementsByClassName("header")[0].style.display = "none";
    // document.getElementsByClassName("tab")[0].style.display = "none";
    document.getElementsByClassName("clNavBar")[0].style.display = "none";
    fctShowSetupScreen(0);

    // Populate start screens
    var itm = document.getElementById("idTmpColor");
    var cln;
    var i;

    for(i=0; i < playerColorList.length; i++)
    {
        cln = itm.cloneNode(true);
        w3AddClass(cln, playerColorList[i]);
        document.getElementById("idColorList").appendChild(cln);
    }
    w3RemoveClass(itm, "show");

    // Show player details
    FctSetupNbPlayer(6);

    gSetupNbPlayer = 0;
    gClockRun = 0;
    window.setInterval(fctOneSecond, 1000);

    /* Check saved data */
    if(!fctCheckSavedData())
      document.getElementById("idContinueButton").disabled = true;

    flexFont();

    // Language
    gLang = fctLoadItem("gLang");
    if(gLang)
      fctSwitchLang(gLang);
    else
      fctSwitchLang("_en");

    /* Load news */
    if( cNewsShow == true)
      document.getElementById("idNewsWindow").innerHTML = cNews;
    else
      document.getElementById("idNewsWindow").style.display = false;

    /* Offline / online version */
    if(cOFFLINE)
    {
      fctDisplayAll("clOnline", "none");
      fctDisplayAll("clOffline", "");
    }
    else
    {
      fctDisplayAll("clOnline", "");
      fctDisplayAll("clOffline", "none");
    }
    fctDecision();
}

function fctStartMenu()
{
    document.getElementById("idGameScreen").style.display = "none";
    document.getElementById("idMenuScreen").style.display = "block";
}

function openTab(evt, tabName) {
    var i, tab, tablinks;
    tab = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tab.length; i++) {
        tab[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    if(evt != "noButton")
        evt.className += " active";
    flexFont();
}

function resetSubMenu(id)
{
    document.getElementById(id).style.removeProperty( 'display' );
}


function indexInClass(node) {
  var collection = document.getElementsByClassName(node.className);
  for (var i = 0; i < collection.length; i++) {
    if (collection[i] === node)
      return i;
  }
  return -1;
}

function fctClock(mode)
{
    if (mode == 'toggle')
    {
        if (gClockRun == 1)
            gClockRun = -1;
        else
            gClockRun = 1;
    }
    /* Force run */
    else if (mode == 'on')
        gClockRun = 1;
    /* Force pause */
    else if (mode == 'off')
        gClockRun = -1;

    /* Inactivity timer reset */
    if(gClockRun == 1)
        gLastActivity = gGameDuration;
}

function fctDecision()
{
  gDecisionTimer = document.getElementById("idOptionDecisionTimer").value;
  document.getElementById("idDecisionValue").textContent = gDecisionTimer;
}

function fctOneSecond()
{
  if(gClockRun == 1)
  {
    gGameDuration++;
    gCurrentPlayerTimer++;
    gDecisionTimer--;

    if(gDecisionTimer == 5)
    {
      document.getElementById("idDecisionValue").style.color = "red";
    }
    // Wait 4s as 0, then reset
    else if(gDecisionTimer == -3)
    {
      document.getElementById("idDecisionValue").style.color = "";
      fctDecision();
    }
  }

  var clock = fctTransformTime(gGameDuration);

  if(gClockRun == 1)
  {
    document.getElementById("idGameDuration").textContent = clock;

    if(gDecisionTimer > 0)
    {
      document.getElementById("idDecisionValue").textContent = gDecisionTimer;
      document.getElementById("idDecisionTimer").style.width= ((gDecisionTimer/document.getElementById("idOptionDecisionTimer").value)*100) + "%";
    }
    else
    {
      document.getElementById("idDecisionValue").textContent = "Decide !";
    }
  }
  else if(gClockRun == 0)
  {
    document.getElementById("idGameDuration").textContent = clock;
    gClockRun--;
  }
  else
  {
    document.getElementById("idGameDuration").textContent = "-Pause-";
    gClockRun = 0;
  }

  /* Toggle active player */
  var ph = fctGetPhase();
  if( ph == PHASE_ACTION)
  {
    var c = document.getElementsByClassName("classStrategyFrameCurrent");
    if(c.length > 0)
      if(gGameDuration%2)
        c[0].getElementsByClassName("classStrategyRankText")[0].style.opacity = 0.3;
      else
        c[0].getElementsByClassName("classStrategyRankText")[0].style.opacity = 1;

    if(document.getElementById("idPlyerTimerCheck").checked)
      var t = gCurrentPlayerTimer;
    else
      var t = gCurrentPlayerTimer + gPlayerData[strategyList[gActivePlayer][STRATEGY_PLAYER]][PLAYER_CLOCK];

    document.getElementById("idFactoinClk").textContent = fctTransformTime(t);
  }
  if(ph == PHASE_GALAXY)
  {
    /* Change galaxy animation */
    document.getElementById("idGalaxyAnim").src = "ti4/img/g" + (((gGameDuration-2)%7)+1) + ".png";

    /* Disable the inactivity timer */
    gLastActivity = gGameDuration;
  }

  /* Check inactivity */
  if( (gGameDuration - gLastActivity) == (document.getElementById("idOptionInactivityTimer").value*60))
    fctInactivity(1);
  else if( (gGameDuration - gLastActivity) == (document.getElementById("idOptionInactivityTimer").value*60*2))
  {
    /* Increase timer to not loop call this function */
    gGameDuration++;
    fctInactivity(2);
  }
}

function fctTransformTime(t)
{
    var sec = Math.floor((t%60));
    var min = Math.floor((t%3600)/60);
    var hour = Math.floor(t/3600);
    var clock = hour.pad(2)+":"+min.pad(2)+":"+sec.pad(2);
    return clock;
}

Number.prototype.pad = function(size) {
  var s = String(this);
  while (s.length < (size || 2)) {s = "0" + s;}
  return s;
}

function fctCheckSavedData()
{
    if (fctLoadItem("NEKROVIRUS") == "010000100101010101000111")
        if( Math.floor(fctLoadItem("cVERSION")/100) >= Math.floor(cVERSION/100))
            return true;
        else
        {
            document.getElementById("idNoContinue").style.display = "block";
            return false;
        }
    else
        return false;
}

function fctSaveGameXXX()
{
    DEBUG("NOSAVE");
}

function fctSaveGame()
{
    var i;

    /* Version */
    fctSaveItem("cVERSION", cVERSION);

    /* players */
    fctSaveItem("gSetupNbPlayer", gSetupNbPlayer);
    for(i=0; i < gSetupNbPlayer; i++)
    {
        fctSaveItem("gPlayerData" + i + PLAYER_FACTION, gPlayerData[i][PLAYER_FACTION]);
        fctSaveItem("gPlayerData" + i + PLAYER_COLOR, gPlayerData[i][PLAYER_COLOR]);
        fctSaveItem("gPlayerData" + i + PLAYER_CLOCK, gPlayerData[i][PLAYER_CLOCK]);
        fctSaveItem("gPlayerData" + i + PLAYER_NBSPEAKER, gPlayerData[i][PLAYER_NBSPEAKER]);
        fctSaveItem("gPlayerData" + i + PLAYER_INFLUENCE, gPlayerData[i][PLAYER_INFLUENCE]);
    }

    /* Game */
    fctSaveItem("gTurnCounter", gTurnCounter);
    fctSaveItem("gRoundCounter", gRoundCounter);
    fctSaveItem("gGameDuration", gGameDuration);
    fctSaveItem("gActivePhase", gActivePhase);
    fctSaveItem("gSpeakerPlayerIdx", gSpeakerPlayerIdx);
    fctSaveItem("idOptionVPWin", document.getElementById("idOptionVPWin").value);

    /* Agenda */
    fctSaveItem("gAgendaPhase", gAgendaPhase);
    fctSaveItem("gAgendaStep",gAgendaStep);

    /* VP */
    var clVPCount = document.getElementsByClassName("clVPCount");
    for( i=0; i< gSetupNbPlayer; i++)
        fctSaveItem("VP"+i, clVPCount[i].textContent);

    /* Action phase */
    fctSaveItem("gActivePlayer", gActivePlayer);
    for(i=0; i < strategyList.length; i++)
    {
        if(strategyList[i][STRATEGY_PLAYER] != 255)
            fctSaveItem("strategyList"+i +STRATEGY_PLAYER, (strategyList[i][STRATEGY_PLAYER]%STRATEGY_SECONDPICK));
        else
            fctSaveItem("strategyList"+i +STRATEGY_PLAYER, (strategyList[i][STRATEGY_PLAYER]));
        fctSaveItem("strategyList"+i +STRATEGY_STATUS, strategyList[i][STRATEGY_STATUS]);
        fctSaveItem("strategyList"+i +STRATEGY_TG, strategyList[i][STRATEGY_TG]);
    }

    /* Naalu */
    fctSaveItem("strategyNaalu", strategyList[0][STRATEGY_NAME]);

    fctSaveItem("NEKROVIRUS", "010000100101010101000111");
}

function fctSaveVP(i, v)
{
    fctSaveItem("VP"+i, v);
    fctSaveItem("gGameDuration", gGameDuration);
}

function fctLoadGame()
{
    var i;

    /* Players */
    gSetupNbPlayer = fctLoadItem("gSetupNbPlayer")*1;
    for(i=0; i < gSetupNbPlayer; i++)
    {
        gPlayerData[i][PLAYER_FACTION] = fctLoadItem("gPlayerData" + i + PLAYER_FACTION);
        gPlayerData[i][PLAYER_COLOR] = fctLoadItem("gPlayerData" + i + PLAYER_COLOR);
        gPlayerData[i][PLAYER_CLOCK] = fctLoadItem("gPlayerData" + i + PLAYER_CLOCK)*1;
        gPlayerData[i][PLAYER_NBSPEAKER] = fctLoadItem("gPlayerData" + i + PLAYER_NBSPEAKER)*1;
        gPlayerData[i][PLAYER_INFLUENCE] = fctLoadItem("gPlayerData" + i + PLAYER_INFLUENCE)*1;
    }

    /* Game */
    gTurnCounter = fctLoadItem("gTurnCounter")*1;
    gRoundCounter = fctLoadItem("gRoundCounter")*1;
    gGameDuration = fctLoadItem("gGameDuration")*1;
    gActivePhase = fctLoadItem("gActivePhase")*1;
    if(gActivePhase >= PHASE_END) gActivePhase -= PHASE_END;
    gAgendaPhase = fctLoadItem("gAgendaPhase")*1;
    gAgendaStep = fctLoadItem("gAgendaStep")*1;
    gSpeakerPlayerIdx = fctLoadItem("gSpeakerPlayerIdx")*1;
    gPreviousSpeaker = gSpeakerPlayerIdx;
    document.getElementById("idOptionVPWin").value = fctLoadItem("idOptionVPWin")*1;

    /* Victory points */
    vpInit();
    fctInfluInit();
    var clVPCount = document.getElementsByClassName("clVPCount");
    for( i=0; i< gSetupNbPlayer; i++)
        clVPCount[i].textContent = (fctLoadItem("VP"+i)*1).pad(2);

    /* Set player frames*/
    var classSetPlayerFrame = document.getElementById("idGameTable").getElementsByClassName("classSetPlayerFrame");
    var classPlayerRaceName = document.getElementById("idGameTable").getElementsByClassName("classPlayerRaceName");
    for(i=0; i< gSetupNbPlayer; i++)
    {
        classPlayerRaceName[i].textContent = getPlayerFaction(i,FACTION_NAME);
        w3AddClass(classSetPlayerFrame[i], playerColorList[gPlayerData[i][PLAYER_COLOR]]);
        classSetPlayerFrame[i].style.backgroundImage = 'url('+factionList[gPlayerData[i][PLAYER_FACTION]][FACTION_ICON]+')';
    }

    /* Change option panel to game mode */
    fctSwitchOptionPanel();

    /* Load page first, since elements will be edited next */
    loadTurnOrderPage();

    for(i=0; i < strategyList.length; i++)
    {
        strategyList[i][STRATEGY_PLAYER] = fctLoadItem("strategyList" + i + STRATEGY_PLAYER)*1;
        strategyList[i][STRATEGY_STATUS] = fctLoadItem("strategyList" + i + STRATEGY_STATUS)*1;
        strategyList[i][STRATEGY_TG] = fctLoadItem("strategyList" + i + STRATEGY_TG)*1;
    }

    if(fctGetPhase() == PHASE_ACTION)
    {
        var clStrategyFrame = document.getElementById("idTurnOrderTab").getElementsByClassName("classStrategyFrame");
        var clFactionChooser = document.getElementById("idTurnOrderTab").getElementsByClassName("classFactionChooser");
        for(i=0; i< clStrategyFrame.length; i++)
            w3AddClass(clStrategyFrame[i], "clFrameLoading");

        var clFrameLoading = document.getElementById("idTurnOrderTab").getElementsByClassName("clFrameLoading");
        for(i=0; i< clFrameLoading.length; i++)
            if ( (strategyList[i][STRATEGY_STATUS] != STRATEGY_DISABLED) && (strategyList[i][STRATEGY_PLAYER] < 8))
            {
                /* Naalu */
                if(i ==0)
                {
                    document.getElementById("idNaaluFr").style.display = "table-cell";
                    strategyList[0][STRATEGY_NAME] = fctLoadItem("strategyNaalu");
                    document.getElementById("idNaaluStrategy").textContent = strategyList[0][STRATEGY_NAME] ;
                }

                clFactionChooser[i].textContent = getPlayerFaction(strategyList[i][STRATEGY_PLAYER],FACTION_NAME);
                clFrameLoading[i].className = clFrameLoading[i].className.replace("classStrategyFrame", "classStrategyFrameSelected");

                var el = document.getElementsByClassName("classFactionIcon");
                el[i].src = factionList[gPlayerData[strategyList[i][STRATEGY_PLAYER]][PLAYER_FACTION]][FACTION_ICON];
            }

        fctInitActionPhase();

        for(i=0; i < strategyList.length; i++)
        {
            if(strategyList[i][STRATEGY_STATUS] == STRATEGY_PASSED)
            {
                clFrameLoading[i].className = clFrameLoading[i].className.replace("Active", "Selected");
            }
        }

        for(i=0; i< 9; i++)
            w3RemoveClass(clFrameLoading[0], "clFrameLoading");

        gActivePlayer = fctLoadItem("gActivePlayer")*1;
        gActivePlayer--;
        FctNextPlayerAction();

        openTab('noButton', 'idTurnOrderTab');
    }
    else if (fctGetPhase() == PHASE_STRATEGY)
    {
        openTab('noButton', 'idTurnOrderTab');

        /* Reload the turn */
        gTurnCounter--;
        fctNewTurn();
    }
    else if (fctGetPhase() == PHASE_STATUS)
    {
        fctStatusPhase();
    }
    else if (fctGetPhase() == PHASE_AGENDA)
    {
        fctSetPhase(PHASE_AGENDA);
        fctPrepareAgenda(gAgendaStep);
    }
}


function fctSaveItem(i,v)
{
    localStorage.setItem(i, v);
}

function fctLoadItem(i)
{
    return localStorage.getItem(i);
}

function fctClose(id)
{
    document.getElementById(id).style.display = "none";
    if( (id == 'idModalStopAlert') || (id == 'idInactivityModal'))
        fctClock('on');
}


function fctInactivity(lvl)
{
    document.getElementById("idInactivityValue1").textContent = document.getElementById("idOptionInactivityTimer").value;
    document.getElementById("idInactivityValue2").textContent = document.getElementById("idOptionInactivityTimer").value*2;

    if (lvl == 1)
        document.getElementById("idInactivityModal").style.display = "block";
    else
    {
        fctClock('off');
        document.getElementById("idInactivityModal").style.display = "none";
        document.getElementById("idModalStopAlert").style.display = "block";
    }
}

function FctAbout(tab)
{
    openTab(document.getElementById("idAboutTabButton"), tab);

    /* Hide submenu */
    document.getElementById("idAboutMenu").style.display = "none";
}

function fctAboutBack()
{
    switch(gActivePhase)
    {
        case PHASE_STRATEGY:
        case PHASE_ACTION : openTab('noButton', 'idTurnOrderTab'); break;
        case PHASE_STATUS : openTab('noButton', 'idStatusTab'); break;
        case PHASE_AGENDA : openTab('noButton', 'idAgendaTab'); break;
        case PHASE_INIT : openTab('noButton', 'idTurnOrderTab'); break;
    }
}

function fctDisplayAll(el, s)
{
    var cl = document.getElementsByClassName(el);
    for(i=0; i< cl.length; i++)
        cl[i].style.display = s;
}


// Show filtered elements
function w3AddClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    if (arr1.indexOf(arr2[i]) == -1) {
      element.className += " " + arr2[i];
    }
  }
}

// Hide elements that are not selected
function w3RemoveClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    while (arr1.indexOf(arr2[i]) > -1) {
      arr1.splice(arr1.indexOf(arr2[i]), 1);
    }
  }
  element.className = arr1.join(" ");
}

flexFont = function () {
    var divs = document.getElementsByClassName("flexFont");
    for(var i = 0; i < divs.length; i++) {
        var relFontsize = divs[i].clientWidth*0.13;
        if(relFontsize < 10) relFontsize = 10;
        if(relFontsize > 50) relFontsize = 50;
        if(divs[i].textContent.length >= 12) relFontsize *=0.92;
        if(divs[i].textContent.length >= 20) relFontsize *=0.86;
        divs[i].style.fontSize = relFontsize+'px';
    }
};

window.onresize = function(event) {
    flexFont();

    /*if (window.innerWidth < window.innerHeight)
        alert("This website is designed to be used on landscape mode");*/
};

window.addEventListener('beforeunload', function (e) {

    if(gActivePhase != 255)
    {
        // Cancel the event as stated by the standard.
        e.preventDefault();
        // Chrome requires returnValue to be set.
        e.returnValue = '';
    }
});

function DEBUG(msg)
{
    // debug
    document.getElementById("idDebug").innerHTML += msg + " / ";
}