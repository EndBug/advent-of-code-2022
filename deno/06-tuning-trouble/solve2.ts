import { readFileSync, writeFileSync } from 'https://deno.land/std@0.167.0/node/fs.ts'

const input = readFileSync('./input.txt', 'utf-8').trim().split('\n')

input.forEach(line => {
  let result = -1

  const buffer = ['', ...line.slice(0, 13)]
  for (let i = 3; result < 0 && i < line.length; i++) {
    buffer.shift()
    buffer.push(line[i])
    if (buffer.every(l => buffer.filter(ll => ll == l).length == 1))
      result = i+1
  }

  console.log(result)
  writeFileSync('./output2.txt', result.toString())
})
