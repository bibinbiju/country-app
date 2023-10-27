import "./pagination.scss";
function Pagination({
  totalCount = 6,
  limit = 5,
  page = 1,
  siblingCount = 2,
  skipDash = "...",
  onChange = (n) => {
    console.info("Page " + n + " invoked");
  },
}) {
  const totalPages = Math.ceil(totalCount / limit);
  const currentPage = page > totalPages ? totalPages : page < 1 ? 1 : page;

  if (totalPages <= 0) return null;
  let seekPages = [currentPage];

  if (totalPages > 0) {
    // let maxSiblingNo = siblingCount;
    // if((page-siblingCount)<=1) maxSiblingNo = maxSiblingNo+1+(page-siblingCount);

    for (let i = 0; i < siblingCount + 1; i++) {
      if (seekPages.at(0) > 1) {
        seekPages.unshift(seekPages.at(0) - 1);
      } else if (seekPages.at(-1) < totalPages)
        seekPages.push(seekPages.at(-1) + 1);

      if (seekPages.at(-1) < totalPages) {
        seekPages.push(seekPages.at(-1) + 1);
      } else if (seekPages.at(0) > 1) seekPages.unshift(seekPages.at(0) - 1);
    }
  }

  if (seekPages.at(0) > 1) {
    seekPages.unshift(1);
  }
  if (seekPages.at(-1) < totalPages) {
    seekPages.push(totalPages);
  }

  return (
    <div className="pagination-content-wrapper">
      <button
        disabled={currentPage <= 1}
        className="prev-button"
        onClick={() => onChange(currentPage - 1)}
      >
        &laquo;
      </button>
      {seekPages.reduce((prevValue, currentValue, currentIndex, seekArr) => {
        if (
          currentIndex > 0 &&
          currentValue - seekArr.at(currentIndex - 1) > 1
        ) {
          prevValue.push(
            <div key={`skip-line-${currentIndex}`} className="skip-line">
              {skipDash}
            </div>
          );
        }
        prevValue.push(
          <button
            key={currentIndex}
            onClick={() => {
              if (currentValue !== skipDash) onChange(currentValue);
            }}
            className={`prev-button ${
              currentValue === currentPage ? "active" : ""
            }`}
          >
            {currentValue === skipDash ? skipDash : currentValue}
          </button>
        );
        return prevValue;
      }, [])}
      <button
        disabled={currentPage >= totalPages}
        className="next-button"
        onClick={() => onChange(currentPage + 1)}
      >
        &raquo;
      </button>
    </div>
  );
}
export default Pagination;
