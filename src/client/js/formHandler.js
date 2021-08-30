import { checkForUrl } from './urlChecker'

const postData = async (url = '', data = {}) => {
  const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  try {
    return await response.json()
  } catch (error) {
    console.log(error)
  }
}

const handleSubmit = async () => {
  const getUrl = document.getElementById('article-url').value
  if (checkForUrl(getUrl)) {
    postData('http://localhost:8081/new-url', {
      getUrl
    }).then((apiData) => {
      document.getElementById('text').innerHTML = `SubjectText: ${apiData.text}`
      document.getElementById('agreement').innerHTML = `Agreement: ${apiData.agreement}`
      document.getElementById('confidence').innerHTML = `Confidence: ${apiData.confidence}`
      document.getElementById('subjectivity').innerHTML = `Subjectivity: ${apiData.subjectivity}`
      document.getElementById('irony').innerHTML = `Irony: ${apiData.irony}`
    })
  } else {
    alert(' ITS INVALID URL')
  }
}


export { handleSubmit };
