import { DocumentCategory, EventStatus, InsightCategory, LeadStatus, PrismaClient, TeamStatus } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Clear tables
  await prisma.$executeRaw`TRUNCATE TABLE 
    "draft_app"."Event", 
    "draft_app"."EventToUser", 
    "draft_app"."Insight", 
    "draft_app"."InsightsOnLeads", 
    "draft_app"."Job", 
    "draft_app"."Lead",
    "draft_app"."Message",
    "draft_app"."Note",
    "draft_app"."Role",
    "draft_app"."Team",
    "draft_app"."User",
    "draft_app"."UserToTeam",
    "draft_app"."Address",
    "draft_app"."Chat", 
    "draft_app"."Company", 
    "draft_app"."Document"
    RESTART IDENTITY CASCADE;`;

  // Seed Roles
  const roles = [{ name: 'Admin' }, { name: 'User' }];
  const createdRoles = await prisma.role.createMany({ data: roles });

  // Seed Jobs
  const jobs = [{ name: 'Software Engineer' }, { name: 'Product Manager' }];
  const createdJobs = await prisma.job.createMany({ data: jobs });

  // Seed Companies
  const companies = [{ name: 'TechCorp' }, { name: 'InnovateInc' }];
  const createdCompanies = await prisma.company.createMany({ data: companies });

  // Seed Addresses
  const address1 = await prisma.address.create({
    data: {
      country: 'USA',
      city: 'New York',
      venue: 'TechCorp HQ',
      venueAddress: '123 Tech Lane',
      number: 101,
    },
  });

  const address2 = await prisma.address.create({
    data: {
      country: 'Canada',
      city: 'Toronto',
      venue: 'InnovateInc Office',
      venueAddress: '456 Innovation Street',
      number: 202,
    },
  });

  // Seed Users
  const createdUsers = await prisma.user.createMany({
    data: [
      {
        email: 'admin@techcorp.com',
        password: 'securepassword',
        roleName: 'Admin',
        firstname: 'John',
        lastname: 'Doe',
        jobName: 'Software Engineer',
        companyName: 'TechCorp',
        profileIsActivated: true,
        linkedinLink: 'https://linkedin.com/in/johndoe',
        calendlyLink: 'https://calendly.com/johndoe',
        addressId: address1.id,
      },
      {
        email: 'user@innovateinc.com',
        password: 'securepassword',
        roleName: 'User',
        firstname: 'Jane',
        lastname: 'Smith',
        jobName: 'Product Manager',
        companyName: 'InnovateInc',
        profileIsActivated: false,
        linkedinLink: 'https://linkedin.com/in/janesmith',
        calendlyLink: 'https://calendly.com/janesmith',
        addressId: address2.id,
      },
    ],
  });

  // Seed Teams
  const createdTeams = await prisma.team.createMany({
    data: [
      { name: 'Development', status: TeamStatus.active },
      { name: 'Marketing', status: TeamStatus.inactive },
    ],
  });

  // Seed Leads
  const createdLeads = await prisma.lead.createMany({
    data: [
      {
        firstname: 'Alice',
        lastname: 'Johnson',
        jobName: 'Designer',
        companyName: 'Creatives Inc',
        countryName: 'USA',
        email: 'alice@creatives.com',
        status: LeadStatus.created,
      },
      {
        firstname: 'Bob',
        lastname: 'Brown',
        jobName: 'Analyst',
        companyName: 'DataWorks',
        countryName: 'UK',
        email: 'bob@dataworks.com',
        status: LeadStatus.hot,
      },
    ],
  });

  // Seed Insights
  const createdInsights = await prisma.insight.createMany({
    data: [
      { title: 'Meeting Recap', Description: 'Summary of Q4 planning.', type: InsightCategory.activities },
      { title: 'Key Notes', Description: 'Important client requests.', type: InsightCategory.notes },
    ],
  });

  // Seed Events
  const createdEvents = await prisma.event.createMany({
    data: [
      {
        title: 'Annual Tech Meetup',
        orginizer: 'TechCorp',
        startDate: new Date('2025-05-20'),
        finishDate: new Date('2025-05-22'),
        status: EventStatus.init,
      },
      {
        title: 'Marketing Strategies 2025',
        orginizer: 'InnovateInc',
        startDate: new Date('2025-06-15'),
        finishDate: new Date('2025-06-16'),
        status: EventStatus.inprocess,
      },
    ],
  });

  // Seed Notes
  const createdNotes = await prisma.note.createMany({
    data: [
      { descripiton: 'Follow up with client', authorId: 1 },
      { descripiton: 'Prepare presentation slides', authorId: 2 },
    ],
  });

  // Seed Documents
  const createdDocuments = await prisma.document.createMany({
    data: [
      {
        link: 'https://example.com/document1.pdf',
        documentType: DocumentCategory.pdf,
      },
      {
        link: 'https://example.com/document2.csv',
        documentType: DocumentCategory.csv,
      },
    ],
  });

  // Seed Chats
  const chat1 = await prisma.chat.create({
    data: {
      title: 'Project Discussion',
      userId: 1,
    },
  });

  const chat2 = await prisma.chat.create({
    data: {
      title: 'Team Collaboration',
      userId: 2,
    },
  });

  // Seed Messages
  const createdMessages = await prisma.message.createMany({
    data: [
      {
        message: 'Hello team!',
        chatId: chat1.id,
        documentId: null,
      },
      {
        message: 'Let’s finalize the report.',
        chatId: chat2.id,
        documentId: null,
      },
    ],
  });

  console.log('Database seeded successfully:', {
    createdRoles,
    createdJobs,
    createdCompanies,
    addresses: [address1, address2],
    createdUsers,
    createdTeams,
    createdLeads,
    createdInsights,
    createdEvents,
    createdNotes,
    createdDocuments,
    chats: [chat1, chat2],
    createdMessages,
  });
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
