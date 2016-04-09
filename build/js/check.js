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
    if ((Array.isArray(b))) {
    	var meters = 0;
        for (var i = 0; i < a.length && i < b.length; i++) {
            meters += a[i] * b[i];
        }
        return "Я прошёл " + meters + " метров";
    }
    if ((Array.isArray(a))) {
    	var sum = 0;
        for (var i = 0; i < a.length; i++) {
            sum += a[i];
        } 
        return  "Я прошёл " + sum + " шагов";
    }

}