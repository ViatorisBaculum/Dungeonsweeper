(()=>{"use strict";const e={typeDistribution:{Rat:.4,Zombie:.3,Skeleton:.1,Ghost:.1,Witch:.1,Boss:0},expToNextLevel:[100,200,300,400],boardDefaults:{width:40,height:20,minesFrequency:.3,evolutionRate:.2,invertClicks:!1,removeFlags:!1},playerClass:"Warrior",monsterKeys:{0:"E",1:"R",2:"Z",3:"S",4:"G",5:"W",6:"B"},experienceGain:{open:1,multiplicator:3}};class t{constructor(){this._experience=0,this._health=0,this.maxHealth=0,this._level=1,this._score=0,this.heartContainers=[],this._HTMLHooks=this.loadHTMLHooks()}set experience(e){this._experience=e,this.gainLevel(),this.updateStatsheet()}get experience(){return this._experience}set health(e){this._health=e,this._health<=0&&h.getInstance().loseGame(),this.updateStatsheet()}get health(){return this._health}set level(e){this._level=e,this.updateStatsheet()}get level(){return this._level}set score(e){this._score=e,this.updateStatsheet()}get score(){return this._score}calculateScore(e){this.score=this.experience-e,this.score<0&&(this.score=0)}getAttacked(e){this.health-=e}gainExperience(e){this.experience+=e}gainLevel(){this.experience>e.expToNextLevel[this.level-1]&&(this.level+=1,h.getInstance().playerUp())}importHTMLElement(e){const t=document.getElementById(e);if(!t)throw new Error("No html element with id: "+e);return t}importHTMLProgressElement(e){const t=document.getElementById(e);if(!t)throw new Error("No html element with id: "+e);return t}loadHTMLHooks(){return{playerClassSpan:this.importHTMLElement("playerClass"),playerExperienceProgress:this.importHTMLProgressElement("experience"),playerHealthDiv:this.importHTMLElement("health"),playerLevelDiv:this.importHTMLElement("playerLevel"),playerScoreDiv:this.importHTMLElement("score")}}updateStatsheet(){this._HTMLHooks.playerClassSpan.innerText=this.className,this._HTMLHooks.playerLevelDiv.innerText=this._level.toString(),0===this.heartContainers.length&&this.addHearts(),this.styleHearts(),this.updateProgress(),this._HTMLHooks.playerScoreDiv.innerText="Score: "+this._score.toString()}addHearts(){for(let e=0;e<this.maxHealth;e++){const e=document.createElement("img");e.src="./res/heart.svg",e.alt="Health",e.classList.add("heart"),this.heartContainers.push(e),this._HTMLHooks.playerHealthDiv.appendChild(e)}}styleHearts(){this.heartContainers.forEach(((e,t)=>{t>=this.health?e.classList.add("colored"):e.classList.remove("colored")}))}updateProgress(){if(this._level<5){const t=this._level>1?e.expToNextLevel[this.level-2]:0;this._HTMLHooks.playerExperienceProgress.max=e.expToNextLevel[this.level-1]-t,this._HTMLHooks.playerExperienceProgress.value=this._experience-t}}}class s extends t{constructor(){super(),this.className="Assassin",this.health=2,this.maxHealth=this.health}}class i extends t{constructor(){super(),this.className="Mage",this.health=3,this.maxHealth=this.health}}class l extends t{constructor(){super(),this.className="Paladin",this.health=4,this.maxHealth=this.health}}class n extends t{constructor(){super(),this.className="Warrior",this.health=5,this.maxHealth=this.health}}var a;!function(e){e[e.Empty=0]="Empty",e[e.Rat=1]="Rat",e[e.Zombie=2]="Zombie",e[e.Skeleton=3]="Skeleton",e[e.Ghost=4]="Ghost",e[e.Witch=5]="Witch",e[e.Boss=6]="Boss"}(a||(a={}));class r{constructor(e,t,s,i,l,n){this.isClicked=!1,this.isFlagged=!1,this.gameInstance=h.getInstance(),this.type=e,this.board=t,this.value=n,this.x=s,this.y=i,this.HTMLElement=l,this.addEventListeners(),"Assassin"===this.gameInstance.player.className&&(this.rightClick=this.rightClickAssassin)}activateCell(e){this.revealCell(),this.addExperience(e)}addExperience(e){this.gameInstance.player.gainExperience(e)}attackPlayer(t){t||0===t||(t=this.type-this.gameInstance.player.level+1),t>0&&this.gameInstance.player.getAttacked(t),this.addExperience(this.type*e.experienceGain.multiplicator),this.gameInstance.player.health>0&&this.type===a.Boss&&this.gameInstance.winGame()}click(){void 0!==this.value&&this.activateCell(e.experienceGain.open),0===this.value&&this.type===a.Empty&&this.clickNeighbors(),this.type>0&&void 0===this.value&&(this.attackPlayer(),this.activateCell(0))}getBlankNeighbors(){for(let e=-1;e<=1;e++)for(let t=-1;t<=1;t++){const s=this.board.getCell(this.x+e,this.y+t);s&&s.value}}clickNeighbors(){for(let t=-1;t<=1;t++)for(let s=-1;s<=1;s++){const i=this.board.getCell(this.x+t,this.y+s);!i||i.isClicked||i.isFlagged||(0===i.value?i.click():i.type===a.Empty?i.activateCell(e.experienceGain.open):i.type>a.Empty&&i.click())}}isAnyNeighborClicked(){for(let e=-1;e<=1;e++)for(let t=-1;t<=1;t++){const s=this.board.getCell(this.x+e,this.y+t);if(s&&s.isClicked)return!0}return!1}removeEventListeners(){this.HTMLElement.addEventListener("click",(e=>e.stopImmediatePropagation()),!0),this.HTMLElement.addEventListener("contextmenu",(e=>{e.stopImmediatePropagation(),e.preventDefault()}),!0)}revealCell(){this.isClicked=!0,this.animateReveal(),this.HTMLElement.classList.add("clicked"),this.value?this.HTMLElement.innerText=this.value.toString():!this.value&&this.type>0?(this.HTMLElement.innerText=this.translateType(this.type),this.HTMLElement.classList.add("monster",this.translateType(this.type))):this.HTMLElement.innerText=""}rightClick(e){e.preventDefault(),this.isClicked?this.clickNeighbors():(this.isFlagged=!this.isFlagged,this.toggleFlag())}rightClickAssassin(e){e.preventDefault(),this.isClicked?this.clickNeighbors():(this.activateCell(0),this.gameInstance.player.level===this.type?this.attackPlayer(0):this.gameInstance.player.level<this.type?this.attackPlayer():this.attackPlayer(1))}translateType(t){if(t>0)return e.monsterKeys[t];throw new Error("cell: translateType: Unknown CellType")}addEventListeners(){this.gameInstance.invertClicks?(this.HTMLElement.addEventListener("click",(e=>this.rightClick(e)),!1),this.HTMLElement.addEventListener("contextmenu",(()=>this.click()),!1)):(this.HTMLElement.addEventListener("click",(()=>this.click()),!1),this.HTMLElement.addEventListener("contextmenu",(e=>this.rightClick(e)),!1))}toggleFlag(){this.isFlagged?(this.HTMLElement.innerHTML="F",this.HTMLElement.classList.add("flagged")):(this.HTMLElement.innerHTML="",this.HTMLElement.classList.remove("flagged"))}animateReveal(){this.HTMLElement.checkVisibility()&&(this.HTMLElement.classList.remove("shrinked"),this.HTMLElement.classList.add("shrinked"))}}class o{constructor(t,s,i,l=e.typeDistribution){this.cells=[],this.validateDistribution(l),this._minesFrequency=i,this._width=t,this._height=s,this.fillBoard(l),this.determineCellValues(),this.DBG_printCellValues(),this.updateCSSVariables(t,s),this.writeValues(!1)}evoluteMonster(){this.getRemainingMonster().forEach((t=>{Math.random()<=e.boardDefaults.evolutionRate&&t.type<a.Witch&&(t.type+=1)})),this.determineCellValues(),this.DBG_printCellValues()}getCell(e,t){return this.cells[e]&&this.cells[e][t]?this.cells[e][t]:void 0}getCellType(e,t){return this.getCell(e,t)?this.cells[e][t].type:a.Empty}indicateLevelGain(){const e=document.getElementById("app");e&&(e.classList.remove("highlight"),e.offsetWidth,e.classList.add("highlight"))}openStartArea(){const e=Math.round(Math.random()*(this._height-1)),t=Math.round(Math.random()*(this._width-1));let s=this.cells[e][t];for(;0!==s.value;){let e=Math.round(Math.random()*(this._height-1)),t=Math.round(Math.random()*(this._height-1));s=this.cells[e][t]}s.click(),s.HTMLElement.scrollIntoView({behavior:"smooth",block:"center",inline:"center"})}removeEventHandler(){for(let e=0;e<this._height;e++)for(let t=0;t<this._width;t++)this.cells[e][t].removeEventListeners()}removeAllFlags(){for(let e=0;e<this._height;e++)for(let t=0;t<this._width;t++)this.cells[e][t].isFlagged&&(this.cells[e][t].isFlagged=!1,this.cells[e][t].toggleFlag())}revealBoard(){this.cells.forEach((e=>{e.forEach((e=>{e.isClicked||(e.HTMLElement.classList.add("notClicked"),e.revealCell())}))}))}appendCell(e,t,s){const i=document.getElementById("app");if(!i)throw new Error("board: appendCell: No #app div found");const l=document.createElement("button"),n=new r(s,this,e,t,l);i.appendChild(l),this.cells[e].push(n)}createUrn(e){const t=this._width*this._height,s=this._minesFrequency*t,i=t*(1-this._minesFrequency),l=new Array(t).fill(a.Empty,0,i-1);l.fill(a.Boss,i-1,i);const n=i+e.Rat*s,r=n+e.Zombie*s,o=r+e.Skeleton*s,h=o+e.Ghost*s,c=h+e.Witch*s,d=c+e.Boss*s;return l.fill(a.Rat,i,n),l.fill(a.Zombie,n,r),l.fill(a.Skeleton,r,o),l.fill(a.Ghost,o,h),l.fill(a.Witch,h,c),l.fill(a.Boss,c,d),l.sort((()=>.5-Math.random()))}determineCellValues(){this.cells.forEach(((e,t)=>{e.forEach(((e,s)=>{if(e.type===a.Empty){let i=0;i+=this.getCellType(t-1,s-1),i+=this.getCellType(t-1,s+0),i+=this.getCellType(t-1,s+1),i+=this.getCellType(t+0,s-1),i+=this.getCellType(t+0,s+1),i+=this.getCellType(t+1,s-1),i+=this.getCellType(t+1,s+0),i+=this.getCellType(t+1,s+1),e.value=i}}))}))}fillBoard(e){const t=this.createUrn(e);for(let e=0;e<this._height;e++){this.cells.push([]);for(let s=0;s<this._width;s++)this.appendCell(e,s,t.pop())}}getRemainingMonster(){let e=[];return this.cells.forEach((t=>{t.forEach((t=>{!t.isAnyNeighborClicked()&&t.type>a.Empty&&!t.isClicked&&e.push(t)}))})),e}updateCSSVariables(e,t){const s=document.querySelector(":root");if(!s)throw new Error("No :root found");s.style.setProperty("--cols",e.toString()),s.style.setProperty("--rows",t.toString())}validateDistribution(e){let t=0;for(const[s,i]of Object.entries(e))t+=i;if(Math.abs(t-1)<Number.EPSILON)return!0;throw new Error("Provided typeDistribution doesn't sum to 1. Sum of proportions is "+t)}DBG_printCellValues(){let e="";this.cells.forEach((t=>{let s="";t.forEach((e=>{e.type===a.Empty?s+=e.value+"\t":s+=e.translateType(e.type)+"\t"})),e+=s.trim()+"\n"})),console.log(e.trim())}writeValues(e){!0===e&&this.cells.forEach((e=>{e.forEach((e=>{e.type&&(e.HTMLElement.innerText=e.translateType(e.type))}))}))}}class h{constructor(){var e;this._gameTimer=0,null===(e=document.getElementById("resetButton"))||void 0===e||e.addEventListener("click",(()=>this.resetGame())),this._gameSettings=this.loadDefaultSettings()}static getInstance(){return this.instance?this.instance:this.instance=new h}set board(e){this._board=e}get board(){if(!this._board)throw new Error("Board was not initialized!");return this._board}set player(e){this._player=e}get player(){if(!this._player)throw new Error("Player was not initialized!");return this._player}get timer(){if(this._timer)return this._timer}get invertClicks(){return this._gameSettings.invertClicks}get removeFlags(){return this._gameSettings.removeFlags}createBoard(){this.board=new o(this._gameSettings.width,this._gameSettings.height,this._gameSettings.minesFrequency)}createPlayer(){switch(this._gameSettings.playerClass){case"Assassin":this.player=new s;break;case"Mage":this.player=new i;break;case"Paladin":this.player=new l;break;case"Warrior":this.player=new n}}loadDefaultSettings(){return{width:e.boardDefaults.width,height:e.boardDefaults.height,minesFrequency:e.boardDefaults.minesFrequency,playerClass:e.playerClass,invertClicks:e.boardDefaults.invertClicks,removeFlags:e.boardDefaults.removeFlags}}loseGame(){this.endGame(),alert("You lost! :(")}playerUp(){this.board.indicateLevelGain(),this.board.evoluteMonster(),this._gameSettings.removeFlags&&this.board.removeAllFlags()}resetGame(){const e=document.getElementById("app");e&&(e.innerHTML=""),this.resetHeartContainer(),this.startGame()}setSettings(){this._gameSettings.width=+this.getValueFromInput("inputWidth"),this._gameSettings.height=+this.getValueFromInput("inputHeight"),this._gameSettings.minesFrequency=+this.getValueFromInput("minesFrequency"),this._gameSettings.playerClass=this.getValueFromInput("selectClass"),this._gameSettings.invertClicks=document.getElementById("invertClicks").checked,this._gameSettings.removeFlags=document.getElementById("removeFlags").checked,localStorage.setItem("instance",JSON.stringify(this._gameSettings))}getSettings(){const e=localStorage.getItem("instance");if(null!==e){const t=JSON.parse(e);this.setValueToInput("inputWidth",t.width),this.setValueToInput("inputHeight",t.height),this.setValueToInput("minesFrequency",t.minesFrequency),this.setValueToInput("selectClass",t.playerClass),this.setValueToToggle("invertClicks",t.invertClicks),this.setValueToToggle("removeFlags",t.removeFlags)}}startGame(){var e;document.getElementById("modal")&&this.setSettings(),this.createPlayer(),this.createBoard(),null===(e=this._board)||void 0===e||e.openStartArea(),this.resetTimer(),this._timer=setInterval((()=>this.countSeconds()),1e3)}winGame(){this.endGame(),alert("You won!")}countSeconds(){this._gameTimer++,this.player.calculateScore(this._gameTimer)}endGame(){this.stopTimer(),this.board.revealBoard(),this.board.removeEventHandler()}getValueFromInput(e){const t=document.getElementById(e);if(t)return t.value;throw new Error("gameMaster: getValueFromHTML: HTML does not exist")}setValueToInput(e,t){const s=document.getElementById(e);if(!s)throw new Error("gameMaster: getValueFromHTML: HTML does not exist");s.value=t}setValueToToggle(e,t){const s=document.getElementById(e);if(!s)throw new Error("gameMaster: getValueFromHTML: HTML does not exist");s.checked=t}resetTimer(){this.stopTimer(),this._gameTimer=0}resetHeartContainer(){const e=document.getElementById("health");e&&(e.innerHTML="")}stopTimer(){clearInterval(this._timer)}}class c{constructor(t,s){this.modalSettings={cancelButton:!1},this.parentNode=t,this.modalSettings=s||this.modalSettings;const i=document.getElementById("template-modal");if(!i)throw new Error("No modal-template found");this.node=i.content.cloneNode(!0),this.node=t.appendChild(this.node),this.setCancelAction(),this.parseModalSettings(),this.setDefaultClass(),this.setClassTitle(e.playerClass),this.addEventListener()}destroyModal(){var e;null===(e=document.getElementById("modal-bg"))||void 0===e||e.remove()}parseModalSettings(){var e;this.modalSettings.cancelButton||null===(e=document.getElementById("modal-cancel"))||void 0===e||e.remove(),this.modalSettings.title&&this.setTitle(this.modalSettings.title),this.modalSettings.subtitle&&this.setSubTitle(this.modalSettings.subtitle),this.modalSettings.text&&this.setText(this.modalSettings.text)}setSubTitle(e){const t=document.getElementById("modal-subtitle");t&&(t.innerText=e)}setTitle(e){const t=document.getElementById("modal-title");t&&(t.innerText=e)}setClassTitle(e){const t=document.getElementById("modal-class");t&&(t.innerText=e,this.setClassText(e))}setClassText(e){const t=document.getElementById("modal-classDescription");if(t)switch(e){case"Assassin":t.innerText="The assassin can kill Monster on his Level blabla";break;case"Warrior":t.innerText="The warrior gains hearts on level up";break;case"Paladin":t.innerText="The paladin has high health to begin with";break;case"Mage":t.innerText="The mage can throw fire balls"}}setSlotContent(e){const t=document.getElementById("modal-slot");t&&(t.innerHTML=e)}setText(e){const t=document.getElementById("modal-text");t&&(t.innerText=e)}setDefaultClass(){setTimeout((()=>{const t=document.getElementById("selectClass");t&&(t.value=e.playerClass)}),100)}setConfirmAction(e){const t=document.getElementById("modal-confirm");t&&t.addEventListener("click",(()=>{e(),this.destroyModal()}))}setCancelAction(e){const t=document.getElementById("modal-cancel");t&&t.addEventListener("click",(()=>{e&&e(),this.destroyModal()}))}addEventListener(){setTimeout((()=>{const e=document.getElementById("selectClass");console.log(e),e&&e.addEventListener("change",(()=>this.setClassTitle(e.value)))}),1e3)}}const d=document.getElementById("template-settings"),m=document.getElementById("menu");let g=0;!function(){const e=document.getElementById("openSettings");!function(){if(!d)throw new Error("No settings template found");const e=new c(document.body);e.setTitle("New Game"),e.setSubTitle("Welcome to DungeonSweeper"),e.setText("This is a more elaborate version of MineSweeper with RPG elements such as classes, leveling and different enemies. Please choose your starting configuration."),e.setSlotContent(d.innerHTML),e.setConfirmAction((()=>(m&&"flex"===m.style.display?m.style.display="none":m&&"none"===m.style.display&&(m.style.display="flex"),void h.getInstance().resetGame())))}(),e&&e.addEventListener("click",(()=>function(){if(!d)throw new Error("No settings template found");const e=new c(document.body,{cancelButton:!0});e.setTitle("Game Settings"),e.setText("Please choose the settings for your next round"),e.setSlotContent(d.innerHTML),e.setConfirmAction((()=>h.getInstance().resetGame()))}()),!1);const t=document.getElementById("reset");t&&t.addEventListener("click",(()=>{h.getInstance().resetGame()}),!1),m&&(m.style.display="none"),h.getInstance().getSettings(),document.addEventListener("wheel",(e=>function(e){console.log(e.deltaY);const t=document.documentElement;if(!t)throw new Error("No :root found");let s=+getComputedStyle(t).getPropertyValue("--button-size").replace("em","");e.deltaY>0?s+=.1:s-=.1,t.style.setProperty("--button-size",s+"em")}(e))),document.addEventListener("touchstart",(e=>function(e){2===e.touches.length&&(g=Math.hypot(e.touches[0].pageX-e.touches[1].pageX,e.touches[0].pageY-e.touches[1].pageY))}(e)),!1),document.addEventListener("touchmove",(e=>function(e){if(2===e.touches.length&&2==e.changedTouches.length){const t=Math.hypot(e.touches[0].pageX-e.touches[1].pageX,e.touches[0].pageY-e.touches[1].pageY),s=document.documentElement;if(!s)throw new Error("No :root found");let i=+getComputedStyle(s).getPropertyValue("--button-size").replace("em","");const l=document.getElementById("menu");t>g&&l?i+=.03:i-=.03,s.style.setProperty("--button-size",i+"em")}}(e)),!1)}()})();