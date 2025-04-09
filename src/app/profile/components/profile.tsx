import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, LogOut, FileText, Heart, HelpCircle, ChevronRight, Home } from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Definición de tipos
interface MenuItem {
    id: string;
    label: string;
    href: string;
    icon: React.ReactNode;
}

interface DynamicContentProps {
    src: string;
}

interface BreadcrumbProps {
    activeItem: string | null;
    items: MenuItem[];
}

const menuItems: MenuItem[] = [
    {
        id: "requests",
        label: "Mis Cotizaciones",
        href: "/requests",
        icon: <FileText className="w-5 h-5 text-gray-600" />
    },
    {
        id: "favorites",
        label: "Favoritos",
        href: "/favorites",
        icon: <Heart className="w-5 h-5 text-gray-600" />
    },
    {
        id: "help",
        label: "Ayuda y Soporte",
        href: "/help",
        icon: <HelpCircle className="w-5 h-5 text-gray-600" />
    },
];

const Breadcrumb = ({ activeItem, items }: BreadcrumbProps) => {
    const currentItem = items.find(item => item.id === activeItem);
    
    return (
        <div className="flex items-center text-sm text-gray-600 mb-4 md:hidden">
            <Link href="/profile" className="flex items-center">
                <Home className="w-4 h-4 mr-1" />
                <span>Perfil</span>
            </Link>
            {currentItem && (
                <>
                    <ChevronRight className="w-4 h-4 mx-1" />
                    <span className="font-medium text-gray-900">{currentItem.label}</span>
                </>
            )}
        </div>
    );
};

const DynamicContent = ({ src }: DynamicContentProps) => {
    return (
        <div className="w-full h-full min-h-[500px]">
            <iframe 
                src={src} 
                className="w-full h-full border-0" 
                title="Contenido dinámico"
            />
        </div>
    );
};

const ProfilePage = () => {
    const { data: auth } = useSession();
    const [activeItem, setActiveItem] = useState<string | null>(null);
    const [contentUrl, setContentUrl] = useState<string>("");

    const getInitials = (): string => {
        return auth?.user?.name ? auth.user.name.charAt(0).toUpperCase() : "U";
    };

    useEffect(() => {
        if (activeItem) {
            const selectedItem = menuItems.find(item => item.id === activeItem);
            if (selectedItem) {
                setContentUrl(selectedItem.href);
            }
        }
    }, [activeItem]);

    const handleItemClick = (id: string): void => {
        setActiveItem(id);
    };

    return (
        <div className="container mx-auto px-4 py-8 md:py-12">
            <Breadcrumb activeItem={activeItem} items={menuItems} />

            <div className="flex flex-col md:flex-row md:space-x-6">
                {/* Perfil a la izquierda en desktop (con menos ancho), centrado en móvil */}
                <div className="w-full md:w-1/4 mb-6 md:mb-0"> {/* Cambiado de 1/3 a 1/4 para más a la izquierda */}
                    <Card className="w-full max-w-md mx-auto md:ml-0 shadow-lg rounded-2xl overflow-hidden border-0">
                        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 pb-20">
                            <h1 className="text-white text-xl font-bold">Mi Perfil</h1>
                        </div>

                        <div className="relative px-6">
                            <div className="absolute -top-12 flex justify-center w-full left-0">
                                <Avatar className="w-24 h-24 border-4 border-white rounded-full bg-white shadow-md">
                                    {auth?.user?.image ? (
                                        <AvatarImage src={auth.user.image} alt={auth?.user?.name || "Usuario"} />
                                    ) : (
                                        <AvatarFallback className="bg-gradient-to-br from-blue-400 to-blue-600 text-white text-xl">
                                            {getInitials()}
                                        </AvatarFallback>
                                    )}
                                </Avatar>
                            </div>
                        </div>

                        <div className="mt-16 text-center px-6">
                            <h2 className="text-xl font-bold">{auth?.user?.name || "Usuario"}</h2>
                            <p className="text-gray-500 text-sm mt-1">{auth?.user?.email}</p>
                        </div>

                        <CardContent className="mt-8 p-6">
                            <div className="space-y-6">
                                {/* Elementos para móvil - navegación directa */}
                                {menuItems.map((item) => (
                                    <div
                                        key={`mobile-${item.id}`}
                                        className="block md:hidden"
                                    >
                                        <Link href={item.href}>
                                            <div className="flex items-center justify-between w-full px-5 py-4 text-left rounded-lg bg-white hover:bg-gray-50 border border-gray-100 shadow-sm transition-all duration-200 hover:shadow">
                                                <div className="flex items-center gap-4">
                                                    {item.icon}
                                                    <span className="font-medium">{item.label}</span>
                                                </div>
                                                <ArrowRight className="w-4 h-4 text-gray-400" />
                                            </div>
                                        </Link>
                                    </div>
                                ))}
                                
                                {/* Elementos para desktop */}
                                {menuItems.map((item) => (
                                    <div
                                        key={`desktop-${item.id}`}
                                        className="hidden md:block cursor-pointer"
                                        onClick={() => handleItemClick(item.id)}
                                    >
                                        <div 
                                            className={`flex items-center justify-between w-full px-5 py-4 text-left rounded-lg border border-gray-100 shadow-sm transition-all duration-200 hover:shadow ${
                                                activeItem === item.id 
                                                    ? "bg-blue-50 border-blue-200" 
                                                    : "bg-white hover:bg-gray-50"
                                            }`}
                                        >
                                            <div className="flex items-center gap-4">
                                                {item.icon}
                                                <span className="font-medium">{item.label}</span>
                                            </div>
                                            <ArrowRight className="w-4 h-4 text-gray-400" />
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-10">
                                <Button
                                    variant="destructive"
                                    className="w-full flex items-center justify-center gap-2 py-6"
                                    onClick={() => signOut()}
                                >
                                    <LogOut className="w-4 h-4" />
                                    Cerrar Sesión
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="w-full md:w-3/4 hidden md:block">
                    {activeItem && contentUrl && (
                        <Card className="w-full h-full shadow-lg rounded-2xl overflow-hidden border-0">
                            <DynamicContent src={contentUrl} />
                        </Card>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;