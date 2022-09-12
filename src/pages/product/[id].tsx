import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/future/image";
import { useState } from "react";
import Stripe from "stripe";
import axios from "axios";

import { stripe } from "../../lib/stripe";

import {
    ProductContainer,
    ImageContainer,
    ProductDetails
} from "../../styles/pages/product";

interface ProductProps {
    product: {
        id: string;
        name: string;
        description: string;
        imageUrl: string;
        price: number;
        price_formatted: string;
        defaultPriceId: string;
    };
};

export default function Product({ product }: ProductProps) {
    const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] = useState(false);

    async function handleBuyProduct() {
        setIsCreatingCheckoutSession(true);

        try {
            const response = await axios.post("/api/checkout", {
                priceId: product.defaultPriceId,
            });

            const { checkoutUrl } = response.data;

            window.location.href = checkoutUrl
        } catch (err) {
            // Conectar com alguma ferramenta de observabilidade (Datadog / Sentry)
            setIsCreatingCheckoutSession(false);

            alert("Falha ao redirecionar ao checkout!");
        }
    }

    return (
        <ProductContainer>
            <ImageContainer>
                <Image
                    src={product.imageUrl}
                    width={520}
                    height={480}
                    alt={product.name}
                    placeholder="blur"
                    blurDataURL={product.imageUrl}
                />
            </ImageContainer>

            <ProductDetails>
                <h1>
                    {product.name}
                </h1>

                <span>{product.price_formatted}</span>

                <p>{product.description}</p>

                <button disabled={isCreatingCheckoutSession} onClick={handleBuyProduct}>
                    Comprar agora
                </button>
            </ProductDetails>
        </ProductContainer>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {
    // Buscar os produtos mais vendidos / mais recentes

    return {
        paths: [
            { params: { id: "prod_MQ7KTYcstmPkj3" } }
        ],
        fallback: 'blocking',
    };
};

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({ params }) => {
    const { id: productId } = params;

    const product = await stripe.products.retrieve(productId, {
        expand: ['default_price']
    });

    const price = product.default_price as Stripe.Price;

    return {
        props: {
            product: {
                id: product.id,
                name: product.name,
                description: product.description,
                imageUrl: product.images[0],
                price: price.unit_amount / 100,
                price_formatted: new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                }).format(price.unit_amount / 100),
                defaultPriceId: price.id,
            },
        },
        revalidate: 60 * 60 * 1, // 1 hour
    };
};