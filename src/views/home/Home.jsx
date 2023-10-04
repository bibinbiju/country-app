import { useEffect, useMemo, useState } from "react";
import "./home.scss";
import LocationService from "../../services/locationService";
import Auth from "../../utils/auth";
import { CountryCard } from "../../components/cards";
import { ModalService } from "../../components/modal/ModalRoot";
import CountryDetail from "./CountryDetail";
const Home = () => {
  const [countriesList, setCountriesList] = useState([]);
  const [selectedContinent, setSelectedContinent] = useState(null);
  const [favorites, setFavorites] = useState(
    Auth.getCurrentUserDetail()?.favorites || []
  );

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
                onClick={() => setSelectedContinent(eachItem)}
              >
                {eachItem}
              </li>
            ))}
          </ul>
        </div>
        <div className="country-detail">
          <div className="card-wrapper">
            {selectedContinentCountriesList.map((eachItem) => (
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
        </div>
      </div>
    </div>
  );
};
export default Home;
const getFilteredCountries = (countriesList, continent) =>
  countriesList.filter((d) => d.continent === continent);
