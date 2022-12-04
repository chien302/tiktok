import { Fragment } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { publicRoutes } from '~/routes';
import DefaultLayout from '~/layouts/DefaultLayout';
import WiderLayout from '~/layouts/WiderLayout';
import HeaderOnly from '~/layouts/HeaderOnly';

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Routes>
                    {publicRoutes.map((route, index) => {
                        let Layout = DefaultLayout;
                        if (route.layout) {
                            // console.log(route);
                            Layout = route.layout;
                        } else if (route.layout === null) {
                            Layout = Fragment;
                        } else if (route.layout === WiderLayout) {
                            Layout = WiderLayout;
                        } else if (route.layout === HeaderOnly) {
                            Layout = HeaderOnly;
                        }
                        const Page = route.component;
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })}
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
