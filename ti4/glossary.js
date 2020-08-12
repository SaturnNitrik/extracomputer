/* Author: Stephane Demots */
const cVERSION = (1)*100 + (0);

var gRelatedLinkClick = false;

function pageInit()
{
    var d = new Date();

    /* Same date and same version, then don't show the intro */
    if( (fctLoadItem("date") == d.getDate()) && (fctLoadItem("cVERSION") == cVERSION) && (cVERSION != 0) )
    {
        document.getElementById("idHome").style.display = "none";
        document.getElementById("idGlossary").style.display = "initial";
    }
}

function fctGo()
{
    var d = new Date();

    fctSaveItem("cVERSION", cVERSION); 
    fctSaveItem("date", d.getDate()); 

    document.getElementById("idHome").style.display = "none";
    document.getElementById("idGlossary").style.display = "initial";
}

function fctSaveItem(i,v)
{
    localStorage.setItem(i, v);   
}

function fctLoadItem(i)
{
    return localStorage.getItem(i);
}

var acc = document.getElementsByClassName("clTopic");
var i,j;

for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function() {

        if(gRelatedLinkClick == false)
        {
            var panel = this.getElementsByClassName("clTopicText");
            var text = panel[0].style.display;

            /* Remove active from all topics */
            panel = document.getElementsByClassName("clTopic");
            for(j = 0; j < panel.length; j++)
                panel[j].classList.remove("active");

            /* Hide all topics */
            panel = document.getElementsByClassName("clTopicText");
            for(j = 0; j < panel.length; j++)
                panel[j].style.display = "none";

            if(text != "block")
            {
                /* Show activated topic */
                this.classList.toggle("active");

                /* Show current topic */
                panel = this.getElementsByClassName("clTopicText");
                panel[0].style.display = "block";
            }

            /* Set scrolling */
            this.scrollIntoView();
        }
        gRelatedLinkClick = false;
    });
}

function fctSearch() {
    var input, filter, li, a, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    li = document.getElementsByClassName("clTopic");
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByClassName("clTopicName")[0];
        txtValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "block";
        } else {
            li[i].style.display = "none";
        }
    }
}

function fctTarget(str)
{
    document.getElementById("myInput").value = str;
    fctSearch();
}

function fctRelatedLink(el)
{   
    document.getElementById("myInput").value = '';
    fctSearch();
    
    var clTopic = document.getElementsByClassName("clTopic");
    for(var j = 0; j < clTopic.length; j++)
    {
        clTopic[j].classList.remove("active");
    }

   /* Close all topics */
    clTopicText = document.getElementsByClassName("clTopicText");
    for(j = 0; j < clTopicText.length; j++)
        clTopicText[j].style.display = "none";

    var keyword =el.textContent.toUpperCase();

    /* Search keyword */
    var clTopic = document.getElementsByClassName("clTopic");
    var clTopicName = document.getElementsByClassName("clTopicName");
    for(var i=0; i< clTopicName.length ; i++)
    {
        var topic = clTopicName[i].textContent.toUpperCase();
        if(topic.includes( (i+1)*1 + " " + keyword))
        {
            /* Show activated topic */
            clTopic[i].classList.toggle("active");
            clTopic[i].style.display = "";

            /* Show current topic */
            clTopicText = clTopic[i].getElementsByClassName("clTopicText");
            clTopicText[0].style.display = "block";

            clTopic[i].scrollIntoView();
            i = clTopicName.length;
        }
    }

    gRelatedLinkClick = true;
}

function fctToTop()
{
    document.getElementById("myInput").scrollIntoView();
}

function fctLang(el,lg)
{
    var i,s;
    
    el.classList.toggle("langON");
    
    if(el.classList.contains("langON"))
        s = "inline";
    else
        s = "";
    
    var list = document.getElementsByClassName(lg);
    for(i=0; i<list.length; i++ )
        list[i].style.display = s;
}


function DEBUG(msg)
{
    // debug
    document.getElementById("idDebug").style.display = "block";
    document.getElementById("idDebug").innerHTML += msg + " / ";
}