import { checkForUrl } from './urlChecker'

async function handleSubmit(event) {
  event.preventDefault()

  // check what text was put into the form field
  let formText = document.getElementById('url').value

  if(checkForUrl(formText)) {
  console.log("::: Form Submitted :::")

  postData('http://localhost:8081/api', {url: formText})

  
  .then(function(res) {
      // form updated
      document.getElementById("text").innerHTML = `Text: ${apiRes.sentence_list[0].text.toLowerCase()}`;
      document.getElementById("agreement").innerHTML = `Agreement: ${apiRes.agreement.toLowerCase()}`;
      document.getElementById("subjectivity").innerHTML = `Subjectivity: ${apiRes.subjectivity.toLowerCase()}`;
      document.getElementById("confidence").innerHTML = `Confidence: ${apiRes.confidence}`;
      document.getElementById("irony").innerHTML = `Irony: ${apiRes.irony.toLowerCase()}`;
  })
 } else {
      alert('It seems like an invalid URL');
  }
}

const postData = async (url = "", data = {}) => {
  console.log('Analyzing:', data);
  const response = await fetch(url, {
      method: 'POST',
      credentials: 'same-origin',
      mode: 'cors',
      headers: {
      'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
  });
  try {
      const newData = await response.json();
      console.log('Data received:', newData)
      return newData;
  } catch (error) {
      console.log('error', error);
  }
};

export { handleSubmit }
