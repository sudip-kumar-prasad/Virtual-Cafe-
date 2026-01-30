const mongoose = require('mongoose');
const dotenv = require('dotenv');
const MenuItem = require('../models/MenuItem');

// Load env vars
dotenv.config();

// Menu data from frontend
const menuItems = [
    {
        name: 'Espresso',
        price: 2.99,
        category: 'coffee',
        image: 'https://images.unsplash.com/photo-1520031607889-97ba0c7190ff?auto=format&fit=crop&w=400&h=300',
        description: 'A concentrated coffee beverage brewed by forcing hot water under pressure through finely-ground coffee beans.'
    },
    {
        name: 'Cappuccino',
        price: 3.99,
        category: 'coffee',
        image: 'https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=400&h=300',
        description: 'An espresso-based coffee drink prepared with steamed milk foam, typically served in a small cup.'
    },
    {
        name: 'Latte',
        price: 4.49,
        category: 'coffee',
        image: 'https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?auto=format&fit=crop&w=400&h=300',
        description: 'A coffee drink made with espresso and steamed milk.'
    },
    {
        name: 'Mocha',
        price: 4.99,
        category: 'coffee',
        image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=400&h=300',
        description: 'A chocolate-flavored variant of a caffè latte, made with espresso, steamed milk, and chocolate.'
    },
    {
        name: 'Caramel Macchiato',
        price: 4.79,
        category: 'coffee',
        image: 'https://images.unsplash.com/photo-1485808191679-5f86510681a2?auto=format&fit=crop&w=400&h=300',
        description: 'Espresso with steamed milk and vanilla syrup, topped with caramel drizzle.'
    },
    {
        name: 'Americano',
        price: 3.49,
        category: 'coffee',
        image: 'https://images.unsplash.com/photo-1551030173-122aabc4489c?auto=format&fit=crop&w=400&h=300',
        description: 'Espresso diluted with hot water, similar in strength to regular coffee.'
    },
    {
        name: 'Croissant',
        price: 2.99,
        category: 'pastry',
        image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=400&h=300',
        description: 'A buttery, flaky, viennoiserie pastry of Austrian origin.'
    },
    {
        name: 'Chocolate Chip Cookie',
        price: 1.99,
        category: 'pastry',
        image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=400&h=300',
        description: 'A sweet baked treat that contains chocolate chips or chocolate morsels.'
    },
    {
        name: 'Cinnamon Roll',
        price: 3.79,
        category: 'pastry',
        image: 'https://images.unsplash.com/photo-1509365465985-25d11c17e812?auto=format&fit=crop&w=400&h=300',
        description: 'Soft, sweet roll with a cinnamon-sugar filling and cream cheese frosting.'
    },
    {
        name: 'Almond Danish',
        price: 3.99,
        category: 'pastry',
        image: 'https://brokenovenbaking.com/wp-content/uploads/2023/03/almond-danish-10.jpg',
        description: 'Flaky pastry filled with almond paste and topped with sliced almonds.'
    },
    {
        name: 'Green Tea',
        price: 2.99,
        category: 'tea',
        image: 'https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5?auto=format&fit=crop&w=400&h=300',
        description: 'A type of tea that is made from Camellia sinensis leaves that have not undergone the same withering and oxidation process.'
    },
    {
        name: 'Chai Latte',
        price: 3.99,
        category: 'tea',
        image: 'https://images.unsplash.com/photo-1561336313-0bd5e0b27ec8?auto=format&fit=crop&w=400&h=300',
        description: 'A tea-based drink made with spiced black tea, milk, and sweetener.'
    },
    {
        name: 'Earl Grey Tea',
        price: 2.99,
        category: 'tea',
        image: 'https://shottbeverages.com/wp-content/uploads/2020/07/Earl_Grey_Tea_Infusion.jpg',
        description: 'Black tea flavored with oil of bergamot, served with optional lemon or milk.'
    },
    {
        name: 'Chamomile Tea',
        price: 2.79,
        category: 'tea',
        image: 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?auto=format&fit=crop&w=400&h=300',
        description: 'Caffeine-free herbal tea known for its calming properties.'
    },
    {
        name: 'Vegetarian Turkey & Cheese Sandwich',
        price: 6.99,
        category: 'food',
        isVegetarian: true,
        image: 'https://images.unsplash.com/photo-1528736235302-52922df5c122?auto=format&fit=crop&w=400&h=300',
        description: 'Plant-based turkey slices, cheese, lettuce, tomato, and mayo on freshly baked bread.'
    },
    {
        name: 'Fruit Bowl',
        price: 5.49,
        category: 'food',
        isVegetarian: true,
        image: 'https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?auto=format&fit=crop&w=400&h=300',
        description: 'A mix of seasonal fresh fruits including berries, melon, and citrus.'
    },
    {
        name: 'Vegetarian Caesar Salad',
        price: 7.99,
        category: 'food',
        isVegetarian: true,
        image: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?auto=format&fit=crop&w=400&h=300',
        description: 'Fresh romaine lettuce, croutons, parmesan cheese, and Caesar dressing (without anchovies).'
    },
    {
        name: 'Caprese Panini',
        price: 7.49,
        category: 'food',
        isVegetarian: true,
        image: 'https://images.unsplash.com/photo-1523529738216-242467d60007?auto=format&fit=crop&w=400&h=300',
        description: 'Fresh mozzarella, tomatoes, basil, and balsamic glaze on pressed ciabatta bread.'
    },
    {
        name: 'Avocado Toast',
        price: 6.99,
        category: 'food',
        isVegetarian: true,
        image: 'https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?auto=format&fit=crop&w=400&h=300',
        description: 'Smashed avocado on toasted artisan bread with cherry tomatoes and microgreens.'
    },
    {
        name: 'Glazed Donut',
        price: 2.49,
        category: 'pastry',
        image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=400&h=300',
        description: 'Light and fluffy classic donut with a sweet honey glaze.'
    },
    {
        name: 'Boston Cream Donut',
        price: 2.99,
        category: 'pastry',
        image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=400&h=300',
        description: 'Soft yeast donut filled with vanilla custard and topped with chocolate glaze.'
    },
    {
        name: 'Mixed Berry Danish',
        price: 3.99,
        category: 'pastry',
        image: 'https://images.unsplash.com/photo-1464195244916-405fa0a82545?auto=format&fit=crop&w=400&h=300',
        description: 'Flaky butter pastry filled with vanilla custard and topped with fresh seasonal berries and a light glaze.'
    },
    {
        name: 'Fresh Fruit Pastry',
        price: 3.99,
        category: 'pastry',
        image: 'https://milkandhoney.in/wp-content/uploads/2024/08/2-FRESH-FRUIT-PASTRY_E.jpg',
        description: 'Flaky pastry filled with fresh seasonal fruits and a light cream filling.'
    },
    {
        name: 'Blueberry Pastry',
        price: 3.49,
        category: 'pastry',
        image: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fkreamz.in%2Fpastries%2Fblueberry-classic-pastry%2F&psig=AOvVaw1i3yEd0Zd7mC130DwqpcL0&ust=1746044396212000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCPiFmrWI_owDFQAAAAAdAAAAABAE',
        description: 'Flaky pastry filled with fresh blueberries and a light cream filling, topped with a sweet glaze.'
    },
    {
        name: 'Margherita Pizza',
        price: 12.99,
        category: 'food',
        isVegetarian: true,
        image: 'https://images.unsplash.com/photo-1595854341625-f33ee10dbf94?auto=format&fit=crop&w=400&h=300',
        description: 'Classic Italian pizza with fresh tomato sauce, mozzarella cheese, and basil leaves.'
    },
    {
        name: 'Pepperoni Pizza',
        price: 14.99,
        category: 'food',
        isVegetarian: false,
        image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=400&h=300',
        description: 'Traditional pizza topped with tomato sauce, mozzarella cheese, and spicy pepperoni slices.'
    },
    {
        name: 'Vegetarian Pizza',
        price: 13.99,
        category: 'food',
        isVegetarian: true,
        image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=400&h=300',
        description: 'Loaded with fresh vegetables including bell peppers, mushrooms, onions, and olives.'
    },
    {
        name: 'BBQ Chicken Pizza',
        price: 15.99,
        category: 'food',
        isVegetarian: false,
        image: 'https://images.unsplash.com/photo-1601924582970-9238bcb495d9?auto=format&fit=crop&w=400&h=300',
        description: 'Tangy BBQ sauce base with grilled chicken, red onions, and mozzarella cheese.'
    },
    {
        name: 'Classic Cheeseburger',
        price: 9.99,
        category: 'food',
        isVegetarian: false,
        image: 'https://iambaker.net/wp-content/uploads/2019/05/cheeseburger-1.jpg',
        description: 'Juicy beef patty with American cheese, lettuce, tomato, and special sauce on a toasted bun.'
    },
    {
        name: 'Veggie Burger',
        price: 8.99,
        category: 'food',
        isVegetarian: true,
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/%D7%94%D7%9E%D7%91%D7%95%D7%A8%D7%92%D7%A8_%D7%98%D7%91%D7%A2%D7%95%D7%A0%D7%99.jpg/2560px-%D7%94%D7%9E%D7%91%D7%95%D7%A8%D7%92%D7%A8_%D7%98%D7%91%D7%A2%D7%95%D7%A0%D7%99.jpg',
        description: 'Plant-based patty with avocado, lettuce, tomato, and vegan mayo on a whole grain bun.'
    },
    {
        name: 'Spicy Chicken Burger',
        price: 10.99,
        category: 'food',
        isVegetarian: false,
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=400&h=300',
        description: 'Crispy chicken patty with spicy sauce, lettuce, and pickles on a brioche bun.'
    },
    {
        name: 'Mushroom Swiss Burger',
        price: 10.99,
        category: 'food',
        isVegetarian: false,
        image: 'https://images.unsplash.com/photo-1561758033-7e924f619b47?auto=format&fit=crop&w=400&h=300',
        description: 'Beef patty topped with sautéed mushrooms, Swiss cheese, and garlic aioli on a toasted bun.'
    },
    {
        name: 'Mediterranean Falafel Wrap',
        price: 8.99,
        category: 'food',
        isVegetarian: true,
        image: 'https://cookingwithayeh.com/wp-content/uploads/2024/03/Falafel-Wrap-1.jpg',
        description: 'Crispy falafel with hummus, lettuce, tomatoes, and tahini sauce in a warm pita.'
    },
    {
        name: 'Grilled Chicken Salad',
        price: 9.99,
        category: 'food',
        isVegetarian: false,
        image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?auto=format&fit=crop&w=400&h=300',
        description: 'Grilled chicken breast over mixed greens with avocado, tomatoes, and balsamic dressing.'
    },
    {
        name: 'Quinoa Buddha Bowl',
        price: 10.99,
        category: 'food',
        isVegetarian: true,
        image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400&h=300',
        description: 'Quinoa with roasted vegetables, chickpeas, avocado, and tahini dressing.'
    },
    {
        name: 'Grilled Chicken Sandwich',
        price: 9.99,
        category: 'food',
        isVegetarian: false,
        image: 'https://images.unsplash.com/photo-1521390188846-e2a3a97453a0?auto=format&fit=crop&w=400&h=300',
        description: 'Grilled chicken breast with avocado, bacon, lettuce, and honey mustard on sourdough.'
    },
    {
        name: 'Chicken Alfredo Pasta',
        price: 11.99,
        category: 'food',
        isVegetarian: false,
        image: 'https://images.unsplash.com/photo-1611270629569-8b357cb88da9?auto=format&fit=crop&w=400&h=300',
        description: 'Creamy alfredo sauce with fettuccine pasta, topped with grilled chicken breast, parmesan cheese, and fresh parsley.'
    },
    {
        name: 'Vegetable Primavera',
        price: 10.99,
        category: 'food',
        isVegetarian: true,
        image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=400&h=300',
        description: 'Penne pasta with seasonal vegetables, garlic, olive oil, and fresh herbs.'
    },
    {
        name: 'Mushroom Ravioli',
        price: 11.99,
        category: 'food',
        isVegetarian: true,
        image: 'https://www.theclevercarrot.com/wp-content/uploads/2023/11/Mushroom-ravioli-14.jpg',
        description: 'Homemade ravioli filled with wild mushrooms, served in a light cream sauce.'
    },
    {
        name: 'Seafood Linguine Special',
        price: 16.99,
        category: 'food',
        isVegetarian: false,
        image: 'https://fraicheliving.com/wp-content/uploads/2019/04/TP9zjNMv.jpeg',
        description: 'Premium linguine with fresh seafood medley, garlic, white wine sauce, and fresh herbs. Served with garlic bread.'
    }
];

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected...');

        // Clear existing menu items
        await MenuItem.deleteMany({});
        console.log('Menu items cleared...');

        // Insert new menu items
        await MenuItem.insertMany(menuItems);
        console.log('Menu items imported!');

        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seedDB();
