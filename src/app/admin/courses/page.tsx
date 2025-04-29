import { PageHeader } from '@/components/shared/page-header'
import { Button } from '@/components/ui/button'
import { db } from '@/drizzle'
import { CourseTable } from '@/features/courses/components/course-table'
import {
  CourseSectionTable,
  CourseTable as DbCourseTable,
  LessonTable,
  UserCourseAccessTable
} from '@/drizzle/schema'
import { getCourseGlobalTag } from '@/features/courses/db/cache/courses'
import { cacheTag } from 'next/dist/server/use-cache/cache-tag'
import Link from 'next/link'
import React from 'react'
import { asc, countDistinct, eq } from 'drizzle-orm'

export default async function CoursesPage() {
  const courses = await getCourses()
  // const courses = [
  //   {
  //     id: '1',
  //     name: 'Maths',
  //     sectionsCount: 5,
  //     lessonsCount: 6,
  //     studentsCount: 25
  //   },
  //   {
  //     id: '2',
  //     name: 'Geography',
  //     sectionsCount: 2,
  //     lessonsCount: 4,
  //     studentsCount: 12
  //   }
  // ]
  return (
    <div className='container mx-auto my-6 px-8'>
      <PageHeader title='Courses'>
        <Button asChild>
          <Link href='/admin/courses/new'>New Course</Link>
        </Button>
      </PageHeader>
      <div>
        <CourseTable courses={courses} />
      </div>
    </div>
  )
}

async function getCourses() {
  'use cache'
  cacheTag(getCourseGlobalTag())
  // Because we already have a component names Course Table we have renamed import of the drizzle schems named CourseTable to DbCourseTable
  return db
    .select({
      id: DbCourseTable.id,
      name: DbCourseTable.name,
      sectionsCount: countDistinct(CourseSectionTable),
      lessonsCount: countDistinct(LessonTable),
      studentsCount: countDistinct(UserCourseAccessTable)
    })
    .from(DbCourseTable)
    .leftJoin(
      CourseSectionTable,
      eq(CourseSectionTable.courseId, DbCourseTable.id)
    )
    .leftJoin(LessonTable, eq(LessonTable.sectionId, CourseSectionTable.id))
    .leftJoin(
      UserCourseAccessTable,
      eq(UserCourseAccessTable.courseId, DbCourseTable.id)
    )
    .orderBy(asc(DbCourseTable.name))
    .groupBy(DbCourseTable.id)
}
