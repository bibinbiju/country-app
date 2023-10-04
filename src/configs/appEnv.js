const APP_ENV = {
  API_LOCATION_URL:
    process.env.REACT_APP_API_LOCATION_URL ||
    "https://geoenrich.arcgis.com/arcgis/rest/services/World/geoenrichmentserver/Geoenrichment/countries?f=pjson",
};
export default APP_ENV;
