export interface Plant {
    id: number;
    commonName: string;
    scientificName: string;
    img: string;
    type: string;
    origin: string;
    floweringSeason: string;
    sunExposure: string;
    watering: string;
}

export async function getPlants(): Promise<Plant[]> {
    try {
        const res = await fetch("http://192.168.131.101:8080/dca/api/plants");
        if (!res.ok) throw new Error("Error al cargar las plantas");
        const data = await res.json();
        return data;
    } catch (err) {
        console.error("Error fetching plants:", err);
        return [];
    }
}


//!Nos vemos el otro semestre
