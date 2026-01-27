import initiative1 from "@/assets/initiative-1.jpg";
import initiative2 from "@/assets/initiative-2.jpg";
import initiative3 from "@/assets/initiative-3.jpg";

export interface Initiative {
  id: number;
  slug: string;
  title: string;
  category: string;
  description: string;
  fullDescription: string;
  content: string;
  stats: {
    label: string;
    value: string;
  }[];
  image: string;
  color: string;
}

export const initiatives: Initiative[] = [
  {
    id: 1,
    slug: "watching-the-vote",
    title: "Watching The Vote",
    category: "Election Monitoring",
    description: "Nigeria's largest citizen-led election observation initiative, deploying technology and trained observers to monitor elections in real-time. Using Parallel Vote Tabulation (PVT) methodology, we provide independent verification of election results.",
    fullDescription: "Watching The Vote (WTV) represents a groundbreaking approach to citizen-led election observation in Nigeria. Through innovative use of technology and rigorous training of observers, we have established a robust system for monitoring electoral processes across all 36 states and the FCT.",
    content: `## About Watching The Vote

Watching The Vote (WTV) is Nigeria's premier citizen-led election observation initiative. Since its inception, WTV has deployed tens of thousands of trained observers to monitor electoral processes across Nigeria, providing independent verification of election results through Parallel Vote Tabulation (PVT) methodology.

## Our Methodology

### Parallel Vote Tabulation (PVT)
PVT is a proven methodology that allows citizen observers to independently verify the accuracy of official election results. By statistically sampling polling units and collecting data in real-time, we can:

- Verify the accuracy of announced results
- Identify irregularities in the electoral process
- Provide evidence-based assessments of election credibility
- Hold electoral authorities accountable

### Technology-Enabled Observation
Our observers use mobile technology to report directly from polling units, enabling:
- Real-time incident reporting
- Immediate data collection and analysis
- Geographic visualization of electoral issues
- Rapid response to emerging problems

## Impact and Achievements

Over the years, Watching The Vote has:
- Deployed over 10,000 observers across Nigeria
- Monitored elections in all 36 states and the FCT
- Published detailed reports on electoral integrity
- Advocated successfully for electoral reforms
- Built capacity for citizen-led observation across Africa

## Get Involved

You can support Watching The Vote by:
- Volunteering as an observer
- Contributing to our training programs
- Sharing our reports and findings
- Advocating for electoral integrity

Together, we can ensure that every vote counts and is counted.`,
    stats: [
      { label: "Observers Deployed", value: "10,000+" },
      { label: "Polling Units", value: "25,000+" },
      { label: "Elections Monitored", value: "50+" },
      { label: "States Covered", value: "36" },
    ],
    image: initiative1,
    color: "primary",
  },
  {
    id: 2,
    slug: "ready-to-run",
    title: "Ready To Run",
    category: "Youth Leadership",
    description: "Empowering young people, especially women, with the skills and knowledge to run for political office and assume leadership positions in government and civil society.",
    fullDescription: "Ready To Run is a comprehensive leadership development program designed to prepare young Nigerians for political participation and public service. The program combines theoretical learning with practical skills development.",
    content: `## About Ready To Run

Ready To Run is Yiaga Africa's flagship youth leadership development program. Designed to prepare young Nigerians for political participation and public service, the program combines intensive training with mentorship and ongoing support.

## Program Components

### Leadership Training
Our intensive training modules cover:
- Campaign planning and management
- Public speaking and communication
- Policy analysis and development
- Fundraising and resource mobilization
- Media relations and digital campaigning

### Mentorship
Participants are matched with experienced political leaders and public servants who provide:
- Guidance on navigating political systems
- Support in campaign development
- Networking opportunities
- Ongoing career advice

### Practical Experience
Participants gain hands-on experience through:
- Mock campaigns and debates
- Policy development exercises
- Community engagement projects
- Internships with elected officials

## Who Can Participate?

Ready To Run welcomes:
- Young people aged 18-40
- Aspiring political candidates
- Civil society leaders
- Civic activists and advocates

We particularly encourage women and underrepresented groups to apply.

## Success Stories

Our alumni have gone on to:
- Win elections at local, state, and national levels
- Lead major civil society organizations
- Serve in government positions
- Become influential voices for change

## Apply Today

The next cohort of Ready To Run is accepting applications. Join a community of young leaders committed to transforming Nigeria's political landscape.`,
    stats: [
      { label: "Youth Trained", value: "5,000+" },
      { label: "Women Participants", value: "60%" },
      { label: "Elected Officials", value: "200+" },
      { label: "States Reached", value: "30" },
    ],
    image: initiative2,
    color: "secondary",
  },
  {
    id: 3,
    slug: "not-too-young-to-run",
    title: "Not Too Young To Run",
    category: "Advocacy Campaign",
    description: "A successful campaign that led to constitutional amendment reducing the age for running for political office in Nigeria, making democracy more inclusive for young people.",
    fullDescription: "The Not Too Young To Run campaign represents one of the most successful youth-led advocacy initiatives in Nigeria's history. This movement galvanized young people across the country to demand constitutional reforms that would enable greater youth participation in governance.",
    content: `## About Not Too Young To Run

Not Too Young To Run is a historic advocacy campaign that successfully amended Nigeria's constitution to reduce the age requirements for running for political office. This youth-led movement demonstrated the power of organized advocacy and citizen engagement.

## The Campaign Journey

### The Problem
Before the constitutional amendment, Nigeria had some of Africa's highest age requirements for political office:
- President: 40 years
- Governor: 35 years
- Senator: 35 years
- House of Representatives: 30 years
- State Assembly: 30 years

These restrictions excluded millions of young Nigerians from political participation.

### The Movement
Beginning in 2016, young people across Nigeria organized to demand change:
- Grassroots mobilization in all 36 states
- Social media campaigns reaching millions
- Advocacy with legislators and political leaders
- Coalition building with civil society organizations

### The Victory
In 2018, Nigeria's National Assembly passed the Not Too Young To Run bill, and President Buhari signed it into law, reducing age requirements to:
- President: 35 years
- Governor: 30 years
- Senator: 30 years
- House of Representatives: 25 years
- State Assembly: 25 years

## Global Impact

The success of Not Too Young To Run in Nigeria inspired similar movements across Africa:
- Similar bills introduced in several African countries
- A continental movement for youth political participation
- Recognition as a model for youth-led advocacy

## Continuing the Work

While the constitutional amendment was a major victory, the work continues:
- Supporting young candidates in elections
- Advocating for additional reforms
- Building capacity for youth political participation
- Mentoring the next generation of leaders

## Join the Movement

The Not Too Young To Run movement is still active, working to ensure that constitutional change translates into real political participation for young people. Join us in building a more inclusive democracy.`,
    stats: [
      { label: "Age Reduction", value: "5-10 Years" },
      { label: "Youth Mobilized", value: "100,000+" },
      { label: "Countries Adopted", value: "6+" },
      { label: "Constitutional Amendments", value: "1" },
    ],
    image: initiative3,
    color: "accent",
  },
];

export const getInitiative = (slug: string): Initiative | undefined => {
  return initiatives.find(initiative => initiative.slug === slug);
};
