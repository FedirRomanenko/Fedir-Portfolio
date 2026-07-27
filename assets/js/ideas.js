const ideas = [

{
title:"🔭 Роботизированный телескоп",
text:"Автоматическая система наведения телескопа.",
x:80,
y:80,
angle:-7
},


{
title:"🗺️ Офлайн карты",
text:"Приложение для маршрутов без интернета.",
x:650,
y:100,
angle:6
},


{
title:"🏭 Производство PET филамента",
text:"Переработка бутылок в материал для 3D-печати.",
x:100,
y:380,
angle:-4
},


{
title:"🤖 Роботы Arduino",
text:"Создание роботизированных систем.",
x:700,
y:380,
angle:8
}


];

const board =
document.getElementById("ideasBoard");


ideas.forEach((idea,index)=>{

let note=document.createElement("div");

note.className="idea-note";


note.style.left=idea.x+"px";

note.style.top=idea.y+"px";

note.style.transform=
`rotate(${idea.angle}deg)`;


note.innerHTML=`

<div class="pin"></div>

<h3>${idea.title}</h3>

<p>${idea.text}</p>

`;


note.onclick=()=>openIdea(index);


board.appendChild(note);

});

function openIdea(index){

let idea=ideas[index];

document.getElementById("ideaTitle").textContent=
idea.title;


document.getElementById("ideaText").textContent=
idea.text;


document.getElementById("ideaModal")
.classList.add("active");

}
function closeIdea(){

    document.getElementById("ideaModal")
    .classList.remove("active");

}
document.getElementById("ideaModal")
.onclick=function(e){

    if(e.target === this){

        closeIdea();

    }

};