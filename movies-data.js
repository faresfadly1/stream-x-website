// Movies Database
const moviesDatabase = {
    1: {
        title: "Dune: Part Two",
        year: "2024",
        duration: "2h 46m",
        rating: "8.8",
        genres: "Sci-Fi, Adventure",
        certification: "PG-13",
        overview: "Follow the mythic journey of Paul Atreides as he unites with Chani and the Fremen while on a warpath of revenge against the conspirators who destroyed his family. Facing a choice between the love of his life and the fate of the known universe, he endeavors to prevent a terrible future only he can foresee.",
        poster: "https://m.media-amazon.com/images/M/MV5BN2QyZGU4ZDctOWMzMy00NTc5LThlOGQtODhmNDI1NmY5YzAwXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_.jpg",
        backdrop: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=600&fit=crop",
        trailer: "https://www.youtube.com/embed/Way9Dexny3w",
        director: "Denis Villeneuve",
        writers: "Denis Villeneuve, Jon Spaihts, Frank Herbert",
        stars: "Timothée Chalamet, Zendaya, Rebecca Ferguson",
        releaseDate: "March 1, 2024",
        budget: "$190,000,000",
        boxOffice: "$700,000,000",
        country: "United States, Canada",
        language: "English",
        alsoKnownAs: "Dune 2",
        filmingLocations: "Hungary, Italy, United Arab Emirates",
        fullMovieUrl: "https://vidsrc.xyz/embed/movie/tt15239678",
        cast: [
            {
                name: "Timothée Chalamet",
                character: "Paul Atreides",
                image: "https://m.media-amazon.com/images/M/MV5BNzMzMzExNTY4MF5BMl5BanBnXkFtZTgwODE5MDMwMTE@._V1_UY317_CR8,0,214,317_AL_.jpg"
            },
            {
                name: "Zendaya",
                character: "Chani",
                image: "https://m.media-amazon.com/images/M/MV5BMjMyY2M4NjItYjY5YS00NjZiLWE3YjctMDg5MzBjYzVlMjY0XkEyXkFqcGdeQXVyMTExNzQzMDE0._V1_UY317_CR2,0,214,317_AL_.jpg"
            },
            {
                name: "Rebecca Ferguson",
                character: "Lady Jessica",
                image: "https://m.media-amazon.com/images/M/MV5BMTQwMDQ4NzA0OV5BMl5BanBnXkFtZTcwNzY3ODgxOA@@._V1_UY317_CR20,0,214,317_AL_.jpg"
            },
            {
                name: "Josh Brolin",
                character: "Gurney Halleck",
                image: "https://m.media-amazon.com/images/M/MV5BMjA1MTk5MjAzN15BMl5BanBnXkFtZTgwNjcwNjk1ODE@._V1_UY317_CR6,0,214,317_AL_.jpg"
            },
            {
                name: "Javier Bardem",
                character: "Stilgar",
                image: "https://m.media-amazon.com/images/M/MV5BMTY1MjEzMTI2N15BMl5BanBnXkFtZTcwNTE3MzY0Mg@@._V1_UY317_CR14,0,214,317_AL_.jpg"
            },
            {
                name: "Austin Butler",
                character: "Feyd-Rautha",
                image: "https://m.media-amazon.com/images/M/MV5BNjQ1NTU4MjQzNF5BMl5BanBnXkFtZTgwODYwMDY3NzE@._V1_UY317_CR2,0,214,317_AL_.jpg"
            }
        ]
    },
    2: {
        title: "Oppenheimer",
        year: "2023",
        duration: "3h",
        rating: "8.6",
        genres: "Biography, Drama, History",
        certification: "R",
        overview: "The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb during World War II. A thrilling exploration of the man whose work forever changed the course of history.",
        poster: "https://m.media-amazon.com/images/M/MV5BMDBmYTZjNjUtN2M1MS00MTQ2LTk2ODgtNzc2M2QyZGE5NTVjXkEyXkFqcGdeQXVyNzAwMjU2MTY@._V1_.jpg",
        backdrop: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=600&fit=crop",
        trailer: "https://www.youtube.com/embed/uYPbbksJxIg",
        director: "Christopher Nolan",
        writers: "Christopher Nolan, Kai Bird, Martin Sherwin",
        stars: "Cillian Murphy, Emily Blunt, Matt Damon",
        releaseDate: "July 21, 2023",
        budget: "$100,000,000",
        boxOffice: "$952,000,000",
        country: "United States, United Kingdom",
        language: "English, German",
        alsoKnownAs: "Oppenheimer: The Father of the Atomic Bomb",
        filmingLocations: "New Mexico, California, New Jersey",
        fullMovieUrl: "https://vidsrc.xyz/embed/movie/tt15398776",
        cast: [
            {
                name: "Cillian Murphy",
                character: "J. Robert Oppenheimer",
                image: "https://m.media-amazon.com/images/M/MV5BMDUyODAyNDEtMWI5NC00MTE1LWJlNzQtOGM1OTYxYjQyNWVhXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_UY317_CR20,0,214,317_AL_.jpg"
            },
            {
                name: "Emily Blunt",
                character: "Kitty Oppenheimer",
                image: "https://m.media-amazon.com/images/M/MV5BMTQ3ODE3Mjg1NV5BMl5BanBnXkFtZTcwMzM4MjYxOQ@@._V1_UY317_CR12,0,214,317_AL_.jpg"
            },
            {
                name: "Matt Damon",
                character: "Leslie Groves",
                image: "https://m.media-amazon.com/images/M/MV5BMTM0NzYzNDgxMl5BMl5BanBnXkFtZTcwMDg2MTMyMw@@._V1_UY317_CR18,0,214,317_AL_.jpg"
            },
            {
                name: "Robert Downey Jr.",
                character: "Lewis Strauss",
                image: "https://m.media-amazon.com/images/M/MV5BNzg1MTUyODU3OF5BMl5BanBnXkFtZTcwNDg3NzkzOQ@@._V1_UY317_CR12,0,214,317_AL_.jpg"
            },
            {
                name: "Florence Pugh",
                character: "Jean Tatlock",
                image: "https://m.media-amazon.com/images/M/MV5BMTUyNjM2MjI4MV5BMl5BanBnXkFtZTgwMjE0NjYyNjE@._V1_UY317_CR22,0,214,317_AL_.jpg"
            },
            {
                name: "Rami Malek",
                character: "David Hill",
                image: "https://m.media-amazon.com/images/M/MV5BMTc2NjQzMzUyM15BMl5BanBnXkFtZTgwMDY2MTM5MjI@._V1_UY317_CR10,0,214,317_AL_.jpg"
            }
        ]
    },
    3: {
        title: "John Wick: Chapter 4",
        year: "2023",
        duration: "2h 49m",
        rating: "7.8",
        genres: "Action, Crime, Thriller",
        certification: "R",
        overview: "John Wick uncovers a path to defeating The High Table. But before he can earn his freedom, Wick must face off against a new enemy with powerful alliances across the globe and forces that turn old friends into foes.",
        poster: "https://image.tmdb.org/t/p/w500/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg",
        backdrop: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1200&h=600&fit=crop",
        trailer: "https://www.youtube.com/embed/qEVUtrk8_B4",
        director: "Chad Stahelski",
        writers: "Shay Hatten, Michael Finch, Derek Kolstad",
        stars: "Keanu Reeves, Donnie Yen, Bill Skarsgård",
        releaseDate: "March 24, 2023",
        budget: "$90,000,000",
        boxOffice: "$440,000,000",
        country: "United States",
        language: "English, French, Japanese",
        alsoKnownAs: "John Wick 4",
        filmingLocations: "Paris, Berlin, Jordan, Japan",
        fullMovieUrl: "https://vidsrc.xyz/embed/movie/tt10366206",
        cast: [
            {
                name: "Keanu Reeves",
                character: "John Wick",
                image: "https://m.media-amazon.com/images/M/MV5BMjA3MjAzOTQxNF5BMl5BanBnXkFtZTcwMjMyNDQzMw@@._V1_UY317_CR10,0,214,317_AL_.jpg"
            },
            {
                name: "Donnie Yen",
                character: "Caine",
                image: "https://m.media-amazon.com/images/M/MV5BMTQwMTQ2ODAzNl5BMl5BanBnXkFtZTcwNTY5NjkxOA@@._V1_UY317_CR14,0,214,317_AL_.jpg"
            },
            {
                name: "Bill Skarsgård",
                character: "Marquis",
                image: "https://m.media-amazon.com/images/M/MV5BNDI1MjI1OTQ1NV5BMl5BanBnXkFtZTgwNTY3NjU1NjE@._V1_UY317_CR14,0,214,317_AL_.jpg"
            },
            {
                name: "Laurence Fishburne",
                character: "Bowery King",
                image: "https://m.media-amazon.com/images/M/MV5BMTc0NjczNDc1MV5BMl5BanBnXkFtZTYwMDU0Mjg1._V1_UY317_CR6,0,214,317_AL_.jpg"
            },
            {
                name: "Ian McShane",
                character: "Winston",
                image: "https://m.media-amazon.com/images/M/MV5BMTcyOTQ5NDk2N15BMl5BanBnXkFtZTcwNTMxMzY2Nw@@._V1_UY317_CR17,0,214,317_AL_.jpg"
            },
            {
                name: "Hiroyuki Sanada",
                character: "Shimazu",
                image: "https://m.media-amazon.com/images/M/MV5BMTg0Mzc2MjU5MV5BMl5BanBnXkFtZTgwNzMxNjQ4NjE@._V1_UY317_CR14,0,214,317_AL_.jpg"
            }
        ]
    },
    4: {
        title: "Barbie",
        year: "2023",
        duration: "1h 54m",
        rating: "7.0",
        genres: "Adventure, Comedy, Fantasy",
        certification: "PG-13",
        overview: "Barbie and Ken are having the time of their lives in the colorful and seemingly perfect world of Barbie Land. However, when they get a chance to go to the real world, they soon discover the joys and perils of living among humans.",
        poster: "https://m.media-amazon.com/images/M/MV5BNjU3N2QxNzYtMjk1NC00MTc4LTk1NTQtMmUxNTljM2I0NDA5XkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_.jpg",
        backdrop: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=1200&h=600&fit=crop",
        trailer: "https://www.youtube.com/embed/pBk4NYhWNMM",
        director: "Greta Gerwig",
        writers: "Greta Gerwig, Noah Baumbach",
        stars: "Margot Robbie, Ryan Gosling, America Ferrera",
        releaseDate: "July 21, 2023",
        budget: "$145,000,000",
        boxOffice: "$1,446,000,000",
        country: "United States",
        language: "English",
        alsoKnownAs: "Barbie: The Movie",
        filmingLocations: "California, London",
        fullMovieUrl: "https://vidsrc.xyz/embed/movie/tt1517268",
        cast: [
            {
                name: "Margot Robbie",
                character: "Barbie",
                image: "https://m.media-amazon.com/images/M/MV5BMTgxNDcwMzU2Nl5BMl5BanBnXkFtZTcwNDc4NzkzOQ@@._V1_UY317_CR1,0,214,317_AL_.jpg"
            },
            {
                name: "Ryan Gosling",
                character: "Ken",
                image: "https://m.media-amazon.com/images/M/MV5BMTQzMjkwNTQ2OF5BMl5BanBnXkFtZTgwNTQ4MTQ4MTE@._V1_UY317_CR11,0,214,317_AL_.jpg"
            },
            {
                name: "America Ferrera",
                character: "Gloria",
                image: "https://m.media-amazon.com/images/M/MV5BMTk2Mjc4NTEyNF5BMl5BanBnXkFtZTcwMzA1MzI0Mw@@._V1_UY317_CR8,0,214,317_AL_.jpg"
            },
            {
                name: "Kate McKinnon",
                character: "Weird Barbie",
                image: "https://m.media-amazon.com/images/M/MV5BMTc5MzM5ODA5Ml5BMl5BanBnXkFtZTgwNzQxODYzNzE@._V1_UY317_CR14,0,214,317_AL_.jpg"
            },
            {
                name: "Michael Cera",
                character: "Allan",
                image: "https://m.media-amazon.com/images/M/MV5BMTY0NTU3ODk4Ml5BMl5BanBnXkFtZTcwMzUyNjgzMw@@._V1_UY317_CR13,0,214,317_AL_.jpg"
            },
            {
                name: "Will Ferrell",
                character: "CEO",
                image: "https://m.media-amazon.com/images/M/MV5BMjA1MTkzNTc0MV5BMl5BanBnXkFtZTcwMDQ0ODUyMg@@._V1_UY317_CR7,0,214,317_AL_.jpg"
            }
        ]
    },
    5: {
        title: "Avatar: The Way of Water",
        year: "2022",
        duration: "3h 12m",
        rating: "7.6",
        genres: "Action, Adventure, Fantasy",
        certification: "PG-13",
        overview: "Jake Sully lives with his newfound family formed on the extrasolar moon Pandora. Once a familiar threat returns to finish what was previously started, Jake must work with Neytiri and the army of the Na'vi race to protect their home.",
        poster: "https://image.tmdb.org/t/p/w500/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg",
        backdrop: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200&h=600&fit=crop",
        trailer: "https://www.youtube.com/embed/d9MyW72ELq0",
        director: "James Cameron",
        writers: "James Cameron, Rick Jaffa, Amanda Silver",
        stars: "Sam Worthington, Zoe Saldana, Sigourney Weaver",
        releaseDate: "December 16, 2022",
        budget: "$350,000,000",
        boxOffice: "$2,320,000,000",
        country: "United States",
        language: "English",
        alsoKnownAs: "Avatar 2",
        filmingLocations: "New Zealand, California",
        fullMovieUrl: "https://vidsrc.xyz/embed/movie/tt1630029",
        cast: [
            {
                name: "Sam Worthington",
                character: "Jake Sully",
                image: "https://m.media-amazon.com/images/M/MV5BMTczOTczODI1MV5BMl5BanBnXkFtZTcwNTUzNDk0Mg@@._V1_UY317_CR12,0,214,317_AL_.jpg"
            },
            {
                name: "Zoe Saldana",
                character: "Neytiri",
                image: "https://m.media-amazon.com/images/M/MV5BMjE2MzcwNjA3Nl5BMl5BanBnXkFtZTcwMTY0NjQ5Nw@@._V1_UY317_CR10,0,214,317_AL_.jpg"
            },
            {
                name: "Sigourney Weaver",
                character: "Kiri",
                image: "https://m.media-amazon.com/images/M/MV5BMTk1MTcyNTE3NV5BMl5BanBnXkFtZTcwMTA0MTMyMw@@._V1_UY317_CR21,0,214,317_AL_.jpg"
            },
            {
                name: "Kate Winslet",
                character: "Ronal",
                image: "https://m.media-amazon.com/images/M/MV5BODgzMzM2NTE0Ml5BMl5BanBnXkFtZTcwMTgyNDkyNw@@._V1_UY317_CR10,0,214,317_AL_.jpg"
            },
            {
                name: "Stephen Lang",
                character: "Colonel Quaritch",
                image: "https://m.media-amazon.com/images/M/MV5BMTk0MTYzMjUyNl5BMl5BanBnXkFtZTcwMjg0OTM2Mg@@._V1_UY317_CR20,0,214,317_AL_.jpg"
            },
            {
                name: "Cliff Curtis",
                character: "Tonowari",
                image: "https://m.media-amazon.com/images/M/MV5BMTg3ODI5MjYxNV5BMl5BanBnXkFtZTcwMzc4MDE4Mg@@._V1_UY317_CR14,0,214,317_AL_.jpg"
            }
        ]
    },
    6: {
        title: "The Batman",
        year: "2022",
        duration: "2h 56m",
        rating: "7.9",
        genres: "Action, Crime, Drama",
        certification: "PG-13",
        overview: "When a sadistic serial killer begins murdering key political figures in Gotham, Batman is forced to investigate the city's hidden corruption and question his family's involvement. A dark and gritty take on the Dark Knight.",
        poster: "https://m.media-amazon.com/images/M/MV5BOGE2NWUwMDItMjA4Yi00N2Y3LWJjMzEtMDJjZTMzZTdlZGE5XkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_.jpg",
        backdrop: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=1200&h=600&fit=crop",
        trailer: "https://www.youtube.com/embed/mqqft2x_Aa4",
        director: "Matt Reeves",
        writers: "Matt Reeves, Peter Craig, Bob Kane",
        stars: "Robert Pattinson, Zoë Kravitz, Jeffrey Wright",
        releaseDate: "March 4, 2022",
        budget: "$185,000,000",
        boxOffice: "$771,000,000",
        country: "United States",
        language: "English",
        alsoKnownAs: "The Batman: Part I",
        filmingLocations: "Liverpool, London, Chicago",
        fullMovieUrl: "https://vidsrc.xyz/embed/movie/tt1877830",
        cast: [
            {
                name: "Robert Pattinson",
                character: "Batman / Bruce Wayne",
                image: "https://m.media-amazon.com/images/M/MV5BNTYxMzU1ODI4MV5BMl5BanBnXkFtZTcwNDg0NjkwNw@@._V1_UY317_CR11,0,214,317_AL_.jpg"
            },
            {
                name: "Zoë Kravitz",
                character: "Catwoman / Selina Kyle",
                image: "https://m.media-amazon.com/images/M/MV5BMjI3MjA0NzM4NF5BMl5BanBnXkFtZTcwNDYzOTMxOA@@._V1_UY317_CR11,0,214,317_AL_.jpg"
            },
            {
                name: "Paul Dano",
                character: "The Riddler",
                image: "https://m.media-amazon.com/images/M/MV5BMjA1MjE2MTQ2MV5BMl5BanBnXkFtZTcwMjE1MjI0OA@@._V1_UY317_CR10,0,214,317_AL_.jpg"
            },
            {
                name: "Jeffrey Wright",
                character: "Lt. James Gordon",
                image: "https://m.media-amazon.com/images/M/MV5BMjEzMjA0ODk1OF5BMl5BanBnXkFtZTcwMTA4ODM3OQ@@._V1_UY317_CR13,0,214,317_AL_.jpg"
            },
            {
                name: "Colin Farrell",
                character: "Penguin",
                image: "https://m.media-amazon.com/images/M/MV5BMTQzOTkwNTgyNV5BMl5BanBnXkFtZTcwMDYwODQyMg@@._V1_UY317_CR10,0,214,317_AL_.jpg"
            },
            {
                name: "Andy Serkis",
                character: "Alfred",
                image: "https://m.media-amazon.com/images/M/MV5BMTk2NTQ2MTU5MF5BMl5BanBnXkFtZTcwNTU0Njg4Mw@@._V1_UY317_CR10,0,214,317_AL_.jpg"
            }
        ]
    },
    7: {
        title: "Top Gun: Maverick",
        year: "2022",
        duration: "2h 10m",
        rating: "8.3",
        genres: "Action, Drama",
        certification: "PG-13",
        overview: "After thirty years, Maverick is still pushing the envelope as a top naval aviator, but must confront ghosts of his past when he leads TOP GUN's elite graduates on a mission that demands the ultimate sacrifice from those who choose to fly it.",
        poster: "https://m.media-amazon.com/images/M/MV5BZWYzOGEwNTgtNWU3NS00ZTQ0LWJkODUtMmVhMjIwMjA1ZmQwXkEyXkFqcGdeQXVyMjkwOTAyMDU@._V1_.jpg",
        backdrop: "https://images.unsplash.com/photo-1583992199668-3a0ae2d5e8b5?w=1200&h=600&fit=crop",
        trailer: "https://www.youtube.com/embed/giXco2jaZ_4",
        director: "Joseph Kosinski",
        writers: "Ehren Kruger, Eric Warren Singer, Christopher McQuarrie",
        stars: "Tom Cruise, Miles Teller, Jennifer Connelly",
        releaseDate: "May 27, 2022",
        budget: "$170,000,000",
        boxOffice: "$1,489,000,000",
        country: "United States",
        language: "English",
        alsoKnownAs: "Top Gun 2",
        filmingLocations: "California, Nevada",
        fullMovieUrl: "https://vidsrc.xyz/embed/movie/tt1745960",
        cast: [
            {
                name: "Tom Cruise",
                character: "Pete 'Maverick' Mitchell",
                image: "https://m.media-amazon.com/images/M/MV5BMTk3ODIzMDA5Ml5BMl5BanBnXkFtZTcwNDY0NTU4Ng@@._V1_UY317_CR4,0,214,317_AL_.jpg"
            },
            {
                name: "Miles Teller",
                character: "Bradley 'Rooster' Bradshaw",
                image: "https://m.media-amazon.com/images/M/MV5BNTk3NzQxNzg0NF5BMl5BanBnXkFtZTgwMTU1MjA2NzE@._V1_UY317_CR13,0,214,317_AL_.jpg"
            },
            {
                name: "Jennifer Connelly",
                character: "Penny Benjamin",
                image: "https://m.media-amazon.com/images/M/MV5BNjA5MjM2NjU4MF5BMl5BanBnXkFtZTcwMTkwNzk5Mg@@._V1_UY317_CR18,0,214,317_AL_.jpg"
            },
            {
                name: "Jon Hamm",
                character: "Cyclone",
                image: "https://m.media-amazon.com/images/M/MV5BMTM4ODU1MDI2NF5BMl5BanBnXkFtZTcwNzExNzQ1OA@@._V1_UY317_CR13,0,214,317_AL_.jpg"
            },
            {
                name: "Glen Powell",
                character: "Hangman",
                image: "https://m.media-amazon.com/images/M/MV5BZjA1NjExNTAtNzI5OS00ZDJhLTk1MDUtMzBkOGNmMzE5Y2Q4XkEyXkFqcGdeQXVyMTM1NjM2ODg1._V1_UY317_CR14,0,214,317_AL_.jpg"
            },
            {
                name: "Ed Harris",
                character: "Rear Admiral",
                image: "https://m.media-amazon.com/images/M/MV5BMTcwNTE4MTUxMl5BMl5BanBnXkFtZTcwMDIwODQzMw@@._V1_UY317_CR12,0,214,317_AL_.jpg"
            }
        ]
    },
    8: {
        title: "The Shawshank Redemption",
        year: "1994",
        duration: "2h 22m",
        rating: "9.3",
        genres: "Drama",
        certification: "R",
        overview: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency. A timeless tale of hope, friendship, and the resilience of the human spirit.",
        poster: "https://m.media-amazon.com/images/M/MV5BNDE3ODcxYzMtY2YzZC00NmNlLWJiNDMtZDViZWM2MzIxZDYwXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_.jpg",
        backdrop: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1200&h=600&fit=crop",
        trailer: "https://www.youtube.com/embed/NmzuHjWmXOc",
        director: "Frank Darabont",
        writers: "Stephen King, Frank Darabont",
        stars: "Tim Robbins, Morgan Freeman, Bob Gunton",
        releaseDate: "September 23, 1994",
        budget: "$25,000,000",
        boxOffice: "$73,300,000",
        country: "United States",
        language: "English",
        alsoKnownAs: "Rita Hayworth and Shawshank Redemption",
        filmingLocations: "Ohio, Maine",
        fullMovieUrl: "https://vidsrc.xyz/embed/movie/tt0111161",
        cast: [
            {
                name: "Tim Robbins",
                character: "Andy Dufresne",
                image: "https://m.media-amazon.com/images/M/MV5BMTI1OTYxNzAxOF5BMl5BanBnXkFtZTYwNTE5ODI4._V1_UY317_CR16,0,214,317_AL_.jpg"
            },
            {
                name: "Morgan Freeman",
                character: "Ellis Boyd 'Red' Redding",
                image: "https://m.media-amazon.com/images/M/MV5BMTc0MDMyMzI2OF5BMl5BanBnXkFtZTcwMzM2OTk1MQ@@._V1_UY317_CR12,0,214,317_AL_.jpg"
            },
            {
                name: "Bob Gunton",
                character: "Warden Norton",
                image: "https://m.media-amazon.com/images/M/MV5BMTQzNDE4OTExNF5BMl5BanBnXkFtZTcwMTczMTQwNA@@._V1_UY317_CR14,0,214,317_AL_.jpg"
            },
            {
                name: "William Sadler",
                character: "Heywood",
                image: "https://m.media-amazon.com/images/M/MV5BMjA3ODk5MDQ5N15BMl5BanBnXkFtZTcwNjY3NjIzMw@@._V1_UY317_CR14,0,214,317_AL_.jpg"
            },
            {
                name: "Clancy Brown",
                character: "Captain Hadley",
                image: "https://m.media-amazon.com/images/M/MV5BMTc0NjY0NzE4MF5BMl5BanBnXkFtZTcwNDE3NjI5Mw@@._V1_UY317_CR10,0,214,317_AL_.jpg"
            },
            {
                name: "Gil Bellows",
                character: "Tommy",
                image: "https://m.media-amazon.com/images/M/MV5BMTQ0MDIyMTM5OF5BMl5BanBnXkFtZTcwMjg2ODAwOQ@@._V1_UY317_CR14,0,214,317_AL_.jpg"
            }
        ]
    },
    9: {
        title: "The Godfather",
        year: "1972",
        duration: "2h 55m",
        rating: "9.2",
        genres: "Crime, Drama",
        certification: "R",
        overview: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son. A cinematic masterpiece exploring themes of power, family, and the American Dream.",
        poster: "https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",
        backdrop: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=1200&h=600&fit=crop",
        trailer: "https://www.youtube.com/embed/UaVTIH8mujA",
        director: "Francis Ford Coppola",
        writers: "Mario Puzo, Francis Ford Coppola",
        stars: "Marlon Brando, Al Pacino, James Caan",
        releaseDate: "March 24, 1972",
        budget: "$6,000,000",
        boxOffice: "$291,000,000",
        country: "United States",
        language: "English, Italian",
        alsoKnownAs: "Mario Puzo's The Godfather",
        filmingLocations: "New York, Sicily",
        fullMovieUrl: "https://vidsrc.xyz/embed/movie/tt0068646",
        cast: [
            {
                name: "Marlon Brando",
                character: "Don Vito Corleone",
                image: "https://m.media-amazon.com/images/M/MV5BMTg3MDYyMDE5OF5BMl5BanBnXkFtZTcwNjgyNTEzNA@@._V1_UY317_CR10,0,214,317_AL_.jpg"
            },
            {
                name: "Al Pacino",
                character: "Michael Corleone",
                image: "https://m.media-amazon.com/images/M/MV5BMTQzMzg1ODAyNl5BMl5BanBnXkFtZTYwMjAxODQ1._V1_UY317_CR8,0,214,317_AL_.jpg"
            },
            {
                name: "James Caan",
                character: "Sonny Corleone",
                image: "https://m.media-amazon.com/images/M/MV5BMTI5NjkyNDQ3NV5BMl5BanBnXkFtZTcwNzM0OTYxMw@@._V1_UY317_CR12,0,214,317_AL_.jpg"
            },
            {
                name: "Robert Duvall",
                character: "Tom Hagen",
                image: "https://m.media-amazon.com/images/M/MV5BMTQzNzAxNTIwNF5BMl5BanBnXkFtZTcwMjMyMjU0Nw@@._V1_UY317_CR10,0,214,317_AL_.jpg"
            },
            {
                name: "Diane Keaton",
                character: "Kay Adams",
                image: "https://m.media-amazon.com/images/M/MV5BMTQyNTI2NjE1OV5BMl5BanBnXkFtZTcwMTY4NDE0Ng@@._V1_UY317_CR20,0,214,317_AL_.jpg"
            },
            {
                name: "Talia Shire",
                character: "Connie Corleone",
                image: "https://m.media-amazon.com/images/M/MV5BMTcwNzExMTU2N15BMl5BanBnXkFtZTcwNTA5MjkzMw@@._V1_UY317_CR14,0,214,317_AL_.jpg"
            }
        ]
    },
    10: {
        title: "The Dark Knight",
        year: "2008",
        duration: "2h 32m",
        rating: "9.0",
        genres: "Action, Crime, Drama",
        certification: "PG-13",
        overview: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice. A dark and gripping superhero epic.",
        poster: "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_.jpg",
        backdrop: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=600&fit=crop",
        trailer: "https://www.youtube.com/embed/EXeTwQWrcwY",
        director: "Christopher Nolan",
        writers: "Jonathan Nolan, Christopher Nolan, David S. Goyer",
        stars: "Christian Bale, Heath Ledger, Aaron Eckhart",
        releaseDate: "July 18, 2008",
        budget: "$185,000,000",
        boxOffice: "$1,006,000,000",
        country: "United States, United Kingdom",
        language: "English, Mandarin",
        alsoKnownAs: "Batman: The Dark Knight",
        filmingLocations: "Chicago, Hong Kong, London",
        fullMovieUrl: "https://vidsrc.xyz/embed/movie/tt0468569",
        cast: [
            {
                name: "Christian Bale",
                character: "Bruce Wayne / Batman",
                image: "https://m.media-amazon.com/images/M/MV5BMTkxMzk4MjQ4MF5BMl5BanBnXkFtZTcwMzExODQxOA@@._V1_UY317_CR10,0,214,317_AL_.jpg"
            },
            {
                name: "Heath Ledger",
                character: "Joker",
                image: "https://m.media-amazon.com/images/M/MV5BMTI2NTY0NzA4MF5BMl5BanBnXkFtZTYwMjE1MDE0._V1_UY317_CR24,0,214,317_AL_.jpg"
            },
            {
                name: "Aaron Eckhart",
                character: "Harvey Dent",
                image: "https://m.media-amazon.com/images/M/MV5BMTQxNTA0MTI3Ml5BMl5BanBnXkFtZTcwMzQzNjQzMw@@._V1_UY317_CR10,0,214,317_AL_.jpg"
            },
            {
                name: "Michael Caine",
                character: "Alfred",
                image: "https://m.media-amazon.com/images/M/MV5BMTgzMTg5MzU3OF5BMl5BanBnXkFtZTcwMzQyMjQzMw@@._V1_UY317_CR14,0,214,317_AL_.jpg"
            },
            {
                name: "Gary Oldman",
                character: "Commissioner Gordon",
                image: "https://m.media-amazon.com/images/M/MV5BMTU5NzQxMzY4NF5BMl5BanBnXkFtZTcwMzE0OTk5OA@@._V1_UY317_CR10,0,214,317_AL_.jpg"
            },
            {
                name: "Morgan Freeman",
                character: "Lucius Fox",
                image: "https://m.media-amazon.com/images/M/MV5BMTc0MDMyMzI2OF5BMl5BanBnXkFtZTcwMzM2OTk1MQ@@._V1_UY317_CR12,0,214,317_AL_.jpg"
            }
        ]
    },
    11: {
        title: "Pulp Fiction",
        year: "1994",
        duration: "2h 34m",
        rating: "8.9",
        genres: "Crime, Drama",
        certification: "R",
        overview: "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption. Quentin Tarantino's masterpiece of nonlinear storytelling.",
        poster: "https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzViMjE3YzI5MjljXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",
        backdrop: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=1200&h=600&fit=crop",
        trailer: "https://www.youtube.com/embed/s7EdQ4FqbhY",
        director: "Quentin Tarantino",
        writers: "Quentin Tarantino, Roger Avary",
        stars: "John Travolta, Uma Thurman, Samuel L. Jackson",
        releaseDate: "October 14, 1994",
        budget: "$8,000,000",
        boxOffice: "$213,900,000",
        country: "United States",
        language: "English, Spanish, French",
        alsoKnownAs: "Pulp Fiction: Stories from the Underworld",
        filmingLocations: "Los Angeles, California",
        fullMovieUrl: "https://vidsrc.xyz/embed/movie/tt0110912",
        cast: [
            {
                name: "John Travolta",
                character: "Vincent Vega",
                image: "https://m.media-amazon.com/images/M/MV5BMTQwMTkzNTk2Nl5BMl5BanBnXkFtZTcwMzYxNjA0Nw@@._V1_UY317_CR10,0,214,317_AL_.jpg"
            },
            {
                name: "Samuel L. Jackson",
                character: "Jules Winnfield",
                image: "https://m.media-amazon.com/images/M/MV5BMTQ1NTQwMTYxNl5BMl5BanBnXkFtZTYwMjA1MzY1._V1_UY317_CR12,0,214,317_AL_.jpg"
            },
            {
                name: "Uma Thurman",
                character: "Mia Wallace",
                image: "https://m.media-amazon.com/images/M/MV5BMjMxNzk1MTQyMl5BMl5BanBnXkFtZTgwMDIzMDUxMTE@._V1_UY317_CR12,0,214,317_AL_.jpg"
            },
            {
                name: "Bruce Willis",
                character: "Butch Coolidge",
                image: "https://m.media-amazon.com/images/M/MV5BMjA0MjMzMTE5OF5BMl5BanBnXkFtZTcwMzQ2ODE3Mw@@._V1_UY317_CR12,0,214,317_AL_.jpg"
            },
            {
                name: "Ving Rhames",
                character: "Marsellus Wallace",
                image: "https://m.media-amazon.com/images/M/MV5BMTI3Mzg4MDMyNl5BMl5BanBnXkFtZTcwMDQxMTMzMw@@._V1_UY317_CR14,0,214,317_AL_.jpg"
            },
            {
                name: "Harvey Keitel",
                character: "Winston Wolfe",
                image: "https://m.media-amazon.com/images/M/MV5BMTc2Mzc5Njg4MF5BMl5BanBnXkFtZTcwMTcyMDMxMw@@._V1_UY317_CR10,0,214,317_AL_.jpg"
            }
        ]
    },
    12: {
        title: "Fight Club",
        year: "1999",
        duration: "2h 19m",
        rating: "8.8",
        genres: "Drama",
        certification: "R",
        overview: "An insomniac office worker and a devil-may-care soapmaker form an underground fight club that evolves into something much, much more. A cult classic exploring themes of masculinity, consumerism, and identity.",
        poster: "https://m.media-amazon.com/images/M/MV5BOTgyOGQ1NDItNGU3Ny00MjU3LTg2YWEtNmEyYjBiMjI1Y2M5XkEyXkFqcGc@._V1_.jpg",
        backdrop: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1200&h=600&fit=crop",
        trailer: "https://www.youtube.com/embed/BdJKm16Co6M",
        director: "David Fincher",
        writers: "Chuck Palahniuk, Jim Uhls",
        stars: "Brad Pitt, Edward Norton, Helena Bonham Carter",
        releaseDate: "October 15, 1999",
        budget: "$63,000,000",
        boxOffice: "$101,200,000",
        country: "United States, Germany",
        language: "English",
        alsoKnownAs: "Fight Club: An IMAX Experience",
        filmingLocations: "Los Angeles, California",
        fullMovieUrl: "https://vidsrc.xyz/embed/movie/tt0137523",
        cast: [
            {
                name: "Brad Pitt",
                character: "Tyler Durden",
                image: "https://m.media-amazon.com/images/M/MV5BMjA5NDQyMjc2NF5BMl5BanBnXkFtZTcwMjI5NzkzOQ@@._V1_UY317_CR7,0,214,317_AL_.jpg"
            },
            {
                name: "Edward Norton",
                character: "The Narrator",
                image: "https://m.media-amazon.com/images/M/MV5BMTM1NzQ2NTAzM15BMl5BanBnXkFtZTcwNTIzNzgyMw@@._V1_UY317_CR10,0,214,317_AL_.jpg"
            },
            {
                name: "Helena Bonham Carter",
                character: "Marla Singer",
                image: "https://m.media-amazon.com/images/M/MV5BMTM5Mzc2MjE4N15BMl5BanBnXkFtZTcwMTQzNjQ0OA@@._V1_UY317_CR14,0,214,317_AL_.jpg"
            },
            {
                name: "Meat Loaf",
                character: "Robert 'Bob' Paulson",
                image: "https://m.media-amazon.com/images/M/MV5BMTcwNDgwNDU3M15BMl5BanBnXkFtZTcwNDQwMTcyMw@@._V1_UY317_CR14,0,214,317_AL_.jpg"
            },
            {
                name: "Jared Leto",
                character: "Angel Face",
                image: "https://m.media-amazon.com/images/M/MV5BMTA4ODE3ODA1NzJeQTJeQWpwZ15BbWU4MDE0NTEzNzEx._V1_UY317_CR10,0,214,317_AL_.jpg"
            },
            {
                name: "Zach Grenier",
                character: "Richard Chesler",
                image: "https://m.media-amazon.com/images/M/MV5BMTY3MjMxOTU4MV5BMl5BanBnXkFtZTcwNTYxNTI4Ng@@._V1_UY317_CR14,0,214,317_AL_.jpg"
            }
        ]
    }
};
