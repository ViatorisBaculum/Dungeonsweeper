export interface typeDistribution {
	Rat: number;
	Zombie: number;
	Skeleton: number;
	Ghost: number;
	Witch: number;
	Boss: number;
}

export enum CellType {
	Empty,
	Rat,
	Zombie,
	Skeleton,
	Ghost,
	Witch,
	Boss
};

export type playerClasses = "Assassin" | "Mage" | "Paladin" | "Warrior";

export interface SavedCell {
	type: CellType;
	value?: number;
	isClicked: boolean;
	isFlagged: boolean;
}

export interface PlayerState {
	className: string;
	level: number;
	experience: number;
	health: number;
	score: number;
	maxHealth: number;
}