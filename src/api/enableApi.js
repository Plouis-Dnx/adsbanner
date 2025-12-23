import { supabase } from "./supabaseClient";

export async function getAdsEnabled() {
    const {data, error} = await supabase
        .from('show_ads')
        .select('ads_enabled')
        .eq('id', 1)
        .single();

    if(error) {
        console.error("Error while fetching ads : ", error);
        throw error;
    }

    return data.ads_enabled;
}