"use client"

import { useLanguage } from "@/components/language-provider"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { useTranslation } from "@/lib/translations"

interface LanguageToggleProps {
  onEnterButton?: () => void
  onLeaveButton?: () => void
}

export function LanguageToggle({
  onEnterButton,
  onLeaveButton,
}: LanguageToggleProps) {
  const { language, setLanguage } = useLanguage()
  const { t } = useTranslation()

  return (
    <ToggleGroup
      type="single"
      value={language}
      onValueChange={(value) => {
        if (value) setLanguage(value as "en" | "hi")
      }}
      className="rounded-lg bg-white/10 p-0.5 text-sm"
    >
      <ToggleGroupItem
        value="en"
        onMouseEnter={onEnterButton}
        onMouseLeave={onLeaveButton}
        className="px-3 py-1 font-medium"
      >
        {String(t('english'))}
      </ToggleGroupItem>
      <ToggleGroupItem
        value="hi"
        onMouseEnter={onEnterButton}
        onMouseLeave={onLeaveButton}
        className="px-3 py-1 font-medium"
      >
        {String(t('hindi'))}
      </ToggleGroupItem>
    </ToggleGroup>
  )
}