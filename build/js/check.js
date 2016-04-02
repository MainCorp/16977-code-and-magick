function getMessage (a, b) {
    var typeA = typeof(a);
    var typeB = typeof(b);

    if (typeA === "boolean") {
        if (a) {
            return "Я попал в " + b;
        } else {
            return "Я никуда не попал";
        }
    }

    if (typeA === "number") {
        return "Я прыгнул на " + a * 100 + " сантиметров";
    }

    if (!(Array.isArray(a))) {
        return "Ошибка";
    } 
    if ((Array.isArray(b) == true)) {
    	var length = 0;
        for (var i = 0; i < a.length && i < b.length; i++) {
            length += a[i] * b[i];
        }
        return "Я прошёл " + length + " метров";
    }
    if ((Array.isArray(a) == true)) {
    	var sum = 0;
        for (var i = 0; i < a.length; i++) {
            sum += a[i];
        } 
        return  "Я прошёл " + sum + " шагов";
    }

}