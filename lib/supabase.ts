import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://pvbxycfrdbsxhkvdjzyl.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB2Ynh5Y2ZyZGJzeGhrdmRqenlsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk4MjI3NjksImV4cCI6MjA1NTM5ODc2OX0.L-o_wReQ-BWjH17xwiM__18dq1Un13Wf3QJPOToMQh4';

export const supabase_user = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})