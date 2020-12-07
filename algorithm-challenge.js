const EMPTY = 0; //
let initial = [0, 4, 2, 5, 1, 3];
let target = [0, 1, 5, 3, 2, 4];

(function PrintDirections(spaces, target) {
  // Create a hash map from the initial array with the elment (vehicle number) serving as
  // the key, and array index (parking spot) as the value, allowing us O(1) access to a
  // given vehicle's current location.
  let carPositions = new Map(spaces.map((vehicle, spot) => [vehicle, spot]));

  // We'll then iterate over each parking spot in the target array, positioning the correct
  // vehicle in the respective spot.
  for (let goalSpace = 0; goalSpace < target.length; goalSpace++) {
    // On each iteration, we check the current index of the target array to determine which vehicle needs to be placed in that spot.
    let goalCarId = target[goalSpace];
    // Then we find the spot the vehicle is currently in.
    let goalCarStartPos = carPositions.get(goalCarId);

     // If the vehicle is already where it needs to be, continue.
     if (goalCarStartPos == goalSpace) continue;
    // Get the currenetly empty parking space.
    let emptySpace = carPositions.get(EMPTY);
    // Check if there is a car currently in the space we want to occupy.
    let blockingCar = spaces[goalSpace];
    // If there is, move it to the empty space.
    if (blockingCar > 0) {
      console.log(
        "Move car " +
          blockingCar +
          " from space " +
          goalSpace +
          " to " +
          emptySpace +
          ". Space " +
          goalSpace +
          " is now empty."
      );
      // Update the car positions map.
      carPositions.set(blockingCar, emptySpace);
      carPositions.set(EMPTY, goalSpace);
      // Update the parking space array.
      spaces[goalSpace] = EMPTY;
      spaces[emptySpace] = blockingCar;
    }

    // Now, move the intended vehicle to the newly empty
    // goal space.
    goalCarStartPos = carPositions.get(goalCarId);
    console.log(
      "Move car " +
        goalCarId +
        " from space " +
        goalCarStartPos +
        " to " +
        goalSpace +
        ". Space " +
        goalCarStartPos +
        " is now empty."
    );
    // Update the car positions map.
    carPositions.set(goalCarId, goalSpace);
    carPositions.set(EMPTY, goalCarStartPos);
    // Update the parking space array.
    spaces[goalCarStartPos] = EMPTY;
    spaces[goalSpace] = goalCarId;
  }
  console.log(carPositions);
  console.log(spaces);
  
})(initial, target);
