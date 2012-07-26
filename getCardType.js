function getCardType(cc_number, options) {
	options = options || {};

	options.treatDciAsMc = options.treatDciAsMc == undefined ? true : !!options.treatDciAsMc;
	options.treatAmericanDcAsMc = options.treatAmericanDcAsMc == undefined ? true : !!options.treatAmericanDcAsMc;
	options.treatElectronAsVisa = options.treatElectronAsVisa == undefined ? true : !!options.treatElectronAsVisa;
	options.useInactiveSystems = options.useInactiveSystems == undefined ? true : !!options.useInactiveSystems;

	var patterns = {
		"Amex": /^3[47]/,
		"Bankcard": /^56(?:10|022[1-5])/,
		"UnionPay": /^62/,
		"DinersClub": /^(?:30[0-5]|36|5[45])/,
		"Discover": /^6(?:011|22(?:1(?:2[6-9]|[3-9])|[2-8]|9(?:[01]|2[0-5]))|4[4-9]|5)/,
		"InstaPayment": /^63[7-9]/,
		"JCB": /^35(?:(?:2[89])|[3-8])/,
		"Laser": /^(?:6304|6706|6771|6709)/,
		"Maestro": /^(?:5018|5020|5038|6304|6759|676[1-3]|0604)/,
		"MasterCard": /^5[1-5]/,
		"Solo": /^(?:6334|6767)/,
		"Switch": /^(?:49(?:03|05|11|36)|564182|633110|6333|6759)/,
		"VisaElectron": /^(?:4026|417500|4508|4844|491(?:3|7))/,
		"Visa": /^4/
	};

	if (!options.treatDciAsMc) {
		// By default treat DinersClub International as MasterCard
		patterns["DinersClub"] = /^(?:30[0-5]|2014|2149|36)/;
	}

	if (options.treatElectronAsVisa) {
		delete(patterns["VisaElectron"]);
	}

	if (!options.useInactiveSystems) {
		delete(patterns["Bankcard"]);
		delete(patterns["Solo"]);
		delete(patterns["Switch"]);
	}

	var cardType, pattern;
	for (cardType in patterns) {
		if (!patterns.hasOwnProperty(cardType)) { continue; }
		pattern = patterns[cardType];
		if (cc_number.search(pattern) > -1) {
			return cardType;
		}
	}

	return "Unknown";
}

module.exports = getCardType;
