"use client"
// Kronos demo for Trace (the official example needs a live AI backend).

import { CheckIcon, CircleAlertIcon, DatabaseIcon, FileSearchIcon } from "lucide-react"

import { Spinner } from "@/components/ui/spinner"
import {
  Trace,
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
  TraceDescription,
  TraceIcon,
  TraceLine,
  TraceTitle,
} from "@/components/ui/trace"
import { Example, ExampleWrapper } from "@/components/design-system/example"

export default function TraceExample() {
  return (
    <ExampleWrapper>
      <Example title="Steps">
        <Trace>
          <div>
            <TraceLine>
              <TraceIcon><DatabaseIcon /></TraceIcon>
              <TraceTitle>Loaded 34 processes</TraceTitle>
              <TraceDescription>0.2s</TraceDescription>
            </TraceLine>
          </div>
          <div>
            <TraceLine>
              <TraceIcon><CheckIcon /></TraceIcon>
              <TraceTitle>Grouped by status</TraceTitle>
              <TraceDescription>0.1s</TraceDescription>
            </TraceLine>
          </div>
          <div>
            <TraceLine status="running">
              <TraceIcon><Spinner /></TraceIcon>
              <TraceTitle>Checking expiring certificates</TraceTitle>
            </TraceLine>
          </div>
          <div>
            <TraceLine status="pending">
              <TraceIcon><FileSearchIcon /></TraceIcon>
              <TraceTitle>Write the weekly summary</TraceTitle>
            </TraceLine>
          </div>
        </Trace>
      </Example>

      <Example title="Collapsible details and errors">
        <Trace>
          <TraceCollapsible defaultOpen>
            <TraceCollapsibleTrigger>
              <TraceLine>
                <TraceTitle>Read attendance for week 46</TraceTitle>
                <TraceDescription>1.4s</TraceDescription>
              </TraceLine>
            </TraceCollapsibleTrigger>
            <TraceCollapsibleContent>
              108 clock-ins on the last working day, 9 people out, 2 late arrivals.
            </TraceCollapsibleContent>
          </TraceCollapsible>
          <div>
            <TraceLine status="error">
              <TraceIcon><CircleAlertIcon /></TraceIcon>
              <TraceTitle>Client data missing for P-2026-029</TraceTitle>
            </TraceLine>
          </div>
        </Trace>
      </Example>
    </ExampleWrapper>
  )
}
