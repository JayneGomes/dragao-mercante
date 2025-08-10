import { desc } from "drizzle-orm";
import Image from "next/image";

import CategorySelector from "@/components/common/category-selector";
import Footer from "@/components/common/footer";
import { Header } from "@/components/common/header";
import ProductList from "@/components/common/product-list";
import { db } from "@/db";
import { productTable } from "@/db/schema";

const Home = async () => {
  const products = await db.query.productTable.findMany({
    with: {
      variants: true,
      category: true,
    },
  });

  const newlyCreatedProducts = await db.query.productTable.findMany({
    orderBy: [desc(productTable.createdAt)],
    with: {
      variants: true,
      category: true,
    },
  });

  const categories = await db.query.categoryTable.findMany({});

  return (
    <>
      <Header />
      <div className="space-y-6 px-3">
        <Image
          src="/banner-01.png"
          alt="Forje sua próxima aventura com itens lendários"
          height={0}
          width={0}
          sizes="100vw"
          className="h-auto w-full rounded-lg"
        />
      </div>
      <div className="py-8">
        <ProductList products={products} title="Mais Vendidos" />
      </div>
      <div className="px-5">
        <CategorySelector categories={categories} />
      </div>

      <div className="space-y-6 px-3 py-8">
        <Image
          src="/banner-02.png"
          alt="Jogos para unir (ou separar) amizades"
          height={0}
          width={0}
          sizes="100vw"
          className="h-auto w-full rounded-lg"
        />
      </div>
      <div className="py-8">
        <ProductList products={newlyCreatedProducts} title="Direto da forja" />
      </div>
      <Footer />
    </>
  );
};

export default Home;
