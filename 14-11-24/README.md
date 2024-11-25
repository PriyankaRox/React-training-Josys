Task 5: 14 November 2024
Inventory Management System for an Online Store using Generics 

In this task, you’ll be implementing a generic inventory management system for an online store. The goal is to create a flexible, type-safe class that can
handle various types of products within a single inventory system, making it suitable for managing a wide range of items like books, clothing, and electronics.
          
Objectives:
• Understand Generics: By using generics, you should be able to manage any type of inventory item (e.g., books, clothing, electronics) within a single, reusable
  Inventory class.
• Practice Type Safety: Generics allow type-checking at compile-time, so each inventory will only accept items that match the specified type.

Requirements:
1. Create a Generic Inventory Class:
   • Define a generic class named Inventory<T>, where T represents the type of item stored in the inventory.
   • Each item in the inventory must have an id of type string and a name of type string.
                                                                                                                      
2. Inventory Functionality: Implement the following methods within the Inventory class:
   • addItem(item: T): void
     • Adds an item of type T to the inventory.
   • removeItem(id: string): T | undefined
     • Removes an item from the inventory by its id and returns the item if it was found and removed, or undefined if no item with that id exists.
   • findItem(id: string): T | undefined
     • Searches for an item by its id in the inventory and returns it if found, or undefined if not found.
   • getItems(): T[]
     • Returns an array of all items currently in the inventory.                                                                                                                                     
                                                                                                                                      
3. Define Example Item Types: To make the inventory system more realistic, define interfaces for several types of items you might store.
   Here are three example interfaces:
   • Book
     • id: string
     • name: string
     • author: string
     • pages: number      
     
   • Clothing
     • id: string
     • name: string
     • size: string
     • material: string                                                                                                                                  
                                                                                                                                      
   • Electronics
     • id: string
     • name: string
     • brand: string
     • warranty: boolean (indicating if the item has a warranty)                                                                                                                                   
                                                                                                                                                                                                                                                                            
4. Usage Example: Use the Inventory class to create inventories for different types of items:
   • Create an inventory for Book items and add a few book entries.
   • Create an inventory for Clothing items and add a few clothing entries.
   • Create an inventory for Electronics items and add a few electronic entries.

   After adding items to each inventory, test the functionality by:
   • Searching for specific items using findItem.
   • Removing items using removeItem.
   • Retrieving all items using getItems.