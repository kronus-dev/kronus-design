"use client"
// Kronos demo for Direction (shadcn has no official example for it).

import { DirectionProvider } from "@/components/ui/direction"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Example, ExampleWrapper } from "@/components/design-system/example"

export default function DirectionExample() {
  return (
    <ExampleWrapper>
      <Example title="Left to right (default)">
        <DirectionProvider direction="ltr">
          <div dir="ltr" className="flex w-full flex-col gap-4">
            <Slider defaultValue={[30]} />
            <Button>Continue</Button>
          </div>
        </DirectionProvider>
      </Example>
      <Example title="Right to left">
        <DirectionProvider direction="rtl">
          <div dir="rtl" className="flex w-full flex-col gap-4">
            <Slider defaultValue={[30]} />
            <Button>متابعة</Button>
          </div>
        </DirectionProvider>
      </Example>
    </ExampleWrapper>
  )
}
