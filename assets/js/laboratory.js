const experiments = {

    electromagnet: {

        title:"🧲 Электромагниты",

        text:
        "Эксперименты с катушками, сердечниками и количеством витков. Исследование влияния конструкции на силу магнитного поля.",

        image1:
        "assets/images/lab/electromagnet1.jpg",

        image2:
        "assets/images/lab/electromagnet2.jpg"

    },


    capacitor: {

        title:"🔋 Конденсаторы",

        text:
        "Изучение зарядки, разрядки и использования конденсаторов в различных схемах.",

        image1:
        "assets/images/lab/capacitor1.jpg",

        image2:""

    },


    crystals: {

        title:"⚗ Электролиз",

        text:
        "Электролиз — эксперимент по изучению химических процессов под воздействием электрического тока. Я исследовал движение ионов в растворе и представил этот проект в школе, объясняя принцип работы электролиза и его применение.",

        image1:
        "assets/images/lab/crystal1.jpg",

        image2:""

    },


    generator: {

        title:"⚡ Генераторы",

        text:
        "Эксперименты с получением электричества при помощи катушек и движения.",

        image1:
        "assets/images/lab/generator1.jpg",

        image2:""

    }

};



function openLab(id){

    let item = experiments[id];


    document.getElementById("labTitle").textContent =
    item.title;


    document.getElementById("labText").textContent =
    item.text;


    document.getElementById("labImage1").src =
    item.image1;


    document.getElementById("labImage2").src =
    item.image2;


    document.getElementById("labModal").classList.add("active");

}



function closeLab(){

    document.getElementById("labModal")
    .classList.remove("active");

}