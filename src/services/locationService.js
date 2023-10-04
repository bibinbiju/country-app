import { LocationRequest } from "../utils/request";

const LocationService = {
  getCountries: () =>
    LocationRequest.get(
      "/arcgis/rest/services/World/geoenrichmentserver/Geoenrichment/countries?f=pjson"
    ),
};
export default LocationService;
