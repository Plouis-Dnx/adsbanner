import { supabase } from "./supabaseClient";

export async function getAds() {
    // Fetch all ads
    const {data, error} = await supabase.from('ads').select('*');
    if(error) {
        console.error("Error fetching ads:", error);
        throw error;
    }

    return data;
}