import { Player } from "../player";

export class PC_Warrior extends Player {
	className = "Warrior";

	constructor() {
		super();
		this.health = 5;
		this.maxHealth = this.health;
	}
}
