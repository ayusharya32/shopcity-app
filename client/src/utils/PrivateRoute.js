import { useSelector } from "react-redux"
import { Redirect, Route } from "react-router-dom"

function PrivateRoute({ component: Component, ...rest }) {
    const authState = useSelector(state => state.authState)
    const { isAuthenticated, loading } = authState

    return (
        <Route 
            {...rest}
            render={props => {
                return (!loading && isAuthenticated) ? <Component {...props} /> : <Redirect to="/login" />
            }}
        />
    )
}

export default PrivateRoute
