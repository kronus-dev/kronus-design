"use client"
// Kronos demo for Message (the official example needs a live AI backend).

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Bubble, BubbleContent, BubbleReactions } from "@/components/ui/bubble"
import { Marker, MarkerContent, MarkerIcon } from "@/components/ui/marker"
import {
  Message,
  MessageAvatar,
  MessageContent,
  MessageFooter,
  MessageGroup,
  MessageHeader,
} from "@/components/ui/message"
import { Spinner } from "@/components/ui/spinner"
import { Example, ExampleWrapper } from "@/components/design-system/example"

export default function MessageExample() {
  return (
    <ExampleWrapper>
      <Example title="Conversation">
        <MessageGroup className="w-full">
          <Message>
            <MessageAvatar>
              <Avatar size="sm"><AvatarFallback>AF</AvatarFallback></Avatar>
            </MessageAvatar>
            <MessageContent>
              <MessageHeader>Ana Ferreira</MessageHeader>
              <Bubble variant="muted">
                <BubbleContent>Can someone confirm the crew for P-2026-031 next week?</BubbleContent>
              </Bubble>
            </MessageContent>
          </Message>
          <Message align="end">
            <MessageContent>
              <Bubble>
                <BubbleContent>Confirmed: Bruno and Carla are on site from Monday.</BubbleContent>
              </Bubble>
              <MessageFooter>Read 09:42</MessageFooter>
            </MessageContent>
          </Message>
        </MessageGroup>
      </Example>

      <Example title="Variants">
        <MessageGroup className="w-full">
          {(["default", "secondary", "muted", "tinted", "outline", "destructive"] as const).map((variant) => (
            <Message key={variant}>
              <MessageContent>
                <Bubble variant={variant}>
                  <BubbleContent>{variant} bubble</BubbleContent>
                </Bubble>
              </MessageContent>
            </Message>
          ))}
        </MessageGroup>
      </Example>

      <Example title="Reactions">
        <Message>
          <MessageContent>
            <Bubble variant="muted" className="mb-4">
              <BubbleContent>Timesheets for week 46 are approved.</BubbleContent>
              <BubbleReactions>👍 3</BubbleReactions>
            </Bubble>
          </MessageContent>
        </Message>
      </Example>

      <Example title="Status marker">
        <Marker role="status">
          <MarkerIcon><Spinner /></MarkerIcon>
          <MarkerContent>Checking certificates…</MarkerContent>
        </Marker>
      </Example>
    </ExampleWrapper>
  )
}
