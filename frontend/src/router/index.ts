import Application from "../pages/ApplicationPage/Application"
import Landing from "../pages/LandingPage/Landing"
import Login from "../pages/LoginPage/Login"
import OfferPage from "../pages/OfferPage/Offer"
import Profile from '../pages/ProfilePage/Profile'


export const privateRoutes = [
    { path: "*", component: Landing },
    {path: "/profile", component: Profile},
    {path: "/application", component: Application},
    {path: "/offer", component: OfferPage}
]

export const publicRoutes = [
    {   path: "*", component: Landing   },
    {   path: "/login", component: Login   },
    {   path: "/offer", component: OfferPage   }    
]
