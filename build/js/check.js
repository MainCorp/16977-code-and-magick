function getMessage (a, b) {
	var typeA  = typeof(a);
	var typeB  = typeof(B);

	if (typeA === "boolean") {
		if (a == true) {
			return "Я попал в " + [b];
		} else {
			return "Я никуда не попал";
		}
	}

	if (typeA === "number") {
		return "Я прыгнул на " + [a] * 100 + " сантиметров";
	} 

	if (typeA === "object") {
		var sum = 0;
		for (var i = 0; i < a.length; i++) {
			sum += a[i];
		} 
		return  "Я прошёл " + [sum] + " шагов";
	} else {
		return  "Я прошёл нисколько шагов";
	}

	if (typeA === "object" && typeB === "object") {
		var length = 0;
		for (var i = 0; i < a.length && i < b.length; i++) {
			length += a[i] * b[i];
		}
		return "Я прошёл" + [length] + " метров";
	} else {
		return "Я не прошёл и одного метра";
	}

}