## --- Day 1: Report Repair ---

After saving Christmas [five years in a row](https://adventofcode.com/events), you've decided to take a vacation at a nice resort on a tropical island. Surely, Christmas will go on without you.

The tropical island has its own currency and is entirely cash-only. The gold coins used there have a little picture of a starfish; the locals just call them _stars_. None of the currency exchanges seem to have heard of them, but somehow, you'll need to find fifty of these coins by the time you arrive so you can pay the deposit on your room.

To save your vacation, you need to get all _fifty stars_ by December 25th.

Collect stars by solving puzzles. Two puzzles will be made available on each day in the Advent calendar; the second puzzle is unlocked when you complete the first. Each puzzle grants _one star_. Good luck!

Before you leave, the Elves in accounting just need you to fix your _expense report_ (your puzzle input); apparently, something isn't quite adding up.

Specifically, they need you to _find the two entries that sum to `2020`_ and then multiply those two numbers together.

For example, suppose your expense report contained the following:

    1721
    979
    366
    299
    675
    1456

In this list, the two entries that sum to `2020` are `1721` and `299`. Multiplying them together produces `1721 * 299 = 514579`, so the correct answer is _`514579`_.

Of course, your expense report is much larger. _Find the two entries that sum to `2020`; what do you get if you multiply them together?_

### - Notes -

We can solve this witout brute forcing by first sorting the numbers. We then have two pointers, `lowPointer` and `highPointer`. `lowPointer` starts with the value 0 so it points at the lowest number and `highPointer` starts at the end of the array (arra.length - 1). We then add the numbers the pointers are pointing at. If the sum is higher then 2020 then we lower `highPointer` by one. If the sum is lower than 2020 then we add 1 to `lowPointer`. We will eventually find the number without having to brute force our way through all the numbers in the array.

## --- Part Two ---

The Elves in accounting are thankful for your help; one of them even offers you a starfish coin they had left over from a past vacation. They offer you a second one if you can find _three_ numbers in your expense report that meet the same criteria.

Using the above example again, the three entries that sum to `2020` are `979`, `366`, and `675`. Multiplying them together produces the answer, _`241861950`_.

In your expense report, _what is the product of the three entries that sum to `2020`?_

### - Notes -

We do this similarly except we use three pointers this time: `firstPointer`, `secondPointer` and `thirdPointer`. We make them all start at zero. The next step is to find 2 numbers with `firstPointer` and `secondPointer` that add up to less than `2020`. If a pointer is equal to another pointer then we skip that number, since we cant use the same number more than once. Once we find 2 numbers that add upp to less than `2020` we check if there is a third number that would make the total add up to `2020`. We can stop the loop for the `thirdPointer` if it gets higher than `2020`. Then we have to find another `secondPointer` number. If we have looped through all the array with our `secondPointer` without finding numbers that add up then we increment the `firstPointer` and try again.

# Answers

| Part 1   | Part 2      |
| -------- | ----------- |
| `100419` | `265253940` |
