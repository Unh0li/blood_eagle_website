const berzerkPhotos = Array.from(
  { length: 92 },
  (_, i) => `/images/berzerk/b-${i + 1}.webp`
);

const reactor4Photos = Array.from(
  { length: 72 },
  (_, i) => `/images/reactor4/rc4-${i + 1}.webp`
);

const corruptionPhotos = Array.from(
  { length: 71 },
  (_, i) => `/images/corruption/c (${i + 1}).jpg`
);

const atdPhotos = Array.from(
  { length: 92 },
  (_, i) => `/images/atd/atd (${i + 1}).jpg`
);

/* datumi so zapisani kot "11 JULY 2026", Date tega vrstnega reda ne razume */
export function parseEventDate(str) {
  return new Date(str.replace(/(\d+)\s+(\w+)\s+(\d+)/, "$2 $1 $3"));
}

export const events = [
   

     {
        id: "atd-2026",
        title: "ARMY OF THE DEAD",
        date: "24 OCTOBER 2026",
        countdownDate: "2026-10-24T20:00:00",
        venue: "PUBLIKA BARKLUB, LJUBLJANA",
        genre: "Industrial",
        lineup: ["SVOX", "URKE", "LINDEX", "NAKOVV", "TERROR"],
        timetable:  [{ },
            { time: "22:00 - 00:00", act: "SVOX" },
            { time: "00:00 - 01:30", act: "URKE" },
            { time: "01:30 - 02:30", act: "LINDEX" },
            { time: "01:30 - 03:00", act: "TERROR" },
             { time: "03:00 - END", act: "NAKOVV" },

        ],
        photos: atdPhotos,
        ticketUrl: "",
    },

    {
        id: "corruption-2026",
        title: "CORRUPTION",
        date: "12 SEPTEMBER 2026",
        countdownDate: "2026-09-12T20:00:00",
        venue: "PUBLIKA BARKLUB, LJUBLJANA",
        genre: "Industrial",
        lineup: ["P4TCH", "BUVE", "R|N|T-13", "VXLR", "TERROR"],
        timetable:  [{ },
            { time: "22:00 - 23:30", act: "TERROR" },
            { time: "23:30 - 01:00", act: "VXLR" },
            { time: "01:00 - 02:30", act: "BUVE" },
            { time: "02:30 - 04:00", act: "P4TCH" },
             { time: "04:00 - END", act: "R|N|T-13" },

        ],
        photos: corruptionPhotos,
        ticketUrl: "",
    },
    {
        id: "berzerk-2026",
        title: "BERZERK",   
        date: "11 JULY 2026",
        countdownDate: "2026-07-11T20:00:00",
        venue: "PUBLIKA BARKLUB, LJUBLJANA",
        genre: "Bochka",
        lineup: ["FOGG", "PLAZ", "ZVITA", "LINDEX B2B TERROR"],
        timetable: [{ time: "20:00 - 22:00", act: "DOORS    " },
            { time: "22:00 - 00:00", act: "ZVITA" },
            { time: "00:00 - 02:00", act: "LINDEX B2B TERROR" },
            { time: "02:00 - 03:30", act: "PLAZ" },
            { time: "03:30 - 05:00", act: "FOGG" },

        ],
        photos: berzerkPhotos,
        ticketUrl: "",
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
        photos: reactor4Photos,
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