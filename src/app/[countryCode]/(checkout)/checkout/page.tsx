import { LineItem } from "@medusajs/medusa"
import { Metadata } from "next"
import { cookies } from "next/headers"
import { notFound } from "next/navigation"

import { getCart } from "@lib/data"
import { enrichLineItems } from "@modules/cart/actions"
import Wrapper from "@modules/checkout/components/payment-wrapper"
import CheckoutForm from "@modules/checkout/templates/checkout-form"
import CheckoutSummary from "@modules/checkout/templates/checkout-summary"
import Divider from "@modules/common/components/divider"

export const metadata: Metadata = {
  title: "Checkout",
}

const fetchCart = async () => {
  const cartId = cookies().get("_medusa_cart_id")?.value

  if (!cartId) {
    return notFound()
  }

  const cart = await getCart(cartId).then((cart) => cart)

  if (cart?.items.length) {
    const enrichedItems = await enrichLineItems(cart?.items, cart?.region_id)
    cart.items = enrichedItems as LineItem[]
  }

  return cart
}

export default async function Checkout() {
  const cart = await fetchCart()

  if (!cart) {
    return notFound()
  }

  return (
    <>
      <h1 className="text-center text-3xl font-normal mt-8 mb-4">
        BHShop Demo Checkout
      </h1>
      <Divider/>
      <div className="grid grid-cols-1 md:grid-cols-2 content-container gap-x-40 py-12">
        <Wrapper cart={cart}>
          <CheckoutForm />
        </Wrapper>
        <CheckoutSummary />
      </div>
    </>
  )
}
