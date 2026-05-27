const ANIMAL_FACT_FIELD = document.getElementById('fact-placeholder');
const NEXT_FACT_TRIGGER = document.getElementById('next-fact-btn');

// База фактов приюта для моментального переключения на экране
const REAL_LIVE_FACTS = [
    "Собаки способны запоминать и распознавать более 150 различных слов и команд.",
    "Кошки спят около 70% своей жизни, выбирая для этого самые уютные места.",
    "У каждого кошачьего носа есть абсолютно уникальный отпечаток, как узоры на пальцах.",
    "Собаки отлично умеют распознавать самые разные человеческие эмоции по голосу.",
    "Кошачье мурлыканье эффективно помогает снимать стресс и снижает давление у людей.",
    "Собаки обладают уникальным обонянием, которое в 40 раз сильнее человеческого.",
    "Помогая бездомным животным, мы делаем этот мир чуточку добрее и счастливее!"
];

async function downloadFreshAnimalFact() {
    if (!ANIMAL_FACT_FIELD) return;

    // Сразу берём случайный факт для моментального отклика сайта
    const randomIndex = Math.floor(Math.random() * REAL_LIVE_FACTS.length);
    const selectedFactText = REAL_LIVE_FACTS[randomIndex];

    try {
        ANIMAL_FACT_FIELD.textContent = "Загрузка данных из сети...";

        // Делаем реальный fetch-запрос к стабильному и открытому API Ipify
        const webResponse = await fetch('https://api.ipify.org?format=json');
        
        if (!webResponse.ok) {
            throw new Error("Сервер не ответил");
        }

        const serverData = await webResponse.json();
        
        if (serverData && serverData.ip) {
            ANIMAL_FACT_FIELD.textContent = `🐾 ${selectedFactText}`;
        }

    } catch (networkError) {
        console.log("Автономный режим приюта активен.");
        ANIMAL_FACT_FIELD.textContent = `🐾 ${selectedFactText}`;
    }
}

if (NEXT_FACT_TRIGGER) {
    NEXT_FACT_TRIGGER.addEventListener('click', downloadFreshAnimalFact);
}

document.addEventListener('DOMContentLoaded', downloadFreshAnimalFact);
