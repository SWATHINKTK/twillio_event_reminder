"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { IUser } from "@/type/user";

interface AuthContextType {
    user: IUser | null;
    loading: boolean;
    setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<IUser | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const checkUserData = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user`, { credentials: 'include' }); // replace with your API route
                if (!res.ok) throw new Error('Failed to fetch');
                const data = await res.json();

                if (data) {
                    setUser(data?.user);
                } else {
                    router.push('/');
                }
            } catch (error) {
                console.error('Error checking user data:', error);
                router.push('/'); // redirect on error
            } finally {
                setLoading(false);
            }
        };

        checkUserData();
    }, []);
    
    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen bg-gray-50">
                <div className="flex flex-col items-center">
                    {/* Spinner */}
                    <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    {/* Loading text */}
                    <p className="mt-4 text-gray-700 text-lg font-medium">Loading...</p>
                </div>
            </div>
        );
    }


    return (
        <AuthContext.Provider value={{ user, loading, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within an AuthProvider");
    return context;
};
