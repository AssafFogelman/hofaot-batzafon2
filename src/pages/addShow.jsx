import axios from "axios";
import { Fragment, useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import addShowSchema from "validation/addShow.validation";
import validate from "validation/validate";

const initialAddShowInputs = {
  performanceTitle: "",
  subTitle: "",
  description: "",
  performanceDate: "",
  // url: "",
  // alt: "",
  // deleted because user-side Joi cant stand them being empty. and they are optional.
};

const AddShow = () => {
  const [addShowInputs, setAddShowInputs] = useState(initialAddShowInputs);
  const [inputError, setInputError] = useState({
    performanceTitle: false,
    subTitle: false,
    description: false,
    performanceDate: false,
    url: false,
    alt: false,
  });
  const history = useHistory();

  // const addError = (event) => {
  //   let copyOfInputError = JSON.parse(JSON.stringify(inputError));
  //   copyOfInputError[event.target.id] = true;
  //   setInputError(copyOfInputError);
  // };

  const getTodaysDate = () => {
    let todaysDate = new Date();
    let dd = todaysDate.getDate();
    let mm = todaysDate.getMonth() + 1; //January is 0!
    let yyyy = todaysDate.getFullYear();
    if (dd < 10) {
      dd = "0" + dd;
    }

    if (mm < 10) {
      mm = "0" + mm;
    }

    todaysDate = yyyy + "-" + mm + "-" + dd;

    return todaysDate;
  };

  const changeDateFormat = (oldFormatDate) => {
    /* changing the date format from yyyy-mm-dd to dd/mm/yyyy */
    const dateComponents = oldFormatDate.split("-");
    return (
      dateComponents[2] + "/" + dateComponents[1] + "/" + dateComponents[0]
    );
  };

  const handleInputChange = (event) => {
    let copyOfAddShowInputs = JSON.parse(JSON.stringify(addShowInputs));
    copyOfAddShowInputs[event.target.id] = event.target.value;
    setAddShowInputs(copyOfAddShowInputs);
  };

  const removeErrorAlerts = (event) => {
    let copyOfInputError = JSON.parse(JSON.stringify(inputError));
    copyOfInputError[event.target.id] = false;
    setInputError(copyOfInputError);
  };

  const handleFormSumbit = (event) => {
    event.preventDefault();
    const { error } = validate(addShowInputs, addShowSchema);
    console.log("validation error:", error);
    if (error) {
      setInputError((current) => {
        let copyOfInputError = JSON.parse(JSON.stringify(current));
        for (let field of error.details) {
          /* "field" is either "email" of "password". the word comes from the Joi error object */
          copyOfInputError[field.path[0]] = true;
        }
        return copyOfInputError;
      });
      return;
    }

    /* change the date format before sending the data to the server */
    let show_goodFormat = JSON.parse(
      JSON.stringify({
        ...addShowInputs,
        performanceDate: changeDateFormat(addShowInputs.performanceDate),
      })
    );

    axios
      .post("/cards/", show_goodFormat)
      .then((response) => {
        console.log("the show was added!", response);
        console.log("the show:", show_goodFormat);
        history.push("/myshows");
      })
      .catch((error) => {
        toast.error(
          `an error occured when sending data to the server: ${error.response.data}`,
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
      });
  };

  return (
    <Fragment>
      <h1>הוסף הופעה</h1>
      <form>
        <div className="mb-3">
          <label htmlFor="exampleInputPerfomanceTitle1" className="form-label">
            Perfomance Title
          </label>
          <input
            type="text"
            className="form-control"
            id="performanceTitle"
            aria-describedby="emailHelp"
            value={addShowInputs.performanceTitle}
            onChange={handleInputChange}
            onFocus={removeErrorAlerts}
          />
          {inputError.performanceTitle ? (
            <p style={{ color: "red" }}>not a valid performance title</p>
          ) : (
            ""
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputSubtitle1" className="form-label">
            Subtitle
          </label>
          <input
            type="text"
            className="form-control"
            id="subTitle"
            value={addShowInputs.subTitle}
            onChange={handleInputChange}
            onFocus={removeErrorAlerts}
          />
          {inputError.subTitle ? (
            <p style={{ color: "red" }}>not a valid subtitle</p>
          ) : (
            ""
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputDescription1" className="form-label">
            description
          </label>
          <input
            type="text"
            className="form-control"
            id="description"
            value={addShowInputs.description}
            onChange={handleInputChange}
            onFocus={removeErrorAlerts}
          />
          {inputError.description ? (
            <p style={{ color: "red" }}>not a valid description</p>
          ) : (
            ""
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPerformanceDate1" className="form-label">
            Date of the preformance
          </label>
          <input
            type="date"
            min={getTodaysDate()}
            className="form-control"
            id="performanceDate"
            value={addShowInputs.performanceDate}
            onChange={handleInputChange}
            onFocus={removeErrorAlerts}
            // onInvalid={addError}
          />

          {inputError.performanceDate ? (
            <p style={{ color: "red" }}>not a valid Date</p>
          ) : (
            ""
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="url" className="form-label">
            background picture for the preformance ad
          </label>
          <p>*optional</p>
          <input
            type="text"
            className="form-control"
            id="url"
            value={addShowInputs.url}
            onChange={handleInputChange}
            onFocus={removeErrorAlerts}
          />
          {inputError.url ? (
            <p style={{ color: "red" }}>not a valid url</p>
          ) : (
            ""
          )}
        </div>

        <div className={addShowInputs.url ? "mb-3" : "d-none"}>
          <label htmlFor="alt" className="form-label">
            description of the picture chosen
          </label>
          <p>*optional</p>
          <input
            type="text"
            className="form-control"
            id="alt"
            value={addShowInputs.alt}
            onChange={handleInputChange}
            onFocus={removeErrorAlerts}
          />
          {inputError.url ? (
            <p style={{ color: "red" }}>not a valid url</p>
          ) : (
            ""
          )}
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={handleFormSumbit}
        >
          Submit
        </button>
      </form>
    </Fragment>
  );
};

export default AddShow;
