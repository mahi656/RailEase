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
            "code": "MUMBAI",
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
                    "fare": 4850
                },
                {
                    "class": "2A",
                    "name": "Second AC",
                    "available": 48,
                    "fare": 2850
                },
                {
                    "class": "3A",
                    "name": "Third AC",
                    "available": 72,
                    "fare": 1950
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
                    "fare": 4250
                },
                {
                    "class": "2A",
                    "name": "Second AC",
                    "available": 42,
                    "fare": 2450
                },
                {
                    "class": "3A",
                    "name": "Third AC",
                    "available": 64,
                    "fare": 1750
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
                    "fare": 3850
                },
                {
                    "class": "2A",
                    "name": "Second AC",
                    "available": 36,
                    "fare": 2250
                },
                {
                    "class": "3A",
                    "name": "Third AC",
                    "available": 54,
                    "fare": 1550
                },
                {
                    "class": "SL",
                    "name": "Sleeper",
                    "available": 120,
                    "fare": 650
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

    "users": [
        {
            "id": "US001",
            "name": "Rahul Sharma",
            "email": "rahul.sharma@email.com",
            "phone": "+919876543210",
            "dateOfBirth": "1995-08-15",
            "gender": "Male",
            "idProof": {
                "type": "Aadhar",
                "number": "1234-5678-9012"
            },
            "bookings": ["BK001"]
        },
        {
            "id": "US002",
            "name": "Priya Patel",
            "email": "priya.patel@email.com",
            "phone": "+919876543211",
            "dateOfBirth": "1998-03-22",
            "gender": "Female",
            "idProof": {
                "type": "PAN",
                "number": "ABCDE1234F"
            },
            "bookings": ["BK002"]
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
                    "rac": 0
                },
                {
                    "class": "2A",
                    "available": 45,
                    "waitlist": 0,
                    "rac": 0
                },
                {
                    "class": "3A",
                    "available": 68,
                    "waitlist": 0,
                    "rac": 0
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
                    "rac": 0
                },
                {
                    "class": "2A",
                    "available": 38,
                    "waitlist": 0,
                    "rac": 0
                },
                {
                    "class": "3A",
                    "available": 60,
                    "waitlist": 0,
                    "rac": 0
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
        "supportedLanguages": ["English", "Hindi", "Tamil", "Telugu", "Bengali"],
        "paymentMethods": ["UPI", "Credit Card", "Debit Card", "Net Banking", "Wallet"],
        "maxPassengersPerBooking": 6,
        "advanceBookingDays": 120
    }
};

export default dummyData;