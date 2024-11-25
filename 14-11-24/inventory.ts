// Requirements:
// 1. Create a Generic Inventory Class:
//    • Define a generic class named Inventory<T>, where T represents the type of item stored in the inventory.
//    • Each item in the inventory must have an id of type string and a name of type string.

interface Inventorys {
  id: string;
  name: string;
}

// 2. Inventory Functionality: Implement the following methods within the Inventory class:
class Inventory<T extends Inventorys> {
  private items: T[] = [];
  addItem(item: T): void {
    this.items.push(item);
  }

  removeItem(id: string): T | undefined {
    const index = this.items.findIndex((item) => item.id === id);
    if (index !== -1) {
      return this.items.splice(index, 1)[0];
    }
    return undefined;
  }

  findItem(id: string): T | undefined {
    return this.items.find((item) => item.id === id);
  }

  getItems(): T[] {
    return this.items;
  }
}

// 3. Define Example Item Types: To make the inventory system more realistic, define interfaces for several types of items you might store.
interface Books {
  id: string;
  name: string;
  author: string;
  pages: number;
}

interface Clothing {
  id: string;
  name: string;
  size: string;
  material: string;
}

interface Electronics {
  id: string;
  name: string;
  brand: string;
  warranty: boolean;
}

// 4. Usage Example: Use the Inventory class to create inventories for different types of items:
const bookInventory = new Inventory<Books>();
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

const clothingInventory = new Inventory<Clothing>();
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

const electronicInventory = new Inventory<Electronics>();
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

console.log(
  "Removing items from clothing",
  clothingInventory.removeItem("103")
);

console.log("Clothing items", clothingInventory.getItems());

console.log("Electronics search", electronicInventory.findItem("105"));

console.log(
  "Removing items from eletronics",
  electronicInventory.removeItem("105")
);

console.log("Electronic items", electronicInventory.getItems());
