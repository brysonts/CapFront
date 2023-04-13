import { useState } from 'react'
import './App.css'
import { useEffect } from 'react'
const BASE_URL = 'https://api.harvardartmuseums.org'
const KEY = 'apikey=6d0c1154-2b9d-4f22-9255-dd98abf62548&size=100'

function App() {
  const [classifications, setClassifications] = useState([])
  const [centuries, setCenturies] = useState([])
  const [results, setResults] = useState([])
  const [input, setInput] = useState('')
  const [selectCentury, setSelectCentury] = useState('')
  const [selectClassifications, setSelectClassifications] = useState('')

  async function fetchClassifications() {
    const resp = await fetch(
      'https://api.harvardartmuseums.org/classification?apikey=6d0c1154-2b9d-4f22-9255-dd98abf62548&size=100',
    )
    const info = await resp.json()
    setClassifications(info.records)
  }
  async function fetchCenturies() {
    const centuryResp = await fetch(
      'https://api.harvardartmuseums.org/century?apikey=6d0c1154-2b9d-4f22-9255-dd98abf62548&size=100',
    )
    const centuryInfo = await centuryResp.json()
    setCenturies(centuryInfo.records)
  }
  async function fetchResults() {
    const URL =
      'https://api.harvardartmuseums.org/object?apikey=6d0c1154-2b9d-4f22-9255-dd98abf62548&size=100'
    if (input) {
      URL = URL + `&keyword=${input}`
    }
    const resultResp = await fetch(
      'https://api.harvardartmuseums.org/object?apikey=6d0c1154-2b9d-4f22-9255-dd98abf62548&size=100',
    )
    const resultInfo = await resultResp.json()
    console.log(resultInfo)
    setResults(resultInfo.records)
  }
  useEffect(() => {
    fetchClassifications()
    fetchCenturies()
    // fetchResults()
    // fetchQuery()
  }, [])
  // console.log(input)
  // console.log(selectCentury)
  // console.log(selectClassifications)

  return (
    <article>
      <h1 className="actitle">Art Collector</h1>
      <label className="queryLabel">
        Query
        <input
          value={input}
          className="queryInput"
          onChange={(event) => {
            setInput(event.target.value)
          }}
        ></input>
      </label>
      <form>
        <label>Classifications ({classifications.length})</label>
        <select
          className="classSelect"
          defaultValue=""
          onChange={(event) => {
            setSelectClassifications(event.target.value)
          }}
        >
          <option value="">Any</option>
          {classifications.map((classification) => (
            <option className="classOption" key={classification.id}>
              {classification.name}
            </option>
          ))}
        </select>
      </form>
      <label>Century({centuries.length})</label>
      <select
        onChange={(event) => {
          setSelectCentury(event.target.value)
        }}
      >
        {centuries.map((century) => (
          <option key={century.id} value={century.name}>
            {century.name}
          </option>
        ))}
      </select>
      <button onClick={fetchResults}>Search</button>
      <label>Results ({results.length})</label>
      <div className="resultContainer">
        {results.length > 0 ? (
          <div>
            {results.map((result) => (
              <img src={result.primaryimageurl}></img>
            ))}
          </div>
        ) : (
          <p>No results found.</p>
        )}
      </div>
    </article>
  )
}

export default App

// if(value.length>0){
//   fetch ('${BASE_URL}/object?${KEY}').then(
//     valueResp => valueResp.json()
//   ).then(valueData=>{
//     let searchQuery = value.toLowerCase();
//     for(const key valueData){
//       let fruit = valueData[key].name.toLowerCase()
//       if(fruit.slice(0, searchQuery.length))
//     }
//   })

// }

// async function fetchResults(century,classification,queryString){
//     try {
//       const resultResp = await(
//         `${BASE_URL}/object?${KEY}&centry=${century}&classification=${classification}&keyword=${queryString}`
//       )
//       const data = await resultResp.json();
//       console.log(data);
//     } catch (error){
//       console.log(error);
//     }
// }

// async function fetchQuery(){
//   const resp = await fetch ("https://api.harvardartmuseums.org/century?apikey=6d0c1154-2b9d-4f22-9255-dd98abf62548&size=100")
//   const queryAnswer = await resp.json()
//   setObject(queryAnswer.records)
// }

// async function fetchQuery(){
//   const queryResp = await fetch("${BASE_URL}/classification?${KEY}")
//   const requestInfo = await queryResp.json()
//   setResults()
// }
