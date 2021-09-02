import React from 'react'

function OrderItem({ orderItem }) {
    const { product, quantity } = orderItem

    const totalItemPrice = product.price * quantity

    return (
        <div className="order-item">
            <div className="item-img">
                <img src={product.imageUrl} alt={product.name} />
            </div>
            <div className="item-content">
                <h3 className="item-name">{product.name}</h3>
                <p className="item-qty">Quantity: {quantity}</p>
                <p className="item-price">Item Price: &#8377; {product.price}</p>
                <p className="total">Total: &#8377; {totalItemPrice}</p>
            </div>
        </div>
    )
}

export default OrderItem
