import Loading from "@/components/general/loading";
import { auth } from "@/utils/firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

const AuthContext = createContext<{ user: User | null } | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return <AuthContext.Provider value={{ user }}>{loading ? <Loading /> : children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (context === undefined) throw new Error("useAuth must be used within a AuthProvider");

    return context;
};
