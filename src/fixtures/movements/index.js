const robotsMovements = {
	'size': {
		'x': 5,
		'y': 3
	},
	'movements': [
		{
			'position': {
				'x': 1,
				'y': 1,
				'o': 'E'
			},
			'instructions': [
				'R',
				'F',
				'R',
				'F',
				'R',
				'F',
				'R',
				'F'
			]
		},
		{
			'position': {
				'x': 3,
				'y': 2,
				'o': 'N'
			},
			'instructions': [
				'F',
				'R',
				'R',
				'F',
				'L',
				'L',
				'F',
				'F',
				'R',
				'R',
				'F',
				'L',
				'L'
			]
		},
		{
			'position': {
				'x': 0,
				'y': 3,
				'o': 'W'
			},
			'instructions': [
				'L',
				'L',
				'F',
				'F',
				'F',
				'L',
				'F',
				'L',
				'F',
				'L'
			]
		}
	]
};

const robotMovementNoLost = [
	{
		'x': 1,
		'y': 1,
		'o': 'S',
		'lost': false
	},
	{
		'x': 1,
		'y': 0,
		'o': 'S',
		'lost': false
	},
	{
		'x': 1,
		'y': 0,
		'o': 'W',
		'lost': false
	},
	{
		'x': 0,
		'y': 0,
		'o': 'W',
		'lost': false
	},
	{
		'x': 0,
		'y': 0,
		'o': 'N',
		'lost': false
	},
	{
		'x': 0,
		'y': 1,
		'o': 'N',
		'lost': false
	},
	{
		'x': 0,
		'y': 1,
		'o': 'E',
		'lost': false
	},
	{
		'x': 1,
		'y': 1,
		'o': 'E',
		'lost': false
	}
];

const robotMovementLost = [
	{
		'x': 1,
		'y': 1,
		'o': 'S',
		'lost': false
	},
	{
		'x': 1,
		'y': 0,
		'o': 'S',
		'lost': false
	},
	{
		'x': 1,
		'y': 0,
		'o': 'W',
		'lost': false
	},
	{
		'x': 0,
		'y': 0,
		'o': 'W',
		'lost': false
	},
	{
		'x': 0,
		'y': 0,
		'o': 'N',
		'lost': false
	},
	{
		'x': 0,
		'y': 1,
		'o': 'N',
		'lost': false
	},
	{
		'x': 0,
		'y': 1,
		'o': 'E',
		'lost': false
	},
	{
		'x': 0,
		'y': 1,
		'o': 'E',
		'lost': false
	},
	{
		'x': 0,
		'y': 1,
		'o': 'E',
		'lost': false
	},
	{
		'x': 1,
		'y': 1,
		'o': 'E',
		'lost': true
	}
];

const allRobotMovements = [
	{
		'lost': false,
		'movements': [
			{
				'lost': false,
				'o': 'S',
				'x': 1,
				'y': 1
			},
			{
				'lost': false,
				'o': 'S',
				'x': 1,
				'y': 0
			},
			{
				'lost': false,
				'o': 'W',
				'x': 1,
				'y': 0
			},
			{
				'lost': false,
				'o': 'W',
				'x': 0,
				'y': 0
			},
			{
				'lost': false,
				'o': 'N',
				'x': 0,
				'y': 0
			},
			{
				'lost': false,
				'o': 'N',
				'x': 0,
				'y': 1
			},
			{
				'lost': false,
				'o': 'E',
				'x': 0,
				'y': 1
			},
			{
				'lost': false,
				'o': 'E',
				'x': 1,
				'y': 1
			}
		],
		'totalSteps': 8
	},
	{
		'lost': true,
		'movements': [
			{
				'lost': false,
				'o': 'S',
				'x': 1,
				'y': 1
			},
			{
				'lost': false,
				'o': 'S',
				'x': 1,
				'y': 0
			},
			{
				'lost': false,
				'o': 'W',
				'x': 1,
				'y': 0
			},
			{
				'lost': false,
				'o': 'W',
				'x': 0,
				'y': 0
			},
			{
				'lost': false,
				'o': 'N',
				'x': 0,
				'y': 0
			},
			{
				'lost': false,
				'o': 'N',
				'x': 0,
				'y': 1
			},
			{
				'lost': false,
				'o': 'E',
				'x': 0,
				'y': 1
			},
			{
				'lost': false,
				'o': 'E',
				'x': 0,
				'y': 1
			},
			{
				'lost': false,
				'o': 'E',
				'x': 0,
				'y': 1
			},
			{
				'lost': true,
				'o': 'E',
				'x': 1,
				'y': 1
			}
		],
		'totalSteps': 10
	}
];

const allLostRobotMovements = [
	{
		'lost': true,
		'movements': [
			{
				'lost': false,
				'o': 'S',
				'x': 1,
				'y': 1
			},
			{
				'lost': false,
				'o': 'S',
				'x': 1,
				'y': 0
			},
			{
				'lost': false,
				'o': 'W',
				'x': 1,
				'y': 0
			},
			{
				'lost': false,
				'o': 'W',
				'x': 0,
				'y': 0
			},
			{
				'lost': false,
				'o': 'N',
				'x': 0,
				'y': 0
			},
			{
				'lost': false,
				'o': 'N',
				'x': 0,
				'y': 1
			},
			{
				'lost': false,
				'o': 'E',
				'x': 0,
				'y': 1
			},
			{
				'lost': false,
				'o': 'E',
				'x': 0,
				'y': 1
			},
			{
				'lost': false,
				'o': 'E',
				'x': 0,
				'y': 1
			},
			{
				'lost': true,
				'o': 'E',
				'x': 1,
				'y': 1
			}
		],
		'totalSteps': 10
	}
];

const robotMovementResult = [
	{
		'x': 1,
		'y': 1,
		'o': 'E',
		'lost': false
	},
	{
		'x': 3,
		'y': 3,
		'o': 'N',
		'lost': true
	},
	{
		'x': 2,
		'y': 3,
		'o': 'S',
		'lost': false
	}
];

module.exports = {
	robotsMovements,
	robotMovementResult,
	robotMovementNoLost,
	robotMovementLost,
	allRobotMovements,
	allLostRobotMovements,
};
