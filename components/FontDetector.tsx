"use client";

import { SetStateAction, useState } from "react";
import { Upload, FileImage, Type, Check } from "lucide-react";
import { useDropzone } from "react-dropzone";
import ResultCard from "./Resultcard";
import Image from "next/image";

export default function FontDetector() {
  const [inputType, setInputType] = useState("text");
  const [textInput, setTextInput] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  interface FontDetectionResult {
    detectedFonts: { name: string; confidence: number }[];
    reasoning?: string;
  }

  const [results, setResults] = useState<FontDetectionResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Handle text input changes
  const handleTextChange = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setTextInput(e.target.value);
  };

  // Setup dropzone for image upload
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
    },
    onDrop: (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          if (typeof reader.result === "string") {
            setImagePreview(reader.result);
          }
        };
        reader.readAsDataURL(file);
      }
    },
  });

  // Handle clipboard paste for images
  const handlePaste = (e) => {
    const items = e.clipboardData.items;
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf("image") !== -1) {
        const file = items[i].getAsFile();
        const reader = new FileReader();
        reader.onloadend = () => {
          if (typeof reader.result === "string") {
            setImagePreview(reader.result);
          }
        };
        reader.readAsDataURL(file);
        break;
      }
    }
  };

  // Reset state when switching input types
  const switchInputType = (type: SetStateAction<string>) => {
    setInputType(type);
    setResults(null);
    setError(null);
  };

  // Submit font detection request to the API
  const detectFont = async () => {
    setLoading(true);
    setError(null);

    try {
      let content;

      if (inputType === "text") {
        content = textInput.trim();
        if (!content) {
          throw new Error("Please enter some text");
        }
      } else {
        content = imagePreview;
        if (!content) {
          throw new Error("Please upload an image");
        }
      }

      const response = await fetch("/api/detect-font", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputType,
          content,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to detect font");
      }

      const data = await response.json();
      setResults(data);
    } catch (err) {
      setError(err.message);
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      {/* Input Type Selection */}
      <div className="flex mb-6 space-x-4 justify-center">
        <button
          className={`flex items-center px-4 py-2 rounded-lg ${
            inputType === "text"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
          onClick={() => switchInputType("text")}
        >
          <Type className="mr-2 h-5 w-5" />
          Text Input
        </button>
        <button
          className={`flex items-center px-4 py-2 rounded-lg ${
            inputType === "image"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
          onClick={() => switchInputType("image")}
        >
          <FileImage className="mr-2 h-5 w-5" />
          Image Input
        </button>
      </div>

      {/* Text Input */}
      {inputType === "text" && (
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">
            Enter or paste your text:
          </label>
          <textarea
            className="w-full p-3 border border-gray-300 rounded-lg h-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={textInput}
            onChange={handleTextChange}
            placeholder="Paste or type text here to identify the font..."
          />
        </div>
      )}

      {/* Image Input */}
      {inputType === "image" && (
        <div className="mb-6">
          <div
            onPaste={handlePaste}
            tabIndex="0"
            className="focus:outline-none"
          >
            {!imagePreview ? (
              <div
                {...getRootProps()}
                className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center h-64 cursor-pointer hover:border-blue-500"
              >
                <input {...getInputProps()} />
                <Upload className="h-12 w-12 text-gray-400 mb-4" />
                <p className="text-gray-500 mb-2">
                  Drop an image here, or click to select
                </p>
                <p className="text-gray-400 text-sm">
                  You can also paste an image from clipboard
                </p>
              </div>
            ) : (
              <div className="w-full">
                <div className="relative">
                  <Image
                    src={imagePreview}
                    alt="Preview"
                    className="max-h-64 max-w-full mx-auto rounded-lg"
                  />
                  <button
                    onClick={() => setImagePreview(null)}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
                    aria-label="Remove image"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 text-red-800 p-3 rounded-md mb-6">
          {error}
        </div>
      )}

      {/* Detect Button */}
      <div className="flex justify-center mb-8">
        <button
          className="bg-blue-600 text-white px-6 py-3 rounded-lg flex items-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700"
          onClick={detectFont}
          disabled={
            loading ||
            (inputType === "text" && !textInput.trim()) ||
            (inputType === "image" && !imagePreview)
          }
        >
          {loading ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Processing...
            </>
          ) : (
            <>
              <Check className="mr-2 h-5 w-5" />
              Detect Font
            </>
          )}
        </button>
      </div>

      {/* Results */}
      {results && results.detectedFonts && results.detectedFonts.length > 0 && (
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <h2 className="text-xl font-semibold mb-4">Detected Fonts</h2>
          <div className="space-y-4">
            {results.detectedFonts.map((font, index) => (
              <ResultCard key={index} font={font} />
            ))}
          </div>

          {results.reasoning && (
            <div className="mt-6 pt-4 border-t border-gray-200">
              <h3 className="font-medium mb-2">Analysis</h3>
              <p className="text-gray-600">{results.reasoning}</p>
            </div>
          )}
        </div>
      )}

      {results &&
        (!results.detectedFonts || results.detectedFonts.length === 0) && (
          <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200 text-center">
            <h2 className="text-xl font-semibold mb-2">No Fonts Detected</h2>
            <p>
              The AI couldn&apos;t detect any fonts with sufficient confidence.
              Try with a clearer image or different text.
            </p>
          </div>
        )}
    </div>
  );
}
