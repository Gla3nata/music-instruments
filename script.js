class MusicalInstrument {
    constructor(name, brand, price, type) {
        this._name = name;
        this._brand = brand;
        this._price = price;
        this._type = type;
    }
    get name() { return this._name; }
    set name(value) { if (value) this._name = value; }

    get price() { return this._price; }
    set price(value) { if (value >= 0) this._price = value; }

    getDescription() {
        return `${this._brand} ${this._name} - ${this._price} руб.`;
    }
}


class Guitar extends MusicalInstrument {
    constructor(name, brand, price, type, stringsCount, guitarType) {
        super(name, brand, price, type);
        this._stringsCount = stringsCount;
        this._guitarType = guitarType;
    }
    get stringsCount() { return this._stringsCount; }
    set stringsCount(value) {
        if (value > 0) this._stringsCount = value;
    }

    get guitarType() { return this._guitarType; }
    set guitarType(value) {
        if (value) this._guitarType = value;
    }
}

class Piano extends MusicalInstrument {
    constructor(name, brand, price, type, keysCount, pianoType) {
        super(name, brand, price, type);
        this._keysCount = keysCount;
        this._pianoType = pianoType;
    }
    get keysCount() { return this._keysCount; }
    set keysCount(value) {
        if (value > 0) this._keysCount = value;
    }

    get pianoType() { return this._pianoType; }
    set pianoType(value) {
        if (value) this._pianoType = value;
    }
}



let instruments = [];

document.getElementById('instrument-type').addEventListener('change', function() {
    const instrumentType = this.value;
    const guitarFields = document.getElementById('guitar-fields');
    const pianoFields = document.getElementById('piano-fields');
    
    guitarFields.style.display = 'none';
    pianoFields.style.display = 'none';
    
    if (instrumentType === 'guitar') {
        guitarFields.style.display = 'block';
    } else if (instrumentType === 'piano') {
        pianoFields.style.display = 'block';
    }
});

document.getElementById('instrument-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const instrumentType = document.getElementById('instrument-type').value;
    const name = document.getElementById('name').value;
    const brand = document.getElementById('brand').value;
    const price = parseInt(document.getElementById('price').value);
    const type = document.getElementById('type').value;
    
    let newInstrument;
    
    // Создаем объект в зависимости от выбранного типа
    if (instrumentType === 'guitar') {
        const stringsCount = parseInt(document.getElementById('strings-count').value);
        const guitarType = document.getElementById('guitar-type').value;
        newInstrument = new Guitar(name, brand, price, type, stringsCount, guitarType);
    } 
    else if (instrumentType === 'piano') {
        const keysCount = parseInt(document.getElementById('keys-count').value);
        const pianoType = document.getElementById('piano-type').value;
        newInstrument = new Piano(name, brand, price, type, keysCount, pianoType);
    }
    
    // Добавляем в массив
    instruments.push(newInstrument);
    console.log('Создан объект:', newInstrument);
    
    // ОБНОВЛЯЕМ ТАБЛИЦУ
    updateTable();
    
    // Очищаем форму
    this.reset();
    document.getElementById('guitar-fields').style.display = 'none';
    document.getElementById('piano-fields').style.display = 'none';
});

// Функция для обновления таблицы
function updateTable() {
    const tbody = document.getElementById('instruments-tbody');
    tbody.innerHTML = ''; // Очищаем таблицу
    
    instruments.forEach((instrument, index) => {
        const row = document.createElement('tr');
        
        // Определяем тип инструмента для отображения
        let instrumentType = '';
        let details = '';
        
        if (instrument instanceof Guitar) {
            instrumentType = 'Гитара';
            details = `Струн: ${instrument.stringsCount}, Тип: ${instrument.guitarType}`;
        } else if (instrument instanceof Piano) {
            instrumentType = 'Пианино';
            details = `Клавиш: ${instrument.keysCount}, Тип: ${instrument.pianoType}`;
        }
        
        row.innerHTML = `
            <td>${instrumentType}</td>
            <td>${instrument.name}</td>
            <td>${instrument.brand}</td>
            <td>${instrument.price} руб.</td>
            <td>${instrument.type}</td>
            <td>${details}</td>
            <td>
                <button class="delete-btn" data-index="${index}">Удалить</button>
            </td>
        `;
        
        tbody.appendChild(row);
    });
    
    // Добавляем обработчики для кнопок удаления
    addDeleteHandlers();
}

// Функция для добавления обработчиков удаления
function addDeleteHandlers() {
    document.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            console.log('Удаляем инструмент с индексом:', index);
            // Пока просто выводим в консоль, удаление сделаем позже
        });
    });
}