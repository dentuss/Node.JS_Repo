function Sum(x, y) {

    return x + y;
}

function Minus(x, y) {

    return x - y;
}

function Mult(x, y) {

    return x * y;
}

function Calc() {

    x = 1;
    y = 2;

    return console.log(Sum(x,y), Minus(x,y), Mult(x,y));
}

exports.Calc = Calc();