import Cookies from 'js-cookie';
import { Navigate, Outlet } from 'react-router-dom';
const ProtectRoutes = () => {

    return Cookies.get("token") ? <Outlet /> : <Navigate to="/" replace />


}
export default ProtectRoutes