// Mock data for development/demo purposes
const generateMockComplaints = () => {
  const now = new Date()
  const complaints = [
    {
      _id: '1',
      title: 'Internet Connection Issues in Lab 3',
      description: 'The internet connection in Lab 3 has been very unstable for the past week. It frequently disconnects during online sessions, making it difficult to complete assignments and attend virtual meetings. This is affecting multiple students working in that lab.',
      category: 'Facilities',
      status: 'Pending',
      priority: 'High',
      createdAt: new Date(now - 2 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(now - 2 * 24 * 60 * 60 * 1000).toISOString(),
      user: {
        _id: 'user1',
        name: 'John Smith',
        email: 'john.smith@example.com'
      }
    },
    {
      _id: '2',
      title: 'Mentor Not Responding to Messages',
      description: 'I have sent multiple messages to my assigned mentor over the past two weeks regarding my project progress, but I have not received any response. This is delaying my project timeline and I need guidance on the next steps.',
      category: 'Mentor Issue',
      status: 'In Progress',
      priority: 'Medium',
      createdAt: new Date(now - 5 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(now - 1 * 24 * 60 * 60 * 1000).toISOString(),
      user: {
        _id: 'user2',
        name: 'Sarah Johnson',
        email: 'sarah.j@example.com'
      }
    },
    {
      _id: '3',
      title: 'Task Deadline Extension Request',
      description: 'I would like to request an extension for the current sprint task. I encountered unexpected technical difficulties that required additional research and troubleshooting. I need an extra 3 days to complete the task properly.',
      category: 'Task Issue',
      status: 'Resolved',
      priority: 'Medium',
      createdAt: new Date(now - 10 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(now - 3 * 24 * 60 * 60 * 1000).toISOString(),
      user: {
        _id: 'user3',
        name: 'Michael Chen',
        email: 'michael.chen@example.com'
      }
    },
    {
      _id: '4',
      title: 'Air Conditioning Not Working',
      description: 'The air conditioning unit in the main study area has been completely non-functional for the past 3 days. The room temperature is very uncomfortable, especially during afternoon hours. This is affecting the learning environment.',
      category: 'Facilities',
      status: 'Pending',
      priority: 'Urgent',
      createdAt: new Date(now - 1 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(now - 1 * 24 * 60 * 60 * 1000).toISOString(),
      user: {
        _id: 'user4',
        name: 'Emily Davis',
        email: 'emily.davis@example.com'
      }
    },
    {
      _id: '5',
      title: 'Peer Collaboration Difficulties',
      description: 'I am having trouble collaborating with my team member on the group project. They are not contributing equally and missing scheduled meetings. I have tried to communicate but the situation is not improving.',
      category: 'Peer Issue',
      status: 'In Progress',
      priority: 'High',
      createdAt: new Date(now - 7 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(now - 2 * 24 * 60 * 60 * 1000).toISOString(),
      user: {
        _id: 'user5',
        name: 'David Wilson',
        email: 'david.wilson@example.com'
      }
    },
    {
      _id: '6',
      title: 'Certificate Request Processing',
      description: 'I submitted a request for my course completion certificate two weeks ago, but I have not received any update on the processing status. I need this certificate urgently for job applications.',
      category: 'Administrative',
      status: 'In Progress',
      priority: 'High',
      createdAt: new Date(now - 14 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(now - 4 * 24 * 60 * 60 * 1000).toISOString(),
      user: {
        _id: 'user6',
        name: 'Lisa Anderson',
        email: 'lisa.anderson@example.com'
      }
    },
    {
      _id: '7',
      title: 'Project Feedback Needed',
      description: 'I completed my final project submission last week and would appreciate detailed feedback from my mentor. This will help me understand areas for improvement before the next phase.',
      category: 'Mentor Issue',
      status: 'Resolved',
      priority: 'Low',
      createdAt: new Date(now - 12 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(now - 5 * 24 * 60 * 60 * 1000).toISOString(),
      user: {
        _id: 'user7',
        name: 'Robert Taylor',
        email: 'robert.taylor@example.com'
      }
    },
    {
      _id: '8',
      title: 'Workspace Booking System Not Working',
      description: 'The online workspace booking system has been showing errors when trying to reserve study rooms. The page loads but throws an error when submitting the booking form. This has been happening for 4 days.',
      category: 'Facilities',
      status: 'Pending',
      priority: 'Medium',
      createdAt: new Date(now - 4 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(now - 4 * 24 * 60 * 60 * 1000).toISOString(),
      user: {
        _id: 'user8',
        name: 'Jessica Martinez',
        email: 'jessica.m@example.com'
      }
    },
    {
      _id: '9',
      title: 'Task Requirements Unclear',
      description: 'The requirements for the current sprint task are not clearly defined. The task description is vague and I am unsure about the expected deliverables. Could someone clarify the requirements?',
      category: 'Task Issue',
      status: 'Resolved',
      priority: 'Medium',
      createdAt: new Date(now - 8 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(now - 6 * 24 * 60 * 60 * 1000).toISOString(),
      user: {
        _id: 'user9',
        name: 'James Brown',
        email: 'james.brown@example.com'
      }
    },
    {
      _id: '10',
      title: 'Team Member Not Participating',
      description: 'One of my team members has not been participating in group discussions or completing their assigned tasks. This is affecting our project progress and team morale.',
      category: 'Peer Issue',
      status: 'In Progress',
      priority: 'High',
      createdAt: new Date(now - 6 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(now - 1 * 24 * 60 * 60 * 1000).toISOString(),
      user: {
        _id: 'user10',
        name: 'Amanda White',
        email: 'amanda.white@example.com'
      }
    },
    {
      _id: '11',
      title: 'Mentor Session Scheduling Conflict',
      description: 'I have been trying to schedule a one-on-one session with my mentor, but our available times do not align. The mentor\'s calendar shows limited availability. Could we find an alternative solution?',
      category: 'Mentor Issue',
      status: 'Pending',
      priority: 'Low',
      createdAt: new Date(now - 3 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(now - 3 * 24 * 60 * 60 * 1000).toISOString(),
      user: {
        _id: 'user11',
        name: 'Christopher Lee',
        email: 'chris.lee@example.com'
      }
    },
    {
      _id: '12',
      title: 'Transcript Request Delay',
      description: 'I requested an official transcript three weeks ago for graduate school applications. The deadline for my applications is approaching and I need the transcript urgently.',
      category: 'Administrative',
      status: 'Resolved',
      priority: 'Urgent',
      createdAt: new Date(now - 21 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(now - 2 * 24 * 60 * 60 * 1000).toISOString(),
      user: {
        _id: 'user12',
        name: 'Nicole Garcia',
        email: 'nicole.garcia@example.com'
      }
    }
  ]

  return complaints
}

export const getMockComplaints = () => {
  return generateMockComplaints()
}

export const getMockComplaintById = (id) => {
  const complaints = generateMockComplaints()
  return complaints.find(c => c._id === id) || null
}

