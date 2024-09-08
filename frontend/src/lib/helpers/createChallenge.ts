import { createClient } from "@supabase/supabase-js";
const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ??
  "https://tzfytpqfslcatnstvjkw.supabase.co/";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY ?? "";
const supabase = createClient(supabaseUrl, supabaseKey);

export default async function createChallenge(req: {
  gameId: string;
  fName: string;
  fImage: string;
  bet: string;
}): Promise<{ message: string; response: any }> {
  const { gameId, fImage, fName, bet } = req;

  try {
    const { data, error } = supabase
      ? await supabase
          .from("clash")
          .insert([
            {
              game_id: gameId,
              f_image: fImage,
              f_name: fName,
              bet: bet,
            },
          ])
          .select()
      : {
          data: null,
          error: "Error creating challenge",
        };

    if (error) {
      console.log(error);

      return { message: "Error creating challenge", response: error };
    }
    return {
      message: "Challenge created",
      response: data != null ? data[0] : "",
    };
  } catch (error) {
    console.error("Error creating challenge:", error);
    return { message: "Internal Server Error", response: null };
  }
}
