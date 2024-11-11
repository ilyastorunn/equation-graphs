import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js";
import { evaluate } from "mathjs";
import MathKeyboard from "./MathKeyboard";

const Graph = () => {
  const [equation, setEquation] = useState("x * x");
  const [xRange, setXRange] = useState([-10, 10]);
  const [error, setError] = useState(null);
  const [graphData, setGraphData] = useState({ x: [], y: [] });

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