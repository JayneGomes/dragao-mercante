import Image from "next/image";

import { Header } from "@/components/common/header";
import ProductList from "@/components/common/product-list";
import { db } from "@/db";

const Home = async () => {
  const products = await db.query.productTable.findMany({
    with: {
      variants: true,
      category: true,
    },
  });
  console.log(products);
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

      <div className="space-y-6 px-3">
        <Image
          src="/banner-02.png"
          alt="Jogos para unir (ou separar) amizades"
          height={0}
          width={0}
          sizes="100vw"
          className="h-auto w-full rounded-lg"
        />
      </div>
    </>
  );
};

export default Home;
