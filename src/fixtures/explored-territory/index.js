const failedExploration = {
	status: 'failed',
	x: 3,
	y: 4
};
const successExploration = {
	status: 'explored',
	x: 5,
	y: 4,
};

const allExploredTerritory = [
	failedExploration,
	successExploration,
];

const allExploredFailedTerritory = [
	failedExploration,
];

module.exports = {
	failedExploration,
	successExploration,
	allExploredTerritory,
	allExploredFailedTerritory,
};
