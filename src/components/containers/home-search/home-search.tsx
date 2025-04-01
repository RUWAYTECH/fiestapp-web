'use client'
import { useCallback, useMemo, useState } from "react";
import { ServiceResponseDto } from "@stateManagement/models/service/create";
import {
    Command,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import Link from "next/link";

interface ServiceListProps {
    services: ServiceResponseDto[];
}

const HomeSearch: React.FC<ServiceListProps> = ({ services }) => {
    const [query, setQuery] = useState(""); // Estado para el input

    const filteredServices = useMemo(() => {
        return services.filter((service) =>
            service.name.toLowerCase().includes(query.toLowerCase())
        );
    }, [query, services]);

    const handleInputChange = useCallback((value: string) => {
        setQuery(value);
    }, []);

    return (
        <div className="flex flex-col items-center justify-center pt-[5vw] pb-8 px-4">
            <h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight text-center sm:text-4xl">
                Encuentra todo para tu fiesta en un solo lugar
            </h1>
            <br />
            <h2 className="scroll-m-20 pb-2 text-2xl text-center text-muted-foreground sm:text-3xl">
                Locales, decoración, tortas, animación y más para eventos inolvidables
            </h2>
            <br />
            <div className="mx-auto w-full max-w-[90vw] sm:max-w-[40vw]">
                <Command className="border rounded-lg shadow-md">
                    <CommandInput
                        placeholder="Busca un servicio..."
                        value={query}
                        onValueChange={handleInputChange}
                        className="w-full"
                    />
                    {query.length > 0 && (
                        <CommandList className="border-t rounded-b-lg shadow-sm max-h-60 overflow-auto">
                            {filteredServices.length > 0 ? (
                                <CommandGroup heading="Servicios disponibles">
                                    {filteredServices.map((service) => (
                                        <Link key={service.id} href={`/service/${service.id}`} passHref>
                                            <CommandItem>{service.name}</CommandItem>
                                        </Link>
                                    ))}
                                </CommandGroup>
                            ) : (
                                <div className="p-2 text-gray-500 text-sm">No se encontraron servicios</div>
                            )}
                        </CommandList>
                    )}
                </Command>
            </div>
        </div>

    );
};

export default HomeSearch;
