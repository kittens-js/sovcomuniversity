import React from "react";
import { privateRoutes, publicRoutes } from '../router';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import useSWR from "swr";
import { Api } from "../service/api";



const AppRouter: React.FC = () => {
    const { data, error, isLoading } = useSWR('/me', Api.Users.me);

    return (
        <BrowserRouter>
            <Routes>
                {
                    !data?.isOk ?
                        publicRoutes.map((route, index) => (
                            <Route key = {index} path={route.path} Component={route.component} />
                        ))
                        :
                        privateRoutes.map((route, index) => (
                            <Route key = {index} path={route.path} Component={route.component} />
                        ))
                }
            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter;