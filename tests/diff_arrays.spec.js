
test("array test", () => {
    var arr_length = Math.floor(Math.random() * 11);
    var arrayOne = [];
    var arrayTwo = [];

    for(var i = 0; i < arr_length; i++) {
        arrayOne.push(Math.floor(Math.random() * 11))
    };

    for(var i = 0; i < arr_length; i++) {
        arrayTwo.push(Math.floor(Math.random() * 11))
    };

    console.log({arrayOne, arrayTwo})

    var cache_arr_one = [];
    var cache_arr_two = [];

    function getUniqueValues() {

        for(var i = 0; i < arrayOne.length; i++) {

            if(arrayTwo.includes(arrayOne[i]) == true) continue;
            else cache_arr_one.push(arrayOne[i]);
        }

        for(var i = 0; i < arrayTwo.length; i++) {
            if(arrayOne.includes(arrayTwo[i]) == true) continue;
            else cache_arr_two.push(arrayTwo[i]);
        }

        arrayOne = cache_arr_one;
        arrayTwo = cache_arr_two;

        console.log({ arrayOne, arrayTwo })

        return { arrayOne, arrayTwo };
    }

    expect(getUniqueValues()).toEqual([11203910239120])
})