import { useState } from "react";
import axios from "axios";
export function AddGroceryItem({ baseUrl, fetchGroceryItems }) {
  const [groceryInputText, updateGroceryInputText] = useState("");

  async function handleAddingItems() {
    const createTask = await axios.post(`${baseUrl}/grocery/add`, {
      groceryItem: groceryInputText,
      isPurchased: false,
    });
    console.log(createTask);
    updateGroceryInputText("");
    fetchGroceryItems();
  }

  const handleKeypress = (e) => {
    console.log("enterkey" + e.charCode);
    if (e.charCode === 13) {
      handleAddingItems();
    }
  };

  return (
    <div>
      <div className="input1 mx-auto">
        <input
          type="text"
          className="form-control"
          placeholder="Add Shopping Item"
          aria-label="Grocery Item"
          value={groceryInputText}
          onChange={(e) => updateGroceryInputText(e.target.value)}
          onKeyPress={handleKeypress}
        />
      </div>
    </div>
  );
}
