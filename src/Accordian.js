import React, { useState, useEffect } from "react";
import axios from "axios";
const apiUrl = "/api/accordian.json";

const SubAccordian = ({ category, key, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div key={key}>
      <div onClick={handleOpen} className="flex">
        <img src="/expand.svg" height="24px" width="24px" alt="down" />
        {category}
      </div>
      {isOpen && <div>{children}</div>}
    </div>
  );
};

const Accordian = () => {
  const [accordianData, setAccordianData] = useState([]);

  useEffect(() => {
    axios
      .get(apiUrl)
      .then((res) => {
        console.log(res);
        if ((res.status = 200)) {
          console.log(res);
          return res.data;
        }
      })
      .then((data) => {
        setAccordianData(data);
      })
      .catch((e) => {
        console.log("error", e);
      });
  }, []);
  //console.log(accordianData);

  const returnMenuItem = (item, i) => {
    //console.log(item, i);
    let menuItem;
    if (!item.subCategory || item.subCategory?.length === 0) {
      ///console.log(item.category, 2);
      menuItem = <div>{item.category}</div>;
    } else {
      let menuItemChildren = item.subCategory?.map((item, i) => {
        let menuItem = returnMenuItem(item, i);
        //console.log(menuItem);
        return menuItem;
      });
      menuItem = (
        <SubAccordian
          key={i}
          category={item.category}
          children={menuItemChildren}
        />
      );
    }
    return menuItem;
  };
  return (
    <div>
      {accordianData?.length > 0 &&
        accordianData.map((item, i) => {
          return returnMenuItem(item, i);
        })}
      <button type="button">Expand All</button>
      <button type="button">Collapse All</button>
    </div>
  );
};

export default Accordian;
