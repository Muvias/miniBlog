import { useEffect, useReducer, useState } from "react";
import { doc, deleteDoc } from "firebase/firestore";

import { db } from "../firebase/config";

const initialState = {
    loading: null,
    error: null
};

function deleteReducer(state, action) {
    switch(action.type) {
        case "LOADING":
            return {loading: true, error: null};
        case "DELETED_DOC":
            return {loading: false, error: null};
        case "ERROR":
            return {loading: false, error: action.payload};
        default:
            return state;
    };
}

export function useDeleteDocument(dataCollection) {
    const [response, dispatch] = useReducer(deleteReducer, initialState);
    
    const [cancelled, setCancelled] = useState(false);

    function checkCancelBeforeDisptach(action) {
        if(!cancelled) {
            dispatch(action);
        };
    };

    async function deleteDocument(id) {
        checkCancelBeforeDisptach({
            type: "LOADING"
        });

        try {
            const deletedDocument = await deleteDoc(doc(db, dataCollection, id));

            checkCancelBeforeDisptach({
                type: "DELETED_DOC",
                payload: deletedDocument,
            });
        } catch (err) {
            checkCancelBeforeDisptach({
                type: "ERROR",
                payload: err.message,
            });
        }
    };

    useEffect(() => {
        return () => setCancelled(true);
    }, []);

    return {deleteDocument, response}
};