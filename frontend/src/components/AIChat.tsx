import { useState } from 'react'
import { Button } from "../components/ui/button"
import { Textarea } from "../components/ui/textarea"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "../components/ui/card"
import ReactMarkdown from 'react-markdown'

export default function AIChat() {
  const [input, setInput] = useState('')
  const [response, setResponse] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // ここでAIサービスへのリクエストを行う
    // 実際のAPIコールに置き換えてください
    await new Promise(resolve => setTimeout(resolve, 1000))
    setResponse(`You asked: ${input}\n\n### AI Response\nThis is a sample markdown response.`)
    setIsLoading(false)
  }

  const handleReset = () => {
    setInput('')
    setResponse('')
  }

  const handleClear = () => {
    setResponse('')
  }

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
          <Button type="submit" disabled={isLoading}>
            {isLoading ? '送信中...' : '送信'}
          </Button>
        </form>
        {response && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">回答:</h3>
            <Card className="p-4 bg-muted">
              <ReactMarkdown>{response}</ReactMarkdown>
            </Card>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-end space-x-2">
        <Button onClick={handleClear} variant="outline">クリア</Button>
        <Button onClick={handleReset} variant="outline">リセット</Button>
      </CardFooter>
    </Card>
  )
}
