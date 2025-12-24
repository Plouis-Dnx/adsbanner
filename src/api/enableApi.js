import { supabase } from "./supabaseClient";

export async function getAdsEnabled() {
    // Fetch the kill switch value from the 'show_ads' table
    const {data, error} = await supabase
        .from('show_ads')
        .select('ads_enabled')
        .eq('id', 1)
        .single();

    if(error) {
        console.error("Error fetching ads:", error);
        throw error;
    }

    return data.ads_enabled;
}