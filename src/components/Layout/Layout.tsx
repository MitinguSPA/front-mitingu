import React from "react";
import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import Header from "../Header/Header";
import Cart from "../Cart/Cart";
import Footer from "./Footer";

interface LayoutProps {
  children: React.ReactNode;
}

const pageVariants = {
  initial: {
    opacity: 0,
  },
  in: {
    opacity: 1,
  },
  out: {
    opacity: 0,
  },
};

const pageTransition = {
  type: "tween",
  ease: "easeInOut",
  duration: 0.3,
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header/>
      <motion.main
        className="flex-1 pt-20 "
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
      >
        {children}
      </motion.main>
      <Outlet />
      <Cart />
      <Footer />
    </div>
  );
};

export default Layout;
