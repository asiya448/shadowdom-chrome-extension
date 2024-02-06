import { useEffect, useState } from "react";
import { storage } from "webextension-polyfill";

export const DisplayList = () => {
  const [listItems, setListItems] = useState([]);

  useEffect(() => {
    const readBackgroundMessage = async () => {
      let listData = await storage.local.get("data");
      console.log("listData==>", listData);
      setListItems(listData["data"]);
      console.log("listItems==>", listItems);
    };

    readBackgroundMessage();
  }, []);

  const onDelete = (index) => {
    setListItems((prevItems) => prevItems.filter((_, i) => i!=index));
  }

  return (
    <div
      style={{
        height: "100vh",
        fontSize: "24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <ul>
        {listItems &&
          listItems.map((item, index) => (
            <li>
              {item.tagName}: {item.innerText}
              <button onClick={() => onDelete(index)}>
                Delete
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
};
