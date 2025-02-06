export const clinicsData = [
  {
    id: 1,
    name: "Healthy Paws SF",
    location: {
      city: "San Francisco",
      state: "CA",
      address: "123 Pet Care Lane",
      zip: "94105",
      coordinates: {
        latitude: 37.7749,
        longitude: -122.4194
      }
    },
    rating: 4.8,
    waitTime: "15 mins",
    services: ["General Care", "Surgery", "Dental"],
    doctors: 5,
    isOpen: true
  },
  {
    id: 2,
    name: "Manhattan Pet Hospital",
    location: {
      city: "New York",
      state: "NY",
      address: "456 Vet Street",
      zip: "10001",
      coordinates: {
        latitude: 40.7128,
        longitude: -74.0060
      }
    },
    rating: 4.9,
    waitTime: "20 mins",
    services: ["Emergency Care", "General Care", "Dental"],
    doctors: 8,
    isOpen: true
  },
  {
    id: 3,
    name: "Chicago Pet Wellness",
    location: {
      city: "Chicago",
      state: "IL",
      address: "789 Animal Ave",
      zip: "60601",
      coordinates: {
        latitude: 41.8781,
        longitude: -87.6298
      }
    },
    rating: 4.7,
    waitTime: "10 mins",
    services: ["General Care", "Vaccination", "Grooming"],
    doctors: 4,
    isOpen: true
  }
];
