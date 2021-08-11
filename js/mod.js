let modInfo = {
	name: "The Multitree",
	id: "multitree",
	author: "qq1010903229 (loader3229)",
	pointsName: "points",
	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (0), // Used for hard resets and new players
	
	offlineLimit: 10000000,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "1.2",
	name: "",
}

let changelog = `
	<h3>v1.2</h3><br>
	- Added a new tree<br>
	- Endgame: e55000 points<br>
	<h3>v1.1.2</h3><br>
	- Added Hotkeys<br>
	<h3>v1.1.1</h3><br>
	- Fixed an NaN issue<br>
	<h3>v1.1</h3><br>
	- Added a new tree<br>
	- Endgame: e15600 points<br>
	<h3>v1.0</h3><br>
	- Added 2 trees<br>
	- Endgame: e6000 points<br>
`

let winText = `Congratulations! You have reached the end and beaten this game, but for now...`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return true
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new Decimal(0)

	let gain = new Decimal(1)
	if(hasUpgrade("tptc_p",11))gain = gain.mul(upgradeEffect("tptc_p",11));
	if(hasUpgrade("tptc_p",12))gain = gain.mul(upgradeEffect("tptc_p",12));
	gain = gain.mul(tmp.tptc_b.effect);
	gain = gain.mul(tmp.tptc_g.getGenPowerEff);
	gain = gain.mul(tmp.tptc_t.getEnergyEff);
	gain = gain.mul(tmp.tptc_s.buyables[11].effect);
	gain = gain.mul(tmp.tptc_q.quirkEff);
	if(hasUpgrade("tptc_sp",12))gain = gain.mul(upgradeEffect("tptc_sp",12));
	gain = gain.mul(tmp.tm.buyables[0].effect);
	if(hasUpgrade("stardust_s",12))gain = gain.mul(upgradeEffect("stardust_s",12));
	if(hasUpgrade("forest_p",21))gain = gain.mul(upgradeEffect("forest_p",21));
	if(hasUpgrade("burning_a",14))gain = gain.mul(upgradeEffect("burning_a",14));
	return gain;
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
	modpoints: [new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0)]
}}

var TREES=["","The Prestige Tree Classic","The Stardust Tree","The Prestige Forest","The Burning Tree"];
var TREEAUTHOR=["","jacorb90","okamii17","unpingabot","thefinaluptake"];
var MODPOINTSNAME=["","","energy","energy","embers"];
var TREEVERS=[[],["","Pre-Alpha Build 1","Pre-Alpha Build 2","Alpha Build 1","Beta v1.0","Beta v1.1 Alpha 12","Beta v1.1","Beta v1.2","1.0","1.1","1.1","1.1","1.1","1.1","1.1"],["","0.0.3a","0.0.3a","0.0.3a","0.0.3a","0.0.3a","0.0.3a","0.0.3a","0.0.3a","0.0.3a","0.0.3a","0.0.3a","0.0.3a"],["","0.0","0.0","0.0","0.0","0.0","0.0","0.0"],["","0.0.1","0.0.2","0.2.0"]];

// Display extra things at the top of the page
var displayThings = [
	"Mod Author: qq1010903229 (loader3229)",
	function(){
		if(hasUpgrade("tptc_p",13)){
			return "Current Tree: "+TREES[player.tm.currentTree]+" Version "+TREEVERS[player.tm.currentTree][player.tm.buyables[player.tm.currentTree].toNumber()];
		}
		return "";
	},
	function(){
		if(player.tm.currentTree!=1){
			return "You have "+format(player.modpoints[player.tm.currentTree])+" "+MODPOINTSNAME[player.tm.currentTree];
		}
		return "";
	},
	function(){
		if(player.tm.currentTree==4){
			return "Flame Strength: "+format(player.burning_a.flameStrength)+"/"+format(tmp.burning_a.maxFlameStrength);
		}
		return "";
	},
]

// Determines when the game "ends"
function isEndgame() {
	return player.points.gte("1e55000");
}



// Less important things beyond this point!

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}