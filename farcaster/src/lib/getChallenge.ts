import { createClient } from "@supabase/supabase-js";
const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ??
  "https://tzfytpqfslcatnstvjkw.supabase.co/";
const supabaseKey =
  process.env.NEXT_PUBLIC_SUPABASE_KEY ??
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR6Znl0cHFmc2xjYXRuc3R2amt3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcxNTU4OTI3MywiZXhwIjoyMDMxMTY1MjczfQ.F3oPO1-ex5suwo69cRgzZBuWwxcVAMuO-a2rZrknFZo";
const supabase = createClient(supabaseUrl, supabaseKey);

export default async function getChallenge(req: {
  id: string;
}): Promise<{ message: string; response: any }> {
  const { id } = req;

  try {
    const { data: fetchedChallenge, error: fetchError } = await supabase
      .from("clash")
      .select("*")
      .eq("id", id);

    if (fetchError) {
      console.log(fetchError);

      return { message: "Error creating challenge", response: fetchError };
    }
    return {
      message: "Challenge fetched",
      response: fetchedChallenge != null ? fetchedChallenge[0] : "",
    };
  } catch (error) {
    console.error("Error creating challenge:", error);
    return { message: "Internal Server Error", response: null };
  }
}
