import { useEffect } from "react";
import { useState } from "react/cjs/react.development";
import axios from "./../utils/axios";
import "../styles/RowStyle.css";
import { useHistory } from "react-router";

const EditPolicy = props => {
  const [policyId, setPolicyId] = useState(props.history.location.state.id);
  const [policy, setPolicy] = useState();
  const [dateOfPurchase, setDateOfPurchase] = useState();
  const [error, setError] = useState();
  let history = useHistory();
  useEffect(() => {
    axios
      .get("policy/" + policyId, {
        headers: { "Content-Type": "application/json" }
      })
      .then(response => {
        console.log(response.data[0]);
        setError(null);
        setPolicy(response.data[0]);
        let DateOfPurchase = new Date(response.data[0].fields.date_of_purchase);
        setDateOfPurchase(
          DateOfPurchase.getMonth() +
            1 +
            "-" +
            DateOfPurchase.getDate() +
            "-" +
            DateOfPurchase.getFullYear()
        );
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const handleChangeCheckbox = (event, field) => {
    console.log("in click");
    const currentValue = policy.fields[field];
    console.log(currentValue);
    let newPolicy = policy;
    newPolicy.fields[field] = !currentValue;
    setPolicy(prevState => ({ ...prevState, ...newPolicy }));
  };

  const handleChange = (event, field) => {
    let newPolicy = policy;
    newPolicy.fields[field] = event.target.value;
    setPolicy(prevState => ({ ...prevState, ...newPolicy }));
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (policy.fields.premium > 1000000) {
      setError("Premium cannot be more than 1 million");
    } else {
      let jobj = {
        pk: policyId,
        fields: {
          customer: policy.fields.customer,
          bodily_injury_liability:
            policy.fields.bodily_injury_liability === true ? true : false,
          personal_injury_protection:
            policy.fields.personal_injury_protection === true ? true : false,
          property_damage_liability:
            policy.fields.property_damage_liability === true ? true : false,
          collision: policy.fields.collision === true ? true : false,
          comprehensive: policy.fields.comprehensive === true ? true : false,
          premium: policy.fields.premium,
          vehicle_segment: policy.fields.vehicle_segment,
          fuel: policy.fields.fuel
        }
      };
      axios
        .post("policy/edit/", jobj, {
          headers: { "Content-Type": "application/json" }
        })
        .then(response => {
          const { data } = response;
          console.log("Response Object : ");
          console.log(response);
          history.push({ pathname: "/policies", data: response.config.data });
        })
        .catch(error => {
          alert("Error\n" + error);
          console.log(error);
        });
    }
  };
  return (
    <div>
      {console.log(policy)}
      <form className="bg-white mx-auto flex w-3/4 border-b-4 border-t-2 border-gray-500 rounded-3xl p-2 m-4">
        <div>
          <div className="flex w-full mx-auto p-4 m-6">
            <div className="bg-indigo-300 p-6 rounded-3xl">
              <div className="heading-3">
                Edit Policy Details of : {policyId}
              </div>
              <div className="heading-3">
                Customer ID : {policy && policy.fields.customer}
              </div>
              <div className="heading">
                date_of_purchase: {dateOfPurchase ? dateOfPurchase : null}
              </div>
            </div>
          </div>

          <div className="flex mx-auto w-1/2 p-4 m-6 ">
            <label className="heading">bodily_injury_liability:</label>
            <input
              type="checkbox"
              name="name"
              className="items-center"
              checked={
                policy && policy.fields.bodily_injury_liability ? true : false
              }
              onClick={event =>
                handleChangeCheckbox(event, "bodily_injury_liability")
              }
            />
          </div>

          <div className="flex mx-auto w-1/2 p-4 m-6">
            <label className="heading">personal_injury_protection:</label>
            <input
              type="checkbox"
              name="name"
              className="items-center"
              onClick={event =>
                handleChangeCheckbox(event, "personal_injury_protection")
              }
              checked={
                policy && policy.fields.personal_injury_protection
                  ? true
                  : false
              }
            />
          </div>
          <div className="flex mx-auto w-1/2 p-4 m-6">
            <label className="heading">property_damage_liability:</label>
            <input
              type="checkbox"
              name="name"
              className="items-center"
              onClick={event =>
                handleChangeCheckbox(event, "property_damage_liability")
              }
              checked={
                policy && policy.fields.property_damage_liability ? true : false
              }
            />
          </div>
          <div className="flex mx-auto w-1/2 p-4 m-6">
            <label className="heading">collision:</label>
            <input
              type="checkbox"
              name="name"
              className="items-center"
              onClick={event => handleChangeCheckbox(event, "collision")}
              checked={policy && policy.fields.collision ? true : false}
            />
          </div>
          <div className="flex mx-auto w-1/2 p-4 m-6">
            <label className="heading">comprehensive:</label>
            <input
              type="checkbox"
              name="name"
              className="items-center"
              onClick={event => handleChangeCheckbox(event, "comprehensive")}
              checked={policy && policy.fields.comprehensive ? true : false}
            />
          </div>
          <div className="flex mx-auto justify-center font-bold text-red-600">
            {error ? error : null}
          </div>
          <div className="flex mx-auto w-1/2 p-4 mb-3 ">
            <label className="heading">Premium: </label>
            <input
              className="border-2 border-black"
              type="number"
              name="name"
              value={policy ? policy.fields.premium : null}
              onChange={event => {
                handleChange(event, "premium");
              }}
            />
          </div>
          <div className="flex mx-auto w-1/2 p-4 m-6">
            <label className="heading" for="vehicle_segment">
              vehicle_segment:
            </label>
            <select
              name="vehicle_segment"
              id="vehicle_segment"
              onChange={event => {
                handleChange(event, "vehicle_segment");
              }}
              value={policy && policy.fields.vehicle_segment}
            >
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
            </select>
          </div>
          <div className="flex mx-auto w-1/2 p-4 m-6">
            <label className="heading" for="fuel">
              fuel:
            </label>

            <select
              name="fuel"
              id="fuel"
              onChange={event => {
                handleChange(event, "fuel");
              }}
              value={policy && policy.fields.fuel}
            >
              <option value="CNG">CNG</option>
              <option value="Petrol">Petrol</option>
              <option value="Diesel">Diesel</option>
            </select>
          </div>
          <div className="flex mx-auto w-1/2 p-4 m-6 ">
            <button
              onClick={event => handleSubmit(event)}
              className="  border-2 rounded-2xl border-black bg-blue-500 text-white font-bold text-xl px-6 py-3"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditPolicy;
