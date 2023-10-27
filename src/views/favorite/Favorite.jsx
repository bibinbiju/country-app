import React, { useCallback, useEffect, useMemo, useState } from "react";
import { CountryCard } from "../../components/cards";
import { ModalService } from "../../components/modal/ModalRoot";
import CountryDetail from "../home/CountryDetail";
import Auth from "../../utils/auth";
import LocationService from "../../services/locationService";
import "./favorite.scss";
import Pagination from "../../components/pagination/Pagination";
const PAGE_LIMIT = 5;
const Favorite = () => {
  const [favoriteList, setFavoriteList] = useState([]);
  const [allCountries, setAllCountries] = useState([]);
  const [page, setPage] = useState(1);

  const updateFavoriteLIst = useCallback(async () => {
    const fav = Auth.getCurrentUserDetail()?.favorites || [];
    if (Array.isArray(fav)) {
      setFavoriteList(allCountries?.filter?.((d) => fav.includes(d.id)) || []);
    }
  }, [allCountries]);
  useEffect(() => {
    let ignore = false;
    const getCountries = async () => {
      try {
        const res = await LocationService.getCountries();
        if (!ignore && res?.status === 200) {
          setAllCountries(res?.data?.countries || []);
        }
      } catch (error) {
        console.error("API ERROR 💥", error);
      }
      // let newFavList = fav.map
    };
    getCountries();
    return () => {
      ignore = true;
    };
  }, []);
  useEffect(() => {
    updateFavoriteLIst();
  }, [updateFavoriteLIst]);
  const toggleFavorite = (countryId) => {
    const currentUser = Auth.getCurrentUserDetail();
    let favorites = currentUser?.favorites || [];
    if (favorites.includes(countryId)) {
      favorites.splice(favorites.indexOf(countryId), 1);
    }
    if (Math.ceil(favorites.length / PAGE_LIMIT) !== page) {
      setPage((prev) => (prev > 1 ? prev - 1 : 1));
    }
    Auth.updateCurrentUser({ favorites });
    updateFavoriteLIst(favorites);
  };
  const selectListData = useMemo(() => {
    const startOffset = page - 1 <= 0 ? 0 : (page - 1) * PAGE_LIMIT;
    return favoriteList.slice(startOffset, startOffset + PAGE_LIMIT);
  }, [page, favoriteList]);
  return (
    <div className="favorite-wrapper">
      <h3>Favorites</h3>
      <div className="content-container">
        <div className="card-wrapper">
          {Array.isArray(selectListData) && selectListData.length > 0 ? (
            selectListData.map((eachItem) => (
              <CountryCard
                key={eachItem.id}
                data={eachItem}
                isFavorite
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
            ))
          ) : (
            <div className="empty-box">No Favorites</div>
          )}
        </div>
        <Pagination
          page={page}
          limit={PAGE_LIMIT}
          totalCount={favoriteList?.length || 0}
          onChange={setPage}
        />
      </div>
    </div>
  );
};
export default Favorite;
