document.addEventListener("DOMContentLoaded", function () {

    let key = document.querySelectorAll(".key");
    let clear = document.querySelector(".clear");
    let screen = document.getElementById("displayValue");
    let calculate = document.querySelector(".equal");
    let equal = "";
    for (let i = 0; i < key.length; i++) {
        key[i].addEventListener("click", function () {
            if (
                screen.innerHTML == 0 &&
                (key[i].innerHTML == "+" ||
                    key[i].innerHTML == "-" ||
                    key[i].innerHTML == "*" ||
                    key[i].innerHTML == "/")
            ) {
            } else {
                equal += key[i].innerHTML;
                screen.innerHTML = equal;
            }
        });
    }
    clear.addEventListener("click", function () {
        screen.innerHTML = 0;
        equal = "";
    });
    calculate.addEventListener("click", function () {
        equal = eval(equal);
        screen.innerHTML = equal;
    });
});
