import { data, directions } from './data.mjs';

/// //////////////////////////
///                       ////
///  Object Constructors  ////
///                       ////
/// //////////////////////////

function Waypoint(distance1, distance2, dir1, dir2) {
  this.distance1 = distance1;
  this.distance2 = distance2;
  this.dir1 = dir1;
  this.dir2 = dir2;
  this.dirArray = ['N', 'E', 'S', 'W'];
  // clamps the direction index
  this.ClampDirection = (num, mod) => {
    let value = num;
    while (value < 0) {
      value += mod;
    }
    return value % mod;
  };
  this.moveWaypoint = (action, distance) => {
    switch (action) {
      case 'N':
        // check if dir1 is either north or south if not then dir2 changes instead
        if (this.dir1 === directions.NORTH || this.dir1 === directions.SOUTH) {
          // if the direction is south then subtract else add
          this.distance1 += distance * (this.dir1 === directions.NORTH ? 1 : -1);
        } else {
          this.distance2 += distance * (this.dir2 === directions.NORTH ? 1 : -1);
        }
        break;
      case 'E':
        // check if dir1 is either west or east if not then dir2 changes instead
        if (this.dir1 === directions.WEST || this.dir1 === directions.EAST) {
          // if the direction is east then subtract else add
          this.distance1 += distance * (this.dir1 === directions.EAST ? 1 : -1);
        } else {
          this.distance2 += distance * (this.dir2 === directions.EAST ? 1 : -1);
        }
        break;
      case 'S':
        // check if dir1 is either north or south if not then dir2 changes instead
        if (this.dir1 === directions.NORTH || this.dir1 === directions.SOUTH) {
          // if the direction is north then subtract else add
          this.distance1 += distance * (this.dir1 === directions.SOUTH ? 1 : -1);
        } else {
          this.distance2 += distance * (this.dir2 === directions.SOUTH ? 1 : -1);
        }
        break;
      case 'W':
        // check if dir1 is either west or east if not then dir2 changes instead
        if (this.dir1 === directions.WEST || this.dir1 === directions.EAST) {
          // if the direction is west then subtract else add
          this.distance1 += distance * (this.dir1 === directions.WEST ? 1 : -1);
        } else {
          this.distance2 += distance * (this.dir2 === directions.WEST ? 1 : -1);
        }
        break;
      case 'L':
        this.dir1 = this.ChangeDirection(action, distance, this.dir1);
        this.dir2 = this.ChangeDirection(action, distance, this.dir2);
        break;
      case 'R':
        this.dir1 = this.ChangeDirection(action, distance, this.dir1);
        this.dir2 = this.ChangeDirection(action, distance, this.dir2);
        break;
      default:
        console.log('ERROR, action didnt match any valid input');
    }
  };
  // changes the direction index pointer
  this.ChangeDirection = (direction, degrees, dir) => {
    const LeftOrRight = direction === 'R' ? 1 : -1;
    const dirChangeAmount = degrees / 90;
    return this.ClampDirection(dir + LeftOrRight * dirChangeAmount, 4);
  };
}

function Ship(
  north,
  east,
  south,
  west,
  dir,
  waypointDistance1,
  waypointDistance2,
  waypointDir1,
  waypointDir2,
) {
  this.North = north;
  this.East = east;
  this.South = south;
  this.West = west;
  this.dir = dir % 4;
  this.dirArray = ['N', 'E', 'S', 'W'];
  this.coordinates = [north, east, south, west];
  this.waypoint = new Waypoint(waypointDistance1, waypointDistance2, waypointDir1, waypointDir2);
  // alter coordinates
  this.MoveShipViaWaypoint = (instruction) => {
    const action = instruction[0];
    const distance = parseInt(instruction.substring(1), 10);
    if (action === 'F') {
      this.coordinates[this.waypoint.dir1] += this.waypoint.distance1 * distance;
      this.coordinates[this.waypoint.dir2] += this.waypoint.distance2 * distance;
    } else {
      this.waypoint.moveWaypoint(action, distance);
    }
  };
  // clamps the direction index
  this.ClampDirection = (num, mod) => {
    let value = num;
    while (value < 0) {
      value += mod;
    }
    return value % mod;
  };
  // changes the direction index pointer
  this.ChangeDirection = (direction, degrees) => {
    const LeftOrRight = direction === 'R' ? 1 : -1;
    const dirChangeAmount = degrees / 90;
    this.dir = this.ClampDirection(this.dir + LeftOrRight * dirChangeAmount, 4);
  };
  // alter coordinates
  this.MoveShip = (instruction) => {
    let action = instruction[0];
    const distance = parseInt(instruction.substring(1), 10);
    if (action === 'F') {
      action = this.dirArray[this.dir];
    }
    switch (action) {
      case 'N':
        this.North += distance;
        break;
      case 'E':
        this.East += distance;
        break;
      case 'S':
        this.South += distance;
        break;
      case 'W':
        this.West += distance;
        break;
      case 'L':
        this.ChangeDirection(action, distance);
        break;
      case 'R':
        this.ChangeDirection(action, distance);
        break;
      default:
        console.log('ERROR, action didnt match any valid input');
    }
  };
}

/// //////////////////////////
///                       ////
///         Part 1        ////
///                       ////
/// //////////////////////////

function calcManhattanDistance(north, south, east, west) {
  return Math.abs(north - south) + Math.abs(east - west);
}

function followNavigationInstructions(actions) {
  const ship = new Ship(0, 0, 0, 0, directions.EAST);
  actions.forEach((instruction) => {
    ship.MoveShip(instruction);
  });
  return calcManhattanDistance(ship.North, ship.South, ship.East, ship.West);
}

/// //////////////////////////
///                       ////
///         Part 2        ////
///                       ////
/// //////////////////////////

function followNavigationInstructionsViaWaypoint(actions) {
  const ship = new Ship(0, 0, 0, 0, 0, 1, 10, directions.NORTH, directions.EAST);
  actions.forEach((instruction) => {
    ship.MoveShipViaWaypoint(instruction);
  });
  return calcManhattanDistance(
    ship.coordinates[directions.NORTH],
    ship.coordinates[directions.SOUTH],
    ship.coordinates[directions.EAST],
    ship.coordinates[directions.WEST],
  );
}

console.log('The answer to Day 12 Part 1 is: ', followNavigationInstructions(data)); // 636
console.log('the answer to Day 12 Part 2 is: ', followNavigationInstructionsViaWaypoint(data)); // 26841
