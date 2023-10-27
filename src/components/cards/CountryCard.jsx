import "./countryCard.scss";
const CountryCard = ({ data, isFavorite = false, onFavBtnClick, onClick }) => {
  return (
    <div key={data.id} className="card-item" onClick={onClick}>
      <div className="title-wrapper">
        <h4 title={data.name}>{data.name}</h4>
        <i
          title={isFavorite ? "Remove from Favorites" : "Add to Favorites"}
          onClick={(e) => {
            e.stopPropagation();
            onFavBtnClick(data.id);
          }}
          className={`${isFavorite ? "fa-solid" : "fa-regular"} fa-star`}
        ></i>
      </div>
      <div className="desc">
        <div className="item-group">
          <h5>Continent</h5>:<p>{data?.continent}</p>
        </div>
        <div className="item-group">
          <h5>Currency</h5>:<p>{data?.currencySymbol}</p>
        </div>
      </div>
    </div>
  );
};
export default CountryCard;
