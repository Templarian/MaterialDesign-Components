export const debounce = <F extends (...args: any[]) => any>(func: F, waitFor: number) => {
  let timeout

  return (...args: Parameters<F>): Promise<ReturnType<F>> =>
    new Promise(resolve => {
      if (timeout) {
        clearTimeout(timeout)
      }

      timeout = setTimeout(() => resolve(func(...args)), waitFor)
    })
}

export const copyText = (text: string) => {
  var copyFrom = document.createElement('textarea');
  copyFrom.setAttribute("style", "position:fixed;opacity:0;top:100px;left:100px;");
  copyFrom.value = text;
  document.body.appendChild(copyFrom);
  copyFrom.select();
  document.execCommand('copy');
  setTimeout(function () {
      document.body.removeChild(copyFrom);
  }, 1500);
}