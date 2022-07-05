import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";

import { db } from "../firebase/config";

export function useFetchData(dataCollection, id) {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [cancelled, setCancelled] = useState(false);

    useEffect(() => {
        async function loadDocument() {
            if (cancelled) return;

            setLoading(true);

            try {
                const docRef = await doc(db, dataCollection, id);
                const docSnap = await getDoc(docRef);

                setData(docSnap.data());

                setLoading(false);

            } catch (err) {
                console.log(err)
                
                setError(err.message);
                
                setLoading(false);
            }
        };

        loadDocument();
    }, [dataCollection, id, cancelled]);

    useEffect(() => {
        return () => setCancelled(true);
    }, []);

    return { data, loading, error };
};