import { Card } from '@/components/ui/card'
import NewProjectForm from '@/components/projects/NewProjectForm'

export default function NewProjectPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">New Project</h1>
        <p className="mt-2 text-sm text-gray-700">
          Create a new project to start tracking your website's SEO performance
        </p>
      </div>

      <Card className="max-w-2xl">
        <div className="p-6">
          <NewProjectForm />
        </div>
      </Card>
    </div>
  )
}
