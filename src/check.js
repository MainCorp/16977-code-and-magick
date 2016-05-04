function getMessage (a, b) {
    var typeA = typeof(a);
    var typeB = typeof(b);

    if (typeA == "boolean") {
        if (a == true) {
            return "Я попал в " + b;
        } else {
            return "Я никуда не попал";
        }
    }

    if (typeA == "number") {
        return "Я прыгнул на " + a * 100 + " сантиметров";
    }

    if ((Array.isArray(a) == true) && (Array.isArray(b) == false)) {
        var sum = 0;
        for (var i = 0; i < a.length; i++) {
            sum += a[i];
        } 
        return  "Я прошёл " + sum + " шагов";
    } else if ((Array.isArray(a) == true) && (Array.isArray(b) == true)) {
        var length = 0;
        for (var i = 0; i < a.length && i < b.length; i++) {
            length += a[i] * b[i];
        }
        return "Я прошёл " + length + " метров";
    }

}