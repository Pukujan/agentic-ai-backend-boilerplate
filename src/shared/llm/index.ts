type Role = "system" | "user" | "assistant";

export type ChatMessage = {
  role: Role;
  content: string;
};

export type LlmChatOptions = {
  model?: string;
  temperature?: number;
  max_tokens?: number;
};

const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";

export async function chat(
  messages: ChatMessage[],
  opts: LlmChatOptions = {}
) {
  const apiKey = process.env.OPENROUTER_API_KEY;
  const model = opts.model ?? process.env.OPENROUTER_MODEL;

  if (!apiKey) throw new Error("Missing OPENROUTER_API_KEY");
  if (!model) throw new Error("Missing OPENROUTER_MODEL");

  const res = await fetch(OPENROUTER_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
      // Recommended by OpenRouter
      "HTTP-Referer": "http://localhost:3001",
      "X-Title": "ai-agent-platform"
    },
    body: JSON.stringify({
      model,
      messages,
      temperature: opts.temperature ?? 0.2,
      max_tokens: opts.max_tokens ?? 800
    })
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`OpenRouter ${res.status}: ${text}`);
  }

  const json: any = await res.json();
  const content = json?.choices?.[0]?.message?.content;

  if (!content) throw new Error("LLM returned empty response");

  return {
    content,
    raw: json
  };
}
