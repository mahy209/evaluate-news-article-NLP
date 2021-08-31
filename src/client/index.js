import { handleSubmit } from './js/formHandler'
import { checkForUrl } from './js/urlChecker'

// scss files
import './styles/main.scss'
import './styles/base.scss'
import './styles/footer.scss'
import './styles/form.scss'
import './styles/header.scss'

window.addEventListener('DOMContentLoaded', () => {
    console.log('The DOM is fully loaded and parsed');

    const form = document.getElementById('form')
    form.addEventListener('submit', (event) => {
        event.preventDefault()
        handleSubmit()
    })
});

export { 
    handleSubmit,
    checkForUrl
} 
