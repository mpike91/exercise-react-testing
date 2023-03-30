import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel.js";
import TEST_IMAGES from "./_testCommon.js";

// Smoke test
it("renders without crashing", function () {
  render(<Carousel
    photos={TEST_IMAGES}
    title="images for testing"
  />);
});

// Snapshot test
it("matches snapshot", function () {
  const { asFragment } = render(<Carousel
    photos={TEST_IMAGES}
    title="images for testing"
  />);
  expect(asFragment()).toMatchSnapshot();
});


it("works when you click on the right arrow and left arrow", function () {
  const { container } = render(
    <Carousel
      photos={TEST_IMAGES}
      title="images for testing"
    />
  );
  // expect the first image to show, but not the second or third
  expect(container.querySelector('img[alt="testing image 1"]')).toBeInTheDocument();
  expect(container.querySelector('img[alt="testing image 2"]')).not.toBeInTheDocument();
  expect(container.querySelector('img[alt="testing image 3"]')).not.toBeInTheDocument();

  // grab right arrow and left arrow
  const rightArrow = container.querySelector(".bi-arrow-right-circle");
  const leftArrow = container.querySelector(".bi-arrow-left-circle");

  // move forward in the carousel
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first or third
  expect(container.querySelector('img[alt="testing image 1"]')).not.toBeInTheDocument();
  expect(container.querySelector('img[alt="testing image 2"]')).toBeInTheDocument();
  expect(container.querySelector('img[alt="testing image 3"]')).not.toBeInTheDocument();

  // move backward in the carousel
  fireEvent.click(leftArrow);

  // expect the first image to show, but not the second or third
  expect(container.querySelector('img[alt="testing image 1"]')).toBeInTheDocument();
  expect(container.querySelector('img[alt="testing image 2"]')).not.toBeInTheDocument();
  expect(container.querySelector('img[alt="testing image 3"]')).not.toBeInTheDocument();
});

it("should hide the left arrow on first image and right arrow on last image", function () {
  const { container } = render(
    <Carousel
      photos={TEST_IMAGES}
      title="images for testing"
    />
  );

  // grab right and left arrows
  const rightArrow = container.querySelector(".bi-arrow-right-circle");
  const leftArrow = container.querySelector(".bi-arrow-left-circle");

  // expect the left arrow to be hidden, since we're on the first image
  expect(container.querySelector(".bi-arrow-left-circle")).toContainHTML("hidden");

  // move forward in the carousel to the last image
  fireEvent.click(rightArrow);
  fireEvent.click(rightArrow);

  // expect the right arrow to be hidden, since we're on the third image
  expect(container.querySelector(".bi-arrow-right-circle")).toContainHTML("hidden");
});