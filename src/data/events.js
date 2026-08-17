const berzerkPhotos = Array.from(
  { length: 92 },
  (_, i) => `/images/berzerk/b-${i + 1}.webp`
);

// Event dates are authored as "11 JULY 2026"; Date can't parse that order.
export function parseEventDate(str) {
  return new Date(str.replace(/(\d+)\s+(\w+)\s+(\d+)/, "$2 $1 $3"));
}

export const events = [
    {
        id: "berzerk-2026",
        title: "BERZERK",
        date: "11 JULY 2026",
        // Doors time, edited by hand per event. Drives the countdown on both
        // the home page and /events. Omit it and no countdown is shown.
        countdownDate: "2026-07-11T20:00:00",
        venue: "PUBLIKA BARKLUB, LJUBLJANA",
        genre: "Bochka",
        lineup: ["FOGG", "PLAZ", "ZVITA", "LINDEX B2B TERROR"],
        timetable: [{
            act: "Doors",
            time: "20:00"
        }

        ],
        photos: berzerkPhotos,
        ticketUrl: "https://www.entrio.si/en/event/blood-eagle-berzerk-33006",
    },
    {
        id: "reactor4-2026",
        title: "REACTOR 4",
        date: "17 APRIL 2026",
        venue: "PUBLIKA BARKLUB, LJUBLJANA",
        genre: "Industrial Techno",
        lineup: ["SCAPEGHXST", "TERROR", "SBTMX", "LINDEX", "PLAZ"],
        timetable: [
            { time: "22:00 - 23:30", act: "TERROR" },
            { time: "23:30 - 01:00", act: "SBTMX" },
            { time: "01:00 - 02:30", act: "LINDEX" },
            { time: "02:30 - 04:00", act: "SCAPEGHXST" },
            { time: "04:00 - END", act: "PLAZ" },

        ],
        photos: [],
        ticketUrl: "",
    },
    {
        id: "naglfar-2026",
        title: "NAGLFAR",
        date: "31 JANUARY 2026",
        venue: "PUBLIKA BARKLUB, LJUBLJANA",
        genre: "Industrial / Raw Techno",
        lineup: [],
        timetable: [],
        photos: [],
        ticketUrl: "",
    },
    {
        id: "myrkrun-2025",
        title: "MYRKRÚN",
        date: "29 NOVEMBER 2025",
        venue: "PUBLIKA BARKLUB, LJUBLJANA",
        genre: "Industrial Techno",
        lineup: [],
        timetable: [],
        photos: [],
        ticketUrl: "",
    },
    {
        id: "slaughterhouse-2025",
        title: "SLAUGHTERHOUSE",
        date: "6 SEPTEMBER 2025",
        venue: "PUBLIKA BARKLUB, LJUBLJANA",
        genre: "Industrial / Hard Techno",
        lineup: [],
        timetable: [],
        photos: [
           
        ],
        ticketUrl: "",
    },
    {
        id: "first-flight-2024",
        title: "FIRST FLIGHT",
        date: "13 DECEMBER 2024",
        venue: "KOČA PRI KORITU",
        genre: "Industrial Techno",
        lineup: [],
        timetable: [],
        photos: [
           
        ],
        ticketUrl: "",
    },
];