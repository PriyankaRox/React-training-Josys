// Requirements:
// 1. Create a Generic Inventory Class:
//    • Define a generic class named Inventory<T>, where T represents the type of item stored in the inventory.
//    • Each item in the inventory must have an id of type string and a name of type string.
// 2. Inventory Functionality: Implement the following methods within the Inventory class:
var Inventory = /** @class */ (function () {
    function Inventory() {
        this.items = [];
    }
    Inventory.prototype.addItem = function (item) {
        this.items.push(item);
    };
    Inventory.prototype.removeItem = function (id) {
        var index = this.items.findIndex(function (item) { return item.id === id; });
        if (index !== -1) {
            return this.items.splice(index, 1)[0];
        }
        return undefined;
    };
    Inventory.prototype.findItem = function (id) {
        return this.items.find(function (item) { return item.id === id; });
    };
    Inventory.prototype.getItems = function () {
        return this.items;
    };
    return Inventory;
}());
// 4. Usage Example: Use the Inventory class to create inventories for different types of items:
var bookInventory = new Inventory();
bookInventory.addItem({
    id: "101",
    name: "Atomic Habbits",
    author: "James Clear",
    pages: 220,
});
bookInventory.addItem({
    id: "102",
    name: "Habbits",
    author: "Kevuin",
    pages: 260,
});
var clothingInventory = new Inventory();
clothingInventory.addItem({
    id: "103",
    name: "Kurti",
    size: "40m",
    material: "cotton",
});
clothingInventory.addItem({
    id: "104",
    name: "Saree",
    size: "100m",
    material: "silk",
});
var electronicInventory = new Inventory();
electronicInventory.addItem({
    id: "105",
    name: "TV",
    brand: "Sony",
    warranty: true,
});
electronicInventory.addItem({
    id: "106",
    name: "Fridge",
    brand: "Haier",
    warranty: false,
});
// Searching for specific items using findItem.
console.log("Book search", bookInventory.findItem("101"));
console.log("Removing items from book", bookInventory.removeItem("101"));
console.log("Book items", bookInventory.getItems());
console.log("Clothing search", clothingInventory.findItem("103"));
console.log("Removing items from clothing", clothingInventory.removeItem("103"));
console.log("Clothing items", clothingInventory.getItems());
console.log("Electronics search", electronicInventory.findItem("105"));
console.log("Removing items from eletronics", electronicInventory.removeItem("105"));
console.log("Electronic items", electronicInventory.getItems());
