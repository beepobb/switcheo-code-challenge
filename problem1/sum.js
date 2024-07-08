var sum_to_n_a = function(n) {
    var sum = 0
    for(var i = 1; i<n+1; i++){ //if loop iterate through all numbers and perform addiion
        // console.log(`i:${i}`); // check value of i
        sum += i;
    }
    return sum;
};

var sum_to_n_b = function(n) {
    var sum = 0;
    while(n>0){ // while loop decrements value of n after addition until 0
        sum+=n;
        n-=1;
    }
    return sum;
};

var sum_to_n_c = function(n) { // recursive function to perform sum up to n
    if (n == 0){
        return 0;
    }
    if (n == 1){
        return 1;
    }
    return n + sum_to_n_c(n-1); // sum up to n = n + sum up to (n-1)
};

// test
if(sum_to_n_a(5)===15){// expected output: 15
    console.log("sum_to_n_a Test PASSED");
}
if(sum_to_n_b(7)===28){
    console.log("sum_to_n_b Test PASSED");
}
if(sum_to_n_c(6)===21){
    console.log("sum_to_n_c Test PASSED");
};
