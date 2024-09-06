/* Author: Stephane Demots */
var gAgendaPhase = 0;
var gStatusStep = 0;


function vpInit()
{
    //Set player VP
    var clVPPlayerCase = document.getElementsByClassName("clVPPlayerCase");
    for(idx = 0; idx < clVPPlayerCase.length; idx++)
    {
        if(idx < gSetupNbPlayer)
            clVPPlayerCase[idx].style.display = "inline-table";
        else
            clVPPlayerCase[idx].style.display = "none";
    }
    
    var clVPFactionIcon = document.getElementsByClassName("clVPFactionIcon");
    for( i=0; i<gSetupNbPlayer ; i++)
    {
        clVPPlayerCase[i].style.borderColor = playerColorList[gPlayerData[i][PLAYER_COLOR]];
        clVPFactionIcon[i].style.backgroundImage = 'url('+factionList[gPlayerData[i][PLAYER_FACTION]][FACTION_ICON]+')';
    }
    
    fctCustodian(0);
}

function fctVPEdit(el, edit)
{
    /* Get index */
    var nodes = document.querySelectorAll(".clVPButton");
    var nodes2 = document.querySelectorAll(".clVPPlayerCase");
    var index = [].indexOf.call(nodes, el);
    
    if(index >= 0)
        index = Math.floor((index)/2);
    else
        index = [].indexOf.call(nodes2, el);

    /* Update value */
    var clVPCount = document.getElementsByClassName("clVPCount");
    var newValue = clVPCount[index].textContent*1 + (edit*1);

    if(newValue > document.getElementById("idOptionVPWin").value)
    {
        newValue = 0;
        clVPCount[index].textContent = newValue.pad(2);
    }
    else
        clVPCount[index].textContent = newValue.pad(2);

    // Show end button
    document.getElementById("idEndButton").style.display = "";
    for(i=0;i< clVPCount.length; i++)
    {
        if( (clVPCount[i].textContent)*1 == document.getElementById("idOptionVPWin").value)
            document.getElementById("idEndButton").style.display = "block";
    }

    fctSaveVP(index, newValue);
}

function fctInfluInit()
{
    //Set player Influence
    var clPlayerCase = document.getElementsByClassName("clInfluPlayerCase");
    for(idx = 0; idx < clPlayerCase.length; idx++)
    {
        if(idx < gSetupNbPlayer)
            clPlayerCase[idx].style.display = "inline-table";
        else
            clPlayerCase[idx].style.display = "none";
    }
    
    var clFactionIcon = document.getElementsByClassName("clInfluFactionIcon");
    for( i=0; i<gSetupNbPlayer ; i++)
    {
        clPlayerCase[i].style.borderColor = playerColorList[gPlayerData[i][PLAYER_COLOR]];
        clFactionIcon[i].style.backgroundImage = 'url('+factionList[gPlayerData[i][PLAYER_FACTION]][FACTION_ICON]+')';
    }
}

function fctStatusPhase()
{  
    var i,j;
    var bFirstFaction = false;
    
    fctSetPhase(PHASE_STATUS);
    openTab('noButton', 'idStatusTab');
    
    document.getElementById("idStatus1").style.display = "block";
    document.getElementById("idStatus2").style.display = "none";
    gStatusStep = 0;
    
    /* Show faction initiative bar */
    var clFactionStatus = document.getElementsByClassName("clFactionStatus");
    var clArrow3 = document.getElementsByClassName("clArrow3");
    for(i=0; i<clFactionStatus.length; i++)
    {
        // If strategy is assigned
        if(strategyList[i][STRATEGY_PLAYER] < 8)
        {
            clFactionStatus[i].style.display = "inline";
            clFactionStatus[i].style.borderColor = playerColorList[gPlayerData[strategyList[i][STRATEGY_PLAYER]][PLAYER_COLOR]];
            clFactionStatus[i].style.backgroundImage = 'url('+factionList[gPlayerData[strategyList[i][STRATEGY_PLAYER]][PLAYER_FACTION]][FACTION_ICON]+')';
            clFactionStatus[i].textContent = getPlayerFaction(strategyList[i][STRATEGY_PLAYER],FACTION_SHORTNAME);
            if (bFirstFaction == true) 
                clArrow3[i].style.display = "block"
            else
                bFirstFaction = true;
            // Remove duplicate
            for(j=i+1; j<strategyList.length; j++)
                if(strategyList[i][STRATEGY_PLAYER] == strategyList[j][STRATEGY_PLAYER])
                    strategyList[j][STRATEGY_PLAYER] = 255;
        }
        // Hide
        else
        {
            clFactionStatus[i].style.display = "none";
            //if (i< clArrow3.length) 
                clArrow3[i].style.display = "";
        }
    }
    
    
}

function fctStatusNext()
{
    document.getElementById("idStatus1").style.display = "none";
    
    if(gAgendaPhase == 1)
    {
        fctSaveItem("gAgendaPhase", gAgendaPhase);
        fctNewAgenda();
    }
    else
    {
        if(gStatusStep == 0)
        {
            /* Mecatol Rex page */
            document.getElementById("idStatus2").style.display = "block";
            gStatusStep++;
        }
        else
        {
            openTab('noButton', 'idTurnOrderTab');
            fctNewTurn();
        }
    }
}

function fctMecatolRex(s)
{
    var m1 = document.getElementById("idMecatolFree1");
    var m2 = document.getElementById("idMecatolFree2");
    
    if(s == 0 && gAgendaPhase == 0)
    {
        fctCustodian(0);
    }
    else
    {
        fctCustodian(1);
        
        if(s == 2 && gAgendaPhase == 0)
        {
            m2.style.display = "block";
            m1.style.display = "none";
            gAgendaPhase = 1;
        }
        else if(s == 2 && gAgendaPhase == 1)
        {
            m1.style.display = "block";
            m2.style.display = "none";
            gAgendaPhase = 0;
        }
    }
}

function fctCustodian(i)
{
    var e = document.getElementById("idCustodians");
    
    if(i)
        e.textContent = gWord[W_CUSTODIANS_LEFT][gLang];
    else
        e.textContent = gWord[W_CUSTODIANS_STILL][gLang];
}


function fctEndGame()
{
    var i;
    var rank = [0,1,2,3,4,5,6,7];
    var rk=0;
    
    openTab('noButton', 'idEndGame');
    fctSetPhase(PHASE_END);
    fctClock('off');

    // Hide all 
    document.getElementById("idEndButton").style.display = "none";
    document.getElementById("idVPMeter").style.display = "none";
    document.getElementsByClassName("clNavBar")[0].style.display = "none";
    
    // Get VP ranking
    fctDisplayAll("clVPPlayerCase", "");

    var clVPCount = document.getElementsByClassName("clVPCount");
    var target = (document.getElementById("idOptionVPWin").value*1)+1 ;
    do
    {
        target--;
        for(i=0; i < clVPCount.length; i++)
        {
            if( ((clVPCount[i].textContent)*1) == target)
            {
                rank[rk] = i;
                rk++;
            }
        }
        
    }while(target > 0);
        
    // The Emperor frame
    document.getElementById("idEmperor").src = IMG_FOLDER + "h_" + getPlayerFaction(rank[0], FACTION_SHORTNAME) + ".png";
    document.getElementById("idEmperor").style.borderColor = playerColorList[gPlayerData[rank[0]][PLAYER_COLOR]];
    document.getElementById("idEmperor").style.opacity = 1;
    document.getElementById("idStats").style.opacity = 1;
    

    // Show ranking
    var clRk = document.getElementsByClassName("clRk");
    var clRkIcon = document.getElementsByClassName("clRkIcon");
    var clRkFaction = document.getElementsByClassName("clRkFaction");
    var clRkVP = document.getElementsByClassName("clRkVP");
    var clRkTimer = document.getElementsByClassName("clRkTimer");
    var clRkSpeaker = document.getElementsByClassName("clRkSpeaker");
    var clRkInfluence = document.getElementsByClassName("clRkInfluence");

    for(i=0;i<gSetupNbPlayer; i++)
    {
        clRk[i].style.display = "table-row";
        clRkIcon[i].src = factionList[gPlayerData[rank[i]][PLAYER_FACTION]][FACTION_ICON];
        clRkFaction[i].textContent = getPlayerFaction(rank[i], FACTION_NAME);
        clRkVP[i].textContent = clVPCount[rank[i]].textContent;
        clRkTimer[i].textContent = fctTransformTime(gPlayerData[rank[i]][PLAYER_CLOCK]);
        clRkSpeaker[i].textContent = gPlayerData[rank[i]][PLAYER_NBSPEAKER];
        clRkInfluence[i].textContent = gPlayerData[rank[i]][PLAYER_INFLUENCE];
    }
    
    //Timing
    document.getElementById("idEndGameDuration").textContent = fctTransformTime(gGameDuration);
    document.getElementById("idEndRound").textContent = gTurnCounter;
    
    //Report to Google doc
    fctSendReport(rank[0]);
}

function fctSendReport(winner)
{
    if(document.getElementById("idGameReport") || (gGameDuration < 3600 ))
    {
        /* report already created or duration less than 1h, nothing to do */
    }
    else
    {
        var doclink = 
            "https://docs.google.com/forms/d/e/1FAIpQLSfOAvsfHuKdvRPi-ReLro0H4yk7MM4vyJoTm66yu0H_LZf6lA/formResponse?usp=pp_url"
            +"&entry.279537426="+gSetupNbPlayer
            +"&entry.629737312="+gGameDuration
            +"&entry.1034795944="+fctGetFactionCode()
            +"&entry.1554533012="+gTurnCounter
            +"&entry.802694030="+document.getElementById("idOptionVPWin").value
            +"&entry.121973246="+String.fromCharCode((gLang*1)+48,  (gPlayerData[winner][PLAYER_FACTION])*1+65)
            +"&submit=Submit";
        
        var ifrm = document.createElement("iframe");
            ifrm.setAttribute("src", doclink);
            ifrm.id = "idGameReport";
            ifrm.style.width = "1px";
            ifrm.style.height = "1px";
            ifrm.style.display = "none";
            document.getElementById("idEndScreen").appendChild(ifrm);
    }
}

function fctGetFactionCode()
{
    var i;
    var code="";
    for(i=0;i<gPlayerData.length; i++)
    {
        if(i<gSetupNbPlayer)
            code += String.fromCharCode((gPlayerData[i][PLAYER_FACTION]*1)+65);
        else
            code += String.fromCharCode(48); //48 = "0"
    }

    return code;
}


function fctEndBack()
{
    openTab('noButton', 'idTurnOrderTab');
    // Show all 
    document.getElementById("idEndButton").style.display = "block";
    document.getElementById("idVPMeter").style.display = "block";
    document.getElementsByClassName("clNavBar")[0].style.display = "flex";
}