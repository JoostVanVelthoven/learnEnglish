import React from "react"
import renderer from "react-test-renderer"
import { Dropdown } from "./dropdown"

describe("dropdown", () => {
  it("renders with no data", () => {
    const tree = renderer.create(<Dropdown />).toTree()
    expect(tree.rendered.type).toBe("select")
  })
})
