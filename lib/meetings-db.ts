import type { SacramentMeeting } from "./types";

const meetings: SacramentMeeting[] = [
  {
    id: 1,
    date: '2026-05-03',
    meetingType: 'regular',
    presiding: 'Bishop Smith',
    conducting: 'Brother Jones',
    announcements: ['Ward temple night: May 10'],
    openingHymn: {
      number: 2,
      title: 'The Spirit of God',
    },
    openingPrayer: 'Sister Williams',
    wardBusiness: [
      {
        description: 'Sustaining of new Primary president',
      },
    ],
    stakeBusiness: false,
    sacramentHymn: {
      number: 169,
      title: 'In Remembrance of Thy Suffering',
    },
    speakers: [
      {
        name: 'Sister Brown',
        topic: 'Faith in Jesus Christ',
        type: 'speaker',
      },
      {
        name: 'Youth Choir',
        topic: '',
        type: 'musical-number',
      },
    ],
    closingHymn: {
      number: 31,
      title: 'O God, Our Help in Ages Past',
    },
    closingPrayer: 'Brother Davis',
  },

  {
    id: 2,
    date: '2026-05-10',
    meetingType: 'testimony',
    presiding: 'Bishop Smith',
    conducting: 'Sister Garcia',
    announcements: ['Youth activity this Friday'],
    openingHymn: {
      number: 85,
      title: 'How Firm a Foundation',
    },
    openingPrayer: 'Brother Lopez',
    wardBusiness: [],
    stakeBusiness: false,
    sacramentHymn: {
      number: 169,
      title: 'In Remembrance of Thy Suffering',
    },
    speakers: [],
    closingHymn: {
      number: 89,
      title: 'The Lord Is My Shepherd',
    },
    closingPrayer: 'Sister Martinez',
  },

  {
    id: 3,
    date: '2026-09-13',
    meetingType: 'stake',
    presiding: 'Stake President Johnson',
    conducting: 'Brother Miller',
    announcements: ['Stake conference next month'],
    openingHymn: {
      number: 3,
      title: 'Now We Sing',
    },
    openingPrayer: 'Sister Anderson',
    wardBusiness: [],
    stakeBusiness: true,
    sacramentHymn: {
      number: 175,
      title: 'O God, the Eternal Father',
    },
    speakers: [
      {
        name: 'Elder Williams',
        topic: 'Strengthening Families',
        type: 'speaker',
      },
      {
        name: 'Sister Taylor',
        topic: 'Serving Others',
        type: 'speaker',
      },
    ],
    closingHymn: {
      number: 219,
      title: 'Because I Have Been Given Much',
    },
    closingPrayer: 'Brother Davis',
  },

  {
    id: 4,
    date: '2026-05-24',
    meetingType: 'general',
    presiding: 'Bishop Smith',
    conducting: 'Brother Jones',
    announcements: ['Memorial Day activity'],
    openingHymn: {
      number: 96,
      title: 'Dearest Children, God Is Near You',
    },
    openingPrayer: 'Sister Brown',
    wardBusiness: [
      {
        description: 'Annual ward activity announcement',
      },
    ],
    stakeBusiness: false,
    sacramentHymn: {
      number: 181,
      title: 'Jesus of Nazareth, Savior and King',
    },
    speakers: [
      {
        name: 'Brother Wilson',
        topic: 'Following the Savior',
        type: 'speaker',
      },
    ],
    closingHymn: {
      number: 227,
      title: 'There Is Sunshine in My Soul Today',
    },
    closingPrayer: 'Sister Garcia',
  },

  {
    id: 5,
    date: '2026-05-31',
    meetingType: 'regular',
    presiding: 'Bishop Smith',
    conducting: 'Sister Garcia',
    announcements: ['Temple preparation meeting'],
    openingHymn: {
      number: 64,
      title: 'On This Day of Joy and Gladness',
    },
    openingPrayer: 'Brother Lopez',
    wardBusiness: [],
    stakeBusiness: false,
    sacramentHymn: {
      number: 194,
      title: 'There Is a Green Hill Far Away',
    },
    speakers: [
      {
        name: 'Sister Martinez',
        topic: 'The Power of Prayer',
        type: 'speaker',
      },
      {
        name: 'Brother Anderson',
        topic: 'Faith and Patience',
        type: 'speaker',
      },
    ],
    closingHymn: {
      number: 143,
      title: 'Let the Holy Spirit Guide',
    },
    closingPrayer: 'Brother Miller',
  },
];

//export function getMeetings() {
//  return meetings;
//}
export function getMeetings(date?: string | null): SacramentMeeting[] {
  if (date) return meetings.filter((meeting) => meeting.date === date);

  return meetings;
}

export function getMeetingById(id: number) {
  return meetings.find((meeting) => meeting.id === id) ?? null;
}