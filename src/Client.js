import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://qphhyphvmtmijyprcvwj.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFwaGh5cGh2bXRtaWp5cHJjdndqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTEyNTg2ODUsImV4cCI6MjAyNjgzNDY4NX0.-LYJcIYcElrGzRGjM6jHZDNlff1lu17zEOBHsdLB4X0"
);
