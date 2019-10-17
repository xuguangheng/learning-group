const fs = require('fs')

module.exports = {
  async jsonReader(filePath) {
    try {
      const jsonString = await fs.readFileSync(filePath)
      return JSON.parse(jsonString)
    } catch (error) {
      console.log(error)
      return undefined
    }
  },
  async jsonWriter(filePath, jsonObject) {
    try {
      const jsonString = JSON.stringify(jsonObject)
      await fs.writeFileSync(filePath, jsonString)
    } catch (error) {
      console.log(error)
    }
  }
    
}
