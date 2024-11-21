self.addEventListener('message', (event) => {
    const number = event.data;
  
    function factorial(n) {
      return n === 0 ? 1 : n * factorial(n - 1);
    }
  
    const result = factorial(number);
    self.postMessage(result);
  });
  