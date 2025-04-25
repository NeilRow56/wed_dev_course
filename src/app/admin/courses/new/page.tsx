import { PageHeader } from '@/components/shared/page-header'
import { CourseForm } from '@/features/courses/components/course-form'

export default function NewCoursePage() {
  return (
    <div className='container mx-auto my-6'>
      <div className='mx-auto max-w-[700px]'>
        <PageHeader title='New Course' />
        <CourseForm />
      </div>
    </div>
  )
}
