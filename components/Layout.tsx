import React, { ReactNode } from 'react';
import Navbar from './Navbar/Navbar';

interface LayoutProps {
  children: ReactNode; // Define the type for children
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <Navbar />
      {children} {/* Render the children here */}
    </div>
  );
};

export default Layout;