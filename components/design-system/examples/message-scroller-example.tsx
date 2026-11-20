"use client"
// Kronos demo for Message Scroller. Replies are scripted, not from a live AI.

import * as React from "react"
import { ArrowUpIcon } from "lucide-react"

import { Bubble, BubbleContent } from "@/components/ui/bubble"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupTextarea } from "@/components/ui/input-group"
import { Marker, MarkerContent, MarkerIcon } from "@/components/ui/marker"
import { Message, MessageContent } from "@/components/ui/message"
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
} from "@/components/ui/message-scroller"
import { Spinner } from "@/components/ui/spinner"
import { Example, ExampleWrapper } from "@/components/design-system/example"

type ChatMessage = { id: string; role: "user" | "assistant"; text: string }

const SCRIPT: [string, string][] = [
  ["Who is out this week?", "Nine people are out this week: four on annual leave, three sick, and two on training."],
  ["Which certificates expire soon?", "14 certificates expire within 30 days. Most are working-at-height and first-aid renewals."],
  ["How many people were on site yesterday?", "108 people clocked in on site on the last working day, 3.2% fewer than the week before."],
]

const initial: ChatMessage[] = [
  { id: "a0", role: "assistant", text: "Hi! Ask me about attendance, leave or certifications." },
]

export default function MessageScrollerExample() {
  const [messages, setMessages] = React.useState(initial)
  const [busy, setBusy] = React.useState(false)
  const turn = messages.filter((m) => m.role === "user").length
  const next = SCRIPT[turn]

  function send(e: React.FormEvent) {
    e.preventDefault()
    if (!next || busy) return
    setMessages((m) => [...m, { id: `u${turn}`, role: "user", text: next[0] }])
    setBusy(true)
    setTimeout(() => {
      setMessages((m) => [...m, { id: `a${turn + 1}`, role: "assistant", text: next[1] }])
      setBusy(false)
    }, 900)
  }

  return (
    <ExampleWrapper className="md:grid-cols-1">
      <Example title="Chat" containerClassName="self-start">
        <Card className="h-120">
          <CardHeader>
            <CardTitle>HR assistant</CardTitle>
            <CardDescription>Scripted demo: press send to ask the next question.</CardDescription>
          </CardHeader>
          <CardContent className="min-h-0 flex-1 overflow-hidden p-0">
            <MessageScrollerProvider>
              <MessageScroller>
                <MessageScrollerViewport>
                  <MessageScrollerContent className="p-(--card-spacing)">
                    {messages.map((m) => (
                      <MessageScrollerItem key={m.id} messageId={m.id} scrollAnchor={m.role === "user"}>
                        <Message align={m.role === "user" ? "end" : "start"}>
                          <MessageContent>
                            <Bubble variant={m.role === "user" ? "default" : "muted"}>
                              <BubbleContent>{m.text}</BubbleContent>
                            </Bubble>
                          </MessageContent>
                        </Message>
                      </MessageScrollerItem>
                    ))}
                    {busy && (
                      <MessageScrollerItem>
                        <Marker role="status">
                          <MarkerIcon><Spinner /></MarkerIcon>
                          <MarkerContent>Thinking…</MarkerContent>
                        </Marker>
                      </MessageScrollerItem>
                    )}
                  </MessageScrollerContent>
                </MessageScrollerViewport>
                <MessageScrollerButton />
              </MessageScroller>
            </MessageScrollerProvider>
          </CardContent>
          <CardFooter>
            <form onSubmit={send} className="w-full">
              <InputGroup>
                <InputGroupTextarea
                  placeholder="No more questions in this demo"
                  className="h-10 min-h-10"
                  value={busy || !next ? "" : next[0]}
                  readOnly
                />
                <InputGroupAddon align="block-end" className="p-2">
                  <InputGroupButton variant="default" size="icon-sm" type="submit" disabled={!next || busy} className="ml-auto">
                    <ArrowUpIcon />
                    <span className="sr-only">Send</span>
                  </InputGroupButton>
                </InputGroupAddon>
              </InputGroup>
            </form>
          </CardFooter>
        </Card>
      </Example>
    </ExampleWrapper>
  )
}
