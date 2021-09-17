import axios from "./../utils/axios";
import { useState, useEffect } from "react";
import logo from "../insurance.jpg";
import Tabs from "./tabls";
import "../styles/RowStyle.css";
import { useHistory } from "react-router-dom";

const Policies = props => {
  const [policies, setPolicies] = useState([]);
  const [searchText, setSearchText] = useState("");
  let history = useHistory();

  useEffect(() => {
    fetchPolicies();
  }, []);

  const handleEdit = data => {
    console.log(data);
    history.push("/policy/edit", { id: data });
  };

  const Populatepolicies = () => {
    return policies.map(policy => {
      const date = new Date(policy.fields.date_of_purchase);
      return (
        <div id={policy.pk}>
          <div className="bg-white mx-auto flex w-3/4 border-b-4 border-t-2 border-gray-500 rounded-3xl p-2 m-4">
            <div className="ml-5 px-5 py-3 border-2 rounded-2xl border-indigo-500 bg-indigo-300">
              <div className="flex p-2">
                <div className="heading">Policy Number: </div>
                <div className="content">{policy.pk}</div>
              </div>
              <div className="flex p-2">
                <div className="heading">Premium: </div>
                <div className="">{policy.fields.premium}</div>
              </div>
            </div>
            <div className="px-5 mx-3">
              <div className="flex p-2">
                <div className="heading-2">Fuel Type: </div>
                <div className="">{policy.fields.fuel}</div>
              </div>
              <div className="flex p-2">
                <div className="heading-2">Date of Purchase(mm/dd/yyyy): </div>
                <div className="">
                  {date.getMonth() +
                    1 +
                    "-" +
                    date.getDate() +
                    "-" +
                    date.getFullYear()}
                </div>
              </div>
              <div className="flex p-2">
                <div className="heading-2">Bodily Injury Liability: </div>
                <div className="">
                  {policy.fields.bodily_injury_liability ? "Yes" : "No"}
                </div>
              </div>
            </div>
            <div className=" px-5 mx-3">
              <div className="flex p-2">
                <div className="heading-2">Vehicle Segment: </div>
                <div className="">{policy.fields.vehicle_segment}</div>
              </div>
              <div className="flex p-2">
                <div className="heading-2">Customer ID: </div>
                <div className="">{policy.fields.customer}</div>
              </div>
              <div className="flex p-2">
                <div className="heading-2">Collision: </div>
                <div className="">{policy.fields.collision ? "Yes" : "No"}</div>
              </div>
            </div>
            <div className=" px-5 mx-3 ">
              <div className="flex p-2">
                <div className="heading-2">Personal Injury Protection: </div>
                <div className="">
                  {policy.fields.personal_injury_protection ? "Yes" : "No"}
                </div>
              </div>
              <div className="flex p-2">
                <div className="heading-2">Property Damage Liability: </div>
                <div className="">
                  {policy.fields.property_damage_liability ? "Yes" : "No"}
                </div>
              </div>
              <div className="flex p-2">
                <div className="heading-2">Comprehensive: </div>
                <div className="">
                  {policy.fields.comprehensive ? "Yes" : "No"}
                </div>
              </div>
            </div>
            <button
              onClick={() => handleEdit(policy.pk)}
              className=" mx-auto my-auto border-2 rounded-2xl border-black bg-blue-500 text-white font-bold text-xl px-6 py-3"
            >
              Edit
            </button>
          </div>
        </div>
      );
    });
  };

  const fetchPolicies = async () => {
    await axios
      .get("policy/list", { headers: { "Content-Type": "application/json" } })
      .then(response => {
        console.log(response);
        setPolicies(response.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleSearch = event => {
    event.preventDefault();
    if (searchText === "") {
      fetchPolicies();
    }
    axios
      .get("policy/" + searchText, {
        headers: { "Content-Type": "application/json" }
      })
      .then(response => {
        console.log(response);
        setPolicies(response.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div>
      <Tabs tab={2}></Tabs>
      <div className="flex w-2/4  mx-auto mt-4 mb-16">
        <form className="w-full">
          <input
            className="w-3/4 p-4 mx-2 border-b-2 border-black"
            type="number"
            id="search"
            placeholder="Search Policy ID"
            value={searchText}
            onChange={event => {
              setSearchText(event.target.value);
            }}
            name="s"
          />
          <button onClick={event => handleSearch(event)}>Search</button>
        </form>
      </div>
      <div className="flex font-bold text-3xl w-2/4 mx-auto">
        List of Policies
      </div>
      <div>{policies.length > 0 ? Populatepolicies() : null}</div>
    </div>
  );
};

export default Policies;
