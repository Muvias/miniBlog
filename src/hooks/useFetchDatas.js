import { useEffect, useState } from "react";
import { collection, query, orderBy, onSnapshot, where } from "firebase/firestore";

import { db } from "../firebase/config";

export function useFetchDatas(dataCollection, search = null, uid = null) {
    const [datas, setDatas] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [cancelled, setCancelled] = useState(false);

    useEffect(() => {
        async function loadData() {
            if (cancelled) return;

            setLoading(true);

            const collectionRef = await collection(db, dataCollection);

            try {
                let research

                if (search) {
                    research = await query(collectionRef, where("tagsArray", "array-contains", search), orderBy("createdAt", "desc"));
                } else if(uid) {
                    research = await query(collectionRef, where("uid", "==", uid), orderBy("createdAt", "desc"));
                } else {
                    research = await query(collectionRef, orderBy("createdAt", "desc"));
                }

                await onSnapshot(research, (querySnapshot) => {
                    setDatas(
                        querySnapshot.docs.map((doc) => ({
                            id: doc.id,
                            ...doc.data(),
                        }))
                    )
                });

                setLoading(false);
            } catch (err) {
                console.log(err)
                setError(err.message);

                setLoading(false);
            };
        };

        loadData();
    }, [dataCollection, search, uid, cancelled]);

    useEffect(() => {
        return () => setCancelled(true);
    }, []);

    return { datas, loading, error };
};