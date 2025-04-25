
import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ChatbotUI from "@/components/ai/ChatbotUI";

export default function AIAssistant() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-gray-50 py-12">
        <div className="medigo-container">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-800">AI Health Assistant</h1>
              <p className="text-gray-600 mt-2">
                Get instant help with medicine alternatives, medication information, and general health advice
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-6">
              <ChatbotUI />
            </div>
            
            <div className="mt-8 bg-blue-50 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">How the AI Assistant can help</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <h3 className="font-medium text-lg mb-2">Find Alternative Medicines</h3>
                  <p className="text-gray-600 text-sm">
                    Ask about generic alternatives or similar medications that might be more affordable or readily available.
                  </p>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <h3 className="font-medium text-lg mb-2">Medication Information</h3>
                  <p className="text-gray-600 text-sm">
                    Get details about usage, side effects, and precautions for different medications.
                  </p>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <h3 className="font-medium text-lg mb-2">General Health Advice</h3>
                  <p className="text-gray-600 text-sm">
                    Receive guidance on common health issues and when to consult a doctor.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
