/* Author: Stephane Demots */
const PLAYER_FACTION_NAME = 0;

const PLAYER_FACTION = 0;
const PLAYER_COLOR = 1;
const PLAYER_CLOCK = 2;
const PLAYER_NBSPEAKER = 3;
const PLAYER_INFLUENCE = 4;


var gPlayerData = [
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
];

var gSpeakerPlayerIdx = 255;
var gPreviousSpeaker = 255;
var gSetupNbPlayer = 255;
var gVPBarStyle = "flex";
var gDecisionTimeLimit = 90;


function fctStartScreen(entry)
{
    if(entry == 'newgame')
    {
        /* Show next screen */
        fctShowSetupScreen(2);
    }
    else if (entry == 'continue')
    {
        /* Show next screen */
        fctShowSetupScreen(255);
        document.getElementById("idStartScreen").style.display = "none";

        fctLoadGame();

        document.getElementsByClassName("header")[0].style.display = "flex";
        document.getElementsByClassName("clNavBar")[0].style.display = "flex";
    }
    else if ( (entry == '_fr') || (entry == '_en') || (entry == '_de') || (entry == '_ru') || (entry == "_sp")|| (entry == "_cn"))
    {
        fctSwitchLang(entry);
    }
    else
    {
       document.getElementById("idModalInstructions").style.display = "block";
    }
}

function fctShowSetupScreen(e)
{
    var clGameScreen = document.getElementsByClassName("clGameScreen");

    for(var i=0; i<clGameScreen.length;i++)
    {
        if(i!=e)
            clGameScreen[i].style.display = "none";
        else
            clGameScreen[i].style.display = "block";
    }
}

function fctSwitchLang(l)
{

    /* hide all before loading */
    fctDisplayAll('_fr', "none");
    fctDisplayAll('_en', "none");
    fctDisplayAll('_de', "none");
    fctDisplayAll('_ru', "none");
    fctDisplayAll("_sp", "none");
    fctDisplayAll("_cn", "none");

    switch(l)
    {
        case '_fr': gLang = LANG_FR; break;
        case '_en': gLang = LANG_EN; break;
        case '_de': gLang = LANG_DE; break;
        case '_ru': gLang = LANG_RU; break;
        case '_sp': gLang = LANG_SP; break;
        case '_cn': gLang = LANG_CN; break;
    }

    /* reload variable */
    FACTION_NAME = FACTION_NAME_EN + gLang;
    STRATEGY_NAME = STRATEGY_NAME_EN + gLang;

    /* Show all corresponding language items */
    fctDisplayAll(l, "");

    /* Check Faction list */
    itm = document.getElementsByClassName("clSetFaction");

    while(itm.length > 1)
    {
        itm[1].parentNode.removeChild(itm[1]);
    }

    itm = document.getElementsByClassName("clSetFaction")[0];

    w3AddClass(itm, "show");

    /* Factions */
    for(i=0; i < factionList.length; i++)
    {
        cln = itm.cloneNode(true);
        cln.id = "";
        cln.textContent = factionList[i][FACTION_NAME];

        if(i >= CODEX_FACTION)
        {
          cln.classList.add("clCodexFaction");
        }
        else if(i >= POK_FACTION)
        {
          cln.classList.add("clPoKFaction");
        }
        document.getElementById("idFactionList").appendChild(cln);
    }

    /* Add RANDOM */
    cln = itm.cloneNode(true);
    cln.textContent = "???";
    document.getElementById("idFactionList").appendChild(cln);

    w3RemoveClass(itm, "show");

    /* Update Laws */
    itm = document.getElementById("idModalLaw").getElementsByClassName("filterDivLaw");
    var j=0;
    for(i=1; i < itm.length; i++)
    {
        itm[i].textContent = gLaw[j][gLang];
        j++;
    }


    /* Update Objectives */
    itm = document.getElementById("idModalObj").getElementsByClassName("filterDivObj");
    j=0;
    for(i=1; i < itm.length; i++)
    {
        itm[i].textContent = gSecretObj[j][gLang];
        j++;
    }

    /* Update Strategy Cards */
    itm = document.getElementById("idModalStrategy").getElementsByClassName("filterDivStrategy");
    j=0;
    for(i=1; i < itm.length; i++)
    {
        itm[i].textContent = gStrategy[j][gLang];
        j++;
    }

    /* Update Proposal */
    itm = document.getElementById("idModalOther").getElementsByClassName("filterDivOther");
    j=0;
    for(i=1; i < itm.length; i++)
    {
        itm[i].textContent = gGenericChoice[j][gLang];
        j++;
    }

    /* idAbstain */
    document.getElementById("idAbstain").textContent = gWord[W_ABSTAIN][gLang];

    fctSaveItem("gLang", l);
}


function FctSetupNbPlayer(newNbPlayerValue)
{
    // UPdate slider shown value
    var i;
    var slidervalue = newNbPlayerValue;
    document.getElementById("idPlayerSlider").textContent = slidervalue;

    /* Update map */
    document.getElementById("idTable").style.backgroundImage = 'url(ti4/img/'+(slidervalue*1)+'p.png)';

    /* Hide all */
    fctDisplayAll("classSetPlayerFrame", "none");
    var classSetPlayerFrame = document.getElementsByClassName("classSetPlayerFrame");

    /* Then show needed */
    switch(newNbPlayerValue*1)
    {
        case 8: classSetPlayerFrame[7].style.display = "block";
        case 7: classSetPlayerFrame[1].style.display = "block";
        case 6: classSetPlayerFrame[3].style.display = "block";
        case 5: classSetPlayerFrame[5].style.display = "block";
        case 4: classSetPlayerFrame[0].style.display = "block";
        case 3: classSetPlayerFrame[6].style.display = "block";
        default: classSetPlayerFrame[2].style.display = "block";
                 classSetPlayerFrame[4].style.display = "block";
    }

    /* Reset the hidded ones */
    for( var y=0; y<classSetPlayerFrame.length; y++ )
    {
        var faction = classSetPlayerFrame[y].getElementsByClassName("classPlayerRaceName")[0].textContent;
        if( (faction != "Set player") && (classSetPlayerFrame[y].style.display == "none"))
        {
            var clSetItem = document.getElementsByClassName("clSetFaction");
            for(var i=0; i < clSetItem.length; i++)
            {
                if(clSetItem[i].textContent == faction)
                {
                    w3AddClass(clSetItem[i], "show");
                }
            }

            var color;
            for(i=0; i < playerColorList.length; i++)
            {
                if(classSetPlayerFrame[y].classList.contains(playerColorList[i]))
                {
                    color = playerColorList[i];
                    w3RemoveClass(classSetPlayerFrame[y], color);
                }
            }

            clSetItem = document.getElementsByClassName("clSetColor");
            for(i=0; i < clSetItem.length; i++)
            {
                if(clSetItem[i].classList.contains(color) )
                {
                    w3AddClass(clSetItem[i], "show");
                }
            }

            classSetPlayerFrame[y].getElementsByClassName("classPlayerRaceName")[0].textContent = "Set player";
            classSetPlayerFrame[y].style.backgroundImage = 'url(ti4/img/player.png)';
        }
    }

    fctUpdateButton();
}

/* Click to configure a Player */
function FctSetPlayer(el)
{
    w3AddClass(el, "SetPlayer");
    document.getElementById("idModalSetPlayer").style.display = "block";
    document.getElementById("idConfirmPlayer").disabled = true;

    /* If player already set, display its parameters */
    var faction = el.getElementsByClassName("classPlayerRaceName")[0].textContent;
    if(faction != "Set player")
    {
        var clSetItem = document.getElementsByClassName("clSetFaction");
        for(var i=0; i < clSetItem.length; i++)
        {
            if(clSetItem[i].textContent == faction)
            {
                w3AddClass(clSetItem[i], "show");
                w3AddClass(clSetItem[i], "highlight");
            }
        }

        var color;
        for(i=0; i < playerColorList.length; i++)
        {
            if(el.classList.contains(playerColorList[i]))
            {
                color = playerColorList[i];
            }
        }

        clSetItem = document.getElementsByClassName("clSetColor");
        for(i=0; i < clSetItem.length; i++)
        {
            if(clSetItem[i].classList.contains(color) )
            {
                w3AddClass(clSetItem[i], "show");
                w3AddClass(clSetItem[i], "highlight");
            }
        }
    }
}

/* Set player parameter */
function fctSelectItem(el)
{
    var clSetItem = document.getElementsByClassName(el.classList.item(0));
    for(var i=0; i < clSetItem.length; i++)
        w3RemoveClass(clSetItem[i], "highlight");
    w3AddClass(el, "highlight");

    if (document.getElementsByClassName("highlight").length == 2)
        document.getElementById("idConfirmPlayer").disabled = false;
    else
        document.getElementById("idConfirmPlayer").disabled = true;
}

function fctConfirm(x)
{
    var i;

    /* Hide modal */
    document.getElementById("idModalSetPlayer").style.display = "none";

    /* Get player frame to update */
    var el = document.getElementsByClassName("SetPlayer")[0];

    var newfaction = document.getElementsByClassName("highlight")[1].textContent;

    if(newfaction == "???")
    {
        var d17, reroll;
        var classPlayerRaceName = document.getElementsByClassName("classPlayerRaceName");
        do
        {
            reroll = false;
            d17 = Math.floor(Math.random() * factionList.length);

            for(i=0; i < classPlayerRaceName.length; i++)
            {
                if(classPlayerRaceName[i].textContent == factionList[d17][FACTION_NAME])
                    reroll = true;
            }
        }while(reroll);

        newfaction = factionList[d17][FACTION_NAME];

        var clSetFaction = document.getElementsByClassName("clSetFaction");
        for(i=0; i < clSetFaction.length; i++)
            if(clSetFaction[i].textContent == newfaction)
                w3RemoveClass(clSetFaction[i], "show");
    }

    el.getElementsByClassName("classPlayerRaceName")[0].textContent = newfaction;
    el.style.backgroundImage = 'url('+factionList[fctGetFactionIdx(newfaction)][FACTION_ICON]+')';

    /* Remove previous color if any */
    for(i=0; i < playerColorList.length; i++)
    {
        if(el.classList.contains(playerColorList[i]))
            w3RemoveClass(el, playerColorList[i]);
    }

    /* Set color */
    for(i=0; i < playerColorList.length; i++)
    {
        if(document.getElementsByClassName("highlight")[0].classList.contains(playerColorList[i]))
            w3AddClass(el, playerColorList[i]);
    }

    var clSetItem = document.getElementsByClassName("clSetColor");
    for(i=0; i < clSetItem.length; i++)
    {
        if(clSetItem[i].classList.contains("highlight"))
        {
            w3RemoveClass(clSetItem[i], "highlight");
            w3RemoveClass(clSetItem[i], "show");
        }
    }

    clSetItem = document.getElementsByClassName("clSetFaction");
    for(i=0; i < clSetItem.length; i++)
    {
        if(clSetItem[i].classList.contains("highlight"))
        {
            w3RemoveClass(clSetItem[i], "highlight");
            if (clSetItem[i].textContent != "???") w3RemoveClass(clSetItem[i], "show");
        }
    }

    w3RemoveClass(el, "SetPlayer");

    fctUpdateButton();
}


function fctUpdateButton()
{
    var clPlayerRaceName = document.getElementsByClassName("classPlayerRaceName");
    var newNbPlayerValue = (document.getElementById("idPlayerSlider").textContent*1);

    var count = 0;

    /* Then show needed */
    switch(newNbPlayerValue*1)
    {
        case 8:  if(clPlayerRaceName[7].textContent != "Set player") count++;
        case 7:  if(clPlayerRaceName[1].textContent != "Set player") count++;
        case 6:  if(clPlayerRaceName[3].textContent != "Set player") count++;
        case 5:  if(clPlayerRaceName[5].textContent != "Set player") count++;
        case 4:  if(clPlayerRaceName[0].textContent != "Set player") count++;
        case 3:  if(clPlayerRaceName[6].textContent != "Set player") count++;
        default: if(clPlayerRaceName[2].textContent != "Set player") count++;
                 if(clPlayerRaceName[4].textContent != "Set player") count++;
    }

    if(count == newNbPlayerValue)
        document.getElementById("idStartGame").disabled = false;
    else
        document.getElementById("idStartGame").disabled = true;
}

function fctNext(s)
{
    if(s == 1)
    {
        var clSetPlayerFrame = document.getElementsByClassName("classSetPlayerFrame");
        var i;

        gSetupNbPlayer = 0;

        for(i=0; i < clSetPlayerFrame.length; i++)
            if(clSetPlayerFrame[i].style.display != "none")
                gSetupNbPlayer++;

        // Player 1
        fctFillPlayer(0,2);

        // Player 2
        if(gSetupNbPlayer <= 3)         fctFillPlayer(1,4);
        else                            fctFillPlayer(1,0);

        // Player 3
        if(gSetupNbPlayer == 3)         fctFillPlayer(2,6);
        else if(gSetupNbPlayer == 4)    fctFillPlayer(2,4);
        else if(gSetupNbPlayer == 5)    fctFillPlayer(2,4);
        else if(gSetupNbPlayer == 6)    fctFillPlayer(2,4);
        else if(gSetupNbPlayer >= 7)    fctFillPlayer(2,1);

        // Player 4
        if(gSetupNbPlayer == 4)         fctFillPlayer(3,6);
        else if(gSetupNbPlayer == 5)    fctFillPlayer(3,5);
        else if(gSetupNbPlayer == 6)    fctFillPlayer(3,5);
        else if(gSetupNbPlayer >= 7)    fctFillPlayer(3,4);

        // Player 5
        if(gSetupNbPlayer == 5)         fctFillPlayer(4,6);
        else if(gSetupNbPlayer == 6)    fctFillPlayer(4,6);
        else if(gSetupNbPlayer >= 7)    fctFillPlayer(4,5);

        // Player 6
        if(gSetupNbPlayer == 6)         fctFillPlayer(5,3);
        else if(gSetupNbPlayer == 7)    fctFillPlayer(5,6);
        else if(gSetupNbPlayer == 8)    fctFillPlayer(5,7);

        // Player 7
        if(gSetupNbPlayer == 7)         fctFillPlayer(6,3);
        else if(gSetupNbPlayer == 8)    fctFillPlayer(6,6);

        // Player 8
        if(gSetupNbPlayer == 8)         fctFillPlayer(7,3);


        document.getElementById("idStartScreen").style.display = "none";

        /* Hack the value to not trigger the animation */
        gActivePhase = PHASE_INIT;

        /* Option window */
        document.getElementById("idModalOptions").style.display = "block";
    }
    else
    {
        // Open Setup tab at init
        openTab('noButton', 'idTurnOrderTab');
        document.getElementById("idStartScreen").style.display = "none";

        //block the tab
        // document.getElementById("idInitTab").className += " active";

        document.getElementsByClassName("header")[0].style.display = gVPBarStyle;
        //document.getElementsByClassName("tab")[0].style.display = "block";
        document.getElementsByClassName("clNavBar")[0].style.display = "block";

        fctSaveGame();

        vpInit();
        fctInfluInit();
        loadTurnOrderPage();
        fctNewTurn();

        fctShowSetupScreen(255);
    }
}

function showOptionPanel()
{
    document.getElementById("idModalOptions").style.display = "block";
}

function fctFillPlayer(pIdx, fIdx)
{
    var clSetPlayerFrame = document.getElementsByClassName("classSetPlayerFrame");
    var clPlayerRaceName = document.getElementsByClassName("classPlayerRaceName");

    gPlayerData[pIdx][PLAYER_COLOR] = fctGetColorIdx(clSetPlayerFrame[fIdx]);
    gPlayerData[pIdx][PLAYER_FACTION] = fctGetFactionIdx(clPlayerRaceName[fIdx].textContent);

}

function fctGetFactionIdx(txt)
{
    for(var i=0; i < factionList.length; i++)
        if(txt == factionList[i][FACTION_NAME])
            return i;
}

function fctGetColorIdx(el)
{
    for(var i=0; i < playerColorList.length; i++)
        if(el.classList.contains(playerColorList[i]))
            return i;
}

function getPlayerFaction(p, n)
{
    if(p <8) return factionList[gPlayerData[p][PLAYER_FACTION]][n];
    else return "NaF";
}

function fctFullScreen(el)
{
    var elem = document.documentElement;
    if(el.checked == true)
    {
        if (elem.requestFullscreen)
            elem.requestFullscreen();
        else if (elem.mozRequestFullScreen) /* Firefox */
            elem.mozRequestFullScreen();
        else if (elem.webkitRequestFullscreen) /* Chrome, Safari and Opera */
            elem.webkitRequestFullscreen();
        else if (elem.msRequestFullscreen) /* IE/Edge */
            elem.msRequestFullscreen();
    }
    else
    {
        if (document.exitFullscreen)
            document.exitFullscreen();
        else if (document.mozCancelFullScreen) /* Firefox */
            document.mozCancelFullScreen();
        else if (document.webkitExitFullscreen) /* Chrome, Safari and Opera */
            document.webkitExitFullscreen();
        else if (document.msExitFullscreen) /* IE/Edge */
            document.msExitFullscreen();
    }
}

function fctShowVPBar(el)
{
    if(el.checked)
        gVPBarStyle = "flex";
    else
        gVPBarStyle = "none";

    if(fctGetPhase() > PHASE_GALAXY)
        document.getElementById("idVPMeter").style.display = gVPBarStyle;
}


function fctCloseOptions()
{
    fctDecision();

    fctSwitchOptionPanel();

    /* init interface */
    if(fctGetPhase() == PHASE_INIT)
    {
        // Back to start screen + show Galaxy Setup
        openTab('noButton', 'idStartScreen');
        fctShowSetupScreen(3);

        /* Start timer */
        fctSetPhase(PHASE_GALAXY);
    }
}

function fctSwitchOptionPanel()
{
    /* Hide Tip and Cancel for futur calls */
    document.getElementById("idOptionNote").style.display = "none";
    document.getElementById("idOptionsBack").style.display = "none";
    document.getElementById("idModalOptions").style.display = "none";
    document.getElementById("idConfirmOptions").textContent = "Close";
}

