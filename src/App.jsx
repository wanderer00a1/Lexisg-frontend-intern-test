import React, { useState } from "react";
import { Send, FileText, ExternalLink, Scale, AlertCircle } from "lucide-react";

const App = () => {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(null);

  const mockApiData = {
    answer:
      "Yes, under Section 166 of the Motor Vehicles Act, 1988, the claimants are entitled to an addition for future prospects even when the deceased was self-employed and aged 54–55 years at the time of the accident. In *Dani Devi v. Pritam Singh*, the Court held that **10% of the deceased's annual income** should be added as future prospects.",
    citations: [
      {
        text: "as the age of the deceased at the time of accident was held to be about 54-55 years by the learned Tribunal, being self-employed, as such, 10% of annual income should have been awarded on account of future prospects.",
        source: "Dani_Devi_v_Pritam_Singh.pdf",
        paragraph: "Para 7",
        link: "https://lexisingapore-my.sharepoint.com/:b:/g/personal/harshit_lexi_sg/EdOegeiR_gdBvQxdyW4xE6oBCDgj5E4Bo5wjvhPHpqgIuQ?e=TEu4vz",
      },
    ],
  };

  const handleSubmit = async () => {
    if (!query.trim()) return;

    setIsLoading(true);

    setTimeout(() => {
      setResponse(mockApiData);
      setIsLoading(false);
    }, 1500);
  };

  const handleCitationClick = (citation) => {
    window.open(citation.link, "_blank");
  };

  const formatAnswerText = (text) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.*?)\*/g, "<em>$1</em>");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <Scale className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">
              Lexi Legal Assistant
            </h1>
          </div>
          <p className="text-gray-600 mt-1">
            Ask legal questions and get answers with citations
          </p>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          <div>
            <div className="mb-4">
              <label
                htmlFor="query"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Legal Query
              </label>
              <textarea
                id="query"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Enter your legal question here..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={4}
                disabled={isLoading}
              />
            </div>
            <button
              onClick={handleSubmit}
              disabled={isLoading || !query.trim()}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                  Processing...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  Ask Question
                </>
              )}
            </button>
          </div>
        </div>

        {!response && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-blue-900 mb-2">
                  Try this sample query:
                </h3>
                <p className="text-sm text-blue-700 mb-3">
                  "In a motor accident claim where the deceased was
                  self-employed and aged 54–55 years at the time of death, is
                  the claimant entitled to an addition towards future prospects
                  in computing compensation under Section 166 of the Motor
                  Vehicles Act, 1988? If so, how much?"
                </p>
                <button
                  onClick={() =>
                    setQuery(
                      "In a motor accident claim where the deceased was self-employed and aged 54–55 years at the time of death, is the claimant entitled to an addition towards future prospects in computing compensation under Section 166 of the Motor Vehicles Act, 1988? If so, how much?"
                    )
                  }
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  Use this query
                </button>
              </div>
            </div>
          </div>
        )}

        {response && (
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-600" />
                Legal Answer
              </h2>
              <div
                className="prose prose-gray max-w-none text-gray-700 leading-relaxed"
                dangerouslySetInnerHTML={{
                  __html: formatAnswerText(response.answer),
                }}
              />
            </div>

            {response.citations && response.citations.length > 0 && (
              <div className="border-t pt-6">
                <h3 className="text-md font-semibold text-gray-900 mb-4">
                  Citations
                </h3>
                <div className="space-y-3">
                  {response.citations.map((citation, index) => (
                    <div
                      key={index}
                      className="bg-gray-50 rounded-lg p-4 border"
                    >
                      <p className="text-gray-700 mb-3 italic">
                        "{citation.text}"
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <FileText className="h-4 w-4" />
                          <span>{citation.source}</span>
                          <span className="text-gray-400">•</span>
                          <span>{citation.paragraph}</span>
                        </div>
                        <button
                          onClick={() => handleCitationClick(citation)}
                          className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
                        >
                          <ExternalLink className="h-4 w-4" />
                          Open PDF
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <footer className="bg-white border-t mt-12">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <p className="text-gray-600 text-sm text-center">
            Lexi Legal Assistant - AI-powered legal research with source
            citations
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
