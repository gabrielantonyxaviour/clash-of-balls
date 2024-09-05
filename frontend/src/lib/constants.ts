import { arbitrumSepolia } from "viem/chains";
import { chilizSpicy, fhenixHelium } from "./config";
import { Game, League, Prediction, Team } from "./type";

export const COINMARKETCAP_IDS: Record<string, number> = {
  eth: 1027,
  chz: 4066,
};

export const LOGOS: Record<string, string> = {
  bar: "https://media.api-sports.io/football/teams/529.png",
  mci: "https://media.api-sports.io/football/teams/50.png",
  inter: "https://media.api-sports.io/football/teams/505.png",
  acm: "https://media.api-sports.io/football/teams/489.png",
  juv: "https://media.api-sports.io/football/teams/496.png",
  psg: "https://media.api-sports.io/football/teams/85.png",
  nap: "https://media.api-sports.io/football/teams/492.png",
  spurs: "https://media.api-sports.io/football/teams/47.png",
  ucl: "https://media.api-sports.io/football/leagues/2.png",
  seriea: "https://media.api-sports.io/football/leagues/135.png",
};

export const leagues: Record<string, League> = {
  ucl: {
    name: "UEFA Champions League",
    abb: "UCL",
    logo: LOGOS.ucl,
  },
  seriea: {
    name: "Serie A",
    abb: "SA",
    logo: LOGOS.seriea,
  },
};

export const teams: Record<string, Team> = {
  bar: {
    name: "FC Barcelona",
    abb: "BAR",
    logo: LOGOS.bar,
    players: [
      {
        player: {
          id: 127,
          name: "M. ter Stegen",
          number: 1,
          pos: "G",
          grid: "1:1",
        },
      },
      {
        player: {
          id: 13073,
          name: "J. Mascherano",
          number: 14,
          pos: "M",
          grid: "2:4",
        },
      },
      {
        player: {
          id: 136,
          name: "Piqué",
          number: 3,
          pos: "D",
          grid: "2:3",
        },
      },
      {
        player: {
          id: 128,
          name: "Jordi Alba",
          number: 18,
          pos: "D",
          grid: "2:2",
        },
      },
      {
        player: {
          id: 139,
          name: "S. Umtiti",
          number: 23,
          pos: "D",
          grid: "2:1",
        },
      },
      {
        player: {
          id: 33243,
          name: "Iniesta",
          number: 8,
          pos: "M",
          grid: "3:3",
        },
      },
      {
        player: {
          id: 149,
          name: "I. Rakitić",
          number: 4,
          pos: "M",
          grid: "3:2",
        },
      },
      {
        player: {
          id: 144,
          name: "Busquets",
          number: 5,
          pos: "M",
          grid: "3:1",
        },
      },
      {
        player: {
          id: 154,
          name: "L. Messi",
          number: 10,
          pos: "F",
          grid: "4:3",
        },
      },
      {
        player: {
          id: 157,
          name: "L. Suárez",
          number: 9,
          pos: "F",
          grid: "4:2",
        },
      },
      {
        player: {
          id: 276,
          name: "Neymar",
          number: 11,
          pos: "F",
          grid: "4:1",
        },
      },
      {
        player: {
          id: 2724,
          name: "L. Digne",
          number: 19,
          pos: "D",
          grid: null,
        },
      },
      {
        player: {
          id: 1480,
          name: "J. Mathieu",
          number: 24,
          pos: "D",
          grid: null,
        },
      },
      {
        player: {
          id: 18765,
          name: "André Gomes",
          number: 21,
          pos: "M",
          grid: null,
        },
      },
      {
        player: {
          id: 49859,
          name: "A. Turan",
          number: 7,
          pos: "M",
          grid: null,
        },
      },
      {
        player: {
          id: 142,
          name: "Rafinha",
          number: 12,
          pos: "M",
          grid: null,
        },
      },
      {
        player: {
          id: 21,
          name: "Paco Alcácer",
          number: 17,
          pos: "F",
          grid: null,
        },
      },
      {
        player: {
          id: 47474,
          name: "Jordi Masip",
          number: 25,
          pos: "G",
          grid: null,
        },
      },
    ],
  },
  mci: {
    name: "Manchester City",
    abb: "MCI",
    logo: LOGOS.mci,
    players: [
      {
        player: {
          id: 614,
          name: "C. Bravo",
          number: 1,
          pos: "G",
          grid: "1:1",
        },
      },
      {
        player: {
          id: 18818,
          name: "P. Zabaleta",
          number: 5,
          pos: "M",
          grid: "2:4",
        },
      },
      {
        player: {
          id: 771,
          name: "A. Kolarov",
          number: 11,
          pos: "D",
          grid: "2:3",
        },
      },
      {
        player: {
          id: 624,
          name: "N. Otamendi",
          number: 30,
          pos: "D",
          grid: "2:2",
        },
      },
      {
        player: {
          id: 626,
          name: "J. Stones",
          number: 24,
          pos: "D",
          grid: "2:1",
        },
      },
      {
        player: {
          id: 634,
          name: "David Silva",
          number: 21,
          pos: "M",
          grid: "3:2",
        },
      },
      {
        player: {
          id: 640,
          name: "Fernandinho",
          number: 25,
          pos: "M",
          grid: "3:1",
        },
      },
      {
        player: {
          id: 633,
          name: "İ. Gündoğan",
          number: 8,
          pos: "M",
          grid: "4:3",
        },
      },
      {
        player: {
          id: 629,
          name: "K. De Bruyne",
          number: 17,
          pos: "M",
          grid: "4:2",
        },
      },
      {
        player: {
          id: 645,
          name: "R. Sterling",
          number: 7,
          pos: "F",
          grid: "4:1",
        },
      },
      {
        player: {
          id: 2058,
          name: "Nolito",
          number: 9,
          pos: "F",
          grid: "5:1",
        },
      },
      {
        player: {
          id: 2275,
          name: "W. Caballero",
          number: 13,
          pos: "G",
          grid: null,
        },
      },
      {
        player: {
          id: 49840,
          name: "G. Clichy",
          number: 22,
          pos: "D",
          grid: null,
        },
      },
      {
        player: {
          id: 642,
          name: "S. Agüero",
          number: 10,
          pos: "F",
          grid: null,
        },
      },
      {
        player: {
          id: 452,
          name: "Fernando",
          number: 6,
          pos: "M",
          grid: null,
        },
      },
      {
        player: {
          id: 2054,
          name: "Jesús Navas",
          number: 15,
          pos: "M",
          grid: null,
        },
      },
      {
        player: {
          id: 644,
          name: "L. Sané",
          number: 19,
          pos: "F",
          grid: null,
        },
      },
      {
        player: {
          id: 26302,
          name: "Pablo Maffeo",
          number: 50,
          pos: "M",
          grid: null,
        },
      },
    ],
  },
  inter: {
    name: "Inter Milan",
    abb: "INT",
    logo: LOGOS.inter,
    players: [
      {
        player: {
          id: 188,
          name: "S. Handanovič",
          number: 1,
          pos: "G",
          grid: "1:1",
        },
      },
      {
        player: {
          id: 887,
          name: "M. Darmian",
          number: 36,
          pos: "M",
          grid: "2:3",
        },
      },
      {
        player: {
          id: 194,
          name: "S. de Vrij",
          number: 6,
          pos: "D",
          grid: "2:2",
        },
      },
      {
        player: {
          id: 198,
          name: "M. Škriniar",
          number: 37,
          pos: "D",
          grid: "2:1",
        },
      },
      {
        player: {
          id: 9,
          name: "A. Hakimi",
          number: 2,
          pos: "M",
          grid: "3:5",
        },
      },
      {
        player: {
          id: 31009,
          name: "A. Bastoni",
          number: 95,
          pos: "D",
          grid: "3:4",
        },
      },
      {
        player: {
          id: 174,
          name: "C. Eriksen",
          number: 24,
          pos: "M",
          grid: "3:3",
        },
      },
      {
        player: {
          id: 201,
          name: "M. Brozović",
          number: 77,
          pos: "M",
          grid: "3:2",
        },
      },
      {
        player: {
          id: 30558,
          name: "N. Barella",
          number: 23,
          pos: "M",
          grid: "3:1",
        },
      },
      {
        player: {
          id: 907,
          name: "R. Lukaku",
          number: 9,
          pos: "F",
          grid: "4:2",
        },
      },
      {
        player: {
          id: 217,
          name: "L. Martínez",
          number: 10,
          pos: "F",
          grid: "4:1",
        },
      },
      {
        player: {
          id: 207,
          name: "I. Perišić",
          number: 14,
          pos: "M",
          grid: null,
        },
      },
      {
        player: {
          id: 30535,
          name: "S. Sensi",
          number: 12,
          pos: "M",
          grid: null,
        },
      },
      {
        player: {
          id: 211,
          name: "M. Vecino",
          number: 8,
          pos: "M",
          grid: null,
        },
      },
      {
        player: {
          id: 203,
          name: "R. Gagliardini",
          number: 5,
          pos: "M",
          grid: null,
        },
      },
      {
        player: {
          id: 894,
          name: "A. Young",
          number: 15,
          pos: "D",
          grid: null,
        },
      },
      {
        player: {
          id: 30765,
          name: "I. Radu",
          number: 97,
          pos: "G",
          grid: null,
        },
      },
      {
        player: {
          id: 189,
          name: "D. Padelli",
          number: 27,
          pos: "G",
          grid: null,
        },
      },
      {
        player: {
          id: 193,
          name: "D. D'Ambrosio",
          number: 33,
          pos: "D",
          grid: null,
        },
      },
      {
        player: {
          id: 31094,
          name: "A. Pinamonti",
          number: 99,
          pos: "F",
          grid: null,
        },
      },
      {
        player: {
          id: 197,
          name: "A. Ranocchia",
          number: 13,
          pos: "D",
          grid: null,
        },
      },
    ],
  },

  juv: {
    name: "Juventus",
    abb: "JUV",
    logo: LOGOS.juv,
    players: [
      {
        player: {
          id: 851,
          name: "W. Szczęsny",
          number: 1,
          pos: "G",
          grid: "1:1",
        },
      },
      {
        player: {
          id: 856,
          name: "G. Chiellini",
          number: 3,
          pos: "D",
          grid: "2:4",
        },
      },
      {
        player: {
          id: 618,
          name: "Danilo",
          number: 13,
          pos: "D",
          grid: "2:3",
        },
      },
      {
        player: {
          id: 860,
          name: "Alex Sandro",
          number: 12,
          pos: "D",
          grid: "2:2",
        },
      },
      {
        player: {
          id: 532,
          name: "M. de Ligt",
          number: 4,
          pos: "D",
          grid: "2:1",
        },
      },
      {
        player: {
          id: 866,
          name: "J. Cuadrado",
          number: 16,
          pos: "M",
          grid: "3:4",
        },
      },
      {
        player: {
          id: 272,
          name: "A. Rabiot",
          number: 25,
          pos: "M",
          grid: "3:3",
        },
      },
      {
        player: {
          id: 863,
          name: "R. Bentancur",
          number: 30,
          pos: "M",
          grid: "3:2",
        },
      },
      {
        player: {
          id: 30435,
          name: "D. Kulusevski",
          number: 44,
          pos: "F",
          grid: "3:1",
        },
      },
      {
        player: {
          id: 874,
          name: "Cristiano Ronaldo",
          number: 7,
          pos: "F",
          grid: "4:2",
        },
      },
      {
        player: {
          id: 30410,
          name: "F. Chiesa",
          number: 22,
          pos: "M",
          grid: "4:1",
        },
      },
      {
        player: {
          id: 415,
          name: "W. McKennie",
          number: 14,
          pos: "M",
          grid: null,
        },
      },
      {
        player: {
          id: 59,
          name: "Morata",
          number: 9,
          pos: "F",
          grid: null,
        },
      },
      {
        player: {
          id: 30521,
          name: "M. Demiral",
          number: 28,
          pos: "D",
          grid: null,
        },
      },
      {
        player: {
          id: 875,
          name: "P. Dybala",
          number: 10,
          pos: "F",
          grid: null,
        },
      },
      {
        player: {
          id: 135749,
          name: "Félix Correia",
          number: 53,
          pos: "F",
          grid: null,
        },
      },
      {
        player: {
          id: 853,
          name: "L. Bonucci",
          number: 19,
          pos: "D",
          grid: null,
        },
      },
      {
        player: {
          id: 850,
          name: "C. Pinsoglio",
          number: 31,
          pos: "G",
          grid: null,
        },
      },
      {
        player: {
          id: 254,
          name: "G. Buffon",
          number: 77,
          pos: "G",
          grid: null,
        },
      },
      {
        player: {
          id: 150,
          name: "Arthur",
          number: 5,
          pos: "M",
          grid: null,
        },
      },
      {
        player: {
          id: 873,
          name: "F. Bernardeschi",
          number: 33,
          pos: "F",
          grid: null,
        },
      },
      {
        player: {
          id: 1459,
          name: "A. Ramsey",
          number: 8,
          pos: "M",
          grid: null,
        },
      },
    ],
  },
  psg: {
    name: "Paris Saint-Germain",
    abb: "PSG",
    logo: LOGOS.psg,
    players: [
      {
        player: {
          id: 253,
          name: "A. Areola",
          number: 16,
          pos: "G",
          grid: "1:1",
        },
      },
      {
        player: {
          id: 264,
          name: "T. Meunier",
          number: 12,
          pos: "D",
          grid: "2:4",
        },
      },
      {
        player: {
          id: 257,
          name: "Marquinhos",
          number: 5,
          pos: "D",
          grid: "2:3",
        },
      },
      {
        player: {
          id: 258,
          name: "Juan Bernat",
          number: 14,
          pos: "D",
          grid: "2:2",
        },
      },
      {
        player: {
          id: 262,
          name: "P. Kimpembe",
          number: 3,
          pos: "D",
          grid: "2:1",
        },
      },
      {
        player: {
          id: 266,
          name: "Á. Di María",
          number: 11,
          pos: "F",
          grid: "3:2",
        },
      },
      {
        player: {
          id: 273,
          name: "M. Verratti",
          number: 6,
          pos: "M",
          grid: "3:1",
        },
      },
      {
        player: {
          id: 272,
          name: "A. Rabiot",
          number: 25,
          pos: "M",
          grid: "4:3",
        },
      },
      {
        player: {
          id: 274,
          name: "E. Cavani",
          number: 9,
          pos: "F",
          grid: "4:2",
        },
      },
      {
        player: {
          id: 276,
          name: "Neymar",
          number: 10,
          pos: "F",
          grid: "4:1",
        },
      },
      {
        player: {
          id: 278,
          name: "K. Mbappé",
          number: 7,
          pos: "F",
          grid: "5:1",
        },
      },
      {
        player: {
          id: 261,
          name: "T. Kehrer",
          number: 4,
          pos: "D",
          grid: null,
        },
      },
      {
        player: {
          id: 267,
          name: "J. Draxler",
          number: 23,
          pos: "M",
          grid: null,
        },
      },
      {
        player: {
          id: 277,
          name: "M. Diaby",
          number: 27,
          pos: "F",
          grid: null,
        },
      },
      {
        player: {
          id: 275,
          name: "E. Choupo-Moting",
          number: 17,
          pos: "F",
          grid: null,
        },
      },
      {
        player: {
          id: 269,
          name: "C. Nkunku",
          number: 24,
          pos: "M",
          grid: null,
        },
      },
      {
        player: {
          id: 270,
          name: "S. Nsoki",
          number: 34,
          pos: "M",
          grid: null,
        },
      },
      {
        player: {
          id: 255,
          name: "S. Cibois",
          number: 50,
          pos: "G",
          grid: null,
        },
      },
    ],
  },
  nap: {
    name: "Napoli",
    abb: "NAP",
    logo: LOGOS.nap,
    players: [
      {
        player: {
          id: 313,
          name: "D. Ospina",
          number: 25,
          pos: "G",
          grid: "1:1",
        },
      },
      {
        player: {
          id: 314,
          name: "Albiol",
          number: 33,
          pos: "D",
          grid: "2:4",
        },
      },
      {
        player: {
          id: 320,
          name: "N. Maksimović",
          number: 19,
          pos: "D",
          grid: "2:3",
        },
      },
      {
        player: {
          id: 322,
          name: "Mário Rui",
          number: 6,
          pos: "D",
          grid: "2:2",
        },
      },
      {
        player: {
          id: 318,
          name: "K. Koulibaly",
          number: 26,
          pos: "D",
          grid: "2:1",
        },
      },
      {
        player: {
          id: 12994,
          name: "M. Hamšík",
          number: 17,
          pos: "M",
          grid: "3:4",
        },
      },
      {
        player: {
          id: 326,
          name: "Allan",
          number: 5,
          pos: "M",
          grid: "3:3",
        },
      },
      {
        player: {
          id: 328,
          name: "Fabián Ruiz",
          number: 8,
          pos: "M",
          grid: "3:2",
        },
      },
      {
        player: {
          id: 332,
          name: "D. Mertens",
          number: 14,
          pos: "F",
          grid: "3:1",
        },
      },
      {
        player: {
          id: 330,
          name: "José Callejón",
          number: 7,
          pos: "F",
          grid: "4:2",
        },
      },
      {
        player: {
          id: 331,
          name: "L. Insigne",
          number: 24,
          pos: "F",
          grid: "4:1",
        },
      },
      {
        player: {
          id: 329,
          name: "P. Zieliński",
          number: 20,
          pos: "M",
          grid: null,
        },
      },
      {
        player: {
          id: 333,
          name: "A. Milik",
          number: 99,
          pos: "F",
          grid: null,
        },
      },
      {
        player: {
          id: 2055,
          name: "M. Rog",
          number: 30,
          pos: "M",
          grid: null,
        },
      },
      {
        player: {
          id: 321,
          name: "K. Malcuit",
          number: 2,
          pos: "D",
          grid: null,
        },
      },
      {
        player: {
          id: 317,
          name: "E. Hysaj",
          number: 23,
          pos: "D",
          grid: null,
        },
      },
      {
        player: {
          id: 311,
          name: "O. Karnezis",
          number: 27,
          pos: "G",
          grid: null,
        },
      },
      {
        player: {
          id: 324,
          name: "A. Diawara",
          number: 42,
          pos: "M",
          grid: null,
        },
      },
    ],
  },
  acm: {
    name: "AC Milan",
    abb: "ACM",
    logo: LOGOS.acm,
    players: [
      {
        player: {
          id: 21081,
          name: "C. Tătărușanu",
          number: 1,
          pos: "G",
          grid: "1:1",
        },
      },
      {
        player: {
          id: 162188,
          name: "P. Kalulu",
          number: 20,
          pos: "D",
          grid: "2:3",
        },
      },
      {
        player: {
          id: 2045,
          name: "S. Kjær",
          number: 24,
          pos: "D",
          grid: "2:2",
        },
      },
      {
        player: {
          id: 163189,
          name: "M. Thiaw",
          number: 28,
          pos: "D",
          grid: "2:1",
        },
      },
      {
        player: {
          id: 1417,
          name: "A. Saelemaekers",
          number: 56,
          pos: "M",
          grid: "3:4",
        },
      },
      {
        player: {
          id: 31054,
          name: "R. Krunić",
          number: 33,
          pos: "M",
          grid: "3:3",
        },
      },
      {
        player: {
          id: 31146,
          name: "S. Tonali",
          number: 8,
          pos: "M",
          grid: "3:2",
        },
      },
      {
        player: {
          id: 47300,
          name: "T. Hernández",
          number: 19,
          pos: "M",
          grid: "3:1",
        },
      },
      {
        player: {
          id: 744,
          name: "Brahim Díaz",
          number: 10,
          pos: "F",
          grid: "4:2",
        },
      },
      {
        player: {
          id: 22236,
          name: "Rafael Leão",
          number: 17,
          pos: "F",
          grid: "4:1",
        },
      },
      {
        player: {
          id: 2295,
          name: "O. Giroud",
          number: 9,
          pos: "F",
          grid: "5:1",
        },
      },
      {
        player: {
          id: 56396,
          name: "Junior Messias",
          number: 30,
          pos: "F",
          grid: null,
        },
      },
      {
        player: {
          id: 147859,
          name: "C. De Ketelaere",
          number: 90,
          pos: "M",
          grid: null,
        },
      },
      {
        player: {
          id: 31273,
          name: "T. Pobega",
          number: 32,
          pos: "M",
          grid: null,
        },
      },
      {
        player: {
          id: 1831,
          name: "A. Rebić",
          number: 12,
          pos: "F",
          grid: null,
        },
      },
      {
        player: {
          id: 1627,
          name: "D. Calabria",
          number: 2,
          pos: "D",
          grid: null,
        },
      },
      {
        player: {
          id: 105,
          name: "F. Ballo",
          number: 5,
          pos: "D",
          grid: null,
        },
      },
      {
        player: {
          id: 56473,
          name: "M. Gabbia",
          number: 46,
          pos: "D",
          grid: null,
        },
      },
      {
        player: {
          id: 342995,
          name: "L. Nava",
          number: 92,
          pos: "G",
          grid: null,
        },
      },
      {
        player: {
          id: 305,
          name: "D. Origi",
          number: 27,
          pos: "F",
          grid: null,
        },
      },
      {
        player: {
          id: 765,
          name: "A. Mirante",
          number: 83,
          pos: "G",
          grid: null,
        },
      },
    ],
  },
  spurs: {
    name: "Tottenham Hotspur",
    abb: "SPURS",
    logo: LOGOS.spurs,
    players: [
      {
        player: {
          id: 18932,
          name: "F. Forster",
          number: 20,
          pos: "G",
          grid: "1:1",
        },
      },
      {
        player: {
          id: 30776,
          name: "C. Romero",
          number: 17,
          pos: "D",
          grid: "2:3",
        },
      },
      {
        player: {
          id: 175,
          name: "E. Dier",
          number: 15,
          pos: "D",
          grid: "2:2",
        },
      },
      {
        player: {
          id: 133,
          name: "C. Lenglet",
          number: 34,
          pos: "D",
          grid: "2:1",
        },
      },
      {
        player: {
          id: 1566,
          name: "Emerson",
          number: 12,
          pos: "M",
          grid: "3:4",
        },
      },
      {
        player: {
          id: 180,
          name: "O. Skipp",
          number: 4,
          pos: "M",
          grid: "3:3",
        },
      },
      {
        player: {
          id: 237129,
          name: "P. Sarr",
          number: 29,
          pos: "M",
          grid: "3:2",
        },
      },
      {
        player: {
          id: 207,
          name: "I. Perišić",
          number: 14,
          pos: "M",
          grid: "3:1",
        },
      },
      {
        player: {
          id: 30435,
          name: "D. Kulusevski",
          number: 21,
          pos: "F",
          grid: "4:2",
        },
      },
      {
        player: {
          id: 186,
          name: "Son Heung-Min",
          number: 7,
          pos: "F",
          grid: "4:1",
        },
      },
      {
        player: {
          id: 184,
          name: "H. Kane",
          number: 10,
          pos: "F",
          grid: "5:1",
        },
      },
      {
        player: {
          id: 2413,
          name: "Richarlison",
          number: 9,
          pos: "F",
          grid: null,
        },
      },
      {
        player: {
          id: 164,
          name: "B. Davies",
          number: 33,
          pos: "D",
          grid: null,
        },
      },
      {
        player: {
          id: 83,
          name: "A. Danjuma",
          number: 16,
          pos: "M",
          grid: null,
        },
      },
      {
        player: {
          id: 161,
          name: "A. Whiteman",
          number: 41,
          pos: "G",
          grid: null,
        },
      },
      {
        player: {
          id: 149550,
          name: "J. Tanganga",
          number: 25,
          pos: "D",
          grid: null,
        },
      },
      {
        player: {
          id: 47519,
          name: "Pedro Porro",
          number: 23,
          pos: "D",
          grid: null,
        },
      },
      {
        player: {
          id: 156428,
          name: "B. Austin",
          number: 40,
          pos: "G",
          grid: null,
        },
      },
      {
        player: {
          id: 273757,
          name: "A. Devine",
          number: 45,
          pos: "M",
          grid: null,
        },
      },
      {
        player: {
          id: 168,
          name: "D. Sánchez",
          number: 6,
          pos: "D",
          grid: null,
        },
      },
      {
        player: {
          id: 178,
          name: "Lucas Moura",
          number: 27,
          pos: "F",
          grid: null,
        },
      },
    ],
  },
};

export const games: Game[] = [
  {
    home: teams.bar,
    away: teams.mci,
    league: leagues.ucl,
    formattedDate: "11 Sep, 2024",
    fixtureId: 152913,
  },

  {
    home: teams.acm,
    away: teams.spurs,
    league: leagues.ucl,
    formattedDate: "11 Sep, 2024",
    fixtureId: 971793,
  },
  {
    home: teams.juv,
    away: teams.inter,
    league: leagues.seriea,
    formattedDate: "14 Sep, 2024",
    fixtureId: 608899,
  },
  {
    home: teams.psg,
    away: teams.nap,
    league: leagues.ucl,
    formattedDate: "17 Sep, 2024",
    fixtureId: 39191,
  },
];

export const predictions: Prediction[] = [
  {
    desc: "Match will end in a draw",
    type: 0,
    basePoints: 3,
    multiplier: 1,
  },
  {
    desc: "Both teams will score in the match",
    type: 0,
    basePoints: 2,
    multiplier: 1,
  },
  {
    desc: "Total goal(s) in the match will be _ or more",
    type: 1,
    basePoints: 3,
    multiplier: 1.2,
  },
  {
    desc: "Total penalties in the match will be _ or more",
    type: 1,
    basePoints: 3,
    multiplier: 1.8,
  },
  {
    desc: "Total corners in the match will be _ or more",
    type: 1,
    basePoints: 1.5,
    multiplier: 1.1,
  },
  {
    desc: "In the match, _ will win by _ goal difference or more",
    type: 2,
    basePoints: 3,
    multiplier: 1.2,
  },
  {
    desc: "In the first half, _ will score _ goal(s) or more",
    type: 2,
    basePoints: 2,
    multiplier: 1.2,
  },
  {
    desc: "In the match, _ will score _ goal(s) or more",
    type: 2,
    basePoints: 2,
    multiplier: 1.1,
  },
  {
    desc: "_ will score _ goal(s) or more",
    type: 3,
    basePoints: 3,
    multiplier: 1.4,
  },
  {
    desc: "_ wlil get _ yellow card(s) or more",
    type: 3,
    basePoints: 3,
    multiplier: 2,
  },
];

export const supportedchains: Record<string, any> = {
  [chilizSpicy.id]: {
    id: 1,
    name: chilizSpicy.name,
    image: "/coins/chiliz.png",
    chainId: chilizSpicy.id,
    symbol: chilizSpicy.nativeCurrency.symbol,
    explorer: chilizSpicy.blockExplorers.default.url,
  },
  [fhenixHelium.id]: {
    id: 2,
    name: fhenixHelium.name,
    chainId: fhenixHelium.id,
    symbol: fhenixHelium.nativeCurrency.symbol,
    image: "/coins/fhenix.jpeg",
    explorer: fhenixHelium.blockExplorers.default.url,
  },
  [arbitrumSepolia.id]: {
    id: 3,
    name: "Arbitrum Sepolia",
    chainId: arbitrumSepolia.id,
    symbol: "ETH",
    image: "/coins/arbitrum.png",
    explorer: "https://sepolia.arbiscan.io/",
  },
};
