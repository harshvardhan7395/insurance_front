import { useEffect, useState } from "react";
import axios from "./../utils/axios";
import Tabs from "./tabls";
import "../styles/RowStyle.css";

const Customer = props => {
  const [customers, setCustomers] = useState([]);
  useEffect(() => {
    axios
      .get("users/list", { headers: { "Content-Type": "application/json" } })
      .then(response => {
        console.log(response);
        setCustomers(response.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const Populatecustomer = () => {
    return customers.map(customer => {
      return (
        <div id={customer.pk}>
          <div className="bg-white mx-auto flex w-3/4 border-b-4 border-t-2 border-gray-500 rounded-3xl p-2 m-4">
            <div className="ml-5 px-5 py-3 border-2 rounded-2xl border-indigo-500 bg-indigo-300">
              <div className="flex p-2">
                <div className="heading">Customer Id: </div>
                <div className="content">{customer.fields.username}</div>
              </div>
            </div>
            <div className="mx-3 px-5">
              <div className="flex p-2">
                <div className="heading-2">Income Group: </div>
                <div className="content">{customer.fields.income_group}</div>
              </div>
              <div className="flex p-2">
                <div className="heading-2">Region: </div>
                <div className="content">{customer.fields.region}</div>
              </div>
            </div>
            <div className="mx-3 px-5">
              <div className="flex p-2">
                <div className="heading-2">Gender: </div>
                <div className="content">{customer.fields.gender}</div>
              </div>
              <div className="flex p-2">
                <div className="heading-2">Marital Status: </div>
                <div className="content">
                  {customer.fields.marital_status === 1
                    ? "Married"
                    : "Un-Married"}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <div>
      <Tabs tab={3}></Tabs>
      <div>{customers.length > 0 ? Populatecustomer() : null}</div>
    </div>
  );
};

export default Customer;
