/* Local translation catalogue. It works offline: no text is sent to Google. */
(() => {
  const catalog = {
    "Главная": ["Home", "Início"], "Проекты": ["Projects", "Projetos"], "Мои проекты": ["My projects", "Meus projetos"],
    "Обо мне": ["About me", "Sobre mim"], "Контакты": ["Contacts", "Contactos"], "Лаборатория": ["Laboratory", "Laboratório"],
    "Идеи": ["Ideas", "Ideias"], "Открыть →": ["Open →", "Abrir →"], "Подробнее →": ["Learn more →", "Saber mais →"],
    "Скачать резюме": ["Download résumé", "Descarregar currículo"], "Связаться со мной": ["Contact me", "Contactar-me"],
    "Будущий инженер • Разработчик • Создатель проектов": ["Future engineer • Developer • Project creator", "Futuro engenheiro • Programador • Criador de projetos"],
    "Меня зовут Федор Романенко, я увлекаюсь инженерными навыками этот сайт это мое портфолио здесь вы можете увидеть мои проекты узнать чуть болше про меня.": ["My name is Fedir Romanenko. I am interested in engineering, and this website is my portfolio: here you can see my projects and learn more about me.", "O meu nome é Fedir Romanenko. Interesso-me por engenharia e este site é o meu portefólio: aqui pode ver os meus projetos e saber mais sobre mim."],
    "Меня зовут Федор Романенко. Я начинающий инженер и разработчик, который увлекается созданием собственных проектов на пересечении электроники, программирования и механики. С раннего возраста мне было интересно разбирать устройства, понимать, как они работают, и создавать свои решения. Я люблю превращать идеи в реальные проекты — от простых электронных устройств до сложных инженерных систем. Этот сайт — мое портфолио, где я собираю свои проекты, эксперименты и разработки, показывая свой путь развития в инженерии и технологиях.": ["My name is Fedir Romanenko. I am an aspiring engineer and developer passionate about creating projects at the intersection of electronics, programming and mechanics. Since childhood I have enjoyed taking devices apart, understanding how they work and building my own solutions. I love turning ideas into real projects — from simple electronic devices to complex engineering systems. This site is my portfolio of projects, experiments and development.", "O meu nome é Fedir Romanenko. Sou um engenheiro e programador iniciante apaixonado por criar projetos na interseção da eletrónica, programação e mecânica. Desde criança gosto de desmontar aparelhos, perceber como funcionam e criar as minhas próprias soluções. Gosto de transformar ideias em projetos reais — de dispositivos eletrónicos simples a sistemas de engenharia complexos. Este site é o meu portefólio de projetos, experiências e desenvolvimento."],
    "Основное направление моих интересов — инженерия, робототехника и разработка собственных устройств. Я занимаюсь программированием, работаю с Arduino, создаю электронные схемы, проектирую детали в Fusion 360 и занимаюсь 3D-печатью. Мне интересно объединять разные области: механику, электронику и программное обеспечение для создания новых проектов. Также я занимаюсь экспериментами и прототипированием: создаю различные устройства, изучаю работу двигателей, датчиков и электронных компонентов, а также развиваю навыки проектирования. Помимо технических увлечений, я занимаюсь спортом. Мне нравится дзюдо, горный велосипед и активный отдых. Спорт помогает развивать дисциплину, выносливость и стремление постоянно улучшать свои навыки. Я также интересуюсь астрономией, ракетным моделированием, робототехникой и изучением новых технологий.": ["My main interests are engineering, robotics and making my own devices. I program, work with Arduino, create electronic circuits, design parts in Fusion 360 and do 3D printing. I enjoy combining mechanics, electronics and software in new projects. I also experiment and build prototypes, study motors, sensors and electronic components, and improve my design skills. Outside technology I enjoy judo, mountain biking and outdoor activities. I am also interested in astronomy, rocket modelling, robotics and new technologies.", "Os meus principais interesses são a engenharia, robótica e a criação de dispositivos próprios. Programo, trabalho com Arduino, crio circuitos eletrónicos, projeto peças no Fusion 360 e faço impressão 3D. Gosto de combinar mecânica, eletrónica e software em novos projetos. Também experimento e construo protótipos, estudo motores, sensores e componentes eletrónicos e desenvolvo as minhas competências de design. Fora da tecnologia, gosto de judo, bicicleta de montanha e atividades ao ar livre. Também me interesso por astronomia, modelismo de foguetes, robótica e novas tecnologias."],
    "Сейчас я продолжаю развиваться в техническом направлении, изучая программирование, электронику и инженерное проектирование. Я изучаю создание сайтов, разработку приложений, Arduino и микроконтроллеры, 3D-моделирование в Fusion 360, основы робототехники и работу различных электронных систем. Мне нравится самостоятельно изучать новые технологии, искать информацию, экспериментировать и применять полученные знания на практике через собственные проекты.": ["I continue to grow in technology by studying programming, electronics and engineering design. I am learning web and app development, Arduino and microcontrollers, 3D modelling in Fusion 360, the basics of robotics and electronic systems. I enjoy learning new technologies independently, researching, experimenting and applying what I learn in my own projects.", "Continuo a desenvolver-me na área tecnológica, estudando programação, eletrónica e design de engenharia. Estou a aprender desenvolvimento web e de aplicações, Arduino e microcontroladores, modelação 3D no Fusion 360, bases de robótica e sistemas eletrónicos. Gosto de aprender novas tecnologias de forma autónoma, pesquisar, experimentar e aplicar o que aprendo nos meus próprios projetos."],
    "⚡ Чем занимаюсь": ["⚡ What I do", "⚡ O que faço"], "🛠 Навыки": ["🛠 Skills", "🛠 Competências"], "🔬 Сейчас изучаю": ["🔬 Currently learning", "🔬 Atualmente a estudar"], "👨‍💻 Кто я": ["👨‍💻 Who I am", "👨‍💻 Quem sou"], "📍 Страна": ["📍 Country", "📍 País"],
    "Моя статистика": ["My statistics", "As minhas estatísticas"], "Проектов": ["Projects", "Projetos"], "Года опыта": ["Years of experience", "Anos de experiência"], "Изученных технологий": ["Technologies studied", "Tecnologias estudadas"], "Желание развиваться": ["Drive to grow", "Vontade de evoluir"],
    "Все мои проекты": ["All my projects", "Todos os meus projetos"], "Калькулятор стоимости 3D-печати": ["3D Print Cost Calculator", "Calculadora de custo de impressão 3D"], "Приложение для расчета полной стоимости печати деталей.": ["An app for calculating the total cost of printing parts.", "Uma aplicação para calcular o custo total de impressão de peças."], "Умный помощник для безопасного пребывания на солнце": ["Smart assistant for safe time in the sun", "Assistente inteligente para uma permanência segura ao sol"], "Приложение для безопасного нахождения на солнце.": ["An app for staying safe in the sun.", "Uma aplicação para uma permanência segura ao sol."], "Мини-станок для заточки из деталей DVD-привода": ["Mini sharpener made from DVD drive parts", "Mini afiador feito com peças de leitor de DVD"], "Мини-станок для заточки из деталей DVD-привода": ["Mini sharpener made from DVD drive parts", "Mini afiador feito com peças de leitor de DVD"], "Водяная ракета": ["Water rocket", "Foguete de água"], "Последовательность версий ракеты, стартового стенда и механизма запуска.": ["A sequence of rocket, launch stand and release mechanism versions.", "Uma sequência de versões do foguete, da plataforma e do mecanismo de lançamento."], "Робот кот многозадачьный": ["Multitasking robot cat", "Robô-gato multifunções"], "Робот способный передвигаться самостоятельно а также при помощи пульта": ["A robot that can move independently and by remote control.", "Um robô que se pode mover sozinho e por comando remoto."],
    "Эксперименты и исследования": ["Experiments and research", "Experiências e investigação"], "Здесь находятся эксперименты, тесты и небольшие инженерные исследования.": ["Here are experiments, tests and small engineering studies.", "Aqui encontra experiências, testes e pequenos estudos de engenharia."], "Электромагнит": ["Electromagnet", "Eletroíman"], "Конденсаторы": ["Capacitors", "Condensadores"], "Электролиз": ["Electrolysis", "Eletrólise"], "Название эксперимента": ["Experiment name", "Nome da experiência"], "Описание эксперимента.": ["Experiment description.", "Descrição da experiência."],
    "Будущие проекты": ["Future projects", "Projetos futuros"], "Место для инженерных задумок, концептов и будущих разработок.": ["A place for engineering ideas, concepts and future developments.", "Um lugar para ideias de engenharia, conceitos e desenvolvimentos futuros."],
    "🧲 Электромагниты": ["🧲 Electromagnets", "🧲 Eletroímanes"], "Эксперименты с катушками, сердечниками и количеством витков. Исследование влияния конструкции на силу магнитного поля.": ["Experiments with coils, cores and the number of turns. Research into how design affects magnetic-field strength.", "Experiências com bobinas, núcleos e número de voltas. Estudo da influência do design na força do campo magnético."], "Изучение зарядки, разрядки и использования конденсаторов в различных схемах.": ["Studying the charging, discharging and use of capacitors in different circuits.", "Estudo do carregamento, descarregamento e uso de condensadores em diferentes circuitos."], "Электролиз — эксперимент по изучению химических процессов под воздействием электрического тока. Я исследовал движение ионов в растворе и представил этот проект в школе, объясняя принцип работы электролиза и его применение.": ["Electrolysis is an experiment studying chemical processes under electric current. I investigated ion movement in a solution and presented this project at school, explaining the principle and its uses.", "A eletrólise é uma experiência que estuda processos químicos sob corrente elétrica. Investiguei o movimento de iões numa solução e apresentei este projeto na escola, explicando o princípio e as suas aplicações."],
    "🔭 Роботизированный телескоп": ["🔭 Robotic telescope", "🔭 Telescópio robotizado"], "Автоматическая система наведения телескопа.": ["Automatic telescope pointing system.", "Sistema automático de apontamento do telescópio."], "🗺️ Офлайн карты": ["🗺️ Offline maps", "🗺️ Mapas offline"], "Приложение для маршрутов без интернета.": ["An app for routes without internet.", "Uma aplicação para rotas sem internet."], "🏭 Производство PET филамента": ["🏭 PET filament production", "🏭 Produção de filamento PET"], "Переработка бутылок в материал для 3D-печати.": ["Recycling bottles into material for 3D printing.", "Reciclagem de garrafas em material para impressão 3D."], "🤖 Роботы Arduino": ["🤖 Arduino robots", "🤖 Robôs Arduino"], "Создание роботизированных систем.": ["Building robotic systems.", "Criação de sistemas robóticos."],
    "О проекте": ["About the project", "Sobre o projeto"], "📖 Описание": ["📖 Description", "📖 Descrição"], "⚡ Возможности": ["⚡ Features", "⚡ Funcionalidades"], "Характеристики проекта": ["Project details", "Detalhes do projeto"], "Основные возможности": ["Key features", "Funcionalidades principais"], "Галерея": ["Gallery", "Galeria"], "Галерея приложения": ["App gallery", "Galeria da aplicação"], "В разработке": ["In development", "Em desenvolvimento"], "Завершён": ["Completed", "Concluído"], "Мобильное приложение": ["Mobile app", "Aplicação móvel"], "Современный интерфейс": ["Modern interface", "Interface moderno"], "Полная себестоимость": ["Full cost", "Custo total"], "Стоимость пластика": ["Plastic cost", "Custo do plástico"], "Стоимость за грамм": ["Cost per gram", "Custo por grama"], "Время печати": ["Print time", "Tempo de impressão"], "Электроэнергия": ["Electricity", "Eletricidade"], "Чему я научился": ["What I learned", "O que aprendi"],
    "Школьный проект по робототехнике, созданный вместе с одногруппником на базе micro:bit. Робот в форме кота способен двигаться, взаимодействовать с пользователем и самостоятельно реагировать на окружающую среду.": ["A school robotics project built with a classmate using micro:bit. The cat-shaped robot can move, interact with a user and respond independently to its surroundings.", "Um projeto escolar de robótica criado com um colega usando micro:bit. O robô em forma de gato consegue mover-se, interagir com o utilizador e reagir sozinho ao ambiente."], "Управление с пульта": ["Remote control", "Controlo remoto"], "Автономное движение": ["Autonomous movement", "Movimento autónomo"], "Изменение выражения мордочки": ["Changing facial expression", "Alterar a expressão facial"], "Движение головы": ["Head movement", "Movimento da cabeça"], "Звуковые эффекты": ["Sound effects", "Efeitos sonoros"], "Вращение на месте": ["Turning in place", "Rodar no lugar"], "2 человека": ["2 people", "2 pessoas"], "Робототехника / Школьный проект": ["Robotics / School project", "Robótica / Projeto escolar"], "Пульт + автономный режим": ["Remote + autonomous mode", "Comando + modo autónomo"],
    "Версия 1": ["Version 1", "Versão 1"], "Версия 2": ["Version 2", "Versão 2"], "Версия 3": ["Version 3", "Versão 3"], "Версия 4": ["Version 4", "Versão 4"], "Смотреть версии ↓": ["View versions ↓", "Ver versões ↓"], "Преимущества": ["Advantages", "Vantagens"], "Недостатки": ["Limitations", "Limitações"], "Что было сделано": ["What was done", "O que foi feito"], "Доработки": ["Improvements", "Melhorias"], "Будущая модернизация": ["Future upgrade", "Melhoria futura"], "Следующая версия появится здесь": ["The next version will appear here", "A próxima versão aparecerá aqui"], "Новые фотографии, видео, изменения конструкции и результаты испытаний будут добавляться по порядку.": ["New photos, videos, design changes and test results will be added in order.", "Novas fotografias, vídeos, alterações de design e resultados de testes serão adicionados por ordem."], "Ваш браузер не поддерживает видео.": ["Your browser does not support video.", "O seu navegador não suporta vídeo."], "Август 2026": ["August 2026", "Agosto de 2026"], "Август 2026 · та же неделя": ["August 2026 · same week", "Agosto de 2026 · mesma semana"],
    "НАЗВАНИЕ ПРОЕКТА": ["PROJECT NAME", "NOME DO PROJETO"], "Краткий подзаголовок": ["Short subtitle", "Subtítulo curto"], "Краткое описание проекта.": ["Short project description.", "Breve descrição do projeto."], "Описание проекта.": ["Project description.", "Descrição do projeto."], "Описание.": ["Description.", "Descrição."], "Название": ["Name", "Nome"], "📱 Тип": ["📱 Type", "📱 Tipo"], "💻 Платформа": ["💻 Platform", "💻 Plataforma"], "⚙️ Статус": ["⚙️ Status", "⚙️ Estado"], "🗓 Год": ["🗓 Year", "🗓 Ano"], "🎨 Дизайн": ["🎨 Design", "🎨 Design"], "🚀 Версия": ["🚀 Version", "🚀 Versão"]
  };

  const supported = ["ru", "en", "pt"];
  const languageNames = { ru: "Русский", en: "English", pt: "Português" };
  const original = new WeakMap();
  const originalAttributes = new Map();

  const normalized = value => value.replace(/\s+/g, " ").trim();
    const translate = (value, lang) => {
    const entry = catalog[normalized(value)];
    return entry && lang !== "ru" ? entry[lang === "en" ? 0 : 1] : value;
  };

  function collect() {
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        const parent = node.parentElement;
        return parent && !parent.closest("script, style, .language-switcher") && /[А-Яа-яЁё]/.test(node.nodeValue)
          ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
      }
    });
    let node;
    while ((node = walker.nextNode())) original.set(node, node.nodeValue);
    document.querySelectorAll("[title], [alt], [aria-label]").forEach(element => {
      ["title", "alt", "aria-label"].forEach(attribute => {
        if (element.hasAttribute(attribute)) originalAttributes.set(`${attribute}:${element.dataset.i18nId || (element.dataset.i18nId = Math.random())}`, element.getAttribute(attribute));
      });
    });
  }

  function applyLanguage(lang) {
    if (!supported.includes(lang)) lang = "ru";
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    let node;
    while ((node = walker.nextNode())) {
      const source = original.get(node);
      if (!source) continue;
      const padding = source.match(/^(\s*)/)[0] + "|" + source.match(/(\s*)$/)[0];
      const [before, after] = padding.split("|");
      node.nodeValue = before + translate(source, lang) + after;
    }
    document.querySelectorAll("[data-i18n-id]").forEach(element => {
      ["title", "alt", "aria-label"].forEach(attribute => {
        const source = originalAttributes.get(`${attribute}:${element.dataset.i18nId}`);
        if (source) element.setAttribute(attribute, translate(source, lang));
      });
    });
    const title = document.documentElement.dataset.originalTitle || (document.documentElement.dataset.originalTitle = document.title);
    document.title = translate(title, lang);
    document.documentElement.lang = lang;
    document.querySelectorAll("[data-language]").forEach(button => {
      const active = button.dataset.language === lang;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", String(active));
      button.setAttribute("aria-label", languageNames[button.dataset.language]);
    });
    localStorage.setItem("fedir-language", lang);
    window.siteLanguage = lang;
    window.dispatchEvent(new CustomEvent("languagechange", { detail: { lang } }));
  }

  window.changeLanguage = applyLanguage;
  window.translateSiteText = value => translate(value, window.siteLanguage || "ru");
  document.addEventListener("DOMContentLoaded", () => {
    collect();
    applyLanguage(localStorage.getItem("fedir-language") || "ru");
  });
})();
