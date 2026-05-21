"use client";

import { useState } from "react";
import { Mail, Zap, Send, Loader2, CheckCircle } from "lucide-react";

interface Lead {
  id: string;
  name: string | null;
  company: string | null;
  email: string | null;
  personalEmailContent: string | null;
  status: string;
}

interface CampaignManagerProps {
  leads: Lead[];
}

export default function CampaignManager({ leads }: CampaignManagerProps) {
  const [selectedLeadId, setSelectedLeadId] = useState<string>("");
  const [userProduct, setUserProduct] = useState("");
  const [isPersonalizing, setIsPersonalizing] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [previewContent, setPreviewContent] = useState("");

  const selectedLead = leads.find((l) => l.id === selectedLeadId);

  const handlePersonalize = async () => {
    if (!selectedLeadId || !userProduct) {
      setMessage({ type: "error", text: "Please select a lead and enter your product description." });
      return;
    }

    setIsPersonalizing(true);
    setMessage({ type: "", text: "" });

    try {
      const response = await fetch("/api/leads/personalize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ leadId: selectedLeadId, userProduct }),
      });

      if (!response.ok) throw new Error("Failed to personalize email");

      const updatedLead = await response.json();
      setPreviewContent(updatedLead.personalEmailContent);
      setMessage({ type: "success", text: "Email personalized successfully!" });
    } catch (err: any) {
      setMessage({ type: "error", text: err.message });
    } finally {
      setIsPersonalizing(false);
    }
  };

  const handleSend = async () => {
    if (!selectedLeadId || !previewContent) {
      setMessage({ type: "error", text: "Please personalize the email before sending." });
      return;
    }

    setIsSending(true);
    setMessage({ type: "", text: "" });

    try {
      const response = await fetch("/api/leads/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          leadId: selectedLeadId, 
          subject: `Personalized offer for ${selectedLead?.company || "your company"}` 
        }),
      });

      if (!response.ok) throw new Error("Failed to send email");

      setMessage({ type: "success", text: "Email sent successfully!" });
    } catch (err: any) {
      setMessage({ type: "error", text: err.message });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        <div className="bg-white p-6 rounded-lg shadow border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Zap className="h-5 w-5 text-indigo-600 mr-2" />
            Campaign Settings
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Select Lead</label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={selectedLeadId}
                onChange={(e) => {
                  setSelectedLeadId(e.target.value);
                  const lead = leads.find(l => l.id === e.target.value);
                  setPreviewContent(lead?.personalEmailContent || "");
                }}
              >
                <option value="">-- Choose a lead --</option>
                {leads.map((lead) => (
                  <option key={lead.id} value={lead.id}>
                    {lead.name} ({lead.company})
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Your Product/Service Description</label>
              <textarea
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Briefly describe what you are offering..."
                value={userProduct}
                onChange={(e) => setUserProduct(e.target.value)}
              />
            </div>
            <button
              onClick={handlePersonalize}
              disabled={isPersonalizing || !selectedLeadId || !userProduct}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md transition-colors flex items-center justify-center disabled:opacity-50"
            >
              {isPersonalizing ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  AI is writing...
                </>
              ) : (
                "Personalize Email"
              )}
            </button>
          </div>
        </div>

        {message.text && (
          <div className={`p-4 rounded-md flex items-center ${message.type === "success" ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800"}`}>
            {message.type === "success" ? <CheckCircle className="h-5 w-5 mr-2" /> : null}
            {message.text}
          </div>
        )}
      </div>

      <div className="bg-white p-6 rounded-lg shadow border border-gray-100 flex flex-col h-[500px]">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Mail className="h-5 w-5 text-indigo-600 mr-2" />
          Email Preview
        </h3>
        
        <div className="flex-1 bg-gray-50 p-4 rounded-md border border-gray-200 overflow-y-auto mb-4 font-serif text-gray-800 whitespace-pre-wrap">
          {previewContent || (
            <div className="h-full flex items-center justify-center text-gray-400 italic">
              Personalize an email to see the preview here.
            </div>
          )}
        </div>

        <button
          onClick={handleSend}
          disabled={isSending || !previewContent}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md transition-colors flex items-center justify-center disabled:opacity-50"
        >
          {isSending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
              Sending...
            </>
          ) : (
            <>
              <Send className="h-4 w-4 mr-2" />
              Send Email Now
            </>
          )}
        </button>
      </div>
    </div>
  );
}
