import { PrismaClient } from '../src/generated/prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import bcrypt from 'bcryptjs'

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
const prisma = new PrismaClient({ adapter })

async function main() {
  console.log('Seeding database...')

  const hashedPassword = await bcrypt.hash('Admin@123', 10)
  const admin = await prisma.user.upsert({
    where: { email: 'admin@moonlightanime.com' },
    update: {},
    create: {
      email: 'admin@moonlightanime.com',
      password: hashedPassword,
      name: 'Moonlight Admin',
      role: 'ADMIN',
    },
  })
  console.log('Admin user created:', admin.email)

  const categories = await Promise.all([
    prisma.category.upsert({
      where: { slug: 'hoodies' },
      update: {},
      create: { name: 'Hoodies', slug: 'hoodies' },
    }),
    prisma.category.upsert({
      where: { slug: 'figures' },
      update: {},
      create: { name: 'Figures', slug: 'figures' },
    }),
    prisma.category.upsert({
      where: { slug: 't-shirts' },
      update: {},
      create: { name: 'T-Shirts', slug: 't-shirts' },
    }),
    prisma.category.upsert({
      where: { slug: 'accessories' },
      update: {},
      create: { name: 'Accessories', slug: 'accessories' },
    }),
  ])
  console.log(`Created ${categories.length} categories`)

  const brands = await Promise.all([
    prisma.brand.upsert({
      where: { slug: 'moonlight-originals' },
      update: {},
      create: { name: 'Moonlight Originals', slug: 'moonlight-originals' },
    }),
    prisma.brand.upsert({
      where: { slug: 'shonen-forge' },
      update: {},
      create: { name: 'Shonen Forge', slug: 'shonen-forge' },
    }),
  ])
  console.log(`Created ${brands.length} brands`)

  const hoodieCategory = categories.find((c) => c.slug === 'hoodies')!
  const figureCategory = categories.find((c) => c.slug === 'figures')!
  const originalsBrand = brands.find((b) => b.slug === 'moonlight-originals')!

  const product1 = await prisma.product.upsert({
    where: { slug: 'crimson-blade-hoodie' },
    update: {},
    create: {
      name: 'Crimson Blade Hoodie',
      slug: 'crimson-blade-hoodie',
      description: 'A premium oversized hoodie inspired by classic shonen sword arcs. Heavyweight cotton blend.',
      basePrice: 1899.0,
      categoryId: hoodieCategory.id,
      brandId: originalsBrand.id,
      images: {
        create: [
          { url: 'https://placehold.co/600x600?text=Crimson+Blade+Hoodie', altText: 'Crimson Blade Hoodie front', position: 0 },
        ],
      },
      variants: {
        create: [
          {
            sku: 'CBH-BLK-M',
            size: 'M',
            color: 'Black',
            price: 1899.0,
            inventory: { create: { quantity: 25 } },
          },
          {
            sku: 'CBH-BLK-L',
            size: 'L',
            color: 'Black',
            price: 1899.0,
            inventory: { create: { quantity: 30 } },
          },
          {
            sku: 'CBH-BLK-XL',
            size: 'XL',
            color: 'Black',
            price: 1999.0,
            inventory: { create: { quantity: 15 } },
          },
        ],
      },
    },
  })
  console.log('Product created:', product1.name)

  const product2 = await prisma.product.upsert({
    where: { slug: 'moonlit-ronin-figure' },
    update: {},
    create: {
      name: 'Moonlit Ronin Figure',
      slug: 'moonlit-ronin-figure',
      description: 'Hand-painted 1/8 scale collectible figure, limited edition Moonlight Originals release.',
      basePrice: 4499.0,
      categoryId: figureCategory.id,
      brandId: originalsBrand.id,
      images: {
        create: [
          { url: 'https://placehold.co/600x600?text=Moonlit+Ronin+Figure', altText: 'Moonlit Ronin Figure', position: 0 },
        ],
      },
      variants: {
        create: [
          {
            sku: 'MRF-STD',
            price: 4499.0,
            inventory: { create: { quantity: 10 } },
          },
        ],
      },
    },
  })
  console.log('Product created:', product2.name)

  console.log('Seeding complete.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })