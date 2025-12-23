import { useState, useEffect } from "react";
import { getAds } from "../../api/adsApi";
import { getAdsEnabled } from "../../api/enableApi";

const useAds = () => {
    const [ads, setAds] = useState([]);
    const [enable, setEnable] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);

            try {
                const isEnabled = await getAdsEnabled();
                setEnable(isEnabled);

                if(!isEnabled){
                    setLoading(false);
                    return;
                }

                const adsData = await getAds();
                setAds(adsData);
            }
            catch(err) {
                setError(err.message);
            }

            setLoading(false);
        };

        fetchData();
    }, []);

    return {ads, enable, loading, error};
};

export default useAds;