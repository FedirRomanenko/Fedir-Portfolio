const words = [

    "Electronics",
    "Programming",
    "Robotics",
    "Arduino",
    "3D Design"

];

const changingText = document.getElementById("changingText");

let current = 0;

function changeWord() {

    changingText.style.opacity = "0";

    changingText.style.transform = "translateY(18px)";

    setTimeout(() => {

        current++;

        if (current >= words.length)
            current = 0;

        changingText.textContent = words[current];

        changingText.style.opacity = "1";

        changingText.style.transform = "translateY(0px)";

    }, 350);

}

changingText.style.transition =
"opacity .35s ease, transform .35s ease";

setInterval(changeWord, 2500);