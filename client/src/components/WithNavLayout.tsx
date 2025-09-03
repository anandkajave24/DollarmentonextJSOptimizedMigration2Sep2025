import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';

interface WithNavLayoutProps {
  children: React.ReactNode;
}

const WithNavLayout = React.memo(({ children }: WithNavLayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex pt-16">
        <Sidebar />
        <main className="flex-1 min-h-[calc(100vh-64px)] ml-20">
          {children}
          <Footer />
        </main>
      </div>
    </div>
  );
});

WithNavLayout.displayName = 'WithNavLayout';

export default WithNavLayout;