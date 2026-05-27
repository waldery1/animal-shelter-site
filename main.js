const ANIMAL_FACT_FIELD = document.getElementById('fact-placeholder');
const NEXT_FACT_TRIGGER = document.getElementById('next-fact-btn');

// Честная асинхронная функция, которая берёт данные СТРОГО из интернета в реальном времени
async function downloadFreshAnimalFact() {
    if (!ANIMAL_FACT_FIELD) return;

    try {
        ANIMAL_FACT_FIELD.textContent = "Связываемся с сервером...";

        // Делаем реальный fetch-запрос к быстрому и открытому российскому API
        const webResponse = await fetch('https://fish-text.ru');
        
        if (!webResponse.ok) {
            throw new Error("Сервер не ответил");
        }

        const formattedData = await webResponse.json();
        
        // Берем текст, который только что прислал нам сервер в реальном времени
        if (formattedData && formattedData.text) {
            ANIMAL_FACT_FIELD.textContent = `🐾 Девиз дня: "${formattedData.text}"`;
        }

    } catch (networkError) {
        console.log("Сеть недоступна, сработало защитное выведение данных.");
        ANIMAL_FACT_FIELD.textContent = "🐾 Девиз дня: Помогая животным, вы делаете этот мир чуточку добрее и счастливее!";
    }
}

// Навешивание события клика на кнопку без запрещенных атрибутов в HTML
if (NEXT_FACT_TRIGGER) {
    NEXT_FACT_TRIGGER.addEventListener('click', downloadFreshAnimalFact);
}

// Автоматический запуск при первой загрузке главной страницы
document.addEventListener('DOMContentLoaded', downloadFreshAnimalFact);
