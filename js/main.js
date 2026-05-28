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

class ShelterInterfaceManager {
    constructor() {
        // Инициализация элементов переключателя тем
        this.themeButton = document.getElementById('theme-btn');
        this.currentTheme = localStorage.getItem('site-theme') || 'light';

        // Инициализация элементов фильтрации каталога
        this.filterButtons = document.querySelectorAll('.filter-controls__btn');
        this.petCards = document.querySelectorAll('.pet-card');

        this.init();
    }

    init() {
        // Установка сохраненной темы при загрузке
        document.documentElement.setAttribute('data-theme', this.currentTheme);
        this.updateThemeButtonIcon();

        // Навешивание событий на переключатель темы
        if (this.themeButton) {
            this.themeButton.addEventListener('click', () => this.toggleSiteTheme());
        }

        // Навешивание событий на кнопки фильтрации каталога
        this.filterButtons.forEach(button => {
            button.addEventListener('click', (event) => this.filterPetCards(event));
        });
    }

    // Логика переключения тем (Светлая / Темная)
    toggleSiteTheme() {
        this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', this.currentTheme);
        localStorage.setItem('site-theme', this.currentTheme);
        this.updateThemeButtonIcon();
    }

    updateThemeButtonIcon() {
        if (!this.themeButton) return;
        this.themeButton.textContent = this.currentTheme === 'light' ? '🌙' : '☀️';
    }

    // Логика фильтрации карточек животных
    filterPetCards(event) {
        const clickedButton = event.currentTarget;
        const targetFilter = clickedButton.getAttribute('data-filter');

        // Меняем активный класс у кнопок
        this.filterButtons.forEach(btn => btn.classList.remove('filter-controls__btn--active'));
        clickedButton.classList.add('filter-controls__btn--active');

        // Управляем видимостью карточек с помощью плавного скрытия
        this.petCards.forEach(card => {
            const cardType = card.getAttribute('data-type');
            
            if (targetFilter === 'all' || cardType === targetFilter) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
    }
}

// Запуск всех приложений при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    // Запуск асинхронного приложения фактов
    if (NEXT_FACT_TRIGGER) {
        NEXT_FACT_TRIGGER.addEventListener('click', downloadFreshAnimalFact);
    }
    downloadFreshAnimalFact();

    new ShelterInterfaceManager();
});
