import Image from "next/future/image";
import { useRouter } from "next/router";

import {
    ProductContainer,
    ImageContainer,
    ProductDetails
} from "../../styles/pages/product";

export default function Product() {
    const { query } = useRouter();

    return (
        <ProductContainer>
            <ImageContainer>
                <Image
                    src="https://files.stripe.com/links/MDB8YWNjdF8xTGhIMWFHb3BkTHZMc2JQfGZsX3Rlc3RfNUx3MEd4NDBWaU0yRVppbGRmdjNSY1JX00bjOc0jlD"
                    width={520}
                    height={480}
                    alt="Alt"
                    placeholder="blur"
                    blurDataURL="https://files.stripe.com/links/MDB8YWNjdF8xTGhIMWFHb3BkTHZMc2JQfGZsX3Rlc3RfNUx3MEd4NDBWaU0yRVppbGRmdjNSY1JX00bjOc0jlD"
                />
            </ImageContainer>

            <ProductDetails>
                <h1>
                    Camiseta X
                </h1>

                <span>R$ 79,99</span>

                <p>TESTETESTESESTE</p>

                <button>
                    Comprar agora
                </button>
            </ProductDetails>
        </ProductContainer>
    )
}