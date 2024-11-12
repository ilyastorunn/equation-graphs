import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js";
import { evaluate } from "mathjs";
import MathKeyboard from "./MathKeyboard";
import { db, auth } from "../../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

const Graph = () => {
  const [equation, setEquation] = useState("x * x");
  const [xRange, setXRange] = useState([-10, 10]);
  const [error, setError] = useState(null);
  const [graphData, setGraphData] = useState({ x: [], y: [] });
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    const generateData = () => {
      const xValues = [];
      const yValues = [];
      try {
        for (let x = xRange[0]; x <= xRange[1]; x += 0.1) {
          xValues.push(x);
          yValues.push(evaluate(equation, { x }));
        }
        setError(null);
      } catch (err) {
        setError("Invalid equation. Please check your input.");
      }
      return { x: xValues, y: yValues };
    };

    const data = generateData();
    setGraphData(data);
  }, [equation, xRange]);

  const saveEquation = async () => {
    if (user) {
      try {
        await addDoc(collection(db, "equations"), {
          uid: user.uid,
          equation,
          createdAt: new Date(),
        });
        alert("Equation saved successfully!");
      } catch (err) {
        console.error("Error saving equation: ", err);
        alert("Failed to save equation");
      }
    } else {
      alert("Please sign in to save your equations.");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <header className="bg-gray-800 text-white text-center py-4 rounded-t-lg">
        <h1 className="text-2xl font-bold">Title Field</h1>
      </header>

      <div className="grid grid-cols-4 gap-4 sm:grid-cols-12 sm:gap-6 lg:grid-cols-12 lg:px-[72px] lg:gap-6 sm:px-0 px-[16px]">
        {/* Input Section */}
        <div className="col-span-4 sm:col-span-6">
          <input
            type="text"
            value={equation}
            onChange={(e) => setEquation(e.target.value)}
            placeholder="Enter equation, e.g., x^2"
            className="w-full p-2 border rounded mb-4 focus:ring focus:ring-blue-300"
          />
          {error && <p className="text-red-500">{error}</p>}

          <MathKeyboard
            onSymbolClick={(symbol) => setEquation((prev) => prev + symbol)}
          />

          {/* Save Button */}
          <div className="mt-4 text-center">
            <button
              onClick={saveEquation}
              disabled={!user}
              className={`px-4 py-2 rounded ${
                user
                  ? "bg-green-500 hover:bg-green-600 text-white"
                  : "bg-gray-400 text-gray-200 cursor-not-allowed"
              }`}
            >
              {user ? "Save Equation" : "Sign in to Save"}
            </button>
          </div>
        </div>

        {/* Graph Section */}
        <div className="col-span-4 sm:col-span-6">
          <Plot
            data={[
              {
                x: graphData.x,
                y: graphData.y,
                type: "scatter",
                mode: "lines",
                marker: { color: "blue" },
              },
            ]}
            layout={{
              title: `Graph of y = ${equation}`,
              xaxis: { title: "x" },
              yaxis: { title: "y" },
            }}
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default Graph;
