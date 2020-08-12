/* Author: Stephane Demots */
const VOTE_KO = 255;
const VOTE_PASS = 254;

var gPlayerVotes = [
  [VOTE_KO],
  [VOTE_KO],
  [VOTE_KO],
  [VOTE_KO],
  [VOTE_KO],
  [VOTE_KO],
  [VOTE_KO],
  [VOTE_KO],
];

var gVotingPlayer = 0;
var gNewVoteElement;
var gAgendaStep = 1;

votesInit();

function votesInit()
{
    var itm = document.getElementById("idModalPlanet").getElementsByClassName("filterDiv")[0];
    var cln;
    var i;
   
    /* Load Planets */
    for(i=0; i < gPlanet.length; i++)
    {
        cln = itm.cloneNode(true);
        cln.textContent = gPlanet[i][PLANET_NAME];
        w3AddClass(cln, gPlanet[i][PLANET_TYPE]);
        document.getElementById("idPlanetList").appendChild(cln);
    }

    /* hide template */
    itm.style.display = "none";

    /* Load Laws */
    itm = document.getElementById("idModalLaw").getElementsByClassName("filterDivLaw")[0];
    for(i=0; i < gLaw.length; i++)
    {
        cln = itm.cloneNode(true);
        cln.textContent = gLaw[i][gLang];
        document.getElementById("idLawList").appendChild(cln);
    }
    /* hide template */
    itm.style.display = "none";

    /* Load Objectives */
    itm = document.getElementById("idModalObj").getElementsByClassName("filterDivObj")[0];
    for(i=0; i < gSecretObj.length; i++)
    {
        cln = itm.cloneNode(true);
        cln.textContent = gSecretObj[i][gLang];
        document.getElementById("idObjList").appendChild(cln);
    }
    /* hide template */
    itm.style.display = "none";
    
    /* Load Proposal */
    itm = document.getElementById("idModalOther").getElementsByClassName("filterDivOther")[0];
    for(i=0; i < gGenericChoice.length; i++)
    {
        cln = itm.cloneNode(true);
        cln.textContent = gGenericChoice[i][gLang];
        document.getElementById("idOtherList").appendChild(cln);
    }
    /* hide template */
    itm.style.display = "none";

}

// Get the modal
var idModalPlanet = document.getElementById('idModalPlanet');
var idModalLaw = document.getElementById('idModalLaw');
var idModalObj = document.getElementById('idModalObj');
var idModalOther = document.getElementById('idModalOther');

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

function fctNewAgenda()
{
    fctSetPhase(PHASE_AGENDA);
    
    if(document.getElementById("idAgendaPageCheck").checked == true)
    {
        // Show detailed voting page
        document.getElementById("idAgendaStepPage").classList.remove("clDisplayNone");
        document.getElementById("idAgendaVotePage").classList.add("clDisplayNone");
        openTab("noButton", 'idAgendaTab');
    }
    else
    {
        // Show voting system
        document.getElementById("idAgendaStepPage").classList.add("clDisplayNone");
        document.getElementById("idAgendaVotePage").classList.remove("clDisplayNone");
        fctPrepareAgenda(1);
    }
}

function fctPrepareAgenda(s)
{
    var i;
    
    /* Init table + Exclude Nekro Virus */
    for(i=0; i < 8; i++)
        gPlayerVotes[i] = VOTE_KO;
    
    gVotingPlayer = 255;
    
    document.getElementById("idPlayerToVote").textContent = gWord[W_END_VOTE][gLang];

    /* Reset style */
    var e  = document.getElementsByClassName("classVoteTotalInfluence"); 
    for(i=0; i < e.length;i++)
        e[i].style.color = "white";
        
    fctShowSpeaker(2);

    openTab("noButton", 'idAgendaTab');
    document.getElementById("idAgendaNext").style.display = "none";
    
    gAgendaStep = s;
    
    if(s == 1) document.getElementById("idAgendaIdx").textContent = gWord[W_FIRST_AGENDA][gLang];
    else document.getElementById("idAgendaIdx").textContent = gWord[W_SECOND_AGENDA][gLang];
    
    fctClock('on');
    fctSaveItem("gAgendaStep",gAgendaStep);
    fctSaveItem("gGameDuration", gGameDuration);
}

function FctNewVote(voteType)
{
    var i, idx;

    fctLockSpeaker();

    /* open vote tab */
    openTab("noButton", 'idVotesTab');
    // openTab(document.getElementById("idVoteTabButton"), 'idVotesTab');
    
    /* Hide submenu */
    // document.getElementById("idVoteMenu").style.display = "none";

    var clVotePlayerLineFaction = document.getElementsByClassName("clVotePlayerLineFaction");
    var clVotePlayerLineInfluence = document.getElementsByClassName("clVotePlayerLineInfluence");
    for(idx=0; idx < clVotePlayerLineFaction.length; idx++)
    {
        clVotePlayerLineFaction[idx].textContent = "";
        if( idx < clVotePlayerLineInfluence.length)
            clVotePlayerLineInfluence[idx].textContent = "";
    }

    var clVotePlayerLineInfluence = document.getElementsByClassName("clVotePlayerLineNoInfluence");
    for(idx=0; idx < clVotePlayerLineInfluence.length; idx++)
    {
        clVotePlayerLineInfluence[idx].textContent = "";
    }
    
    var classVoteTotalInfluence = document.getElementsByClassName("classVoteTotalInfluence");
    for(idx=0; idx < classVoteTotalInfluence.length; idx++)
    {
        classVoteTotalInfluence[idx].textContent = "";
    }

    /* hide all VoteFrame */
    var classVoteFrame = document.getElementsByClassName("classVoteFrame");
    var classVoteName = document.getElementsByClassName("classVoteName");
    for( i=0; i < classVoteFrame.length; i++)
    {
            classVoteFrame[i].style.display = "none";
            classVoteName[i].textContent = "";
    }       
    
    /* Show VoteFrame depending of vote type */
    switch(voteType)
    {
        case 'ForAgainst':
            classVoteFrame[0].style.display = "table-cell";
            classVoteName[0].textContent = gWord[W_FOR][gLang];
            classVoteTotalInfluence[0].textContent = "0";
            
            classVoteFrame[1].style.display = "table-cell";
            classVoteName[1].textContent = gWord[W_AGAINST][gLang];
            classVoteTotalInfluence[1].textContent = "0";
            break;
        case 'ElectPlayer':
            for( i=0; i < gSetupNbPlayer; i++)
            {
                classVoteFrame[i].style.display = "table-cell";
                classVoteName[i].textContent = getPlayerFaction(i,FACTION_NAME) ;
                classVoteTotalInfluence[i].textContent = "0";
            }
            break;
        case 'ElectPlanet':
            classVoteFrame[0].style.display = "table-cell";
            classVoteName[0].textContent = gWord[W_ADD_PLANET][gLang];
            classVoteTotalInfluence[0].textContent = "+";
            
            var x = document.getElementsByClassName("filterDiv");

            for (i = 0; i < x.length; i++) {
                w3RemoveClass(x[i], "displayNone");
            }
            break;
           
        case 'ElectLaw':
            classVoteFrame[0].style.display = "table-cell";
            classVoteName[0].textContent = gWord[W_ADD_LAW][gLang];
            classVoteTotalInfluence[0].textContent = "+";
            
            var x = document.getElementsByClassName("filterDiv");

            for (i = 0; i < x.length; i++) {
                w3RemoveClass(x[i], "displayNone");
            }
            break;
           
        case 'ElectObj':
            classVoteFrame[0].style.display = "table-cell";
            classVoteName[0].textContent = gWord[W_ADD_OBJECTIVE][gLang];
            classVoteTotalInfluence[0].textContent = "+";
            
            var x = document.getElementsByClassName("filterDiv");

            for (i = 0; i < x.length; i++) {
                w3RemoveClass(x[i], "displayNone");
            }
            break;
            
        default:
            classVoteFrame[0].style.display = "table-cell";
            classVoteName[0].textContent = gWord[W_ADD_PROPOSAL][gLang];
            classVoteTotalInfluence[0].textContent = "+";
            
            var x = document.getElementsByClassName("filterDiv");

            for (i = 0; i < x.length; i++) {
                w3RemoveClass(x[i], "displayNone");
            }
            break;
    }
    flexFont();
    fctClock('on');
}

function FctSelectVote(evt)
{
    var idx, i;
    
    /* If already voted, detele previous */
    if(gPlayerVotes[gVotingPlayer] != VOTE_KO)
    {
        var clVotePlayerLineFaction = document.getElementsByClassName("clVotePlayerLineFaction");
        var clVotePlayerLineInfluence = document.getElementsByClassName("clVotePlayerLineInfluence");
        for( idx=0; idx < clVotePlayerLineFaction.length; idx++)
        {            
            if(clVotePlayerLineFaction[idx].textContent == getPlayerFaction(gVotingPlayer,FACTION_SHORTNAME))
            {
                clVotePlayerLineFaction[idx].textContent = "";
                if( idx < clVotePlayerLineInfluence.length)
                    clVotePlayerLineInfluence[idx].textContent = "";
            }
        }
    }

    fctHighlightVote(evt);  

    /* Show planet selection window */
    if(evt.getElementsByClassName("classVoteName")[0].textContent == gWord[W_ADD_PLANET][gLang])
    {
        idModalPlanet.style.display = "block";
        gNewVoteElement = evt;
    }
    else if(evt.getElementsByClassName("classVoteName")[0].textContent == gWord[W_ADD_LAW][gLang])
    {
        idModalLaw.style.display = "block";
        gNewVoteElement = evt;
    }
    else if(evt.getElementsByClassName("classVoteName")[0].textContent == gWord[W_ADD_OBJECTIVE][gLang])
    {
        idModalObj.style.display = "block";
        gNewVoteElement = evt;
    }
    else if(evt.getElementsByClassName("classVoteName")[0].textContent == gWord[W_ADD_PROPOSAL][gLang])
    {
        idModalOther.style.display = "block";
        gNewVoteElement = evt;
    }
    /* Search the vote player list */
    for( i=0; i < evt.childNodes.length; i++)
    {
        if(evt.childNodes[i].className == "classVotePlayers")
            var classVotePlayers = evt.childNodes[i];
    }

    /* Get first empty line */
    var playerlist = classVotePlayers.getElementsByTagName("tr");
    i = 0;
    while( (playerlist[i].childNodes[1].textContent != "") && (++i < playerlist.length)); 

    if( i < playerlist.length)
    {
        playerlist[i].childNodes[1].textContent = getPlayerFaction(gVotingPlayer,FACTION_SHORTNAME);
        playerlist[i].childNodes[3].textContent = "??";
        gPlayerVotes[gVotingPlayer] = playerlist[i].childNodes[3];
    }

    UpdateTotalVotes();

    if(evt.getElementsByClassName("classVoteName")[0].textContent == gWord[W_ABSTAIN][gLang])
        fctSetInfluencePanel("ON", "hidden", "visible");
    else
        fctSetInfluencePanel("ON", "visible", "hidden");
}


function FctKeypadInput(input)
{   
    var output = gPlayerVotes[gVotingPlayer];
 
    if(output.textContent == "??")
        output.textContent = 0;
 
    switch(input)
    {
        case 0: 
            output.textContent = 0;
            fctSetInfluencePanel("ON", "visible", "hidden");
            break;
        case 255:
            fctCallPlayerVote();
            gPlayerData[gVotingPlayer][PLAYER_INFLUENCE] += (output.textContent)*1;
            break;
        /* any other number */
        default:
            output.textContent = (output.textContent*1) + (input*1);
            fctSetInfluencePanel("ON", "visible", "visible"); 
            break;
    }

    UpdateTotalVotes();
}

function UpdateTotalVotes()
{
    var voteIdx, i, InfluenceSum;
    var classVoteFrame = document.getElementsByClassName("classVoteFrame");

    /* update each vote */
    for( voteIdx = 0; voteIdx < classVoteFrame.length; voteIdx++)
    {
        InfluenceSum = 0;
        var clVotePlayerLineInfluence = classVoteFrame[voteIdx].getElementsByClassName("clVotePlayerLineInfluence");
        for( i=0; i < clVotePlayerLineInfluence.length; i++)
        {
            if (clVotePlayerLineInfluence[i].textContent != "??")
                InfluenceSum += (clVotePlayerLineInfluence[i].textContent*1);
        }

        var classVoteTotalInfluence = classVoteFrame[voteIdx].getElementsByClassName("classVoteTotalInfluence");

        if (classVoteTotalInfluence[0].textContent != "+")
        classVoteTotalInfluence[0].textContent = InfluenceSum*1;
    }
    
    var classVoteFrame = document.getElementsByClassName("classVoteFrameSelected");

    /* update each vote */
    for( voteIdx = 0; voteIdx < classVoteFrame.length; voteIdx++)
    {
        InfluenceSum = 0;
        var clVotePlayerLineInfluence = classVoteFrame[voteIdx].getElementsByClassName("clVotePlayerLineInfluence");
        for( i=0; i < clVotePlayerLineInfluence.length; i++)
        {
            if (clVotePlayerLineInfluence[i].textContent != "??")
                InfluenceSum += (clVotePlayerLineInfluence[i].textContent*1);
        }
    
        var classVoteTotalInfluence = classVoteFrame[voteIdx].getElementsByClassName("classVoteTotalInfluence");

        classVoteTotalInfluence[0].textContent = InfluenceSum*1;
    }
    fctClock('on');
}

function fctCallPlayerVote()
{
    /* Reset previous shown voter */
    fctHighlightVote(null);
    
    fctSetInfluencePanel("", "hidden", "hidden");
    
    /* check if all player voted */
    var i=0;
    
    while( (gPlayerVotes[i] != VOTE_KO) && (++i < gPlayerVotes.length));
    
    /* not all player voted */
    if(i != gSetupNbPlayer)
    {
        
        /* First voter */
        if (gVotingPlayer == 255)
            gVotingPlayer = gSpeakerPlayerIdx;
        else
            gPlayerData[gVotingPlayer][PLAYER_CLOCK] += gCurrentPlayerTimer;
        
        gCurrentPlayerTimer = 0;
        gVotingPlayer++;
        if (gVotingPlayer == gSetupNbPlayer)
            gVotingPlayer = 0;

        document.getElementById("idPlayerToVote").textContent = getPlayerFaction(gVotingPlayer,FACTION_NAME) + gWord[W_CAST_VOTE][gLang];
    }
    
    /* all player voted */
    else
    {
        document.getElementById("idPlayerToVote").textContent = gWord[W_END_VOTE][gLang];;
        
        var e  = document.getElementsByClassName("classVoteTotalInfluence");
        var max = 0;
        
        /* Get max influence */
        for(i=0; i < e.length;i++)
            if( (e[i].textContent*1) > max)
                max = e[i].textContent*1;
        
        /* High light the winner(s) */
        for(i=0; i < e.length;i++)
            if( (e[i].textContent*1) == max)
                e[i].style.color = "red";
        
        document.getElementById("idAgendaNext").style.display = "block";
    }
    flexFont();
}


function fctHighlightVote(evt)
{
    var VoteFrameSelected = document.getElementsByClassName("classVoteFrameSelected");
    if(VoteFrameSelected.length > 0)
        VoteFrameSelected[0].className = "classVoteFrame";
    
    var VoteFrameSelected = document.getElementsByClassName("classVoteFrameSelectedAbstain");
    if(VoteFrameSelected.length > 0)
        VoteFrameSelected[0].className = "classVoteFrameAbstain";   
    
    /* Highlight the vote */
    if(evt != null)
        evt.className = evt.className.replace("VoteFrame", "VoteFrameSelected");
}

function fctSetInfluencePanel(classMod, keysVisibility, ConfirmVisibility)
{
    /* Influence panel */
    if(classMod = "ON")
    {
        var classVoteInterface = document.getElementsByClassName("classVoteInterface");
        if(classVoteInterface.length > 0)
            classVoteInterface[0].className = classVoteInterface[0].className.replace("classVoteInterface", "classVoteInterfaceON");    
    }
    else
    {
        var classVoteInterface = document.getElementsByClassName("classVoteInterfaceON");
        if(classVoteInterface.length > 0)
            classVoteInterface[0].className = classVoteInterface[0].className.replace("classVoteInterfaceON", "classVoteInterface");
    }

    /* Keys visibility */
    var classNumKey = document.getElementsByClassName("classNumKey");
    for(var i=0; i < classNumKey.length; i++)
    {
        classNumKey[i].style.visibility = keysVisibility;
    }
 
    /* Confirm visibility */
    document.getElementById("idKeyConfirm").style.visibility = ConfirmVisibility;
}


function fctProposal(el, type)
{
    var i;
    
    /* get proposal name */
    var proposal = el.textContent;
    
    /* close window */
    idModalPlanet.style.display = "none";
    idModalLaw.style.display = "none";
    idModalObj.style.display = "none";
    idModalOther.style.display = "none";
    
    /*Set name of the proposal */
    gNewVoteElement.getElementsByClassName("classVoteName")[0].textContent = proposal;
    gNewVoteElement.getElementsByClassName("classVoteTotalInfluence")[0].textContent = 0;
    
    /* Add new proposal frame */
    var classVoteFrame = document.getElementsByClassName("classVoteFrame");
    var classVoteName = document.getElementsByClassName("classVoteName");
    var classVoteTotalInfluence = document.getElementsByClassName("classVoteTotalInfluence");
    
    i= 0;
    while( (classVoteName[i].textContent != "") && (++i < classVoteName.length));
    
    if (i < classVoteName.length)
    {
        classVoteFrame[i-1].style.display = "table-cell";        
        classVoteName[i].textContent = type;        
        classVoteTotalInfluence[i].textContent = "+";
    }
    
    w3AddClass(el, "displayNone");
    flexFont();
    fctClock('on');
}

function fctAgendaNext()
{
    if(gAgendaStep == 1)
        fctPrepareAgenda(2);
    else
        fctAgendaEnd();
}

function fctAgendaEnd()
{
    openTab('noButton', 'idTurnOrderTab');
    fctNewTurn();
}

filterSelection("all")
function filterSelection(c) {
  var x, i;
  x = document.getElementsByClassName("filterDiv");
  if (c == "all") c = "";
  // Add the "show" class (display:block) to the filtered elements, and remove the "show" class from the elements that are not selected
  for (i = 0; i < x.length; i++) {
    w3RemoveClass(x[i], "showflex");
    if ((x[i].className.indexOf(c) > -1) && (x[i].className.indexOf("displayNone") == -1)) w3AddClass(x[i], "showflex");
  }
}

// Add active class to the current control button (highlight it)
var btnContainer = document.getElementById("idPlanetFilters");
var btns = btnContainer.getElementsByClassName("btnFilter");
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function() {
    var current = document.getElementsByClassName("activeFilter");
    current[0].className = current[0].className.replace(" activeFilter", "");
    this.className += " activeFilter";
  });
}
