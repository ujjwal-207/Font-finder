interface Font {
  name: string;
  confidence: number;
  properties: {
    weight: string;
    style: string;
  };
}

export default function ResultCard({ font }: { font: Font }) {
  const confidencePercentage = Math.round(font.confidence * 100);
  const getConfidenceColor = () => {
    if (confidencePercentage >= 80) return "bg-green-100 text-green-800";
    if (confidencePercentage >= 60) return "bg-blue-100 text-blue-800";
    return "bg-yellow-100 text-yellow-800";
  };

  return (
    <div className="bg-white p-4 rounded-md shadow-sm border border-gray-100">
      <div className="flex justify-between items-center">
        <div className="font-medium text-lg">{font.name}</div>
        <div className={`${getConfidenceColor()} px-2 py-1 rounded text-sm`}>
          {confidencePercentage}% match
        </div>
      </div>
      <div className="text-gray-500 text-sm mt-1">
        {font.properties.weight}, {font.properties.style}
      </div>
    </div>
  );
}
