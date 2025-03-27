import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card";
import { Label } from "@radix-ui/react-label";

const CategoryPage = async () => {
    const items = [
        { title: "Tarjeta 1", content: "Contenido de la tarjeta 1" },
        { title: "Tarjeta 2", content: "Contenido de la tarjeta 2" },
        { title: "Tarjeta 3", content: "Contenido de la tarjeta 3" },
        { title: "Tarjeta 4", content: "Contenido de la tarjeta 4" },
      ]
	return (
        <Card className="mx-auto my-auto w-[98vw] ">
            <CardContent>
                <div className="flex items-start">
                    <Label htmlFor="terms">
                        Categoría
                    </Label>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
                    {items.map((item, index) => (
                        <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow">
                        <CardContent className="flex flex-col items-center justify-center text-center">
                        <img
                            src="https://concepto.de/wp-content/uploads/2020/12/imagen-personal-e1607991913973.jpg"
                            alt="Profile"
                            className="w-32 h-32 rounded-full object-cover border-4 border-gray-200"
                        />
                            <p>{item.content}</p>
                        </CardContent>
                        </Card>
                    ))}
                </div>
            </CardContent>
        </Card>
	)
}

export default CategoryPage