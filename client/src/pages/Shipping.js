import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { UPDATE_SHIPPING_SUCCESS } from '../utils/Constants'
import { toast } from 'react-toastify'
import { resetUserSuccess, updateShippingAddress } from '../redux/actions/userActions'

function Shipping({ history }) {
    const dispatch = useDispatch()

    const userState = useSelector(state => state.userState)
    const { user, error, success } = userState

    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [pincode, setPincode] = useState('')

    const [isDefaultAddressLoaded, setIsDefaultAddressLoaded] = useState(false)

    useEffect(() => {
        if(user && user.cartItems.length === 0) {
            history.push("/cart")
        }
        
        if(user && user.shippingAddress && !isDefaultAddressLoaded) {
            setAddress(user.shippingAddress.address)
            setCity(user.shippingAddress.city)
            setState(user.shippingAddress.state)
            setPincode(user.shippingAddress.pincode)

            setIsDefaultAddressLoaded(true)
        }

        if(success === UPDATE_SHIPPING_SUCCESS) {
            history.push("/payment")
            dispatch(resetUserSuccess())
        }

        if(error) {
            toast.error(error.message)
        }
    }, [dispatch, user, isDefaultAddressLoaded, success, error, history])

    function onShippingFormSubmitted(e) {
        e.preventDefault()

        dispatch(updateShippingAddress(address, city, state, pincode))
    }

    return (
        <section className="shipping">
            <div className="container">
                <h1 className="section-title">Shipping Address</h1>
                <form onSubmit={onShippingFormSubmitted}>
                    <div className="address">
                        <label htmlFor="address">Address</label>
                        <input 
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            name="address" 
                            type="text" 
                            placeholder="Enter Address" 
                            required
                        />
                    </div>
                    <div className="city">
                        <label htmlFor="city">City</label>
                        <input 
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            name="city" 
                            type="text" 
                            placeholder="Enter City" 
                            required
                        />
                    </div>
                    <div className="state">
                        <label htmlFor="state">State</label>
                        <input 
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                            name="state" 
                            type="text" 
                            placeholder="Enter State" 
                            required
                        />
                    </div>
                    <div className="pin-code">
                        <label htmlFor="pin-code">Pin Code</label>
                        <input 
                            value={pincode}
                            onChange={(e) => setPincode(e.target.value)}
                            name="pin-code" 
                            type="number" 
                            placeholder="Enter Pin Code" 
                            required
                        />
                    </div>
                    <button className="btn-shipping-continue btn-primary" type="submit">Continue</button>
                </form>
            </div>
        </section>
    )
}

export default Shipping
