function getMessage (a, b) {

	if (typeof(a) == "boolean") {
		if (a == true) {
			return "Я попал в " + [b];
		} else {
			return "Я никуда не попал";
		}
	}

	if (typeof(a) == "number") {
		return "Я прыгнул на " + [a] * 100 + " сантиметров";
	}

	if (typeof(a) == "object") {
		var sum = 0;
		for (var i = 0; i < a.length; i++) {
			sum += a[i];
		} 
		return  "Я прошёл " + [sum] + " шагов";
	}

		var length = 0;
			length += a[i] * b[i];
		}
		return "Я прошёл" + [length] + " метров";
	}

}
