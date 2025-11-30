const dummyData = {
    "stations": [
        {
            "id": "ST001",
            "code": "NDLS",
            "name": "New Delhi",
            "city": "Delhi",
            "state": "Delhi",
            "zone": "NR"
        },
        {
            "id": "ST002",
            "code": "MMCT",
            "name": "Mumbai Central",
            "city": "Mumbai",
            "state": "Maharashtra",
            "zone": "WR"
        },
        {
            "id": "ST003",
            "code": "HWH",
            "name": "Howrah Junction",
            "city": "Kolkata",
            "state": "West Bengal",
            "zone": "ER"
        },
        {
            "id": "ST004",
            "code": "SBC",
            "name": "KSR Bengaluru",
            "city": "Bengaluru",
            "state": "Karnataka",
            "zone": "SWR"
        },
        {
            "id": "ST005",
            "code": "MAS",
            "name": "Chennai Central",
            "city": "Chennai",
            "state": "Tamil Nadu",
            "zone": "SR"
        },
        {
            "id": "ST006",
            "code": "ADI",
            "name": "Ahmedabad Junction",
            "city": "Ahmedabad",
            "state": "Gujarat",
            "zone": "WR"
        },
        {
            "id": "ST007",
            "code": "PNBE",
            "name": "Patna Junction",
            "city": "Patna",
            "state": "Bihar",
            "zone": "ECR"
        },
        {
            "id": "ST008",
            "code": "LKO",
            "name": "Lucknow Charbagh",
            "city": "Lucknow",
            "state": "Uttar Pradesh",
            "zone": "NR"
        },
        // Mumbai Local Stations
        {
            "id": "ST009",
            "code": "CSTM",
            "name": "Chhatrapati Shivaji Maharaj Terminus",
            "city": "Mumbai",
            "state": "Maharashtra",
            "zone": "CR"
        },
        {
            "id": "ST010",
            "code": "BYC",
            "name": "Byculla",
            "city": "Mumbai",
            "state": "Maharashtra",
            "zone": "CR"
        },
        {
            "id": "ST011",
            "code": "DR",
            "name": "Dadar",
            "city": "Mumbai",
            "state": "Maharashtra",
            "zone": "CR"
        },
        {
            "id": "ST012",
            "code": "KYN",
            "name": "Kalyan Junction",
            "city": "Mumbai",
            "state": "Maharashtra",
            "zone": "CR"
        },
        {
            "id": "ST013",
            "code": "BVI",
            "name": "Borivali",
            "city": "Mumbai",
            "state": "Maharashtra",
            "zone": "WR"
        },
        {
            "id": "ST014",
            "code": "VAPI",
            "name": "Vapi",
            "city": "Vapi",
            "state": "Gujarat",
            "zone": "WR"
        }
    ],

    "trains": [
        {
            "id": "TR001",
            "trainNumber": "12951",
            "name": "MUMBAI RAJDHANI",
            "type": "Rajdhani",
            "class": "Superfast",
            "source": "ST002",
            "destination": "ST001",
            "departureTime": "16:25",
            "arrivalTime": "08:35",
            "duration": "16h 10m",
            "runningDays": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
            "classes": [
                {
                    "class": "1A",
                    "name": "First AC",
                    "available": 24,
                    "fare": 4850,
                    "totalSeats": 24
                },
                {
                    "class": "2A",
                    "name": "Second AC",
                    "available": 48,
                    "fare": 2850,
                    "totalSeats": 48
                },
                {
                    "class": "3A",
                    "name": "Third AC",
                    "available": 72,
                    "fare": 1950,
                    "totalSeats": 72
                }
            ],
            "route": [
                {
                    "station": "ST002",
                    "arrival": "-",
                    "departure": "16:25",
                    "day": 1,
                    "distance": 0
                },
                {
                    "station": "ST006",
                    "arrival": "22:45",
                    "departure": "22:50",
                    "day": 1,
                    "distance": 491
                },
                {
                    "station": "ST001",
                    "arrival": "08:35",
                    "departure": "-",
                    "day": 2,
                    "distance": 1384
                }
            ]
        },
        {
            "id": "TR002",
            "trainNumber": "12301",
            "name": "HOWRAH RAJDHANI",
            "type": "Rajdhani",
            "class": "Superfast",
            "source": "ST001",
            "destination": "ST003",
            "departureTime": "16:55",
            "arrivalTime": "07:00",
            "duration": "14h 05m",
            "runningDays": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
            "classes": [
                {
                    "class": "1A",
                    "name": "First AC",
                    "available": 18,
                    "fare": 4250,
                    "totalSeats": 18
                },
                {
                    "class": "2A",
                    "name": "Second AC",
                    "available": 42,
                    "fare": 2450,
                    "totalSeats": 42
                },
                {
                    "class": "3A",
                    "name": "Third AC",
                    "available": 64,
                    "fare": 1750,
                    "totalSeats": 64
                }
            ],
            "route": [
                {
                    "station": "ST001",
                    "arrival": "-",
                    "departure": "16:55",
                    "day": 1,
                    "distance": 0
                },
                {
                    "station": "ST007",
                    "arrival": "02:30",
                    "departure": "02:35",
                    "day": 2,
                    "distance": 997
                },
                {
                    "station": "ST003",
                    "arrival": "07:00",
                    "departure": "-",
                    "day": 2,
                    "distance": 1442
                }
            ]
        },
        {
            "id": "TR003",
            "trainNumber": "12627",
            "name": "KARNATAKA EXPRESS",
            "type": "Express",
            "class": "Superfast",
            "source": "ST001",
            "destination": "ST004",
            "departureTime": "20:30",
            "arrivalTime": "06:30",
            "duration": "34h 00m",
            "runningDays": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
            "classes": [
                {
                    "class": "1A",
                    "name": "First AC",
                    "available": 16,
                    "fare": 3850,
                    "totalSeats": 16
                },
                {
                    "class": "2A",
                    "name": "Second AC",
                    "available": 36,
                    "fare": 2250,
                    "totalSeats": 36
                },
                {
                    "class": "3A",
                    "name": "Third AC",
                    "available": 54,
                    "fare": 1550,
                    "totalSeats": 54
                },
                {
                    "class": "SL",
                    "name": "Sleeper",
                    "available": 120,
                    "fare": 650,
                    "totalSeats": 120
                }
            ],
            "route": [
                {
                    "station": "ST001",
                    "arrival": "-",
                    "departure": "20:30",
                    "day": 1,
                    "distance": 0
                },
                {
                    "station": "ST008",
                    "arrival": "06:15",
                    "departure": "06:25",
                    "day": 2,
                    "distance": 512
                },
                {
                    "station": "ST004",
                    "arrival": "06:30",
                    "departure": "-",
                    "day": 3,
                    "distance": 2350
                }
            ]
        },
        // Mumbai Local Style Trains
        {
            "id": "TR004",
            "trainNumber": "90001",
            "name": "MUMBAI CSMT - KALYAN FAST",
            "type": "EMU",
            "class": "Local",
            "source": "ST009",
            "destination": "ST012",
            "departureTime": "07:15",
            "arrivalTime": "08:30",
            "duration": "1h 15m",
            "runningDays": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
            "classes": [
                {
                    "class": "SL",
                    "name": "Second Class",
                    "available": 0,
                    "fare": 10,
                    "totalSeats": 0
                },
                {
                    "class": "1A",
                    "name": "First Class",
                    "available": 0,
                    "fare": 20,
                    "totalSeats": 0
                }
            ],
            "route": [
                {
                    "station": "ST009",
                    "arrival": "-",
                    "departure": "07:15",
                    "day": 1,
                    "distance": 0
                },
                {
                    "station": "ST010",
                    "arrival": "07:22",
                    "departure": "07:23",
                    "day": 1,
                    "distance": 3
                },
                {
                    "station": "ST011",
                    "arrival": "07:30",
                    "departure": "07:31",
                    "day": 1,
                    "distance": 9
                },
                {
                    "station": "ST012",
                    "arrival": "08:30",
                    "departure": "-",
                    "day": 1,
                    "distance": 54
                }
            ]
        },
        {
            "id": "TR005",
            "trainNumber": "90002",
            "name": "BORIVALI - VIRAR SLOW",
            "type": "EMU",
            "class": "Local",
            "source": "ST013",
            "destination": "ST014",
            "departureTime": "08:45",
            "arrivalTime": "09:45",
            "duration": "1h 00m",
            "runningDays": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
            "classes": [
                {
                    "class": "SL",
                    "name": "Second Class",
                    "available": 0,
                    "fare": 5,
                    "totalSeats": 0
                },
                {
                    "class": "1A",
                    "name": "First Class",
                    "available": 0,
                    "fare": 10,
                    "totalSeats": 0
                }
            ],
            "route": [
                {
                    "station": "ST013",
                    "arrival": "-",
                    "departure": "08:45",
                    "day": 1,
                    "distance": 0
                },
                {
                    "station": "ST014",
                    "arrival": "09:45",
                    "departure": "-",
                    "day": 1,
                    "distance": 28
                }
            ]
        },
        {
            "id": "TR006",
            "trainNumber": "12953",
            "name": "MUMBAI CENTRAL - AHMEDABAD DURONTO",
            "type": "Duronto",
            "class": "Superfast",
            "source": "ST002",
            "destination": "ST006",
            "departureTime": "23:15",
            "arrivalTime": "06:45",
            "duration": "7h 30m",
            "runningDays": ["Monday", "Wednesday", "Friday", "Sunday"],
            "classes": [
                {
                    "class": "1A",
                    "name": "First AC",
                    "available": 20,
                    "fare": 3200,
                    "totalSeats": 20
                },
                {
                    "class": "2A",
                    "name": "Second AC",
                    "available": 40,
                    "fare": 1850,
                    "totalSeats": 40
                },
                {
                    "class": "3A",
                    "name": "Third AC",
                    "available": 60,
                    "fare": 1250,
                    "totalSeats": 60
                },
                {
                    "class": "SL",
                    "name": "Sleeper",
                    "available": 100,
                    "fare": 450,
                    "totalSeats": 100
                }
            ],
            "route": [
                {
                    "station": "ST002",
                    "arrival": "-",
                    "departure": "23:15",
                    "day": 1,
                    "distance": 0
                },
                {
                    "station": "ST006",
                    "arrival": "06:45",
                    "departure": "-",
                    "day": 2,
                    "distance": 491
                }
            ]
        }
    ],

    "bookings": [
        {
            "id": "BK001",
            "pnr": "PNR123456",
            "trainId": "TR001",
            "trainNumber": "12951",
            "trainName": "MUMBAI RAJDHANI",
            "source": "ST002",
            "destination": "ST001",
            "journeyDate": "2024-02-15",
            "bookingDate": "2024-01-20T10:30:00Z",
            "passengers": [
                {
                    "name": "Rahul Sharma",
                    "age": 28,
                    "gender": "Male",
                    "berth": "Lower",
                    "coach": "A1",
                    "seat": "12",
                    "status": "Confirmed"
                }
            ],
            "class": "3A",
            "totalFare": 1950,
            "status": "Confirmed",
            "paymentStatus": "Paid"
        },
        {
            "id": "BK002",
            "pnr": "PNR789012",
            "trainId": "TR002",
            "trainNumber": "12301",
            "trainName": "HOWRAH RAJDHANI",
            "source": "ST001",
            "destination": "ST003",
            "journeyDate": "2024-02-18",
            "bookingDate": "2024-01-22T14:45:00Z",
            "passengers": [
                {
                    "name": "Priya Patel",
                    "age": 25,
                    "gender": "Female",
                    "berth": "Upper",
                    "coach": "B2",
                    "seat": "24",
                    "status": "Confirmed"
                },
                {
                    "name": "Amit Patel",
                    "age": 30,
                    "gender": "Male",
                    "berth": "Lower",
                    "coach": "B2",
                    "seat": "25",
                    "status": "Confirmed"
                }
            ],
            "class": "2A",
            "totalFare": 4900,
            "status": "Confirmed",
            "paymentStatus": "Paid"
        }
    ],


    "seatAvailability": [
        {
            "trainId": "TR001",
            "date": "2024-02-15",
            "classes": [
                {
                    "class": "1A",
                    "available": 20,
                    "waitlist": 0,
                    "rac": 0,
                    "totalSeats": 24
                },
                {
                    "class": "2A",
                    "available": 45,
                    "waitlist": 0,
                    "rac": 0,
                    "totalSeats": 48
                },
                {
                    "class": "3A",
                    "available": 68,
                    "waitlist": 0,
                    "rac": 0,
                    "totalSeats": 72
                }
            ]
        },
        {
            "trainId": "TR002",
            "date": "2024-02-18",
            "classes": [
                {
                    "class": "1A",
                    "available": 15,
                    "waitlist": 0,
                    "rac": 0,
                    "totalSeats": 18
                },
                {
                    "class": "2A",
                    "available": 38,
                    "waitlist": 0,
                    "rac": 0,
                    "totalSeats": 42
                },
                {
                    "class": "3A",
                    "available": 60,
                    "waitlist": 0,
                    "rac": 0,
                    "totalSeats": 64
                }
            ]
        },
        {
            "trainId": "TR003",
            "date": "2024-02-20",
            "classes": [
                {
                    "class": "1A",
                    "available": 12,
                    "waitlist": 0,
                    "rac": 0,
                    "totalSeats": 16
                },
                {
                    "class": "2A",
                    "available": 30,
                    "waitlist": 0,
                    "rac": 0,
                    "totalSeats": 36
                },
                {
                    "class": "3A",
                    "available": 48,
                    "waitlist": 0,
                    "rac": 0,
                    "totalSeats": 54
                },
                {
                    "class": "SL",
                    "available": 110,
                    "waitlist": 0,
                    "rac": 0,
                    "totalSeats": 120
                }
            ]
        },
        {
            "trainId": "TR006",
            "date": "2024-02-16",
            "classes": [
                {
                    "class": "1A",
                    "available": 18,
                    "waitlist": 0,
                    "rac": 0,
                    "totalSeats": 20
                },
                {
                    "class": "2A",
                    "available": 35,
                    "waitlist": 0,
                    "rac": 0,
                    "totalSeats": 40
                },
                {
                    "class": "3A",
                    "available": 55,
                    "waitlist": 0,
                    "rac": 0,
                    "totalSeats": 60
                },
                {
                    "class": "SL",
                    "available": 95,
                    "waitlist": 0,
                    "rac": 0,
                    "totalSeats": 100
                }
            ]
        }
    ],

    "fareRules": {
        "cancellationCharges": [
            {
                "hoursBeforeDeparture": 48,
                "chargePercentage": 25
            },
            {
                "hoursBeforeDeparture": 12,
                "chargePercentage": 50
            },
            {
                "hoursBeforeDeparture": 4,
                "chargePercentage": 75
            },
            {
                "hoursBeforeDeparture": 0,
                "chargePercentage": 100
            }
        ],
        "refundRules": [
            {
                "status": "Confirmed",
                "refundPercentage": 100,
                "minimumHours": 48
            },
            {
                "status": "RAC",
                "refundPercentage": 50,
                "minimumHours": 24
            },
            {
                "status": "Waitlist",
                "refundPercentage": 100,
                "minimumHours": 0
            }
        ]
    },

    "appSettings": {
        "version": "1.0.0",
        "supportedLanguages": ["English", "Hindi", "Tamil", "Telugu", "Bengali", "Marathi", "Gujarati"],
        "paymentMethods": ["UPI", "Credit Card", "Debit Card", "Net Banking", "Wallet"],
        "maxPassengersPerBooking": 6,
        "advanceBookingDays": 120,
        "localTrainBooking": false
    }
};

// API Response Structure Examples
export const apiResponses = {
    searchTrains: {
        endpoint: "/api/trains/search",
        method: "POST",
        request: {
            source: "ST002",
            destination: "ST001",
            date: "2024-02-15",
            class: "3A"
        },
        response: {
            success: true,
            data: {
                trains: [
                    {
                        trainId: "TR001",
                        trainNumber: "12951",
                        trainName: "MUMBAI RAJDHANI",
                        departureTime: "16:25",
                        arrivalTime: "08:35",
                        duration: "16h 10m",
                        availableSeats: 68,
                        fare: 1950,
                        classes: ["1A", "2A", "3A"]
                    }
                ],
                totalResults: 1
            }
        }
    },

    getSeatAvailability: {
        endpoint: "/api/trains/availability",
        method: "GET",
        request: {
            trainId: "TR001",
            date: "2024-02-15"
        },
        response: {
            success: true,
            data: {
                trainId: "TR001",
                date: "2024-02-15",
                availability: {
                    "1A": { available: 20, waitlist: 0, rac: 0 },
                    "2A": { available: 45, waitlist: 0, rac: 0 },
                    "3A": { available: 68, waitlist: 0, rac: 0 }
                }
            }
        }
    },

    createBooking: {
        endpoint: "/api/bookings/create",
        method: "POST",
        request: {
            trainId: "TR001",
            journeyDate: "2024-02-15",
            class: "3A",
            passengers: [
                {
                    name: "Rahul Sharma",
                    age: 28,
                    gender: "Male"
                }
            ],
            paymentMethod: "UPI"
        },
        response: {
            success: true,
            data: {
                bookingId: "BK001",
                pnr: "PNR123456",
                status: "Confirmed",
                totalFare: 1950,
                passengers: [
                    {
                        name: "Rahul Sharma",
                        coach: "A1",
                        seat: "12",
                        status: "Confirmed"
                    }
                ]
            }
        }
    }
};

export default dummyData;