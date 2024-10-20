import React, { useState, useEffect } from "react";
import { Button } from "../components/ui/button";

const QuickSortTreeVisualization = () => {
  const [array, setArray] = useState([]);
  const [history, setHistory] = useState([]);
  const [step, setStep] = useState(0);

  useEffect(() => {
    generateRandomArray();
  }, []);

  const generateRandomArray = () => {
    const newArray = Array.from({ length: 10 }, () =>
      Math.floor(Math.random() * 100)
    );
    setArray(newArray);
    setHistory([]);
    setStep(0);
    quickSort([...newArray], 0, newArray.length - 1);
  };

  const quickSort = (arr, low, high, depth = 0) => {
    if (low < high) {
      const pivotIndex = partition(arr, low, high);

      setHistory((prev) => [
        ...prev,
        {
          array: [...arr],
          pivot: arr[pivotIndex],
          left: low,
          right: high,
          depth,
          type: "partition",
        },
      ]);

      quickSort(arr, low, pivotIndex - 1, depth + 1);
      quickSort(arr, pivotIndex + 1, high, depth + 1);

      setHistory((prev) => [
        ...prev,
        {
          array: [...arr],
          pivot: arr[pivotIndex],
          left: low,
          right: high,
          depth,
          type: "merge",
        },
      ]);
    }
  };

  const partition = (arr, low, high) => {
    const pivot = arr[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
      if (arr[j] < pivot) {
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
    }
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    return i + 1;
  };

  const nextStep = () => {
    if (step < history.length - 1) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const TreeNode = ({ node }) => {
    return (
      <div className="flex flex-col items-center">
        <div
          className={`border p-2 mb-2 rounded ${
            node.type === "merge" ? "bg-green-100" : "bg-blue-100"
          }`}
        >
          <div>Pivot: {node.pivot}</div>
          <div>{node.array.slice(node.left, node.right + 1).join(", ")}</div>
          <div className="text-xs">
            {node.type === "partition" ? "분할" : "병합"}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">퀵정렬 과정 시각화</h2>
      <div className="mb-4">
        <div className="font-bold">초기 배열:</div>
        <div>{array.join(", ")}</div>
      </div>
      <div className="mb-4 overflow-auto" style={{ maxHeight: "60vh" }}>
        {history.slice(0, step + 1).map((node, index) => (
          <div key={index} className="mb-4">
            <h3 className="font-bold mb-2">
              단계 {index + 1}: {node.type === "partition" ? "분할" : "병합"}
            </h3>
            <TreeNode node={node} />
          </div>
        ))}
      </div>
      <div className="flex justify-center space-x-4">
        <Button onClick={prevStep} disabled={step === 0}>
          이전 단계
        </Button>
        <Button onClick={nextStep} disabled={step === history.length - 1}>
          다음 단계
        </Button>
        <Button onClick={generateRandomArray}>재설정</Button>
      </div>
      <div className="mt-2 text-center">
        단계 {step + 1} / {history.length}
      </div>
    </div>
  );
};

export default QuickSortTreeVisualization;
