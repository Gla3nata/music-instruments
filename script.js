class MusicalInstrument {
    constructor(type, country, brand, article, name, price, color) {
        this._type = type;    
        this._country = country;
        this._brand = brand;
        this._article = article;
        this._name = name;
        this._price = price;
        this._color = color;
    }
    
    get name() {
        return this._name;
    }
    
    set name(newName) {
        if (newName.length > 0) {
            this._name = newName;
        } else {
            console.log("Название не может быть пустым");
        }
    }
    
    get price() {
        return this._price;
    }
    
    set price(newPrice) {
        if (newPrice >= 0) {
            this._price = newPrice;
        } else {
            console.log("Цена не может быть отрицательной");
        }
    }
    
}
