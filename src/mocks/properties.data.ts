import type { Site } from '../types';

export const mockSites: Site[] = [
  {
    id: 'site_1',
    name: 'Sunset Villas',
    location: 'Addis Ababa, Bole',
    address: '123 Sunshine Avenue',
    imageUrl: 'https://picsum.photos/seed/site1/800/600',
    buildingCount: 2,
    buildings: [
      {
        id: 'bld_1_1',
        name: 'Tower A',
        floors: 12,
        siteId: 'site_1',
        unitCount: 3,
        units: [
          { 
            id: 'unit_1_1_1', name: 'Apartment 101', type: '2BR', price: 250000, status: 'Available', floor: 1, buildingId: 'bld_1_1',
            area: 120, bedrooms: 2, bathrooms: 2, imageUrl: 'https://picsum.photos/seed/unit1/400/300' 
          },
          { 
            id: 'unit_1_1_2', name: 'Apartment 102', type: 'Studio', price: 180000, status: 'Rented', floor: 1, buildingId: 'bld_1_1',
            area: 75, bedrooms: 1, bathrooms: 1, imageUrl: 'https://picsum.photos/seed/unit2/400/300'
          },
          { 
            id: 'unit_1_1_3', name: 'Penthouse 1201', type: 'Penthouse', price: 750000, status: 'Sold', floor: 12, buildingId: 'bld_1_1',
            area: 350, bedrooms: 4, bathrooms: 5, imageUrl: 'https://picsum.photos/seed/unit3/400/300'
          },
        ],
      },
      {
        id: 'bld_1_2',
        name: 'Tower B',
        floors: 10,
        siteId: 'site_1',
        unitCount: 2,
        units: [
           { 
            id: 'unit_1_2_1', name: 'Apartment B-101', type: '3BR+', price: 320000, status: 'Available', floor: 1, buildingId: 'bld_1_2',
            area: 150, bedrooms: 3, bathrooms: 2, imageUrl: 'https://picsum.photos/seed/unit4/400/300'
          },
          { 
            id: 'unit_1_2_2', name: 'Apartment B-102', type: '1BR', price: 210000, status: 'Under Maintenance', floor: 1, buildingId: 'bld_1_2',
            area: 85, bedrooms: 1, bathrooms: 1, imageUrl: 'https://picsum.photos/seed/unit5/400/300'
          },
        ]
      },
    ],
  },
  {
    id: 'site_2',
    name: 'Bole Commercial Hub',
    location: 'Addis Ababa, CMC',
    address: '456 Business Road',
    imageUrl: 'https://picsum.photos/seed/site2/800/600',
    buildingCount: 1,
    buildings: [
        {
            id: 'bld_2_1',
            name: 'Main Complex',
            floors: 5,
            siteId: 'site_2',
            unitCount: 2,
            units: [
                { 
                    id: 'unit_2_1_1', name: 'Office Suite 205', type: 'Office', price: 50000, status: 'Available', floor: 2, buildingId: 'bld_2_1',
                    area: 200, bedrooms: 0, bathrooms: 2, imageUrl: 'https://picsum.photos/seed/unit6/400/300'
                },
                { 
                    id: 'unit_2_1_2', name: 'Retail Space G-02', type: 'Shop', price: 35000, status: 'Rented', floor: 0, buildingId: 'bld_2_1',
                    area: 100, bedrooms: 0, bathrooms: 1, imageUrl: 'https://picsum.photos/seed/unit7/400/300'
                },
            ]
        }
    ]
  },
   {
    id: 'site_3',
    name: 'Lakeside Residences',
    location: 'Bishoftu',
    address: '789 Waterfront Drive',
    imageUrl: 'https://picsum.photos/seed/site3/800/600',
    buildingCount: 0,
    buildings: []
  },
];
