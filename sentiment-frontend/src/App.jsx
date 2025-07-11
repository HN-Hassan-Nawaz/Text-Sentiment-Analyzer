import React, { useState } from "react";
import axios from "axios";

function App() {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);

  const analyzeSentiment = async () => {
    try {
      const response = await axios.post("http://localhost:5000/analyze", {
        text,
      });
      setResult(response.data);
    } catch (error) {
      setResult({ sentiment: "Error", polarity: 0 });
    }
  };

  // Emoji based on sentiment
  const getEmoji = (sentiment) => {
    switch (sentiment) {
      case "Positive":
        return "😊";
      case "Negative":
        return "😠";
      case "Neutral":
        return "😐";
      default:
        return "❓";
    }
  };

  // Bootstrap alert class based on sentiment
  const getAlertClass = (sentiment) => {
    switch (sentiment) {
      case "Positive":
        return "alert alert-success";
      case "Negative":
        return "alert alert-danger";
      case "Neutral":
        return "alert alert-secondary";
      default:
        return "alert alert-warning";
    }
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <h2 className="text-center mb-4">Text Sentiment Analyzer</h2>

          <div className="mb-3">
            <textarea
              rows="5"
              className="form-control"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Type your sentence here..."
            />
          </div>

          <div className="d-grid">
            <button className="btn btn-primary" onClick={analyzeSentiment}>
              Analyze
            </button>
          </div>

          {result && (
            <div className={`${getAlertClass(result.sentiment)} mt-4`} role="alert">
              {getEmoji(result.sentiment)} <strong>Sentiment:</strong> {result.sentiment} <br />
              {/* 📊 <strong>Polarity:</strong> {result.polarity.toFixed(2)} */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;