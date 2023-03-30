import { render, fireEvent } from "@testing-library/react";
import Card from "./Card.js";
// import TEST_IMAGES from "./_testCommon.js";

it("renders without crashing", function () {
    render(<Card />);
});

it("matches snapshot", function () {
    const { asFragment } = render(<Card />);
    expect(asFragment()).toMatchSnapshot();
});