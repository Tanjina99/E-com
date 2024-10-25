import Head from "next/head";
import { Inter } from "next/font/google";
import Header from "@/components/shared/Header/Header";
import SliderComp from "@/components/home/SliderComp";
import BasicService from "@/components/home/BasicService";
// import FeaturedProduct from "@/components/home/FeaturedProduct";
import dynamic from "next/dynamic";
import axios from "axios";
import HeadComp from "@/components/shared/HeadComp";
import CategoriesList from "@/components/home/CategoriesList";

const FeaturedProduct = dynamic(
  async () => await import("@/components/home/FeaturedProduct"),
  {
    ssr: false
  }
)

const inter = Inter({ subsets: ["latin"] });

export default function Home({ featuredProduct }) {
  return (
    <>
      <HeadComp/>
      <Header/>
      <main className="main_container">
          <div className="row">
          <div className="col-lg-3">
            <CategoriesList/>
            </div>
            <div className="col-lg-9" col-md-12>
            <div className="slider_container">
            <SliderComp/>
            <BasicService/>
            <div/>
          </div>
          </div>
          </div>

          <div className="featured">
          <FeaturedProduct featuredProduct={featuredProduct} />
          </div>
      </main>
    </>
  );
}

// export async function getServerSideProps() {
//   try {
//     const res = await axios.get("//product/getFeatured")
//     if(res.data?.success) {
//       const featureProduct = res.data?.products;

//       return {
//         props: {
//           featureProduct
//         }
//       }
//     }
//   } catch (error) {
//     console.log(error)
//     return {
//       props: {
//         featureProduct: []
//       }
//     }
//   }
// }