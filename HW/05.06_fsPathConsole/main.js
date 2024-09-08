const fs = require('fs');

class Participant {
  constructor(name, runLimit, jumpLimit) {
    this.name = name;
    this.runLimit = runLimit;
    this.jumpLimit = jumpLimit;
    this.active = true;
  }

  run(distance) {
    if (distance <= this.runLimit) {
      return `${this.name} successfully ran ${distance} meters.`;
    } else {
      return `${this.name} failed to run ${distance} meters.`;
    }
  }

  jump(height) {
    if (height <= this.jumpLimit) {
      return `${this.name} successfully jumped over ${height} meters.`;
    } else {
      return `${this.name} failed to jump ${height} meters.`;
    }
  }
}

class Human extends Participant {
  constructor(name) {
    super(name, 500, 2);
  }
}

class Cat extends Participant {
  constructor(name) {
    super(name, 300, 3);
  }
}

class Robot extends Participant {
  constructor(name) {
    super(name, 1000, 1);
  }
}

class Obstacle {
  constructor(name) {
    this.name = name;
  }

  overcome(participant, logResults) {
    throw "Not implemented";
  }
}

class Treadmill extends Obstacle {
  constructor(distance) {
    super("Treadmill");
    this.distance = distance;
  }

  overcome(participant, logResults) {
    const result = participant.run(this.distance);
    logResults(result);
    if (result.includes('failed')) {
      participant.active = false;
      logResults(`${participant.name} is out of the race.`);
    } else {
      logResults(`${participant.name} passed the ${this.name} (${this.distance} meters).`);
    }
  }
}

class Wall extends Obstacle {
  constructor(height) {
    super("Wall");
    this.height = height;
  }

  overcome(participant, logResults) {
    const result = participant.jump(this.height);
    logResults(result);
    if (result.includes('failed')) {
      participant.active = false;
      logResults(`${participant.name} is out of the race.`);
    } else {
      logResults(`${participant.name} passed the ${this.name} (${this.height} meters).`);
    }
  }
}

function logResults(output) {
  console.log(output);
  fs.appendFileSync('results.txt', output + '\n', 'utf8');
}

const participants = [
  new Human("John"),
  new Cat("Whiskers"),
  new Robot("Robo")
];

const obstacles = [
  new Treadmill(400),
  new Wall(1.5),
  new Treadmill(600),
  new Wall(2.5)
];

fs.writeFileSync('results.txt', '', 'utf8');

participants.forEach(participant => {
  obstacles.forEach(obstacle => {
    if (participant.active) {
      obstacle.overcome(participant, logResults);
    }
  });

  if (participant.active) {
    logResults(`${participant.name} successfully completed all obstacles.\n`);
  } else {
    logResults(`${participant.name} is out of the race.\n`);
  }
});
