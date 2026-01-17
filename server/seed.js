
const Database = require('better-sqlite3');
const db = new Database('database.db');

// Create tables if not exists
db.exec(`
  CREATE TABLE IF NOT EXISTS products (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    category TEXT,
    description TEXT,
    stock INTEGER DEFAULT 0,
    imageUrl TEXT,
    modelUrl TEXT,
    dimensions TEXT
  );
`);

const INITIAL_PRODUCTS = [
    {
        id: '1',
        name: 'Aurelia Kadife Koltuk',
        price: 18500,
        description: 'Zarafetin ve konforun buluştuğu nokta. İtalyan kadife dokusuyla salonunuza saray havası katın.',
        category: 'Oturma Grubu',
        imageUrl: 'https://picsum.photos/seed/sofa1/800/600',
        modelUrl: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
        dimensions: { width: 220, height: 85, depth: 95 },
        stock: 5
    },
    {
        id: '2',
        name: 'Lumiera Mermer Masa',
        price: 12400,
        description: 'Doğal damarlı Carrara mermeri ve altın varaklı ayaklarla akşam yemeklerinizi sanata dönüştürün.',
        category: 'Yemek Odası',
        imageUrl: 'https://picsum.photos/seed/table1/800/600',
        modelUrl: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
        dimensions: { width: 180, height: 75, depth: 90 },
        stock: 3
    },
    {
        id: '3',
        name: 'Zephyr Minimalist Berjer',
        price: 6800,
        description: 'Modern çizgiler, sürdürülebilir ahşap iskelet. Avyna kalitesiyle minimalizmin doruklarına ulaşın.',
        category: 'Oturma Grubu',
        imageUrl: 'https://picsum.photos/seed/berjer/800/600',
        modelUrl: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
        dimensions: { width: 80, height: 95, depth: 85 },
        stock: 12
    }
];

const insert = db.prepare(`
  INSERT OR REPLACE INTO products (id, name, price, category, description, stock, imageUrl, modelUrl, dimensions)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
`);

db.transaction(() => {
    for (const p of INITIAL_PRODUCTS) {
        insert.run(p.id, p.name, p.price, p.category, p.description, p.stock, p.imageUrl, p.modelUrl, JSON.stringify(p.dimensions));
    }
})();

console.log('Database seeded successfully!');
