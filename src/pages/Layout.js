import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Layout = () => {
    return (
        <>
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&family=PT+Sans:wght@400;700&display=swap');
        </style>
            <Header />
            <main>
                <Outlet />
            </main>
            <Footer />
        </>
    );
};

export default Layout;
