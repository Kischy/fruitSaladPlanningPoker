

// Shuffles an array into a random configuration
// Fisher–Yates shuffle
export default function shuffle_array(arr) {
  let current_ind = arr.length;
  let random_ind;

  while (current_ind != 0) {
    let random_ind = Math.floor(Math.random() * current_ind);
    current_ind--;

    if(current_ind != random_ind)
    {
      // Swap element at random_ind with current_ind
      [arr[current_ind], arr[random_ind]] = [arr[random_ind], arr[current_ind]];
    }
  }

  return arr;
}