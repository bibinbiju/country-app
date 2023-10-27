import { useEffect, useMemo, useState } from "react";
import "./home.scss";
import LocationService from "../../services/locationService";
import Auth from "../../utils/auth";
import { CountryCard } from "../../components/cards";
import { ModalService } from "../../components/modal/ModalRoot";
import CountryDetail from "./CountryDetail";
import Pagination from "../../components/pagination/Pagination";
const PAGE_LIMIT = 5;

const Home = () => {
  const [countriesList, setCountriesList] = useState([]);
  const [selectedContinent, setSelectedContinent] = useState("Africa");
  const [favorites, setFavorites] = useState(
    Auth.getCurrentUserDetail()?.favorites || []
  );
  const [page, setPage] = useState(1);

  useEffect(() => {
    let ignore = false;
    const getCountries = async () => {
      try {
        const res = await LocationService.getCountries();
        if (!ignore && res?.status === 200) {
          setCountriesList(res?.data?.countries || []);
        }
      } catch (error) {
        console.error("API_ERROR💥", error);
      }
    };
    getCountries();
    return () => {
      ignore = true;
    };
  }, []);
  const continentList = useMemo(
    () =>
      countriesList
        .map((d) => d.continent)
        .filter((data, index, orgArray) => orgArray.indexOf(data) === index)
        .sort(),
    [countriesList]
  );
  const selectedContinentCountriesList = useMemo(
    () => getFilteredCountries(countriesList, selectedContinent),
    [countriesList, selectedContinent]
  );
  const toggleFavorite = (countryId) => {
    const currentUser = Auth.getCurrentUserDetail();
    let favorites = currentUser?.favorites || [];
    if (Array.isArray(favorites)) {
      if (favorites.includes(countryId)) {
        favorites.splice(favorites.indexOf(countryId), 1);
      } else {
        favorites.push(countryId);
      }
    } else {
      favorites = [countryId];
    }
    setFavorites(favorites);
    Auth.updateCurrentUser({ favorites });
  };
  const selectListData = useMemo(() => {
    const startOffset = page - 1 <= 0 ? 0 : (page - 1) * PAGE_LIMIT;
    return selectedContinentCountriesList.slice(
      startOffset,
      startOffset + PAGE_LIMIT
    );
  }, [page, selectedContinentCountriesList]);
  return (
    <div className="home-page-wrapper">
      <h3>Home</h3>
      <div className="country-list-wrapper">
        <div className="continet-list">
          <ul>
            {continentList.map((eachItem) => (
              <li
                key={eachItem}
                className={`${selectedContinent === eachItem && "active"}`}
                onClick={() => {
                  setSelectedContinent(eachItem);
                  setPage(1);
                }}
              >
                {eachItem}
              </li>
            ))}
          </ul>
        </div>
        <div className="country-detail">
          <div className="card-wrapper">
            {selectListData.map((eachItem) => (
              <CountryCard
                key={eachItem.id}
                data={eachItem}
                isFavorite={favorites.includes(eachItem.id)}
                onFavBtnClick={toggleFavorite}
                onClick={() =>
                  ModalService.open(
                    (close) => (
                      <CountryDetail onClose={close} data={eachItem} />
                    ),
                    { header: "Country Detail" }
                  )
                }
              />
            ))}
          </div>
          <Pagination
            page={page}
            limit={PAGE_LIMIT}
            totalCount={selectedContinentCountriesList?.length || 0}
            onChange={setPage}
          />
        </div>
        <dialog>fefdhdf</dialog>
      </div>
    </div>
  );
};
export default Home;
const getFilteredCountries = (countriesList, continent) =>
  countriesList.filter((d) => d.continent === continent);
