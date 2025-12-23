import { supabase } from "./supabaseClient";

export async function getAds() {
    const {data, error} = await supabase.from('ads').select('*');
    if(error) {
        console.error("Error while fetching ads : ", error);
        throw error;
    }

    return data;
}