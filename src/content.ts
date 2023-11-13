import { GameMaster } from "./classes/gameMaster";
import { Modal } from "./util/modal";

const settingsForm = document.getElementById("template-settings");
const menu = document.getElementById("menu");
const app = document.getElementById("app");

export function initialize() {
	const settingsButton = document.getElementById("openSettings");
	initalModal();
	if (settingsButton)
		settingsButton.addEventListener("click", () => toggleSettings(), false);

	const resetButton = document.getElementById("reset");
	if (resetButton) resetButton.addEventListener("click", () => resetGame(), false);

	if (menu) menu.style.display = "none";
	setMineSize();
}
function initalModal() {
	if (!settingsForm) throw new Error("No settings template found");

	const modal = new Modal(document.body);
	modal.setTitle("New Game");
	modal.setSubTitle("Welcome to DungeonSweeper");
	modal.setText(
		"This is a more elaborate version of MineSweeper with RPG elements such as classes, leveling and different enemies. Please choose your starting configuration."
	);
	modal.setSlotContent(settingsForm.innerHTML);
	modal.setConfirmAction(() => toggleMenuBar());
}

function toggleMenuBar() {
	if (menu && menu.style.display === "flex") menu.style.display = "none";
	else if (menu && menu.style.display === "none") menu.style.display = "flex";

	GameMaster.getInstance().resetGame()
}

function toggleSettings() {
	if (!settingsForm) throw new Error("No settings template found");

	const modal = new Modal(document.body, { cancelButton: true });
	modal.setTitle("Game Settings");
	modal.setText("Please choose the settings for your next round");
	modal.setSlotContent(settingsForm.innerHTML);
	modal.setConfirmAction(() => GameMaster.getInstance().resetGame());
}

function resetGame() {
	GameMaster.getInstance().resetGame();
}

function setMineSize() {
	const selectSize = document.getElementById("selectSize") as HTMLSelectElement;
	if (app) {
		switch (selectSize.value) {
			case "small":
				app.classList.add("small");
				app.classList.remove("medium");
				app.classList.remove("large");
				break;
			case "medium":
				app.classList.remove("small");
				app.classList.add("medium");
				app.classList.remove("large");
				break;
			case "large":
				app.classList.remove("small");
				app.classList.remove("medium");
				app.classList.add("large");
				break;
		}
	}
}