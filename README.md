# Agentic Event-Driven Backend Boilerplate

This repository is a **Node.js + Express + Supabase backend boilerplate** designed for building **event-driven, agent-oriented systems**.

It intentionally **does not follow traditional MVC**.  
Instead, it provides a **data-centric foundation** where raw events are stored, processed, and later interpreted by AI agents.

> ⚠️ Note  
> No production AI agent is implemented yet.  
> An anomaly agent folder exists as a placeholder to establish structure and conventions.
>

## Environment Variables

This project uses a `.env` file for configuration.

### 1️⃣ Create a `.env` file
At the root of the project:

```bash
touch .env
2️⃣ Add the following variables
env
Copy code
# Server
PORT=3001

# Supabase
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=

# LLM (optional / future use)
OPENROUTER_API_KEY=
OPENROUTER_MODEL=

---

## What This Boilerplate Is For

This backend is meant to support systems where:

- User behavior is captured as **events**
- Business logic is executed by **stateless agents**
- Insights are **derived**, not manually queried
- AI models act as **workers**, not controllers
- The database is the **source of truth**

Example future use cases:
- Feature adoption analysis
- Usage anomaly detection
- Behavioral analytics
- AI-generated insights
- Scheduled or on-demand agent runs

---

## What This Is *Not*

- ❌ Traditional MVC backend
- ❌ CRUD-only REST API
- ❌ Server-rendered application backend
- ❌ Chatbot or conversational AI system

This backend is **compute-driven**, not request-driven.

---

## High-Level Architecture

`Client / Frontend
|
v
POST /events
|
v
Supabase (events table)
|
v
Agent Runner (future)
|
v
Insights + Agent Runs (Supabase)
|
v
Dashboards / Analytics / Consumers`


---

## Core Concepts

### Events

Events represent **user or system actions**.

Examples:
- `feature_used`
- `screen_view`
- `form_submitted`

Events are:
- Append-only
- Time-series friendly
- Stored in Supabase
- Replayable by future agents

---

### Agents (Future)

Agents are **stateless workers** that:

- Pull events from the database
- Aggregate or analyze data
- Optionally call LLMs
- Produce structured outputs (insights)

Each agent:
- Has a single responsibility
- Is versionable
- Can be run manually or on a schedule

> Note  
> The `adoption-anomaly` agent folder exists to define structure only.  
> No agent logic is finalized yet.

---

### Insights

Insights are **derived data**, not raw logs.

They are designed to be:
- Displayed in dashboards
- Cached and queryable
- Generated or updated by agents
- Separated from raw events

---

## Tech Stack

- **Node.js**
- **TypeScript**
- **Express**
- **Supabase** (Postgres + API)
- **Zod** (schema validation)
- **OpenRouter** (LLM access, optional)

---

## Project Structure

`src/
├── app.ts
├── main.ts
│
├── components/
│ ├── agents/
│ │ ├── adoption-anomaly/ # Placeholder agent
│ │ │ ├── agent.ts
│ │ │ ├── prompt.ts
│ │ │ └── schema.ts
│ │ ├── agent-registry.ts
│ │ ├── agent-runner.ts
│ │ ├── agents.routes.ts
│ │ └── agents.types.ts
│ │
│ ├── events/
│ │ ├── events.routes.ts
│ │ ├── events.schema.ts
│ │ └── events.service.ts
│ │
│ └── insights/
│ ├── insights.routes.ts
│ ├── insights.schema.ts
│ └── insights.service.ts
│
├── core/
│ ├── config/
│ │ └── env.ts
│ └── errors/
│ └── error-handler.ts
│
├── shared/
│ ├── db/
│ ├── llm/
│ └── utils/
│ └── ids.ts`


---

## Design Philosophy

### Event-First Architecture
All behavior is recorded as raw events before interpretation.

### Agent-Oriented Logic
Business logic lives in agents, not controllers.

### Schema-Validated I/O
All inputs and outputs are validated with Zod.

### Extensible by Default
New agents can be added without modifying existing ones.

---

## Current Status

- ✅ Express server running
- ✅ Supabase connected
- ✅ Event ingestion scaffolded
- ✅ Agent framework and runner in place
- 🟡 Anomaly agent folder exists (not implemented)
- 🔜 Session-based tracking
- 🔜 Feature ranking and metrics
- 🔜 Insight dashboards

---

## One-Sentence Summary

> A boilerplate for building event-driven, agent-oriented backends where raw product events are transformed into structured insights.

---
