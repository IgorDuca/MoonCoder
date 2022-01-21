export default new class listCompleter {
    public question() {
        const list = [Math.floor(Math.random() * 11)];
        list.push(list[0] + 2);
        list.push(list[1] * 2);
        list.push((list[2] * 2) - 3);
        list.push(list[3] + 5 / 2);

        var last_values = [];
        last_values.push((list[list.length - 1]) * 2 - 3)
        last_values.push(last_values[last_values.length - 1] + 5 / 2);

        return { testCase: list, response: last_values };
    };

    public text() { return "Uma empresa te enviou um padrão de preços pelos quais um de seus produtos variou nos últimos 8 anos: 11, 13, 36, 72, 69, 37, 39, 78. Preveja os próximos dois itens da lista. (Os valores serão trocados a cada tentiva)" };

    public placeholder() { return `
    function solve(list) {
      // Ecreva seu código aqui
    }
    
    return solve(); // Não se esqueça de retornar sua resposta!` }
}