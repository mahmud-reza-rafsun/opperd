import * as fs from 'fs';
import * as path from 'path';
import { prisma } from '../../src/database/prisma';

async function main() {
    console.log('🌱 Seeding categories...');
    const filePath = path.join(__dirname, '../../data/categoryData.json');
    if (!fs.existsSync(filePath)) {
        console.error(`❌ Error: categoryData.json file not found at: ${filePath}`);
        process.exit(1);
    }

    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const categories = JSON.parse(fileContent);

    for (const item of categories) {
        await prisma.category.upsert({
            where: { id: item.id },
            update: {
                name: item.name,
                slug: item.slug,
                image: item.image,
            },
            create: {
                id: item.id,
                name: item.name,
                slug: item.slug,
                image: item.image,
            },
        });
        console.log(`✔️ Upserted category: ${item.name}`);
    }

    console.log('✨ Categories seeding completed successfully!');
}

main()
    .catch((e) => {
        console.error('❌ Error during seeding:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
