////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// - Fill in the test stubs to make the tests pass
////////////////////////////////////////////////////////////////////////////////
import "./mocha-setup";

import React from "react";
import ReactDOM from "react-dom";
import { Simulate } from "react-dom/test-utils";
import expect from "expect";

import data from "./data";
import Tabs from "./components/Tabs";

describe("when <Tabs> is rendered", () => {
  let node;
  beforeEach(() => {
    node = document.createElement("div");
    ReactDOM.render(<Tabs data={data} />, node);
  });

  afterEach(() => {
    ReactDOM.unmountComponentAtNode(node);
  });

  it("renders the first tab", () => {
    const tabs = node.querySelectorAll(".Tab");
    expect(tabs[0].innerText).toEqual(data[0].name);
  });

  it("renders the second tab", () => {
    const tabs = node.querySelectorAll(".Tab");
    expect(tabs[1].innerText).toEqual(data[1].name);
  });

  it("renders the third tab", () => {
    const tabs = node.querySelectorAll(".Tab");
    expect(tabs[2].innerText).toEqual(data[2].name);
  });

  it("activates the first tab", () => {
    const tabs = node.querySelectorAll(".Tab");
    expect(tabs[0].style.borderBottomColor).toEqual("rgb(0, 0, 0)");
  });

  it("does not activate the second tab", () => {
    const tabs = node.querySelectorAll(".Tab");
    expect(tabs[1].style.borderBottomColor).not.toEqual("rgb(0, 0, 0)");
  });

  describe("after clicking the second tab", () => {
    beforeEach(() => {
      Simulate.click(node.querySelectorAll(".Tab")[1]);
    });

    it("activates the second tab", () => {
      const tabs = node.querySelectorAll(".Tab");
      expect(tabs[1].style.borderBottomColor).toEqual("rgb(0, 0, 0)");
    });

    it("deactivates the first tab", () => {
      const tabs = node.querySelectorAll(".Tab");
      expect(tabs[0].style.borderBottomColor).not.toEqual(
        "rgb(0, 0, 0)"
      );
    });

    it("puts the correct content in the panel", () => {
      const tabPanel = node.querySelector(".TabPanel");
      expect(tabPanel.innerText).toMatch(/Baseball/);
    });
  });
});
