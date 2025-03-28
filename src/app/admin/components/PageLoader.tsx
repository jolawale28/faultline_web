"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader } from "lucide-react";

export default function PageLoader() {
    const pathname = usePathname();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        const timeout = setTimeout(() => setLoading(false), 500); // Delay to prevent flickering

        return () => clearTimeout(timeout);
    }, [pathname]);

    return (
        <AnimatePresence>
            {(loading) && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    className="fixed bottom-4 right-4 bg-black text-white px-4 py-2 rounded-full shadow-lg"
                >
                    <div className="animate-spin inline-block"><Loader color = "white" /></div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
