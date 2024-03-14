"use client"

import { Order } from "@medusajs/medusa"
import { XMark } from "@medusajs/icons"
import React from "react"

import Help from "@modules/order/components/help"
import Items from "@modules/order/components/items"
import OrderDetails from "@modules/order/components/order-details"
import OrderSummary from "@modules/order/components/order-summary"
import ShippingDetails from "@modules/order/components/shipping-details"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

type OrderDetailsTemplateProps = {
  order: Order
}

const OrderDetailsTemplate: React.FC<OrderDetailsTemplateProps> = ({
  order,
}) => {
  return (
    <div className="flex flex-col justify-center gap-y-4 bg-[#F5F5F5] p-5 max-w-[80rem]">
      <div className="flex gap-2 justify-between items-center">
        <h1 className=" text-lg md:text-2xl-semi">Order details</h1>
        <LocalizedClientLink
          href="/account/orders"
          className="hidden sm:flex gap-2 items-center text-ui-fg-subtle hover:text-ui-fg-base"
        >
          <XMark />
          <span className="text-xs md:text-base">Back to overview</span>
        </LocalizedClientLink>
      </div>
      <div className="flex flex-col gap-4 h-full bg-[#F5F5F5] w-full overflow-y-auto max-w-[80rem]">
        <span className="hidden md:flex text-base">
          View your previous orders and their status. You can also create
          returns or exchanges for your orders if needed.
        </span>

        <Items items={order.items} region={order.region} />

        <OrderSummary order={order} />
      </div>
    </div>
  )
}

export default OrderDetailsTemplate
