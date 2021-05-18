import { useEffect, useState } from "react";
import "../App.css";
import axios from "axios";
import classNameModule from "classnames";
import { AddGroceryItem } from "./AddGroceryItem";
const API_BASE_URL = "http://localhost:8080";
export function GrocerySection() {
  const [groceryItems, updateGroceryItems] = useState([]);
  async function fetchGroceryItems() {
    const groceryData = await axios.get(`${API_BASE_URL}/grocery/getAll`);

    const dataFormAPI = groceryData.data.results;
    updateGroceryItems(dataFormAPI);
  }
  useEffect(() => {
    fetchGroceryItems();
  }, []);

  async function handlePurchaseUpdate(item) {
    console.log(item);
    const updateData = await axios.put(
      `${API_BASE_URL}/grocery/updatePurchaseStatus`,
      {
        _id: item._id,
        isPurchased: true,
      }
    );
    console.log(updateData);
    fetchGroceryItems();
  }

  async function handleDeleteOperation(item) {
    const deleteResponse = await axios.delete(
      `${API_BASE_URL}/grocery/deleteGroceryItem`,

      {
        data: {
          _id: item._id,
        },
      }
    );
    fetchGroceryItems();
  }

  function renderPurchaseButton(item) {
    if (item.isPurchased === false) {
      return (
        <button
          className="btn-purchased  me-3"
          onClick={() => handlePurchaseUpdate(item)}
        >
          <b>Purchased</b>
        </button>
      );
    } else {
      return <div></div>;
    }
  }

  function renderDeleteButton(item) {
    return (
      <div>
        <button
          className="btn-delete"
          onClick={() => handleDeleteOperation(item)}
        >
          <b>x</b>
        </button>
      </div>
    );
  }

  function renderGroceryItems() {
    return groceryItems.map((item) => {
      return (
        <div
          className={classNameModule("grocery-item d-flex", {
            purchased: item.isPurchased === true,
          })}
          key={item.groceryItem}
        >
          <div className="input  d-flex">
            <div>{item.groceryItem}</div>
            <div className="grocery-actions  d-flex">
              {renderPurchaseButton(item)}
              {renderDeleteButton(item)}
            </div>
          </div>
        </div>
      );
    });
  }

  const date = new Date();
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <div className="outerdiv">
      <div className="innerdiv">
        <div className="d-flex justify-content-center align-items-center flex-column w-100">
          <h3 className="heading w-100 fs-2">
            Plan for the month of the {months[date.getMonth()]}
          </h3>
          <div className="d-flex justify-content-center align-items-center flex-column w-100">
            <AddGroceryItem
              baseUrl={API_BASE_URL}
              fetchGroceryItems={fetchGroceryItems}
            />
            {renderGroceryItems()}
          </div>
        </div>
      </div>
    </div>
  );
}
