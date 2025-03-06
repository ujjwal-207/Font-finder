import FontDetector from "../components/FontDetector";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Font Finder</h1>
        <FontDetector />
      </div>
    </div>
  );
}
