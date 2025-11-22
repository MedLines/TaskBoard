'use client'

import { CalendarIcon } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

function formatDate(date: Date | undefined) {
  if (!date) {
    return ''
  }

  return date.toLocaleDateString('en-US', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })
}

function formatDateForInput(date: Date | undefined) {
  if (!date) return ''
  return date.toLocaleDateString('en-US', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })
}

function formatDateForZod(date: Date | undefined) {
  if (!date) return ''
  const yyyy = date.getFullYear()
  const mm = String(date.getMonth() + 1).padStart(2, '0') // months are 0-indexed
  const dd = String(date.getDate()).padStart(2, '0')
  return `${yyyy}-${mm}-${dd}`
}

function isValidDate(date: Date | undefined) {
  if (!date) {
    return false
  }
  return !isNaN(date.getTime())
}

type DatePickerProps = {
  id: string
  name: string
  defaultValue?: string | undefined
}

const DatePicker = ({ id, name, defaultValue }: DatePickerProps) => {
  const [open, setOpen] = useState(false)
  const [date, setDate] = useState<Date | undefined>(
    defaultValue ? new Date(defaultValue) : new Date()
  )
  const [month, setMonth] = useState<Date | undefined>(date)
  const [value, setValue] = useState(formatDate(date))

  return (
    <div className="relative flex items-center justify-center">
      <Input
        id="date"
        value={value}
        placeholder="June 01, 2025"
        className="pr-10! text-xs! "
        onChange={(e) => {
          const date = new Date(e.target.value)
          setValue(e.target.value)
          if (isValidDate(date)) {
            setDate(date)
            setMonth(date)
          }
        }}
        onKeyDown={(e) => {
          if (e.key === 'ArrowDown') {
            e.preventDefault()
            setOpen(true)
          }
        }}
      />
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild id={id}>
          <Button
            id="date-picker"
            variant="ghost"
            className="absolute top-1/2 right-2 size-6 -translate-y-1/2"
          >
            <CalendarIcon className="size-3.5" />
            <span className="sr-only">Select date</span>
            <input type="hidden" name={name} value={formatDateForZod(date)} />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-auto overflow-hidden p-0"
          align="end"
          alignOffset={-8}
          sideOffset={10}
        >
          <Calendar
            className="rounded-lg border [--cell-size:1.6rem] md:[--cell-size:2.5rem]"
            mode="single"
            selected={date}
            captionLayout="dropdown"
            month={month}
            onMonthChange={setMonth}
            onSelect={(date) => {
              setDate(date)
              setValue(formatDate(date))
              setOpen(false)
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}

export { DatePicker }
