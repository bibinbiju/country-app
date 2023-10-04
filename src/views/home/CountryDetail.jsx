import "./countryDetail.scss";
const CountryDetail = ({ data }) => {
  return (
    <div className="country-detail-wrapper">
      <div className="country-content">
        <div className="form-group">
          <label>Name</label>
          <div className="form-input">{data?.name || ""}</div>
        </div>
        <div className="form-group">
          <label>Country Code</label>
          <div className="form-input">{data?.id}</div>
        </div>
        <div className="form-group">
          <label>Continent</label>
          <div className="form-input">{data?.continent}</div>
        </div>
        <div className="form-group">
          <label>Currency</label>
          <div className="form-input">{`${data?.currencyName} (${data?.currencySymbol})`}</div>
        </div>
        <div className="form-group">
          <label>Unit of Distance</label>
          <div className="form-input">{data?.distanceUnits}</div>
        </div>
      </div>
    </div>
  );
};
export default CountryDetail;
