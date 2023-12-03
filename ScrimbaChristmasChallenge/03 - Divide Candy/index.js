function calcTotalCandies(children, candy) {
  /** Challenge:
   * Some children have got some pieces of candy. They
   * want to eat as much candy as they can but each
   * child must eat exactly the same amount. Determine
   * how many pieces of candy can be eaten altogether.
   * A piece of candy can not be split.
   *
   * Example:
   * Children: 3, Candies: 10
   * Each of the 3 children can eat 3 candies.
   * So the total number of candies that can be eaten
   * is 3*3 = 9. So the function calcTotalCandies should
   * log out 9.
   **/

  const totalCandiesEaten = candy - (candy % children);
  console.log(
    `If there are ${children} children and ${candy} candies - they would be able to evenly divide ${totalCandiesEaten} pieces.`
  );
}

calcTotalCandies(3, 10); // expected output: 9
calcTotalCandies(4, 20); // expected output: 20
calcTotalCandies(6, 25); // expected output: 24
