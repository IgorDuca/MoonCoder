export default new class oddNumber {
    public question() {
        var num = Math.floor(Math.random() * 101);
    
        function expected_return() {
            if(num % 2 == 0) {
                return false
            } else return true;
        };
    
        return { testCase: num, response: expected_return() };
    };
    
    public text() { return "Descubra se o número recebido é ou não um número ímpar, caso seja par, retorne falso, caso seja ímpar retorne verdadeiro." };

    public placeholder() { return `
    function solve(num) {
      // Ecreva seu código aqui
    }
    
    return solve();` };
}