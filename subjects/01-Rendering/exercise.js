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
let ascending = true;

function updateThePage() {
  ReactDOM.render(<App />, document.getElementById("app"));
}

function Menu() {
  let items = DATA.items
    .filter(item => item.type === selectedItem)
    .sort(sortBy("name"))
    .map(item => <li key={item.id}>{item.name}</li>);

  if (!ascending) {
    items = items.reverse();
  }

  return (
    <div>
      <h1>
        {selectedItem} {DATA.title}
      </h1>
      <ul>{items}</ul>
    </div>
  );
}

function handleChange(e) {
  selectedItem = e.target.options[e.target.selectedIndex].value;
  updateThePage();
}

function switchSort() {
  ascending = !ascending;
  updateThePage();
}

function SortSwitcher() {
  return <button onClick={switchSort}>Reverse List</button>;
}

function Dropdown() {
  let unique = [...new Set(DATA.items.map(item => item.type))];
  return (
    <select onChange={handleChange}>
      {unique.map(item => {
        return <option key={item}>{item}</option>;
      })}
    </select>
  );
}

function App() {
  return (
    <div>
      <SortSwitcher />
      <br/>
      <Dropdown />
      <Menu />
    </div>
  );
}

updateThePage();
require("./tests").run();
