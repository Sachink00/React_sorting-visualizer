export function getMoves(algo, array) {
    const arr = [...array];

    switch (algo) {
        case "bubble":
            return bubbleSort(arr);
        case "selection":
            return selectionSort(arr);
        case "insertion":
            return insertionSort(arr);
        case "quick":
            return quickSort(arr);
        case "merge":
            return mergeSort(arr);
        default:
            return [];
    }
}


// Bubble sort

function bubbleSort(arr) {
    const moves = [];
    const n = arr.length;
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - 1 - i; j++) {
            moves.push({
                type: "compare",
                indices: [j, j + 1]
            });
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                moves.push({
                    type: "swap",
                    indices: [j, j + 1]
                });
            }
        }
    }
    return moves;
}

// selection sort 

function selectionSort(arr) {
    const moves = [];
    const n = arr.length;
    for (let i = 0; i < n; i++) {
        let minIdx = i;
        for (let j = i + 1; j < n; j++) {
            moves.push({
                type: "compare",
                indices: [j, minIdx]
            });
            if (arr[j] < arr[minIdx]) {
                minIdx = j;
            }
        }
        if (minIdx !== i) {
            [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
            moves.push({
                type: "swap",
                indices: [i, minIdx]
            });
        }
    }
    return moves;
}

// insertion sort

function insertionSort(arr) {

    const moves = [];
    for (let i = 1; i < arr.length; i++) {
        let j = i;
        while (j > 0) {
            moves.push({
                type: "compare",
                indices: [j - 1, j]
            });
            if (arr[j - 1] > arr[j]) {
                [arr[j - 1], arr[j]] = [arr[j], arr[j - 1]];
                moves.push({
                    type: "swap",
                    indices: [j - 1, j]
                });
                j--;
            }
            else {
                break;
            }
        }
    }
    return moves;
}

// quick sort

function quickSort(arr) {
    const moves = [];
    function helper(low, high) {
        if (low >= high)
            return;
        const pivot = arr[high];
        moves.push({
            type: "pivot",
            indices: [high]
        });
        let i = low;
        for (let j = low; j < high; j++) {
            moves.push({
                type: "compare",
                indices: [j, high]
            });
            if (arr[j] < pivot) {
                if (i !== j) {
                    [arr[i], arr[j]] = [arr[j], arr[i]];
                    moves.push({
                        type: "swap",
                        indices: [i, j]
                    });
                }
                i++;
            }
        }
        if (i !== high) {
            [arr[i], arr[high]] = [arr[high], arr[i]];
            moves.push({
                type: "swap",
                indices: [i, high]
            });
        }
        helper(low, i - 1);
        helper(i + 1, high);
    }
    helper(0, arr.length - 1);
    return moves;
}

// Merge sort

function mergeSort(arr) {
    const moves = [];
    function merge(l, m, r) {
        const left = arr.slice(l, m + 1);
        const right = arr.slice(m + 1, r + 1);
        let i = 0, j = 0, k = l;
        while (i < left.length && j < right.length) {
            moves.push({
                type: "compare",
                indices: [l + i, m + 1 + j]
            });
            if (left[i] <= right[j]) {
                arr[k] = left[i];
                moves.push({
                    type: "overwrite",
                    index: k, value: left[i]
                });
                i++;
            }
            else {
                arr[k] = right[j];
                moves.push({
                    type: "overwrite",
                    index: k, value: right[j]
                });
                j++;
            }
            k++;
        }
        while (i < left.length) {
            arr[k] = left[i];
            moves.push({
                type: "overwrite",
                index: k, value: left[i]
            });
            i++;
            k++;
        }
        while (j < right.length) {
            arr[k] = right[j];
            moves.push({
                type: "overwrite",
                index: k, value: right[j]
            });
            j++;
            k++;
        }
    }
    function helper(l, r) {
        if (l >= r)
            return;
        const m = Math.floor((l + r) / 2);
        helper(l, m);
        helper(m + 1, r);
        merge(l, m, r);
    }
    helper(0, arr.length - 1);
    return moves;
}