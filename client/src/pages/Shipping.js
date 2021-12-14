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
            <div className="container col-xl-7">
                <h1 className="mt-4 ms-2">Shipping Address</h1>
                <form onSubmit={onShippingFormSubmitted} className="mt-4 mx-2 border p-4">
                    <div class="mb-3">
                        <label htmlFor="address" class="form-label fw-bold">Address</label>
                        <input 
                            name="address"
                            type="text" 
                            class="form-control" 
                            id="address" 
                            placeholder="Enter Address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}  
                            required
                        />
                    </div>
                    <div class="mb-3">
                        <label htmlFor="city" class="form-label fw-bold">City</label>
                        <input 
                            name="city"
                            type="text" 
                            class="form-control" 
                            id="city" 
                            placeholder="Enter City"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}  
                            required
                        />
                    </div>
                    <div class="mb-3">
                        <label htmlFor="state" class="form-label fw-bold">State</label>
                        <input 
                            name="state"
                            type="text" 
                            class="form-control" 
                            id="state" 
                            placeholder="Enter State"
                            value={state}
                            onChange={(e) => setState(e.target.value)}  
                            required
                        />
                    </div>
                    <div class="mb-3">
                        <label htmlFor="pin-code" className="form-label fw-bold">Pin Code</label>
                        <input 
                            value={pincode}
                            onChange={(e) => setPincode(e.target.value)}
                            name="pin-code" 
                            className="form-control"
                            type="number" 
                            id="pinCode"
                            placeholder="Enter Pin Code" 
                            required
                        />
                    </div>
                    <button 
                        className="btn btn-primary" 
                        type="submit">
                        Continue
                    </button>
                </form>
            </div>
        </section>
    )
}

export default Shipping
