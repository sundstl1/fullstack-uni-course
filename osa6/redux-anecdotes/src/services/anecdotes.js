import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

const getAll = async () => {
  const response = await axios.get(baseUrl)
  console.log(response.data)
  return response.data
}

const createNew = async (content) => { 
    const object = { 
        content,
        getId,
        votes: 0
    }  
    const response = await axios.post(baseUrl, object)
    return response.data
}

const update = async ({content, id, votes}) => { 
    const newObject = { 
        content,
        id,
        votes: votes
    }
    console.log ('updating anecdote')  
    const response = await axios.put(`${baseUrl}/${id}`, newObject)
    return response.data
}

export default {getAll, createNew, update}