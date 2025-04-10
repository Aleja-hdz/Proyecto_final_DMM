import { supabase_notes} from "@/lib/supabase_note";
import { Note } from "./note";


export class DataSource{
    constructor(){}

    async getNotes():Promise<Note[]>{
        //conectar a supabase
        const { data, error } = await supabase_notes
        .from('notes')
        .select('*')

        return data || [];
    }

    async addNote(note: { title: string; text: string; id?: number }): Promise<Note | null> {
        // Al agregar una nueva nota, asegúrate de no enviar el ID si es 0
        const { data, error } = await supabase_notes
          .from('notes')
          .upsert({
            title: note.title,
            text: note.text,
            id: note.id === 0 ? undefined : note.id, // Solo pasa el ID si no es 0
          })
          .select()
          .single();
      
        if (error) {
          console.error(error.message);
          return null;
        }
      
        return data;
      }

    /*async deleteNote(note:{ id: number }):Promise<Note|null>{
        const { data,error } = await supabase
        .from('notes')
        .delete()
        .eq('id', note.id)
        .select()
        .single();
        return data;
    }*/
}