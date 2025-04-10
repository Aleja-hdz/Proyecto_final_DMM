import { supabase } from "@/lib/supabase";

export class DataSource {
    constructor() {}

    /**
     * Registra un nuevo usuario y guarda su perfil en la base de datos
     */
    async addUser(user: { email: string; password: string; name: string; lastname: string }) {
        const { data: authData, error: authError } = await supabase.auth.signUp({
            email: user.email,
            password: user.password,
        });

        if (authError) {
            console.error("Error al registrar usuario:", authError.message);
            return null;
        }

        const userId = authData?.user?.id;
        if (!userId) return null;

        const { data: profileData, error: profileError } = await supabase
            .from("users")
            .insert({
                id: userId,
                email: user.email,
                name: user.name,
                lastname: user.lastname,
            })
            .select()
            .single();

        if (profileError) {
            console.error("Error al guardar perfil:", profileError.message);
            return null;
        }

        return profileData;
    }
    
    /*
     Obtiene los datos del usuario autenticado junto con su perfil para consumo en vista
     */

    async getCurrentUser() {
        const { data: authData, error: authError } = await supabase.auth.getUser();

        if (authError || !authData?.user) {
            console.error("Error al obtener el usuario:", authError?.message);
            return null;
        }

        const userId = authData.user.id;

        const { data: profileData, error: profileError } = await supabase
            .from("users")
            .select("name, lastname, email") 
            .eq("id", userId)
            .single();

        if (profileError) {
            console.error("Error al obtener perfil:", profileError.message);
            return null;
        }

        return profileData;
    }

    /**
     * Actualiza de datos del usuario autenticado
     */
    async updateUser(user: {newName: string, newLastName: string }) {
        const { data: userData, error: userError } = await supabase.auth.getUser();
        if (userError || !userData?.user) {
            console.error("Error al obtener el usuario autenticado:", userError?.message);
            return null;
        }
    
        const userId = userData.user.id;
    
        const profileUpdates: any = {};
        if (user.newName) profileUpdates.name = user.newName;
        if (user.newLastName) profileUpdates.lastname = user.newLastName;
    
        if (Object.keys(profileUpdates).length > 0) {
            const { data: profileData, error: profileError } = await supabase
                .from("users")
                .update(profileUpdates)
                .eq("id", userId)
                .select()
                .single();
    
            if (profileError) {
                console.error("Error al actualizar perfil:", profileError.message);
                return null;
            }
    
            return profileData;
        }
    
        return userData.user;
    }
}