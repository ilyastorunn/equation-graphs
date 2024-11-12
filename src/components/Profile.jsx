import React, { useEffect, useState } from "react";
import { db, auth } from "../../firebaseConfig";
import { collection, getDocs, query } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const [graphs, setGraphs] = useState([]);
    const [user] = useAuthState(auth);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchGraphs = async () => {
            try {
                const q = query(collection(db, "equations"));
                const querySnapshot = await getDocs(q);
                const graphList = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setGraphs(graphList);
            } catch (error) {
                console.error("Error fetching graphs:", error);
            }
        };
        fetchGraphs();
    }, []);

    const handleSavePrompt = () => {
        if (!user) {
            alert("You must sign in to save graphs!");
            navigate("/signin");
        }
    };

    return (
        <div className="p-4">
            <h2>Saved Graphs</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {graphs.map((graph) => (
                    <div key={graph.id} className="border p-4 rounded shadow">
                        <h3 className="font-bold">{graph.equation}</h3>
                        <p>Saved by: {graph.uid ? "User" : "Guest"}</p>
                        <button
                            className="bg-green-500 text-white p-2 mt-2 rounded"
                            onClick={handleSavePrompt}
                            disabled={!!user}
                        >
                            {user ? "Saved" : "Sign in to Save"}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Profile;