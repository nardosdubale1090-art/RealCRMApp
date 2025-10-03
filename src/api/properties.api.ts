// /src/api/properties.api.ts

import httpClient from './httpClient';
import { mockSites } from '../mocks/properties.data';
import type { Site, Building, Unit } from '../types';

const API_DELAY = 500; // 500ms delay to simulate network

export const getSites = (): Promise<Site[]> => {
  console.log('API: Fetching all sites...');
  return new Promise(resolve => {
    setTimeout(() => {
      // Return sites without their buildings for lazy loading
      const sitesWithoutChildren = mockSites.map(({ buildings, ...site }) => site);
      console.log('API: Returning sites.', sitesWithoutChildren);
      resolve(sitesWithoutChildren);
    }, API_DELAY);
  });
};

export const getBuildings = (siteId: string): Promise<Building[]> => {
  console.log(`API: Fetching buildings for siteId: ${siteId}`);
  return new Promise(resolve => {
    setTimeout(() => {
      const site = mockSites.find(s => s.id === siteId);
      if (site && site.buildings) {
        // Return buildings without their units for lazy loading
        const buildingsWithoutChildren = site.buildings.map(({ units, ...building }) => building);
        console.log('API: Returning buildings.', buildingsWithoutChildren);
        resolve(buildingsWithoutChildren);
      } else {
        resolve([]);
      }
    }, API_DELAY);
  });
};

export const getUnits = (buildingId: string): Promise<Unit[]> => {
  console.log(`API: Fetching units for buildingId: ${buildingId}`);
  return new Promise(resolve => {
    setTimeout(() => {
      let units: Unit[] = [];
      for (const site of mockSites) {
        const building = site.buildings?.find(b => b.id === buildingId);
        if (building && building.units) {
          units = building.units;
          break;
        }
      }
      console.log('API: Returning units.', units);
      resolve(units);
    }, API_DELAY);
  });
};

export const getAllUnitsWithParentInfo = (): Promise<Unit[]> => {
  console.log('API: Fetching all units for grid view...');
  return new Promise(resolve => {
    setTimeout(() => {
        const allUnits: Unit[] = [];
        mockSites.forEach(site => {
            site.buildings?.forEach(building => {
                building.units?.forEach(unit => {
                    allUnits.push({
                        ...unit,
                        parentInfo: {
                            siteId: site.id,
                            siteName: site.name,
                            buildingName: building.name,
                            location: site.location,
                        }
                    });
                });
            });
        });
        console.log('API: Returning all units with parent info.', allUnits);
        resolve(allUnits);
    }, API_DELAY + 200); // slightly longer delay for "heavier" query
  });
};

// --- Details Page APIs ---

export const getSiteDetails = (id: string): Promise<Site | undefined> => {
    console.log(`API: Fetching details for site ${id}`);
    return new Promise(resolve => {
        setTimeout(() => {
            // In a real API, you'd fetch the site and its buildings in one call
            const site = mockSites.find(s => s.id === id);
            resolve(site);
        }, API_DELAY);
    });
};

export const getBuildingDetails = (id: string): Promise<{ building: Building; site: Site } | undefined> => {
    console.log(`API: Fetching details for building ${id}`);
     return new Promise(resolve => {
        setTimeout(() => {
            for (const site of mockSites) {
                const building = site.buildings?.find(b => b.id === id);
                if (building) {
                    const siteInfo = { ...site, buildings: undefined }; // Don't need full site children
                    resolve({ building, site: siteInfo });
                    return;
                }
            }
            resolve(undefined);
        }, API_DELAY);
    });
};

export const getUnitDetails = (id: string): Promise<{ unit: Unit; building: Building; site: Site } | undefined> => {
    console.log(`API: Fetching details for unit ${id}`);
     return new Promise(resolve => {
        setTimeout(() => {
            for (const site of mockSites) {
                for (const building of site.buildings || []) {
                    const unit = building.units?.find(u => u.id === id);
                    if (unit) {
                        const siteInfo = { ...site, buildings: undefined };
                        const buildingInfo = { ...building, units: undefined };
                        resolve({ unit, building: buildingInfo, site: siteInfo });
                        return;
                    }
                }
            }
            resolve(undefined);
        }, API_DELAY);
    });
};


// Mock CRUD operations (in a real app, these would make HTTP requests)
export const createProperty = (type: 'site' | 'building' | 'unit', data: any) => {
    console.log(`API: Creating ${type}`, data);
    return new Promise(resolve => setTimeout(() => resolve({ id: `new_${type}_${Date.now()}`, ...data }), API_DELAY));
}

export const updateProperty = (type: 'site' | 'building' | 'unit', id: string, data: any) => {
    console.log(`API: Updating ${type} ${id}`, data);
    return new Promise(resolve => setTimeout(() => resolve({ id, ...data }), API_DELAY));
}

export const deleteProperty = (type: 'site' | 'building' | 'unit', id: string) => {
    console.log(`API: Deleting ${type} ${id}`);
    return new Promise(resolve => setTimeout(resolve, API_DELAY));
}