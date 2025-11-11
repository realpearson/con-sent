//--------------------TOS TEXT----------------------
const TOS_TEXT = [
    "We value your data, that's why we demand you hand it over to us to sell",
    
    "O̷̘̾ȗ̴̘ṛ̴͠ ̵̞̇p̴͇͌r̶̭͑ĩ̶̺v̵͔͝ḁ̸́c̴͉̓y̶̧͘ ̵͗ͅp̵̖͐ö̷͙l̴͍͆i̴̹͐c̶̹͌y̶͈͘ ̵̟̌ì̷ͅs̸̹̋ ̴̲͝t̴̰̓h̴̻̿a̶̻͛t̴̮͗ ̴̩̿y̷̝̽ó̸̧u̵̮͝ ̷̨̌ḫ̶̎a̴͇͑v̴͚͐e̸̞͑ ̴̭̿ǹ̵̥ő̶͎ ̷̨̂p̵͖̂r̷̮͗ȉ̸̲v̷̦̅a̸͈̎c̵̞̈́y̷̯͝",

    "These terms are subject to change at any point in the future or past",

    "Your privacy means less than nothing to us",

    "I understand that by even having negative thoughts about The Company makes me liable to invasive brain surgery to extract the valuable data goo contained within my skull. Also we may do anyway.",

    "By not consenting to this form I consent to this form.",

    "If you are reading this then you have already consented to the terms outlined in the TOS.",

    "If you have any questions please contact our armed persuasive enforcement team that will visit you shortly to clarify any misunderstandings.",

    "I hereby renege all standard legal remedies and agree that all disputes will be settled in the Dome of Dispute in the state of Delaware where I will fight other dissatisfied customers to the death in order to make a 30 second plea to an AI judge that upon dismissing my case will open a secret door to a fiery cavern beneath my feet where I will plummet to my imminent (but slow) death.",

    "Our blood-thirst dominion over the world is our civic duty to reorganise the known universe in a way that aligns with our shareholders interests, what you are you an evil socialist or something? That’s what we thought now bow to the one true God: Capitalism (Capitalism is hereby defined as everything that only benefits us and harms you, so don’t get smart with us economists)",

]

//State Selection
if(document.getElementById("landing_state")) setupLandingState();
else if(document.getElementById("bank_state")) setupBankState();
else if(document.getElementById("kidnap_state")) setupKidnapState();
else if(document.getElementById("audience_state")) setupAudienceState();


function setupLandingState(){
    console.log("landing_state");

    const enterButton = document.getElementById("enter_button");

    enterButton.addEventListener("pointerdown", () => {
        window.location.href = "bank.html";
    });

}

function setupBankState(){
    console.log("bank_state");

    //------------------------ Modal ---------------------------
    const modal = document.getElementById("myModal");
    const loginBttn = document.getElementById("login");
    if(window.innerWidth > 450) loginBttn.style.left = "25%";
    else loginBttn.style.float = "right";

    //const span = document.getElementsByClassName("close")[0];

    // Modal Open Logic
    loginBttn.addEventListener("pointerdown", () => {
        modal.style.display = "block";
        SetupDarkPattern();
    });

    const dontPush = document.getElementById("dontpush");
    dontPush.addEventListener("pointerdown", () => {
        modal.style.display = "block";
        SetupDarkPattern();
    });

    /*
    //CLOSE MODAL LOGIC

    span.onclick = function() {
    modal.style.display = "none";
    }


    window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
    }
    */


    //Generate TOS
    const numTerms = 6;
    const ulElement = document.getElementById("tos_list");

    for(let i = 0; i < numTerms; i++){
        const ind = Math.floor(Math.random() * (TOS_TEXT.length));

        const liItem = document.createElement("li");
        liItem.appendChild(document.createTextNode(TOS_TEXT.splice(ind, 1)[0]));
        ulElement.appendChild(liItem);
    }

    ///////////Dark Pattern Functions////////////
    function buttonVanishMouseOver(){
        //Deny Button Vanishes (mouseover)
        const denyBttn = document.getElementById("deny_button");
        denyBttn.addEventListener("pointermove", () => {
            denyBttn.style.display = "none";
        });
    }

    function buttonVanishClick(){
        //Deny Button Vanishes (click)
        const denyBttn = document.getElementById("deny_button");
        denyBttn.addEventListener("pointerdown", () => {
            denyBttn.style.display = "none";
        });
    }

    function buttonAvoid(){
        //Deny Button Moves Away
    }

    function buttonSwitch(){
        //Deny Button Turns To Accept
        const denyBttn = document.getElementById("deny_button");
        let switched = false;
        denyBttn.addEventListener("pointerdown", () => {
            if(switched) return;
            switched = true;
            denyBttn.textContent = "Accept";
            denyBttn.addEventListener("pointerdown", checkIfSelected);

        });
    }


    function mouseFollow(){
        //Accept Follows Mouse
        const acceptBttn = document.getElementById("accept_button");
        document.body.appendChild(acceptBttn);
        const modal =  document.getElementById("modal_content");
        modal.addEventListener("pointerenter", () => {document.body.appendChild(acceptBttn);});
        modal.addEventListener("pointermove", (e) => {
            
            acceptBttn.style.position = "absolute";
            
            const rect = modal.getBoundingClientRect();
            console.log(rect.bottom);
            acceptBttn.style.left = (e.clientX-15)+ "px";
            acceptBttn.style.top = (e.clientY-15) + "px";
            acceptBttn.style.zIndex = 1;
        })
    }

    let prevX = 0;
    let prevY = 0;

    function mouseRepell(){
        //Accept Follows Mouse
        const denyBttn = document.getElementById("deny_button");
        const modal =  document.getElementById("modal_content");
        console.log(modal.getBoundingClientRect().left)
        modal.addEventListener("pointerenter", (e) => {
            prevX = e.clientX;
            prevY = e.clientY;
        })
        modal.addEventListener("pointermove", (e) => {
            denyBttn.style.position = "absolute";
            //console.log(e.offsetX);
            //const rect = modal.getBoundingClientRect();
            const nX = e.clientX-prevX;
            const nY = e.clientY-prevY;
            prevX = e.clientX;
            prevY = e.clientY;

            denyBttn.style.left = (denyBttn.offsetLeft + nX)+ "px";
            denyBttn.style.top = (denyBttn.offsetTop + nY) + "px";
        })
    }


    function SetupDarkPattern(){
        const darkPatterns = [buttonVanishMouseOver, buttonVanishClick, buttonSwitch, mouseFollow, mouseRepell];
        if(window.innerWidth <= 450) {
            darkPatterns.length = 0;
            darkPatterns.push(buttonVanishClick);
            darkPatterns.push(buttonSwitch);
        }
        const modalBttns = document.getElementById("modal_buttons");
        modalBttns.style.position = "relative";
        modalBttns.style.left = "38%";
        const acceptBttn = document.getElementById("accept_button");
        acceptBttn.addEventListener("pointerdown", checkIfSelected);

        //Select a random dark pattern
        darkPatterns[Math.floor(Math.random() * (darkPatterns.length))]();
    }


    ///////////Lottery Logic////////////
    const selectionChance = 0.5;

    function checkIfSelected(){
        if(Math.random() < selectionChance) navigateToKidnap()
        else navigateToAudience();
    }

    function navigateToKidnap(){
        //Some delay?
        console.log("uh oh")
        window.location.href = "kidnap.html";
    }

    function navigateToAudience(){
        //Some delay?
        console.log("who watches the watchers");
        window.location.href = "audience.html"
    }
}

function setupKidnapState(){
    console.log("kidnap_state");
    //Instantiate popups...
    const view = document.getElementById("kidnap_state");
    
    function moveSpawn(e){
        if(Math.random() < 0.95) return;
        const img = document.createElement("img");
        img.src = "assets/images/Popup Window.png";
        img.style.position = "absolute";
        img.style.left = e.clientX + "px";
        img.style.top = e.clientY + "px";
        img.style.width = "50%";
        view.appendChild(img);

    }

    view.addEventListener("pointermove", moveSpawn);
    view.addEventListener("drag", moveSpawn);
}

function setupAudienceState(){
    console.log("audience_state");
    //Instantiate glitch logic
    
    let elt;

    function spawnGlitch(){
        document.body.style.backgroundImage = "url('/assets/images/glitch.png')";
        document.body.style.backgroundPosition = "1050% 2000%";
        setTimeout(clearGlitch, 10);
    }

    function clearGlitch(){
        document.body.style.backgroundImage = "none";
        setTimeout(spawnGlitch, Math.random()*1000);
    }

    spawnGlitch();
}



//------------------------Collapsable Menu---------------------------

const collapsibles = document.getElementsByClassName("collapsible");
const collapsibleContent = document.getElementsByClassName("expanded");

let expandedIndex = -1;


for (let i = 0; i < collapsibles.length; i++) {


  collapsibles[i].addEventListener("click", function() {
    console.log(expandedIndex)
    if(expandedIndex > -1 && expandedIndex != i){
        collapsibleContent[expandedIndex].style.display = "none";
        collapsibles[expandedIndex].classList.toggle("active");
        expandedIndex = -1;
    }
    
    this.classList.toggle("active");
    const content = collapsibleContent[i];//this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
      expandedIndex = -1;
    } else {
      content.style.display = "block";
      expandedIndex = i;
    }
  });
}


