export function parseArrayObjectsToDropdownArray(array, name) {
    let aux = [];
    try {
      let counter = 0;
      array.map((obj) => {
        counter++;
        aux.push({
          key: counter,
          text: typeof obj === "object" ? obj[name] : obj,
          value: obj,
        });
      });
    } catch (err) {
      console.log(err);
    } finally {
      return aux;
    }
  }