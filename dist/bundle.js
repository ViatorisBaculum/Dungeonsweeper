(()=>{"use strict";const e={typeDistribution:{Rat:.4,Zombie:.3,Skeleton:.1,Ghost:.1,Witch:.1,Boss:0},expToNextLevel:[100,200,300,400],boardDefaults:{width:40,height:20,minesFrequency:.15,evolutionRate:.2},playerClass:"Warrior",monsterKeys:{0:"E",1:"R",2:"Z",3:"S",4:"G",5:"W",6:"B"}};class t{constructor(){this._experience=0,this._health=0,this.maxHealth=0,this._level=1,this._score=0,this.heartContainers=[],this._HTMLHooks=this.loadHTMLHooks()}set experience(e){this._experience=e,this.gainLevel(),this.updateStatsheet()}get experience(){return this._experience}set health(e){this._health=e,this._health<=0&&o.getInstance().loseGame(),this.updateStatsheet()}get health(){return this._health}set level(e){this._level=e,this.updateStatsheet()}get level(){return this._level}set score(e){this._score=e,this.updateStatsheet()}get score(){return this._score}calculateScore(e){this.score=e+this.experience}getAttacked(e){this.health-=e}gainExperience(e){this.experience+=e}gainLevel(){this.experience>e.expToNextLevel[this.level-1]&&(this.level+=1,o.getInstance().playerUp())}importHTMLElement(e){const t=document.getElementById(e);if(!t)throw new Error("No html element with id: "+e);return t}loadHTMLHooks(){return{playerExperienceDiv:this.importHTMLElement("experience"),playerHealthDiv:this.importHTMLElement("health"),playerLevelDiv:this.importHTMLElement("playerLevel"),playerScoreDiv:this.importHTMLElement("score")}}updateStatsheet(){this._HTMLHooks.playerLevelDiv.innerText=this._level.toString(),0===this.heartContainers.length&&this.addHearts(),this.styleHearts(),this._HTMLHooks.playerExperienceDiv.innerText="Exp: "+this._experience.toString(),this._HTMLHooks.playerScoreDiv.innerText="Score: "+this._score.toString()}addHearts(){for(let e=0;e<this.maxHealth;e++){const e=document.createElement("img");e.src="./res/heart.svg",e.alt="Health",e.classList.add("heart"),this.heartContainers.push(e),this._HTMLHooks.playerHealthDiv.appendChild(e)}}styleHearts(){this.heartContainers.forEach(((e,t)=>{t>=this.health?e.classList.add("colored"):e.classList.remove("colored")}))}}class s extends t{constructor(){super(),this.className="Assassin",this.health=2,this.maxHealth=this.health}}class i extends t{constructor(){super(),this.className="Mage",this.health=3,this.maxHealth=this.health}}class l extends t{constructor(){super(),this.className="Paladin",this.health=4,this.maxHealth=this.health}}class r extends t{constructor(){super(),this.className="Warrior",this.health=5,this.maxHealth=this.health}}var a;!function(e){e[e.Empty=0]="Empty",e[e.Rat=1]="Rat",e[e.Zombie=2]="Zombie",e[e.Skeleton=3]="Skeleton",e[e.Ghost=4]="Ghost",e[e.Witch=5]="Witch",e[e.Boss=6]="Boss"}(a||(a={}));class h{constructor(e,t,s,i,l,r){this.isClicked=!1,this.isFlagged=!1,this.type=e,this.board=t,this.value=r,this.x=s,this.y=i,this.HTMLElement=l,this.addEventListeners()}activateCell(){this.revealCell(),this.addExperience()}addExperience(){o.getInstance().player.gainExperience(1)}attackPlayer(){const e=o.getInstance(),t=this.type-e.player.level+1;t>=0&&e.player.getAttacked(t),e.player.gainExperience(this.type),e.player.health>0&&this.type===a.Boss&&e.winGame()}click(){void 0!==this.value&&this.activateCell(),0===this.value&&this.type===a.Empty&&this.clickNeighbors(),this.type>0&&void 0===this.value&&(this.attackPlayer(),this.activateCell())}getBlankNeighbors(){for(let e=-1;e<=1;e++)for(let t=-1;t<=1;t++){const s=this.board.getCell(this.x+e,this.y+t);s&&s.value}}clickNeighbors(){for(let e=-1;e<=1;e++)for(let t=-1;t<=1;t++){const s=this.board.getCell(this.x+e,this.y+t);!s||s.isClicked||s.isFlagged||(0===s.value?s.click():s.type===a.Empty?s.activateCell():s.type>a.Empty&&s.click())}}isAnyNeighborClicked(){for(let e=-1;e<=1;e++)for(let t=-1;t<=1;t++){const s=this.board.getCell(this.x+e,this.y+t);if(s&&s.isClicked)return!0}return!1}removeEventListeners(){this.HTMLElement.addEventListener("click",(e=>e.stopImmediatePropagation()),!0),this.HTMLElement.addEventListener("contextmenu",(e=>{e.stopImmediatePropagation(),e.preventDefault()}),!0)}revealCell(){this.isClicked=!0,this.animateReveal(),this.HTMLElement.disabled=!0,this.HTMLElement.classList.add("clicked"),this.value?this.HTMLElement.innerText=this.value.toString():!this.value&&this.type>0?(this.HTMLElement.innerText=this.translateType(this.type),this.HTMLElement.classList.add("monster",this.translateType(this.type))):this.HTMLElement.innerText=""}rightClick(e){e.preventDefault(),this.isClicked?this.clickNeighbors():(this.isFlagged=!this.isFlagged,this.toggleFlag())}translateType(t){if(t>0)return e.monsterKeys[t];throw new Error("cell: translateType: Unknown CellType")}addEventListeners(){this.HTMLElement.addEventListener("click",(()=>this.click()),!1),this.HTMLElement.addEventListener("contextmenu",(e=>this.rightClick(e)),!1)}toggleFlag(){this.isFlagged?this.HTMLElement.innerHTML="F":this.HTMLElement.innerHTML=""}animateReveal(){this.HTMLElement.checkVisibility()&&(this.HTMLElement.classList.add("shrinked"),this.HTMLElement.addEventListener("transitionend",(()=>{this.HTMLElement.classList.remove("shrinked")})))}}class n{constructor(t,s,i,l=e.typeDistribution){this.cells=[],this.validateDistribution(l),this._minesFrequency=i,this._width=t,this._height=s,this.fillBoard(l),this.determineCellValues(),this.DBG_printCellValues(),this.updateCSSVariables(t,s),this.writeValues()}evoluteMonster(){this.getRemainingMonster().forEach((t=>{Math.random()<=e.boardDefaults.evolutionRate&&t.type<a.Witch&&(t.type+=1)})),this.determineCellValues(),this.DBG_printCellValues()}getCell(e,t){return this.cells[e]&&this.cells[e][t]?this.cells[e][t]:void 0}getCellType(e,t){return this.getCell(e,t)?this.cells[e][t].type:a.Empty}indicateLevelGain(){const e=document.getElementById("app");e&&(e.classList.add("highlight"),e.addEventListener("transitionend",(()=>{e.classList.remove("highlight")})))}openStartArea(){const e=Math.round(Math.random()*(this._height-1)),t=Math.round(Math.random()*(this._width-1));let s=this.cells[e][t];for(;0!==s.value;){console.log(s);let e=Math.round(Math.random()*(this._height-1)),t=Math.round(Math.random()*(this._height-1));s=this.cells[e][t]}0===s.value&&s.click()}removeEventHandler(){for(let e=0;e<this._height;e++)for(let t=0;t<this._width;t++)this.cells[e][t].removeEventListeners()}revealBoard(){this.cells.forEach((e=>{e.forEach((e=>{e.isClicked||(e.HTMLElement.classList.add("notClicked"),e.revealCell())}))}))}appendCell(e,t,s){const i=document.getElementById("app");if(!i)throw new Error("board: appendCell: No #app div found");const l=document.createElement("button"),r=new h(s,this,e,t,l);i.appendChild(l),this.cells[e].push(r)}createUrn(e){const t=this._width*this._height,s=this._minesFrequency*t,i=t*(1-this._minesFrequency),l=new Array(t).fill(a.Empty,0,i-1);l.fill(a.Boss,i-1,i);const r=i+e.Rat*s,h=r+e.Zombie*s,n=h+e.Skeleton*s,o=n+e.Ghost*s,c=o+e.Witch*s,d=c+e.Boss*s;return l.fill(a.Rat,i,r),l.fill(a.Zombie,r,h),l.fill(a.Skeleton,h,n),l.fill(a.Ghost,n,o),l.fill(a.Witch,o,c),l.fill(a.Boss,c,d),l.sort((()=>.5-Math.random()))}determineCellValues(){this.cells.forEach(((e,t)=>{e.forEach(((e,s)=>{if(e.type===a.Empty){let i=0;i+=this.getCellType(t-1,s-1),i+=this.getCellType(t-1,s+0),i+=this.getCellType(t-1,s+1),i+=this.getCellType(t+0,s-1),i+=this.getCellType(t+0,s+1),i+=this.getCellType(t+1,s-1),i+=this.getCellType(t+1,s+0),i+=this.getCellType(t+1,s+1),e.value=i}}))}))}fillBoard(e){const t=this.createUrn(e);for(let e=0;e<this._height;e++){this.cells.push([]);for(let s=0;s<this._width;s++)this.appendCell(e,s,t.pop())}}getRemainingMonster(){let e=[];return this.cells.forEach((t=>{t.forEach((t=>{!t.isAnyNeighborClicked()&&t.type>a.Empty&&!t.isClicked&&e.push(t)}))})),e}updateCSSVariables(e,t){const s=document.querySelector(":root");if(!s)throw new Error("No :root found");s.style.setProperty("--cols",e.toString()),s.style.setProperty("--rows",t.toString())}validateDistribution(e){let t=0;for(const[s,i]of Object.entries(e))t+=i;if(Math.abs(t-1)<Number.EPSILON)return!0;throw new Error("Provided typeDistribution doesn't sum to 1. Sum of proportions is "+t)}DBG_printCellValues(){let e="";this.cells.forEach((t=>{let s="";t.forEach((e=>{e.type===a.Empty?s+=e.value+"\t":s+=e.translateType(e.type)+"\t"})),e+=s.trim()+"\n"})),console.log(e.trim())}writeValues(){this.cells.forEach((e=>{e.forEach((e=>{e.type&&(e.HTMLElement.innerText=e.translateType(e.type))}))}))}}class o{constructor(){var t;this._width=e.boardDefaults.width,this._height=e.boardDefaults.height,this._minesFrequency=e.boardDefaults.minesFrequency,this._playerClass=e.playerClass,this._gameTimer=0,null===(t=document.getElementById("resetButton"))||void 0===t||t.addEventListener("click",(()=>this.resetGame()))}static getInstance(){return this.instance?this.instance:this.instance=new o}set board(e){this._board=e}get board(){if(!this._board)throw new Error("Board was not initialized!");return this._board}set player(e){this._player=e}get player(){if(!this._player)throw new Error("Player was not initialized!");return this._player}createBoard(){this.board=new n(this._width,this._height,this._minesFrequency)}createPlayer(){switch(this._playerClass){case"Assassin":this.player=new s;break;case"Mage":this.player=new i;break;case"Paladin":this.player=new l;break;case"Warrior":this.player=new r}}loseGame(){this.endGame()}playerUp(){this.board.indicateLevelGain(),this.board.evoluteMonster()}resetGame(){const e=document.getElementById("app");e&&(e.innerHTML=""),this.resetHeartContainer(),this.startGame()}setSettings(){this._width=+this.getValueFromInput("inputWidth"),this._height=+this.getValueFromInput("inputHeight"),this._minesFrequency=+this.getValueFromInput("inputMinesFrequency"),this._playerClass=this.getValueFromInput("selectClass")}startGame(){var e;this.setSettings(),this.createBoard(),this.createPlayer(),null===(e=this._board)||void 0===e||e.openStartArea(),this.resetTimer(),this._timer=setInterval((()=>this.countSeconds()),1e3)}winGame(){this.endGame(),alert("You won!")}countSeconds(){this._gameTimer++,this.player.calculateScore(this._gameTimer)}endGame(){this.stopTimer(),this.board.revealBoard(),this.board.removeEventHandler()}getValueFromInput(e){const t=document.getElementById(e);if(t)return t.value;throw new Error("gameMaster: getValueFromHTML: HTML does not exist")}resetTimer(){this.stopTimer(),this._gameTimer=0}resetHeartContainer(){const e=document.getElementById("health");e&&(e.innerHTML="")}stopTimer(){clearInterval(this._timer)}}function c(e,t){const s=document.getElementById(e);if(!s)throw new Error("app: setValueToInput: HTML does not exist. ID: "+e);s.value=t}c("inputWidth",e.boardDefaults.width.toString()),c("inputHeight",e.boardDefaults.height.toString()),c("inputMinesFrequency",e.boardDefaults.minesFrequency.toString()),c("selectClass",e.playerClass),o.getInstance().startGame(),function(){const e=document.getElementById("openSettings");e&&e.addEventListener("click",(()=>function(){const e=document.getElementById("settings");e&&e.classList.contains("hidden")?e.classList.remove("hidden"):e&&e.classList.add("hidden")}()),!1)}()})();