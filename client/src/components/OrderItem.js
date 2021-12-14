import React from 'react'

function OrderItem({ orderItem }) {
    const { product, quantity } = orderItem

    const totalItemPrice = product.price * quantity

    return (
        <div className="border mx-1 mb-2 p-2 row">
            <div className="col-3">
                <img className="img-fluid" src={product.imageUrl} alt={product.name} />
            </div>
            <div className="col-9">
                <h3 className="fs-5 fw-bold">{product.name}</h3>
                <p>Quantity: {quantity}</p>
                <p>Item Price: &#8377; {product.price}</p>
                <p><strong className="text-primary">Total: &#8377; {totalItemPrice}</strong></p>
            </div>
        </div>
    )
}

export default OrderItem
