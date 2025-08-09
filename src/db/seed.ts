import crypto from "crypto";

import { db } from ".";
import { categoryTable, productTable, productVariantTable } from "./schema";

const productImages = {
  Catan: {
    "Edição Padrão": [
      "https://m.media-amazon.com/images/I/61N4f+DspRL._AC_SL1011_.jpg",
    ],
    "Edição 5-6 Jogadores": [
      "https://m.media-amazon.com/images/I/61N4f+DspRL._AC_SL1011_.jpg",
    ],
  },
  "Ticket to Ride": {
    "Edição Padrão": [
      "https://m.media-amazon.com/images/I/61WQ7QVPJoL._AC_SX569_.jpg",
    ],
    "Edição Europa": [
      "https://m.media-amazon.com/images/I/71MQCXyvBWL._AC_SL1500_.jpg",
    ],
  },
  Azul: {
    "Edição Padrão": [
      "https://m.media-amazon.com/images/I/91A0nIsV57S._AC_SL1500_.jpg",
    ],
  },
  "Terraforming Mars": {
    "Edição Padrão": [
      "https://m.media-amazon.com/images/I/61tsI2Nu7jL._AC_SL1000_.jpg",
    ],
  },

  Scythe: {
    "Edição Padrão": [
      "https://m.media-amazon.com/images/I/61tsI2Nu7jL._AC_SL1000_.jpg",
    ],
  },

  // RPG de Mesa
  "D&D 5e - Livro do Jogador": {
    "Capa Comum": [
      "https://m.media-amazon.com/images/I/71kM9wdaeHL._AC_SL1051_.jpg",
    ],
    "Capa Dura": [
      "https://m.media-amazon.com/images/I/71kM9wdaeHL._AC_SL1051_.jpg",
    ],
  },
  "D&D 5e - Guia do Mestre": {
    "Capa Comum": [
      "https://m.media-amazon.com/images/I/81cw5IcoM+L._SL1500_.jpg",
    ],
    "Capa Dura": [
      "https://m.media-amazon.com/images/I/81cw5IcoM+L._SL1500_.jpg",
    ],
  },
  "D&D 5e - Bestiário": {
    "Capa Dura": [
      "https://m.media-amazon.com/images/I/815khbmtfbL._AC_SL1500_.jpg",
    ],
  },
  "Pathfinder Core Rulebook": {
    "Capa Comum": [
      "https://m.media-amazon.com/images/I/7174tha2yiL._SL1200_.jpg",
    ],
    "Capa Dura": [
      "https://m.media-amazon.com/images/I/7174tha2yiL._SL1200_.jpg",
    ],
  },
  "Call of Cthulhu - Core": {
    "Capa Comum": [
      "https://m.media-amazon.com/images/I/61vJOgQA8DL._SL1000_.jpg",
    ],
    "Capa Dura": [
      "https://m.media-amazon.com/images/I/61vJOgQA8DL._SL1000_.jpg",
    ],
  },

  // Dados
  "Conjunto de Dados RPG - Acrílico": {
    "Transparente Azul": [
      "https://m.media-amazon.com/images/I/61OOKM4Vp1L._AC_SL1500_.jpg",
    ],
    "Opalescente Vermelho": [
      "https://m.media-amazon.com/images/I/51-axhuvX3L._AC_.jpg",
    ],
  },
  "Conjunto de Dados RPG - Metal": {
    Prata: ["https://m.media-amazon.com/images/I/51ntKfrDaTL._AC_.jpg"],
    Bronze: ["https://m.media-amazon.com/images/I/91KUMfMh7vL._AC_SL1500_.jpg"],
  },
  "Conjunto de Dados Gemstone": {
    "Set Gemstone": [
      "https://m.media-amazon.com/images/I/61+yzshV6jL._AC_SL1280_.jpg",
    ],
  },

  // Miniaturas
  "Miniatura Herói": {
    "Guerreiro Pintado": [
      "https://m.media-amazon.com/images/I/611fDXgT5fL._AC_SL1500_.jpg",
    ],
    "Mago Pintado": [
      "https://m.media-amazon.com/images/I/41cA+Nswm1L._AC_.jpg",
    ],
  },
  "Pack Monstros": {
    "Pack Básico": [
      "https://m.media-amazon.com/images/I/718gYEev2SL._AC_SL1500_.jpg",
    ],
    "Pack Avançado": [
      "https://m.media-amazon.com/images/I/71VVBM1uz8L._AC_SL1500_.jpg",
    ],
  },
};

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .trim();
}

const categories = [
  {
    name: "Jogos de Tabuleiro",
    description: "Clássicos e modernos para jogar com amigos e família",
  },
  {
    name: "RPG de Mesa",
    description: "Livros, manuais e acessórios para suas campanhas",
  },
  {
    name: "Dados",
    description: "Conjuntos de dados para RPG e boardgames",
  },
  {
    name: "Miniaturas",
    description: "Miniaturas para RPG e colecionadores",
  },
];

const products = [
  // Jogos de Tabuleiro
  {
    name: "Catan",
    description:
      "Um clássico de negociação e construção — colonize, troque e expanda seu império em Catan.",
    categoryName: "Jogos de Tabuleiro",
    variants: [
      { option: "Edição Padrão", price: 24990 },
      { option: "Edição 5-6 Jogadores", price: 29990 },
    ],
  },
  {
    name: "Ticket to Ride",
    description:
      "Jogo de rotas ferroviárias para toda a família — planeje caminhos e conecte cidades.",
    categoryName: "Jogos de Tabuleiro",
    variants: [
      { option: "Edição Padrão", price: 19990 },
      { option: "Edição Europa", price: 21990 },
    ],
  },
  {
    name: "Azul",
    description:
      "Jogo de padrões e mosaicos — estratégico, bonito e fácil de aprender.",
    categoryName: "Jogos de Tabuleiro",
    variants: [{ option: "Edição Padrão", price: 14990 }],
  },
  {
    name: "Terraforming Mars",
    description:
      "Gerencie corporações e transforme Marte em um planeta habitável — jogo estratégico profundo.",
    categoryName: "Jogos de Tabuleiro",
    variants: [{ option: "Edição Padrão", price: 27990 }],
  },
  {
    name: "Scythe",
    description:
      "Jogo de estratégia assimétrica com economia e controle de área.",
    categoryName: "Jogos de Tabuleiro",
    variants: [{ option: "Edição Padrão", price: 36990 }],
  },

  // RPG de Mesa
  {
    name: "D&D 5e - Livro do Jogador",
    description:
      "Livro essencial para jogadores de Dungeons & Dragons 5ª edição.",
    categoryName: "RPG de Mesa",
    variants: [
      { option: "Capa Comum", price: 24990 },
      { option: "Capa Dura", price: 34990 },
    ],
  },
  {
    name: "D&D 5e - Guia do Mestre",
    description:
      "Ferramentas e recursos para conduzir suas campanhas como mestre.",
    categoryName: "RPG de Mesa",
    variants: [
      { option: "Capa Comum", price: 23990 },
      { option: "Capa Dura", price: 33990 },
    ],
  },
  {
    name: "D&D 5e - Bestiário",
    description: "Coleção de monstros para enriquecer encontros e aventuras.",
    categoryName: "RPG de Mesa",
    variants: [{ option: "Capa Dura", price: 25990 }],
  },
  {
    name: "Pathfinder Core Rulebook",
    description: "Livro de regras essencial para campanhas em Pathfinder.",
    categoryName: "RPG de Mesa",
    variants: [
      { option: "Capa Comum", price: 22990 },
      { option: "Capa Dura", price: 32990 },
    ],
  },
  {
    name: "Call of Cthulhu - Core",
    description: "Manual para horror investigativo e terror cósmico.",
    categoryName: "RPG de Mesa",
    variants: [
      { option: "Capa Comum", price: 19990 },
      { option: "Capa Dura", price: 29990 },
    ],
  },

  // Dados
  {
    name: "Conjunto de Dados RPG - Acrílico",
    description: "Conjunto completo (d4,d6,d8,d10,d12,d20,d00) em acrílico.",
    categoryName: "Dados",
    variants: [
      { option: "Transparente Azul", price: 5990 },
      { option: "Opalescente Vermelho", price: 6490 },
    ],
  },
  {
    name: "Conjunto de Dados RPG - Metal",
    description: "Conjunto pesado em metal para sensação premium nas jogadas.",
    categoryName: "Dados",
    variants: [
      { option: "Prata", price: 12990 },
      { option: "Bronze", price: 12990 },
    ],
  },
  {
    name: "Conjunto de Dados Gemstone",
    description:
      "Dados com acabamento tipo gema — visual e peso diferenciados.",
    categoryName: "Dados",
    variants: [{ option: "Set Gemstone", price: 15990 }],
  },

  // Miniaturas
  {
    name: "Miniatura Herói",
    description: "Miniatura pintada à mão para personagem herói (detalhada).",
    categoryName: "Miniaturas",
    variants: [
      { option: "Guerreiro Pintado", price: 8990 },
      { option: "Mago Pintado", price: 8990 },
    ],
  },
  {
    name: "Pack Monstros (5 unidades)",
    description: "Pacote com 5 miniaturas de inimigos prontos para usar.",
    categoryName: "Miniaturas",
    variants: [
      { option: "Pack Básico", price: 25990 },
      { option: "Pack Avançado", price: 35990 },
    ],
  },
  {
    name: "Miniatura Unpainted",
    description:
      "Miniaturas não pintadas para você customizar (individual ou em pack).",
    categoryName: "Miniaturas",
    variants: [
      { option: "Individual", price: 4990 },
      { option: "Pack 10", price: 39990 },
    ],
  },
];

async function main() {
  console.log("🌱 Iniciando o seeding do banco de dados...");

  try {
    // Limpar dados existentes
    console.log("🧹 Limpando dados existentes...");
    await db.delete(productVariantTable);
    await db.delete(productTable);
    await db.delete(categoryTable);
    console.log("✅ Dados limpos com sucesso!");

    // Inserir categorias primeiro
    const categoryMap = new Map<string, string>();

    console.log("📂 Criando categorias...");
    for (const categoryData of categories) {
      const categoryId = crypto.randomUUID();
      const categorySlug = generateSlug(categoryData.name);

      console.log(`  📁 Criando categoria: ${categoryData.name}`);

      await db.insert(categoryTable).values({
        id: categoryId,
        name: categoryData.name,
        slug: categorySlug,
        description: categoryData.description,
      });

      categoryMap.set(categoryData.name, categoryId);
    }

    // Inserir produtos
    for (const productData of products) {
      const productSlug = generateSlug(productData.name);
      const categoryId = categoryMap.get(productData.categoryName);

      if (!categoryId) {
        throw new Error(
          `Categoria "${productData.categoryName}" não encontrada`,
        );
      }

      console.log(`📦 Criando produto: ${productData.name}`);

      const [insertedProduct] = await db
        .insert(productTable)
        .values({
          name: productData.name,
          slug: productSlug,
          description: productData.description,
          categoryId: categoryId,
        })
        .returning();

      // Inserir variantes do produto
      for (const variantData of productData.variants) {
        const productKey = productData.name as keyof typeof productImages;
        const variantImages =
          productImages[productKey]?.[
            variantData.option as keyof (typeof productImages)[typeof productKey]
          ] || [];

        console.log(`  🎨 Criando variante: ${variantData.option}`);

        await db.insert(productVariantTable).values({
          name: variantData.option,
          productId: insertedProduct.id,
          imagesUrl: variantImages[0] || "",
          priceInCents: variantData.price,
          slug: generateSlug(`${productData.name}-${variantData.option}`),
        });
      }
    }

    console.log("✅ Seeding concluído com sucesso!");
    const totalVariants = products.reduce(
      (acc, p) => acc + p.variants.length,
      0,
    );
    console.log(
      `📊 Foram criadas ${categories.length} categorias, ${products.length} produtos com ${totalVariants} variantes.`,
    );
  } catch (error) {
    console.error("❌ Erro durante o seeding:", error);
    throw error;
  }
}

main().catch(console.error);
