import { useState } from "react";
import { Button } from "../components/ui/button";
import { Textarea } from "../components/ui/textarea";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "../components/ui/card";
import ReactMarkdown from "react-markdown";
import API_CONFIG from "../config";

export default function AIChat() {
  const [input, setInput] = useState("");
  const [answer, setAnswer] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(API_CONFIG.ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-API-Key": API_CONFIG.API_KEY,
        },
        body: JSON.stringify({ question: input }),
      });

      if (!response.body) {
        throw new Error("Response body is null");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        if (value && value.length > 0 && isLoading) {
          setIsLoading(false); // valueが空でない場合にisLoadingをfalseに設定
        }
        const chunk = decoder.decode(value);
        setAnswer((prevAnswer) => prevAnswer + chunk);
      }
    } catch (error) {
      console.error("Error:", error);
      setAnswer("An error occurred while fetching the answer.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setInput("");
    setAnswer("");
  };

  const handleClear = () => {
    setAnswer("");
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>質問応答アプリ</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="質問を入力してください。"
            className="w-full h-32"
          />
          <Button type="submit" disabled={isLoading || !input.trim()} className="bg-blue-700 text-white">
            {isLoading ? "送信中..." : "送信"}
          </Button>
        </form>
        {answer && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">回答:</h3>
            <Card className="p-4 bg-muted">
              <ReactMarkdown>{answer}</ReactMarkdown>
            </Card>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-end space-x-2">
        <Button onClick={handleClear} variant="outline">
          クリア
        </Button>
        <Button onClick={handleReset} variant="outline">
          リセット
        </Button>
      </CardFooter>
    </Card>
  );
}
