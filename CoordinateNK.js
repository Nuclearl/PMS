const Direction = { longitude: 'longitude', latitude: 'latitude' };

class CoordinateNK {
  constructor(direction, degrees = 0, minutes = 0, seconds = 0) {
    this.#validate(direction, degrees, minutes, seconds);
    this.degrees = degrees;
    this.minutes = minutes;
    this.seconds = seconds;
    this.direction = direction;
  }

  to_s() {
    return `${this.degrees}°${this.minutes}′${this.seconds}″ ${this.#direction_letter()}`;
  }

  to_dec_s() {
    return `${this.degrees + this.minutes/60 + this.seconds/3600}° ${this.#direction_letter()}`;
  }

  avg(object) {
    if (object.className === CoordinateNK.className) {
      if (object.direction === this.direction) {
        return this.#avg(this, object)
      } else { return null}
    }
  }

  avg_two_classes(object1, object2) {
    if (object1.className === object2.className) {
      if (object1.direction === object2.direction) {
        return this.#avg(object1, object2)
      } else { return null}
    }
  }

  #avg(object1, object2) {
    return new CoordinateNK(object1.direction, (object1.degrees + object2.degrees)/2, (object1.minutes + object2.minutes)/2, (object1.seconds + object2.seconds)/2)
  }


  #direction_letter() {
    if (this.direction === Direction.longitude) {
      if (this.degrees < 0) {
        return "W";
      } else {
        return "E";
      }
    } else {
      if (this.degrees < 0) {
        return "S";
      } else {
        return "N";
      }
    }
  }

  #validate(direction, degrees, minutes, seconds) {
    if (direction === Direction.longitude) {
      if (degrees < -180 || degrees > 180) {
        throw "The degree of longitude should be in the range from -180 to 180!";
      }
    }
    if (direction === Direction.latitude) {
      if (degrees < -90 || degrees > 90) {
        throw "The degree of latitude should be in the range from -180 to 180!";
      }
    }

    if (minutes < 0 || minutes > 59) {
      throw "The minutes should be in the range from 0 to 59";
    }
    if (seconds < 0 || seconds > 59) {
      throw "The seconds should be in the range from 0 to 59";
    }
  }
}

nk1 = new CoordinateNK(Direction.longitude, 180, 50, 50)
nk2 = new CoordinateNK(Direction.latitude, 90, 20, 0)
nk3 = new CoordinateNK(Direction.latitude, -60, 50, 50)
nk4 = new CoordinateNK(Direction.longitude, -180, 50, 50)

console.log(nk1.to_dec_s())
console.log(nk2.to_s())
console.log(nk1.avg(nk4))
console.log(nk1.avg_two_classes(nk2, nk1))

try {
  new CoordinateNK(Direction.longitude, 280, 50, 50);
}
catch (e) {
  console.log(e);
}


