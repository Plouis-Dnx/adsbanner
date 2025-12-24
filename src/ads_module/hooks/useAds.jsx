import { useState, useEffect } from "react";
import { getAds } from "../../api/adsApi";
import { getAdsEnabled } from "../../api/enableApi";

const useAds = () => {
    const [ads, setAds] = useState([]); // Ads fetched from supabase
    const [enable, setEnable] = useState(true); // Global kill switch state (true = ads enabled)
    const [loading, setLoading] = useState(false); // Loading state for the whole fetching process
    const [error, setError] = useState(''); // Error message

    useEffect(() => {
        // Fetch ads and kill switch state on component mount
        const fetchData = async () => {
            setLoading(true);

            try {
                // Fetch the kill switch value to show or not to show ads
                const isEnabled = await getAdsEnabled();
                setEnable(isEnabled);

                if(!isEnabled){ // If kill switch is activate : don't show ads
                    setLoading(false);
                    return;
                }

                // Get all ads
                const adsData = await getAds();
                setAds(adsData);
            }
            catch(err) {
                setError(err.message);
            }

            setLoading(false); // Stop loading when fetching is finished
        };

        fetchData();
    }, []);

    return {ads, enable, loading, error}; // Expose hook data to components
};

export default useAds;