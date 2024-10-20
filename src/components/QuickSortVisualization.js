import React, { useState, useEffect, useCallback } from "react";

const Button = ({ onClick, disabled, children, className }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`px-4 py-2 rounded ${
      disabled
        ? "bg-gray-300 cursor-not-allowed"
        : "bg-blue-500 hover:bg-blue-600 text-white"
    } ${className}`}
  >
    {children}
  </button>
);

const QuickSortTreeVisualization = () => {
  const [array, setArray] = useState([]);
  const [history, setHistory] = useState([]);
  const [step, setStep] = useState(0);

  const generateRandomArray = useCallback(() => {
    const newArray = Array.from({ length: 10 }, () =>
      Math.floor(Math.random() * 100)
    );
    setArray(newArray);
    setHistory([]);
    setStep(0);
    quickSort([...newArray], 0, newArray.length - 1);
  }, []);

  useEffect(() => {
    generateRandomArray();
  }, [generateRandomArray]);

  const quickSort = (arr, low, high, depth = 0) => {
    if (low < high) {
      const pivotIndex = partition(arr, low, high);

      setHistory((prev) => [
        ...prev,
        {
          array: [...arr],
          pivot: arr[low],
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
          pivot: arr[low],
          left: low,
          right: high,
          depth,
          type: "merge",
        },
      ]);
    }
  };

  const partition = (arr, low, high) => {
    const pivot = arr[low];
    let i = low + 1;

    for (let j = low + 1; j <= high; j++) {
      if (arr[j] < pivot) {
        [arr[i], arr[j]] = [arr[j], arr[i]];
        i++;
      }
    }
    [arr[low], arr[i - 1]] = [arr[i - 1], arr[low]];
    return i - 1;
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

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">
        퀵정렬 전체 과정 누적 시각화 (왼쪽 피벗)
      </h2>
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
            <div
              className={`border p-2 mb-2 rounded ${
                node.type === "merge" ? "bg-green-100" : "bg-blue-100"
              }`}
            >
              <div>Pivot: {node.pivot} (왼쪽 요소)</div>
              <div>
                {node.array.slice(node.left, node.right + 1).join(", ")}
              </div>
              <div className="text-xs">
                {node.type === "partition" ? "분할" : "병합"}
              </div>
            </div>
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
