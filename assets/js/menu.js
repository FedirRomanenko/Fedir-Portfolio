const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".navigation");

menuButton.addEventListener("click", () => {

    navigation.classList.toggle("open");

});
const menu = document.querySelector(".navigation");
const button = document.querySelector(".menu-toggle");
const overlay = document.querySelector(".menu-overlay");

function closeMenu(){

    menu.classList.remove("active");

    overlay.classList.remove("active");

    button.innerHTML = "☰";

}

button.addEventListener("click",function(){

    if(menu.classList.contains("active")){

        closeMenu();

    }else{

        menu.classList.add("active");

        overlay.classList.add("active");

        button.innerHTML="✕";

    }

});

overlay.addEventListener("click",closeMenu);

document.querySelectorAll(".navigation a").forEach(link=>{

    link.addEventListener("click",closeMenu);

});

document.addEventListener("keydown",function(e){

    if(e.key==="Escape"){

        closeMenu();

    }

});