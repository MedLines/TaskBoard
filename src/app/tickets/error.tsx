'use client'

import { Placeholder } from '@/components/placeholder'

export default function Error({ error }: { error: Error }) {
  return <Placeholder label={`Failed to load ticket: ${error.message}`} />
}
