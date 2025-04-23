import { Badge } from '@/components/ui/badge'
import { UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import { ReactNode } from 'react'

export default function AdminLayout({
  children
}: Readonly<{ children: ReactNode }>) {
  return (
    <>
      <Navbar />
      {children}
    </>
  )
}

function Navbar() {
  return (
    <header className='bg-background z-10 flex h-12 shadow'>
      <nav className='container mx-auto flex gap-4 px-8'>
        <div className='mr-auto flex items-center gap-2'>
          <Link className='text-lg hover:underline' href='/admin'>
            Web Dev Simplified
          </Link>
          <Badge>Admin</Badge>
        </div>
        <Link
          className='hover:bg-accent/10 flex items-center px-2'
          href='/admin/courses'
        >
          Courses
        </Link>
        <Link
          className='hover:bg-accent/10 flex items-center px-2'
          href='/admin/products'
        >
          Products
        </Link>
        <Link
          className='hover:bg-accent/10 flex items-center px-2'
          href='/admin/sales'
        >
          Sales
        </Link>
        <div className='size-8 self-center'>
          <UserButton
            appearance={{
              elements: {
                userButtonAvatarBox: { width: '100%', height: '100%' }
              }
            }}
          />
        </div>
      </nav>
    </header>
  )
}
