import React from "react"
import renderer from "react-test-renderer"
import { CompleteText } from "./completeText"

describe("CompleteText", () => {
  it("renders with no data", () => {
    const tree = renderer.create(<CompleteText />).toTree()
    expect(tree.rendered.type).toBe("input")
  })
})
