import { useState } from "react";
import { useHistory } from "react-router-dom";

const Tabs = props => {
  const [openTab, setOpenTab] = useState(props.tab ? props.tab : null);
  const [color, setColor] = useState("blue");
  let history = useHistory();
  return (
    <div className="flex flex-wrap">
      <div className="w-full">
        <ul
          className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row"
          role="tablist"
        >
          <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
            <a
              className={
                "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                (openTab === 1
                  ? "text-white bg-" + color + "-600"
                  : "text-" + color + "-600 bg-white")
              }
              onClick={e => {
                e.preventDefault();
                setOpenTab(1);
                history.push({ pathname: "/dashboard" });
              }}
              data-toggle="tab"
              href="#link1"
              role="tablist"
            >
              Dashboard
            </a>
          </li>
          <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
            <a
              className={
                "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                (openTab === 2
                  ? "text-white bg-" + color + "-600"
                  : "text-" + color + "-600 bg-white")
              }
              onClick={e => {
                e.preventDefault();
                setOpenTab(2);
                history.push({ pathname: "/policies" });
              }}
              data-toggle="tab"
              href="#link2"
              role="tablist"
            >
              Policies
            </a>
          </li>
          <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
            <a
              className={
                "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                (openTab === 3
                  ? "text-white bg-" + color + "-600"
                  : "text-" + color + "-600 bg-white")
              }
              onClick={e => {
                e.preventDefault();
                setOpenTab(3);
                history.push({ pathname: "/customer" });
              }}
              data-toggle="tab"
              href="#link3"
              role="tablist"
            >
              Customers
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default Tabs;
