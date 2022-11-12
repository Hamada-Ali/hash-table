// hashmap with array chaining
class Hashmap {
  constructor(size = 41) {
    this.keyMap = new Array(size);
  }
  _hash(key) {
    let idx = 0;
    let primeKey = 31;
    for (let i = 0; i < Math.min(key.length, 100); i++) {
      let char = key[i];
      let charCode = char.charCodeAt(0) - 96;
      idx = (idx * primeKey + charCode) % this.keyMap.length;
    }
    return idx;
  }
  _set(key, val) {
    let idx = this._hash(key);
    if (!this.keyMap[idx]) {
      this.keyMap[idx] = [];
    }
    this.keyMap[idx].push([key, val]);
  }
  _get(key) {
    let idx = this._hash(key);
    if (this.keyMap[idx]) {
      for (let i = 0; i < this.keyMap[idx].length; i++) {
        if (this.keyMap[idx][i][0] === key) {
          return this.keyMap[idx][i][1];
        } else {
          return undefined;
        }
      }
      return this.keyMap[idx];
    } else {
      return null;
    }
  }
  key() {
    let keys = [];
    for (let i = 0; i < this.keyMap.length; i++) {
      if (this.keyMap[i]) {
        if (this.keyMap[i].length > 1) {
          for (let j = 0; j < this.keyMap[i].length; j++) {
            keys.push(this.keyMap[i][j][0]);
          }
        } else {
          keys.push(this.keyMap[i][0][0]);
        }
      }
    }
    return keys;
  }
  val() {
    let vals = [];
    for (let i = 0; i < this.keyMap.length; i++) {
      if (this.keyMap[i]) {
        if (this.keyMap[i].length > 1) {
          for (let j = 0; j < this.keyMap[i].length; j++) {
            vals.push(this.keyMap[i][j][1]);
          }
        } else {
          vals.push(this.keyMap[i][0][1]);
        }
      }
    }
    return vals;
  }
}
// hashmap instance
const map = new Hashmap();
map._set("maroon", "#800000");
map._set("yellow", "#FFFF00");
map._set("olive", "#808000");
map._set("salmon", "#FA8072");
map._set("lightcoral", "#F08080");
map._set("mediumvioletred", "#C71585");
map._set("plum", "#DDA0DD");
map._set("plum", "#333");
