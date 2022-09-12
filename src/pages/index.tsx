import { GetStaticProps } from "next";
import Image from "next/future/image";
import Link from "next/link";
import { useKeenSlider } from "keen-slider/react";
import Stripe from "stripe";

import { stripe } from "../lib/stripe";

import { HomeContainer, Product } from "../styles/pages/home";

import 'keen-slider/keen-slider.min.css'

interface HomeProps {
  products: {
    id: string;
    name: string;
    imageUrl: string;
    price: number;
    price_formatted: string;
  }[];
};

export default function Home({ products }: HomeProps) {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    },
  });

  return (
    <HomeContainer ref={sliderRef} className="keen-slider">
      {products.map((product) => {
        return (
          <Link
            key={product.id}
            href={`/product/${product.id}`}
          >
            <Product
              className="keen-slider__slide"
            >
              <Image
                src={product.imageUrl}
                width={520}
                height={480}
                alt={product.name}
                placeholder="blur"
                blurDataURL={product.imageUrl}
              />

              <footer>
                <strong>{product.name}</strong>

                <span>{product.price_formatted}</span>
              </footer>
            </Product>
          </Link>
        )
      })}
    </HomeContainer>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price'],
  });

  const products = response.data.map(product => {
    const price = product.default_price as Stripe.Price;

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: price.unit_amount / 100,
      price_formatted: new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(price.unit_amount / 100),
    };
  });

  return {
    props: {
      products,
    },
    revalidate: 60 * 60 * 2, // 2 hours
  }
}