export default new class DiffArrays {
    public question() {
        var arr_length = Math.floor(Math.random() * 11);
        var arrayOne: number[] = [];
        var arrayTwo: number[] = [];

        for(var i = 0; i < arr_length; i++) {
            arrayOne.push(Math.floor(Math.random() * 11))
        };

        for(var i = 0; i < arr_length; i++) {
            arrayTwo.push(Math.floor(Math.random() * 11))
        };

        var old_arr_one = arrayOne;
        var old_arr_two = arrayTwo;

        console.log({arrayOne, arrayTwo})

        var cache_arr_one: number[] = [];
        var cache_arr_two: number[] = [];

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

            return { testCase: { arrayOne, arrayTwo }, response: [arrayOne, arrayTwo] };
        }

        return getUniqueValues();
    };

    public text() { return "Voce receberá dois vetores formados por números de 0 a 10 e com uma quantidade de números que também varia de 0 a 10. Remova os números semelhantes dos dois vetores e retorne apenas os números únicos." };

    public placeholder() { return `
    function solve(arrayOne, arrayTwo) {
      return { arrayOne, arrayTwo } // Retorne os valores neste padrão!
    }
    
    return solve();` }
}