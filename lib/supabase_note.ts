import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://npaozjeqfglipvokkqmk.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5wYW96amVxZmdsaXB2b2trcW1rIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg2OTcyOTMsImV4cCI6MjA1NDI3MzI5M30.8pk0xxb6CyhC5psnlWwtIl-7Pm_C_0HIP86rJWlqfSA';

export const supabase_notes = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})