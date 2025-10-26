"use client";
import React, { useState } from 'react';
import { FieldLabel, FieldSet } from '../ui/field';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Loader2 } from "lucide-react"; // spinner icon

const DecisionTree = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [result, setResult] = useState('');
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleTitle = (e) => setTitle(e.target.value);
  const handleDescription = (e) => setDescription(e.target.value);

  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  const data = title + " " + description;

  const response = await fetch("http://127.0.0.1:8000/decision-tree", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text: data }),
  });

  const result = await response.json();   
  console.log(result)
  setResult(result?.prediction === 1 ? "Spam" : "Not Spam");           
  setLoading(false);
  setOpen(true);
};


  const handleClose = () => {
    setOpen(false);
    setTitle('');
    setDescription('');
    setResult('');
  };

  return (
    <div className="bg-gray-900 p-6 rounded-lg shadow-lg text-white relative">
      <h2 className="text-2xl font-semibold mb-6 text-center">E-mail Input Form</h2>

      {/* Spinner overlay */}
      {loading && (
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex flex-col items-center justify-center rounded-lg z-10">
          <Loader2 className="w-10 h-10 text-blue-600 animate-spin mb-2" />
          <p className="text-gray-300">Analyzing email...</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <FieldSet className="flex flex-col gap-2">
          <FieldLabel>Title of the E-mail:</FieldLabel>
          <Input
            required
            value={title}
            onChange={handleTitle}
            placeholder="Enter email title"
            className="w-full bg-gray-800 text-white placeholder-gray-400"
            disabled={loading}
          />
        </FieldSet>

        <FieldSet className="flex flex-col gap-2">
          <FieldLabel>Description of the E-mail:</FieldLabel>
          <Textarea
            required
            value={description}
            onChange={handleDescription}
            placeholder="Enter email description"
            className="w-full h-36 bg-gray-800 text-white placeholder-gray-400"
            disabled={loading}
          />
        </FieldSet>

        <Button
          type="submit"
          disabled={loading}
          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md cursor-pointer"
        >
          {loading ? "Processing..." : "Submit"}
        </Button>
      </form>

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent className="bg-gray-900/90 backdrop-blur-md border border-gray-700 rounded-2xl text-white shadow-xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-2xl font-semibold text-center mb-3">
              Prediction Result
            </AlertDialogTitle>
            <AlertDialogDescription className="text-lg text-center">
              The model predicts this email is:
              <br />
              <span
                className={`inline-block mt-3 text-3xl font-bold ${
                  result === "Spam" ? "text-red-400" : "text-green-400"
                }`}
              >
                {result}
              </span>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex justify-center mt-6">
            <AlertDialogAction
              onClick={handleClose}
              className="bg-blue-600 hover:bg-blue-700 cursor-pointer text-black font-semibold px-6 py-2 rounded-lg shadow-md transition-all"
            >
              Close
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default DecisionTree;
