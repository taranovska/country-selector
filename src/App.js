import "./styles.css";
import list from "./list.json";
import { useState } from "react";

const Item = ({ item }) => {
  return (
    <li>
      {item.name}, {item.dial_code}
    </li>
  );
};

const List = ({ items }) => {
  return (
    <ul>
      {items.map((item, index) => (
        <Item item={item} key={`${index}-list`} />
      ))}
    </ul>
  );
};

export default function App() {
  const [value, setValue] = useState();
  const [listCountry, setListCountry] = useState([...list]);
  const [matchedField, setMatchedField] = useState("-");

  const inputValue = (e) => {
    setValue(e.target.value);
    setListCountry(
      listCountry.filter((l) => {
        return Object.values(l)
          .map((l) => l.includes(e.target.value))
          .some((el) => el === true);
      })
    );
    console.log(listCountry);
    const keys = Object.keys(listCountry[0]);
    console.log(keys);
    for (const key in listCountry[0]) {
      if (listCountry[0][key].includes(value) === true) {
        setMatchedField(key);
      }
    }
  };

  return (
    <div className="App">
      <input
        type="Search"
        placeholder="Search..."
        onChange={(e) => {
          inputValue(e);
        }}
      />
      <div>
        <div>Search query: {value}</div>
        <div>Matched: {listCountry.length}</div>
        <div>Matched field: {matchedField}</div>
      </div>
      <List items={listCountry} />
    </div>
  );
}
