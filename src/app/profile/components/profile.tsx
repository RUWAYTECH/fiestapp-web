import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, LogOut, FileText, Heart, HelpCircle } from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const menuItems = [
    {
        label: "Mis Cotizaciones",
        href: "/requests",
        icon: <FileText className="w-5 h-5 text-gray-600" />
    },
    {
        label: "Favoritos",
        href: "/favorites",
        icon: <Heart className="w-5 h-5 text-gray-600" />
    },
    {
        label: "Ayuda y Soporte",
        href: "/help",
        icon: <HelpCircle className="w-5 h-5 text-gray-600" />
    },
];

const ProfilePage = () => {
    const { data: auth } = useSession();

    const getInitials = () => {
        return auth?.user?.name ? auth.user.name.charAt(0).toUpperCase() : "U";
    };

    return (
        <div className="container mx-auto px-4 py-8 md:py-12">
            <Card className="w-full max-w-md mx-auto shadow-lg rounded-2xl overflow-hidden border-0">
                {/* Header with gradient background */}
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 pb-20">
                    <h1 className="text-white text-xl font-bold">Mi Perfil</h1>
                </div>

                {/* Avatar overlapping the header */}
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
                        {menuItems.map((item, index) => (
                            <Link
                                key={index}
                                href={item.href}
                            >
                                <div className="flex items-center justify-between w-full px-5 py-4 text-left rounded-lg bg-white hover:bg-gray-50 border border-gray-100 shadow-sm transition-all duration-200 hover:shadow">
                                    <div className="flex items-center gap-4">
                                        {item.icon}
                                        <span className="font-medium">{item.label}</span>
                                    </div>
                                    <ArrowRight className="w-4 h-4 text-gray-400" />
                                </div>
                            </Link>
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
    );
};

export default ProfilePage;