const noGroup = typeof Object.groupBy === typeof undefined;

if (noGroup) {
  const groupBy = (arr: any[], callback: any) => {
    return arr.reduce((acc = {}, ...args) => {
      const key = callback(...args);
      acc[key] ??= []
      acc[key].push(args[0]);
      return acc;
    }, {});
  };

Object.groupBy = groupBy;
}