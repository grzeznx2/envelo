export const sleep = (time: number) =>
  new Promise((resolve: (value: unknown) => void, _) => {
    setTimeout(() => resolve(null), time * 1000)
  })
