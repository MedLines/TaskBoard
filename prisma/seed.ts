import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { TicketStatus } from '../generated/prisma/enums'

// --- Data Definitions ---

const USERS = [
  {
    name: 'Alice Admin',
    email: 'admin@admin.com',
    password: 'admin@admin.com',
  },
  {
    name: 'Bob Dev',
    email: 'Bob@Dev.com',
    password: 'Bob@Dev.com',
  },
  {
    name: 'Charlie Designer',
    email: 'charlie@demo.com',
    password: 'charlie@demo.com',
  },
]

// Frontend-focused tickets
const TICKETS = [
  {
    title: 'Fix Navbar Responsiveness',
    content: 'Menu items overlap with the logo on mobile screens (< 768px).',
    status: TicketStatus.IN_PROGRESS,
    bounty: 50,
    deadlineOffset: 2,
  },
  {
    title: 'Update Primary Button Styles',
    content: 'Change the CTA button color to the new brand blue #007AFF.',
    status: TicketStatus.OPEN,
    bounty: 20,
    deadlineOffset: 5,
  },
  {
    title: 'Add Loading Spinner',
    content: 'Show a loading state when fetching dashboard data to improve UX.',
    status: TicketStatus.DONE,
    bounty: 30,
    deadlineOffset: 0,
  },
  {
    title: 'Optimize Hero Image',
    content: 'Convert hero image to WebP and implement lazy loading.',
    status: TicketStatus.OPEN,
    bounty: 40,
    deadlineOffset: 7,
  },
  {
    title: 'Implement Dark Mode Toggle',
    content:
      'Add a switch in the settings to toggle between light and dark themes.',
    status: TicketStatus.IN_PROGRESS,
    bounty: 80,
    deadlineOffset: 10,
  },
]

const COMMENTS = [
  'Great idea, will pick this up.',
  'I noticed this too, thanks for flagging.',
  'Fixed in the latest commit.',
  'Can we discuss the design for this?',
  'Looks good to me!',
  'Deployment successful.',
  'Please review my PR.',
  'Adding this to the sprint.',
  'Nice catch!',
  'I think we should prioritize this.',
  'Is this blocking the release?',
  'Can you provide more details?',
  'Working on it now.',
  'This is a duplicate of ticket #42.',
  'Merged into main.',
]

// Helper function to create YYYY-MM-DD date strings
const getISODate = (offsetDays: number = 0) => {
  const date = new Date()
  date.setDate(date.getDate() + offsetDays)
  return date.toISOString().split('T')[0]
}

// --- Seeding Function ---

const seed = async () => {
  const t0 = performance.now()
  console.log('🚀 DB Seed started')

  try {
    // 1. Clean up existing data
    console.log('🧹 Cleaning up existing data...')
    await prisma.comment.deleteMany()
    await prisma.ticket.deleteMany()
    await prisma.user.deleteMany()
    await prisma.session.deleteMany()
    await prisma.account.deleteMany()
    console.log('✅ Cleaned up existing data.')

    // 2. Create users
    console.log('👥 Creating users...')
    const createdUsers = []

    for (const userData of USERS) {
      try {
        const result = await auth.api.signUpEmail({
          body: {
            email: userData.email,
            password: userData.password,
            name: userData.name,
          },
        })

        // Fetch the user back from Prisma to get the ID properly
        const dbUser = await prisma.user.findUnique({
          where: { email: userData.email },
        })
        if (dbUser) {
          createdUsers.push(dbUser)
          console.log(`✅ Created user: ${userData.email}`)
        }
      } catch (error) {
        console.error(`❌ Failed to create user ${userData.email}:`, error)
      }
    }

    if (createdUsers.length === 0) {
      throw new Error('No users created. Aborting.')
    }

    // 3. Create Tickets and Comments
    console.log('🎫 Creating tickets and comments...')

    for (let i = 0; i < TICKETS.length; i++) {
      const ticketData = TICKETS[i]
      // Rotate ticket ownership among users
      const ticketOwner = createdUsers[i % createdUsers.length]

      const ticket = await prisma.ticket.create({
        data: {
          title: ticketData.title,
          content: ticketData.content,
          status: ticketData.status,
          bounty: ticketData.bounty,
          deadline: getISODate(ticketData.deadlineOffset),
          userId: ticketOwner.id,
        },
      })

      // Determine comment count: 10 for first and last ticket (hot topics), 3 for others
      const commentCount = i === 0 || i === TICKETS.length - 1 ? 10 : 3

      console.log(
        `   + Ticket "${ticket.title}" created. Adding ${commentCount} comments...`
      )

      for (let j = 0; j < commentCount; j++) {
        // Pick a random user for the comment (different from owner if possible)
        const commenter = createdUsers[(i + j + 1) % createdUsers.length]
        const commentText = COMMENTS[(i * 3 + j) % COMMENTS.length]

        await prisma.comment.create({
          data: {
            content: commentText,
            ticketId: ticket.id,
            userId: commenter.id,
          },
        })
      }
    }

    const t1 = performance.now()
    console.log(`🎉 DB Seed finished successfully in ${(t1 - t0).toFixed(2)}ms`)
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
  })
