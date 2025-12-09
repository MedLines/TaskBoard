import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

import { TicketStatus } from '../generated/prisma/enums'

// --- Data Definitions ---

const ADMIN_PASSWORD = 'admin@admin.com'
const MED_PASSWORD = 'meddevlines@gmail.com'
const ADMIN_EMAIL = 'admin@admin.com'
const MED_EMAIL = 'meddevlines@gmail.com'

// Helper function to create YYYY-MM-DD date strings
const getISODate = (offsetDays: number = 0) => {
  const date = new Date()
  date.setDate(date.getDate() + offsetDays)
  return date.toISOString().split('T')[0]
}

const finalPasswords: Record<string, string> = {
  [ADMIN_EMAIL]: ADMIN_PASSWORD,
  [MED_EMAIL]: MED_PASSWORD,
}

const usersData = [
  {
    name: 'Admin',
    email: ADMIN_EMAIL,
  },
  {
    name: 'Med',
    email: MED_EMAIL,
  },
]

const ticketsData = [
  {
    title: 'Implement User Profile Feature',
    content: 'The user needs a page to view and edit their name and email.',
    status: TicketStatus.IN_PROGRESS,
    deadline: getISODate(7),
    bounty: 50,
  },
  {
    title: 'Fix Header Authentication Bug',
    content: 'The header flashes stale authentication status upon refresh.',
    status: TicketStatus.DONE,
    deadline: getISODate(0),
    bounty: 10,
  },
  {
    title: 'Design Ticket View UI',
    content:
      'Create a responsive, aesthetically pleasing design for viewing individual ticket details.',
    status: TicketStatus.OPEN,
    deadline: getISODate(14),
    bounty: 40,
  },
]

const commentsData = [
  { content: 'First comment from DB.' },
  { content: 'Second comment from DB.' },
  { content: 'Third comment from DB.' },
]

// --- Seeding Function ---

const seed = async () => {
  const t0 = performance.now()
  console.log('🚀 DB Seed started')

  try {
    // 1. Clean up existing data
    console.log('🧹 Cleaning up existing data...')
    await prisma.comment.deleteMany()
    await prisma.user.deleteMany()
    await prisma.ticket.deleteMany()
    await prisma.session.deleteMany()
    await prisma.account.deleteMany()
    console.log('✅ Cleaned up existing data.')

    // 2. Create users using Better Auth API
    console.log('👥 Creating users...')

    for (const userData of usersData) {
      const password = finalPasswords[userData.email]

      try {
        // Use Better Auth's signUpEmail to ensure proper password hashing
        const result = await auth.api.signUpEmail({
          body: {
            email: userData.email,
            password: password,
            name: userData.name,
          },
        })

        console.log(`✅ Created user: ${userData.email}`)
      } catch (error) {
        console.error(`❌ Failed to create user ${userData.email}:`, error)
        throw error
      }
    }

    // 3. Find users for linking tickets and comments
    console.log('🔍 Finding users...')
    const adminUser = await prisma.user.findUnique({
      where: { email: ADMIN_EMAIL },
    })
    const medUser = await prisma.user.findUnique({
      where: { email: MED_EMAIL },
    })

    if (!adminUser) {
      throw new Error(
        'Admin user not found after creation. Cannot link tickets.'
      )
    }
    if (!medUser) {
      throw new Error(
        'Med user not found after creation. Cannot link comments.'
      )
    }
    console.log(`✅ Found admin user: ${adminUser.id}`)
    console.log(`✅ Found med user: ${medUser.id}`)

    // 4. Create Tickets linked to Admin
    console.log('🎫 Creating tickets...')
    const ticketsWithUser = ticketsData.map((ticket) => ({
      ...ticket,
      userId: adminUser.id,
    }))

    await prisma.ticket.createMany({
      data: ticketsWithUser,
    })
    console.log(`✅ Created ${ticketsData.length} tickets`)

    // 5. Fetch created tickets to get their IDs
    console.log('🔍 Fetching created tickets...')
    const dbTickets = await prisma.ticket.findMany({
      where: { userId: adminUser.id },
      orderBy: { createdAt: 'asc' },
    })
    console.log(`✅ Fetched ${dbTickets.length} tickets`)

    // 6. Create Comments linked to first ticket and Med user
    console.log('💬 Creating comments...')
    await prisma.comment.createMany({
      data: commentsData.map((comment) => ({
        ...comment,
        ticketId: dbTickets[0].id,
        userId: medUser.id,
      })),
    })
    console.log(`✅ Created ${commentsData.length} comments`)

    const t1 = performance.now()
    console.log(`🎉 DB Seed finished successfully in ${(t1 - t0).toFixed(2)}ms`)
    console.log('\n📋 Seed Summary:')
    console.log(`   Users created: ${usersData.length}`)
    console.log(`   Tickets created: ${ticketsData.length}`)
    console.log(`   Comments created: ${commentsData.length}`)
    console.log('\n🔐 Login Credentials:')
    console.log(`   Admin: ${ADMIN_EMAIL} / ${ADMIN_PASSWORD}`)
    console.log(`   Med: ${MED_EMAIL} / ${MED_PASSWORD}`)
  } catch (error) {
    console.error('❌ SEEDING ERROR:', error)
    throw error
  }
}

// --- Execution ---

seed()
  .catch((e) => {
    console.error('❌ Fatal error during seeding:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
    console.log('👋 Disconnected from database')
  })
