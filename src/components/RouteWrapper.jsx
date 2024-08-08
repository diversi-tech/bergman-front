import PrivateRouteUser from "./PrivateRouteUser";
import PrivateRoute from "./PrivateRoute";
import { Home } from "./home";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

const RouteWrapper = ({ element: Component, usePrivateRoute, ...rest }) => {
  try {
    const token = Cookies.get("jwtToken");
    const decodedToken = jwtDecode(token);
    usePrivateRoute = decodedToken.userTypeId;
  } catch (error) {
    console.error("Failed to decode token:", error);
  }
  if (usePrivateRoute === 1)
    return <PrivateRoute element={Component} {...rest} />;
  if (usePrivateRoute === 2)
    return <PrivateRouteUser element={Component} {...rest} />;
  else {
    return <Home />;
  }
};
export default RouteWrapper;
