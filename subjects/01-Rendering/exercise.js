////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// - Render `DATA.title` in an <h1>
// - Render a <ul> with each of `DATA.items` as an <li>
// - Now only render an <li> for mexican food (hint: use DATA.items.filter(...))
// - Sort the items in alphabetical order by name (hint: use sort-by https://github.com/staygrimm/sort-by#example)
//
// Got extra time?
//
// - Add a <select> dropdown to make filtering on `type` dynamic
// - Add a <button> to toggle the sort order (hint: You'll need an `updateThePage`
//   function that calls `ReactDOM.render`, and then you'll need to call it in
//   the event handlers of the form controls)
////////////////////////////////////////////////////////////////////////////////
import React from "react";
import ReactDOM from "react-dom";
import sortBy from "sort-by";

const DATA = {
  title: "Menu",
  items: [
    { id: 1, name: "tacos", type: "mexican" },
    { id: 2, name: "burrito", type: "mexican" },
    { id: 3, name: "tostada", type: "mexican" },
    { id: 4, name: "mushy peas", type: "english" },
    { id: 5, name: "fish and chips", type: "english" },
    { id: 6, name: "black pudding", type: "english" }
  ]
};

let selectedItem = DATA.items[0].type;

function Menu() {
  return (
    <div>
      <h1>
        {selectedItem} {DATA.title}
      </h1>
      <ul>
        {DATA.items
          .filter(item => item.type === selectedItem)
          .sort(sortBy("name"))
          .map((item, index) => {
            return <li key={index}>{item.name}</li>;
          })}
      </ul>
    </div>
  );
}

function handleChange(e) {
  selectedItem = e.target.options[e.target.selectedIndex].value;
  console.log(selectedItem);
  ReactDOM.render(<App />, document.getElementById("app"));
}

function Dropdown() {
  let unique = [...new Set(DATA.items.map(item => item.type))];
  return (
    <select onChange={handleChange}>
      {unique.map(item => {
        return <option>{item}</option>;
      })}
    </select>
  );
}

function App() {
  return (
    <div>
      <Dropdown />
      <Menu />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("app"));

require("./tests").run();
