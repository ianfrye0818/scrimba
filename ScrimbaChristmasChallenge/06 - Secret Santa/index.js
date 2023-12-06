const people = ['Alice', 'Bob', 'Carly', 'Dan', 'Ed', 'Ferdinand', 'Ginny'];
//function for shuffling the array to get random results each time it's ran
function shuffleArray(array) {
  return [...array].reduce(
    (shuffledArray, _, i) => {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
      return shuffledArray;
    },
    [...array]
  );
}

//function to assign each person to another person in the array - this array also checks to makes sure the next item in the array does not contain the same value so that a key/value pair can never be the same.
function generateSecretSantaPairs(array) {
  const shuffledArray = shuffleArray(array);
  return shuffledArray.reduce((accumulator, person, index, array) => {
    const nextPersonIndex = (index + 1) % array.length;
    const nextPerson = array[nextPersonIndex];

    if (person !== nextPerson) {
      accumulator[person] = nextPerson;
    } else {
      accumulator[person] = array[(index + 2) % array.length];
    }

    return accumulator;
  }, {});
}

console.log(generateSecretSantaPairs(people));

/**
Example output:
{
    Alice: "Dan",
    Dan: "Ferdinand",
    Ferdinand: "Carly",
    Carly: "Ginny",
    Ginny: "Ed",
    Ed: "Bob",
    Bob: "Alice"
}
 */
