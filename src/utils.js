export const initialReformat = data => {
    let temp = {}
    //initially the data has a fact property with all needed data within.
    return data.fact.map(row => {
      //data is then structured as so: {dims: {...stuff}, Value: some_value, ...}
      temp = row.Value
      row = row.dims
      row.Value = temp
      //now it is as so: {stuff1: something, stuff2: something_else, ..., Value: some_value}
      return row
    })
  }

  //here the data that has No Value, other wierd things as a value is filtered out first,
export const filterTable = data => {
    return data.filter(row => {
      let value = row.Value
      if (!value || value === 'No data' || value === 'Not applicable') {
        return false
      } else return true
    })
  }

  //then when the numbers are odd with brackets, etc. It is turned into a float that can easily be worked with.
export const mapTable = data => {
    return data.map(row => {
      let value = row.Value
      let charCode = value.charCodeAt(0)
      let bracketIndex = value.indexOf('[') > -1
      if (charCode > 64 && !bracketIndex) return row
      else if (value[0] === '<' || value[0] === '>') {
        value = value.split(' ')[0].slice(1)
        row.Value = value
        return row
      } else if (value.indexOf(' ') > -1) {
        if (bracketIndex) {
          value = value.split('[')[0]
          row.Value = value
          return row
        }
        value = value.split(' ').join('')
        row.Value = value
        return row
      } else {
        return row
      }
    })
  }
  
  export const dataFunction = function(data, alcohol) {
    var inputData = []
    //go through the data
    data.forEach((row, i) => {
      //check if data has specified type and set it to a variable
      const tableTitle = row.GHO || null,
        country = row.COUNTRY || null,
        region = row.REGION || null,
        year = row.YEAR || null,
        value = row.Value || null,
        sex = row.SEX || null,
        alcoholType = row.ALCOHOLTYPE || null,
        socialCostType = row.SOCIALCOSTTYPE || null,
        ageGroup = row.AGEGROUP || null,
        advertisingType = row.ADVERTISINGTYPE || null,
        residenceAreaType = row.RESIDENCEAREATYPE || null,
        whoIncomeRegion = row.WHOINCOMEREGION || null
      //set first object to all values it can possible have
      inputData[i] = {}
      inputData[i].title = tableTitle
      inputData[i].value = value
      if (country) inputData[i].country = country
      if (region) inputData[i].region = region
      if (year) inputData[i].year = year
      if (sex) inputData[i].sex = sex
      if (whoIncomeRegion) inputData[i].region = whoIncomeRegion
      if (ageGroup) inputData[i].agegroup = ageGroup
      //alcohol only has to do with certain datasets
      if (alcohol) {
        if (socialCostType) inputData[i].socialCostType = socialCostType
        if (advertisingType) inputData[i].advertisingType = advertisingType
        if (alcoholType) inputData[i].alcoholType = alcoholType
      }
      if (residenceAreaType) inputData[i].residenceAreaType = residenceAreaType
      return row
    })
    //data filtered without extra parameters
    return inputData
  }
  
  //this is usesd to filter data by, first title, and then by year
  export const filterAll = data => {
    var filtered = []
    //go through the data and add to first filter
    data.map(row => {
      //if title exists already then add the row to correlate with the title
      if (filtered[row.title]) filtered[row.title].push(row)
      else {
        //create a new array for row and place first instance into it
        filtered[row.title] = []
        filtered[row.title].push(row)
      }
    })
    var secondFilter = []
    for (var title in filtered) {
      //go through each title key
      filtered[title].forEach((row, i) => {
        //go through each row inside title array
        if (!secondFilter[title]) {
          //if there is no key associated with the title
          //create a new object
          secondFilter[title] = {}
          //set a year to the title if it exists
          secondFilter[title][row.year] = []
          //add the row to the specified year
          secondFilter[title][row.year].push(row)
          //check if the year exists with the title
        } else if (!secondFilter[title][row.year]) {
          //if it does not create the new year
          secondFilter[title][row.year] = []
          //push the row into the title/year
          secondFilter[title][row.year].push(row)
        } else {
          //push the row into the title and year specified
          secondFilter[title][row.year].push(row)
        }
      })
    }
    //should return an array that contains a title as a key, an array of objects specifying years arrays as the value. Each of these arrays contains all of the row related to the year.
    return secondFilter
  }