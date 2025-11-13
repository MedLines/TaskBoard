import { LucideLoaderCircle } from 'lucide-react'

const Spinner = () => {
  return (
    <div className="flex-1 flex items-center justify-center">
      <LucideLoaderCircle className="h-16 w-16 animate-spin" />
    </div>
  )
}
export { Spinner }
