//Importacion de metodos a utilizar
import { collection, addDoc, getDocs, orderBy, query, limit } from "firebase/firestore";
import { Location } from "../entities/locations";
import { firebase_db } from "@/lib/firebase";

export class DataSource {
    
    async save(location: Location) {
        try {
            await addDoc(collection(firebase_db, "Locations"), location);
            console.log("Ubicación guardada exitosamente");
        } catch (error) {
            console.error("Error al guardar la ubicación:", error);
            throw error;
        }
    }

    async list(): Promise<Location[]> {
        try {
            const locationCollect = collection(firebase_db, "Locations");
            const q = query(locationCollect, orderBy("date","desc"), limit(15));
            const querySnapshot = await getDocs(q)
            return querySnapshot.docs.map(doc => {
                const data = doc.data();
                console.log(data)
                return{
                    id: doc.id,
                    latitude: data.latitude,
                    longitude: data.longitude,
                    date: data.date
                } as Location;
            });
        } catch (error) {
            console.error("Error al obtener ubicaciones:", error);
            throw error;
        }
    }
}
