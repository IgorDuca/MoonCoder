export default new class oddNumber {
    public question() {
        var num = Math.floor(Math.random() * 101);
    
        function expected_return() {
            if(num % 2 == 0) {
                return num * 2
            } else return num;
        };
    
        return { testCase: num, response: expected_return() };
    };
    
    public text() { return "Descubra se o número recebido é ou não um número ímpar, caso seja par, retorne o número multiplicado por dois, caso seja ímpar retorne o número." };

    public placeholder() { return `
    function solve(num) {
      // Ecreva seu código aqui
    }
    
    return solve();` };

    public questionName() { return "odd_numbers" }

    public variableInjection(code: string, vari: string) {
        if(vari == null || vari == "") vari = JSON.stringify(Math.floor(Math.random() * 101));
        return code.replace("return solve();", `return solve(${vari});`)
    }
}