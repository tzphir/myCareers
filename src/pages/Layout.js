//Marie-Christine

import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Layout = () => {
    const pageContainerStyle = {
        display: 'flex',
        flexDirection: 'column',
        height: '100vh', 
    };

    return (
        <div style={pageContainerStyle}>
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&family=PT+Sans:wght@400;700&display=swap');
            </style>
            <Header />
            <main style={{ flex: 1 }}>
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default Layout;
