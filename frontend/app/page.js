import Image from "next/image";
import DecisionTree from "@/components/comp/dec";

export default function Home() {
  return (
  <div className="flex justify-center items-center h-screen bg-gray-950 text-white">
    <DecisionTree />
  </div>
  );
}
