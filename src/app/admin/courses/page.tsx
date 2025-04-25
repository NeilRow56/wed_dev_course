import { PageHeader } from '@/components/shared/page-header'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

export default function CoursesPage() {
  return (
    <div className='container mx-auto my-6 px-8'>
      <PageHeader title='Courses'>
        <Button asChild>
          <Link href='/admin/courses/new'>New Course</Link>
        </Button>
      </PageHeader>
      <div>Course Table</div>
    </div>
  )
}
