import axios from "axios";
import ShowCard from "components/showCard";
import { Fragment, useEffect, useState } from "react";
import { toast } from "react-toastify";

//showsCarbonCopy is used for filtering and sorting - getting back to the first phase.
let showsCarbonCopy = [];

const MyShows = () => {
  const [showsArray, setShowsArray] = useState([]);

  const [filterInput, setFilterInput] = useState({
    filterCategory: "performanceTitle",
    filterValue: "",
  });

  const [sortInput, setSortInput] = useState({
    sortCategory: "performanceDate",
    sortOrder: "ascending",
  });

  useEffect(() => {
    (async () => {
      try {
        let { data } = await axios.get("/cards/my-cards");
        setShowsArray(data);
        showsCarbonCopy = data;
      } catch (error) {
        console.log("error", error);
        toast.error(
          `could not retrieve data from server: ${error.response.statusText}`,
          {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          }
        );
      }
      //sort the array automatically by initial instructions
      handleSortChange();
    })();
  }, []);

  const handleSortChange = (event) => {
    let inputCopy = { ...sortInput };
    if (event) {
      inputCopy[event.target.id] = event.target.value;
      setSortInput(inputCopy);
    }
    // filtering

    //make a usable copy of the Shows Carbon Copy

    let showsArrayCopy = JSON.parse(JSON.stringify(showsCarbonCopy));

    //sort

    showsArrayCopy.sort((a, b) => {
      let sortOrderMultiplier = 1;
      //the default order is ascending
      if (inputCopy.sortOrder === "descending") sortOrderMultiplier = -1;

      //if we sort by date
      if (inputCopy.sortCategory === "performanceDate") {
        let [dda, mma, yyyya] = a.performanceDate.split("/");
        let [ddb, mmb, yyyyb] = b.performanceDate.split("/");
        if (+yyyya > +yyyyb) return sortOrderMultiplier;
        if (+yyyya < +yyyyb) return -sortOrderMultiplier;
        if (+mma > +mmb) return sortOrderMultiplier;
        if (+mma < +mmb) return -sortOrderMultiplier;
        if (+dda > +ddb) return sortOrderMultiplier;
        if (+dda < +ddb) return -sortOrderMultiplier;
        return 0;
      }

      //if we sort by any other category
      if (a[inputCopy.sortCategory] > b[inputCopy.sortCategory])
        return sortOrderMultiplier;
      if (a[inputCopy.sortCategory] < b[inputCopy.sortCategory])
        return -sortOrderMultiplier;
      return 0;
    });

    //if this is the loading of the page (no event), make the carbon copy sorted.
    if (!event) showsCarbonCopy = JSON.parse(JSON.stringify(showsArrayCopy));

    //update showArray state
    setShowsArray(showsArrayCopy);
  };

  const handleFilterChange = (event) => {
    let inputCopy = { ...filterInput };
    inputCopy[event.target.id] = event.target.value;
    setFilterInput(inputCopy);

    // filtering

    //create a regex pattern.
    let regex = new RegExp(inputCopy.filterValue, "i");

    /*! will this work with dates? 
        how do we add globl search? */

    //make a usable copy of the Shoes Carbon Copy

    let showsArrayCopy = JSON.parse(JSON.stringify(showsCarbonCopy));

    setShowsArray(
      showsArrayCopy.filter((show) =>
        //inputCopy is the updated "filterInput". the state simply hasn't updated yet. so we use a copy.
        //filterCategory - stores the filter category. the name is the key in the show item to be sorted by.
        regex.test(show[inputCopy.filterCategory])
      )
    );
  };

  const deleteCard = async (cardId) => {
    setShowsArray((current) => current.filter((show) => show._id !== cardId));
    axios.delete(`/cards/${cardId}`);
  };

  return (
    <Fragment>
      <h1 className="">ההופעות שלי</h1>

      {/* filter */}
      <div className="row g-2 m-4">
        <div className="col-md">
          <div className="form-floating ">
            <select
              className="form-select bg-info bg-opacity-25"
              id="filterCategory"
              value={filterInput.filterCategory}
              onChange={handleFilterChange}
            >
              <option value="performanceTitle">שם ההופעה</option>
              <option value="performanceDate">תאריך</option>
              <option value="bizName">מועדון</option>
            </select>
            <label htmlFor="filterCategory">סנן לפי:</label>
          </div>
        </div>
        <div className="col-md">
          <div className="form-floating">
            <input
              type="text"
              className="form-control bg-info bg-opacity-25"
              id="filterValue"
              placeholder="ביטוי לסינון"
              value={filterInput.filterValue}
              onChange={handleFilterChange}
            />
            <label htmlFor="floatingInputGrid">ביטוי לסינון</label>
          </div>
        </div>
      </div>

      {/* sort */}

      <div className="row g-2 m-4">
        <div className="col-md">
          <div className="form-floating">
            <select
              className="form-select bg-success bg-opacity-25"
              id="sortCategory"
              value={sortInput.sortCategory}
              onChange={handleSortChange}
            >
              <option value="performanceDate">תאריך</option>
              <option value="performanceTitle">שם ההופעה</option>
              <option value="bizName">מועדון</option>
            </select>
            <label htmlFor="floatingSelectGrid">מיין לפי:</label>
          </div>
        </div>
        <div className="col-md">
          <div className="form-floating">
            <select
              className="form-select bg-success bg-opacity-25"
              id="sortOrder"
              value={sortInput.sortOrder}
              onChange={handleSortChange}
            >
              <option value="ascending">סדר עולה</option>
              <option value="descending">סדר יורד</option>
            </select>
            <label htmlFor="floatingSelectGrid">סדר לפי:</label>
          </div>
        </div>
      </div>

      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-2 g-md-3 ">
        {showsArray.map((show) => {
          return (
            <ShowCard
              show={show}
              key={show._id}
              deleteCard={deleteCard}
              canEdit={true}
            />
          );
        })}
      </div>
    </Fragment>
  );
};

export default MyShows;
