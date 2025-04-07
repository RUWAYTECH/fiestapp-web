import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ArrowRight } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";

const menuItems = [
  { label: "Mis Cotizaciones", href: "/requests" },
  { label: "Favoritos", href: "/favorites" },
  { label: "Ayuda y Soporte", href: "/help" },
];

const ProfilePage = () => {
    const { data: auth } = useSession();
    return (
        <div className="flex justify-center py-10">
            <Card className="w-full max-w-md md:max-w-lg p-6 shadow-lg rounded-2xl">
                <div className="flex flex-col items-center gap-4">
                    <Avatar className="w-20 h-20">
                        <AvatarFallback>{auth?.user?.image}</AvatarFallback>
                    </Avatar>
                    <div className="text-center">
                        <h2 className="text-lg font-semibold">{auth?.user?.name}</h2>
                        <p className="text-gray-500 text-sm">{auth?.user?.email}</p>
                    </div>
                </div>
                
                <CardContent className="mt-6 space-y-3">
                    {menuItems.map((item, index) => (
                        <Link key={index} href={item.href} passHref>
                            <a className="flex items-center justify-between w-full px-4 py-3 text-left rounded-lg border bg-gray-100 hover:bg-gray-200">
                                {item.label}
                                <ArrowRight className="w-4 h-4" />
                            </a>
                        </Link>
                    ))}
                </CardContent>
                
                <div className="mt-4">
                    <Button variant="destructive" className="w-full">
                        Cerrar Sesión
                    </Button>
                </div>
            </Card>
        </div>
    );
};

export default ProfilePage;
