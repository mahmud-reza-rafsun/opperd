import * as fs from 'fs';
import * as path from 'path';
import { Prisma } from '@prisma/client';
import { prisma } from '../../src/database/prisma';

async function main() {
    console.log('🌱 Seeding products...');
    const filePath = path.join(__dirname, '../../data/products.json');
    if (!fs.existsSync(filePath)) {
        console.error(`❌ Error: products.json file not found at: ${filePath}`);
        process.exit(1);
    }

    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const products = JSON.parse(fileContent);

    for (const item of products) {
        const data: Prisma.ProductUncheckedCreateInput = {
            productTitle: item.productTitle,
            description: item.description,
            categoryId: item.categoryId,
            thumbnail: item.thumbnail,
            images: item.images,
            tags: item.tags,
            price: item.price,
            location: item.location,
            currency: item.currency,
            productCondition: item.productCondition,
            listingType: item.listingType,
            deliveryDays: item.deliveryDays,
            sellerId: item.sellerId,
        };

        await prisma.product.create({ data });
        console.log(`✔️ Created product: ${item.productTitle}`);
    }

    console.log('✨ Products seeding completed successfully!');
}

main()
    .catch((e) => {
        console.error('❌ Error during seeding:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
