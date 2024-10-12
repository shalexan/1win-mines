
window.Telegram.WebApp.expand();
const grid = document.querySelector('.grid');
for (let i = 0; i < 25; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    grid.appendChild(cell);
}

// Получение элементов страницы
const numCellsInput = document.getElementById('num-cells');
const highlightButton = document.getElementById('highlight-btn');
const modal = document.getElementById('modal');
const closeModal = document.querySelector('.close');
const numButtons = document.querySelectorAll('.num-button');

// Открытие модального окна при нажатии на поле ввода
numCellsInput.addEventListener('click', () => {
    modal.style.display = 'block';
});

// Закрытие модального окна при нажатии на крестик
closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Закрытие модального окна при клике за его пределами
window.addEventListener('click', (event) => {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
});

// Установка значения поля ввода при выборе кнопки в модальном окне
numButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        const value = event.target.getAttribute('data-value');
        numCellsInput.value = value;
        modal.style.display = 'none'; // Закрытие модального окна после выбора
    });
});

// Таблица оптимального количества безопасных ячеек для каждого количества бомб
const safeCellsMapping = {
    1: 14, 2: 9, 3: 7, 4: 6, 5: 5, 6: 5, 7: 4, 8: 3,
    9: 2, 10: 2, 11: 2, 12: 2, 13: 2, 14: 2, 15: 1, 16: 1,
    17: 1, 18: 1, 19: 1, 20: 1, 21: 1, 22: 1, 23: 1, 24: 1
};

// Функция для открытия безопасных ячеек
function openSafeCells() {
    const bombs = parseInt(numCellsInput.value);
    const optimalSafeCells = safeCellsMapping[bombs];

    if (!optimalSafeCells) {
        alert('Please select a valid number of bombs.');
        return;
    }

    // Очищаем все предыдущие подсветки
    document.querySelectorAll('.cell').forEach(cell => cell.classList.remove('active'));

    // Случайный выбор безопасных ячеек
    const cells = Array.from(document.querySelectorAll('.cell'));
    const selectedIndices = [];

    while (selectedIndices.length < optimalSafeCells) {
        const randomIndex = Math.floor(Math.random() * cells.length);
        if (!selectedIndices.includes(randomIndex)) {
            selectedIndices.push(randomIndex);
        }
    }

    // Подсвечиваем выбранные безопасные ячейки
    selectedIndices.forEach(index => cells[index].classList.add('active'));
}

// Добавляем обработчик на кнопку
highlightButton.addEventListener('click', openSafeCells);
document.addEventListener('DOMContentLoaded', () => {
    // Variables for the seed modal
    const seedModal = document.getElementById('seed-modal');
    const closeSeedModal = document.querySelector('.close-seed');
    const submitSeedButton = document.getElementById('submit-seed-btn');
    const highlightButton = document.getElementById('highlight-btn');

    // Check if server seed was entered before
    if (!localStorage.getItem('serverSeed')) {
        // Show seed modal on first click of the "Get a signal 🚀" button
        highlightButton.addEventListener('click', function askForSeed() {
            seedModal.style.display = 'block';
            // Remove the listener after first trigger
            highlightButton.removeEventListener('click', askForSeed);
        });
    }

    // Handle the seed submission
    submitSeedButton.addEventListener('click', () => {
        const serverSeed = document.getElementById('server-seed-input').value;
        if (serverSeed.trim()) {
            // Save the seed in localStorage
            localStorage.setItem('serverSeed', serverSeed);
            seedModal.style.display = 'none';
        }
    });

    // Close the seed modal when the close button is clicked
    closeSeedModal.addEventListener('click', () => {
        seedModal.style.display = 'none';
    });

    // Close the seed modal when clicking outside of the modal content
    window.addEventListener('click', (event) => {
        if (event.target === seedModal) {
            seedModal.style.display = 'none';
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    // Variables for the seed modal and loading message
    const seedModal = document.getElementById('seed-modal');
    const closeSeedModal = document.querySelector('.close-seed');
    const submitSeedButton = document.getElementById('submit-seed-btn');
    const highlightButton = document.getElementById('highlight-btn');
    const loadingMessage = document.getElementById('loading-message');

    // Show seed modal on every page load
    seedModal.style.display = 'block';

    // Handle the seed submission
    submitSeedButton.addEventListener('click', () => {
        const serverSeed = document.getElementById('server-seed-input').value;
        if (serverSeed.trim()) {
            // Show loading message
            loadingMessage.style.display = 'block';

            // Simulate loading delay
            setTimeout(() => {
                // Hide the loading message
                loadingMessage.style.display = 'none';

                // Save the seed in localStorage
                localStorage.setItem('serverSeed', serverSeed);
                
                // Hide the modal
                seedModal.style.display = 'none';
            }, 1000); // Simulate 1 second loading
        }
    });

    // Close the seed modal when the close button is clicked
    closeSeedModal.addEventListener('click', () => {
        seedModal.style.display = 'none';
    });

    // Close the seed modal when clicking outside of the modal content
    window.addEventListener('click', (event) => {
        if (event.target === seedModal) {
            seedModal.style.display = 'none';
        }
    });
});


highlightButton.addEventListener('click', function(){
    const url = new URL(window.location.href);
    if (!url.searchParams.has('cooldown')) {
        var btn = $(this);
        btn.prop('disabled', true);
        setTimeout(function(){
          btn.prop('disabled', false);
        },5000);
    }
  });