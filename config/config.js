module.exports = {
	development: {
		// TODO: get port information when db gets hosted
		port: process.env.PORT || 3000,
	},
	production: {},
	saltRounds: 9,
	jwt: {
		secret: "JeanMarieMcCormack",
		options: { expiresIn: "2d" },
	},
};
