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

  const handleSymbolClick = (symbol) => {
    setEquation((prev) => prev + symbol);
  };

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

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="p-4">
      <div className="mb-4">
        <input
          type="text"
          value={equation}
          onChange={(e) => setEquation(e.target.value)}
          placeholder="Enter equation, e.g., x^2"
          className="border border-gray-300 p-2 rounded-md w-full focus:outline-none focus:ring-2 focus: ring-blue-500"
        />
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>
      <MathKeyboard onSymbolClick={handleSymbolClick} />
      <div className="flex justify-between mt-4">
        <button
          onClick={saveEquation}
          className={`p-2 rounded shadow ${
            user
              ? "bg-green-500 text-white"
              : "bg-gray-500 text-gray-200 cursor-not-allowed"
          }`}
          disabled={!user}
        >
          {user ? "Save Equation" : "Sign in to Save"}
        </button>
      </div>
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
  );
};

export default Graph;
