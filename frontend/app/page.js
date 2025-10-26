"use client";
import Image from "next/image";
import DecisionTree from "@/components/comp/dec";
import SVM from "@/components/comp/svm";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  return (
    <div className="flex justify-center items-start min-h-screen bg-gray-950 text-white py-12">
      <div className="w-full max-w-3xl">
        <h1 className="text-4xl font-bold text-center mb-8">E-mail spam detection</h1>

        <Tabs defaultValue="decisionTree" className="bg-gray-900 rounded-lg p-4 shadow-lg ">
          <TabsList className='flex gap-2 py-5'>
            <TabsTrigger value="decisionTree" className=" text-black cursor-pointer hover:bg-blue-200 p-4 data-[state=active]:bg-blue-600 data-[state=active]:text-black transition-all">
              Decision Tree
            </TabsTrigger>
            <TabsTrigger value="SVM" className=" text-black cursor-pointer hover:bg-blue-200 p-4  data-[state=active]:bg-blue-600 data-[state=active]:text-black ">
              SVM
            </TabsTrigger>
          </TabsList>

          <TabsContent value="decisionTree" className="bg-gray-800 rounded-lg shadow-inner">
            <DecisionTree />
          </TabsContent>

          <TabsContent value="SVM" className="p-4 bg-gray-800 rounded-lg shadow-inner">
            <SVM />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
