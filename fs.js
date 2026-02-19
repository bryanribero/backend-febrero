import fs from 'fs/promises'

async function editFile() {
  const data = await fs.readFile('./prueba.json', 'utf-8')
  const parseData = JSON.parse(data)

  parseData.nombre = 'Bryan'
  parseData.esFlaco = false

  const updateJson = JSON.stringify(parseData, null, 2)

  await fs.writeFile('./prueba.json', updateJson)
}

editFile()
