var code = `
function solve(num) {
  var default_status = true;
  
  if(num % 2 == 0) default_status = false;
  
  return default_status;
}

return solve();`

var fun = new Function(code);

test('teste', () => { expect(fun(66)).toEqual(false) } )