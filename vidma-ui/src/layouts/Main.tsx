import React from 'react';
import Header from '../layouts/Header';
import Footer from './Footer';

interface LayoutProps {
    children: React.ReactNode;
}

const Main: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div style={{overflowX: "hidden", overflowY: "hidden"}} className="min-h-screen flex flex-col">
            <Header />
            <main style={{ width: '100%', flexGrow: 1 }}>
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default Main;