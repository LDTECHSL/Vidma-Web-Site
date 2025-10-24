import React from 'react';
import Header from '../layouts/Header';
import Footer from './Footer';

interface LayoutProps {
    children: React.ReactNode;
}

const Main: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow">
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default Main;