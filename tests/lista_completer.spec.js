test('list completer', () => {
    const list = [Math.floor(Math.random() * 11)];
    list.push(list[0] + 2);
    list.push(list[1] * 2);
    list.push((list[2] * 2) - 3)
    list.push(list[3] + 5 / 2)

    console.log({list})
    
    function nextTwoPredicter() {
        var new_list = [];
        new_list.push((list[list.length - 1] * 2) - 3);
        new_list.push(new_list[0] + 5 / 2);

        console.log({new_list})

        return new_list;
    };

    var last_values = [];
    last_values.push((list[list.length - 1]) * 2 - 3)
    last_values.push(last_values[last_values.length - 1] + 5 / 2);

    console.log({last_values})

    expect(nextTwoPredicter()).toEqual(last_values)
})