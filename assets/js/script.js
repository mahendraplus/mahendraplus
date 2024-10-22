'use strict'

// element toggle function
const elementToggleFunc = function (elem) {
  elem.classList.toggle('active')
}

// sidebar variables
const sidebar = document.querySelector('[data-sidebar]')
const sidebarBtn = document.querySelector('[data-sidebar-btn]')

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener('click', function () {
  elementToggleFunc(sidebar)
})

// testimonials variables
const testimonialsItem = document.querySelectorAll('[data-testimonials-item]')
const modalContainer = document.querySelector('[data-modal-container]')
const modalCloseBtn = document.querySelector('[data-modal-close-btn]')
const overlay = document.querySelector('[data-overlay]')

// modal variable
const modalImg = document.querySelector('[data-modal-img]')
const modalTitle = document.querySelector('[data-modal-title]')
const modalText = document.querySelector('[data-modal-text]')

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle('active')
  overlay.classList.toggle('active')
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {
  testimonialsItem[i].addEventListener('click', function () {
    modalImg.src = this.querySelector('[data-testimonials-avatar]').src
    modalImg.alt = this.querySelector('[data-testimonials-avatar]').alt
    modalTitle.innerHTML = this.querySelector(
      '[data-testimonials-title]'
    ).innerHTML
    modalText.innerHTML = this.querySelector(
      '[data-testimonials-text]'
    ).innerHTML

    testimonialsModalFunc()
  })
}

// add click event to modal close button
modalCloseBtn.addEventListener('click', testimonialsModalFunc)
overlay.addEventListener('click', testimonialsModalFunc)

// custom select variables
const select = document.querySelector('[data-select]')
const selectItems = document.querySelectorAll('[data-select-item]')
const selectValue = document.querySelector('[data-selecct-value]')
const filterBtn = document.querySelectorAll('[data-filter-btn]')

select.addEventListener('click', function () {
  elementToggleFunc(this)
})

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener('click', function () {
    let selectedValue = this.innerText.toLowerCase()
    selectValue.innerText = this.innerText
    elementToggleFunc(select)
    filterFunc(selectedValue)
  })
}

// filter variables
const filterItems = document.querySelectorAll('[data-filter-item]')

const filterFunc = function (selectedValue) {
  for (let i = 0; i < filterItems.length; i++) {
    if (selectedValue === 'all') {
      filterItems[i].classList.add('active')
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add('active')
    } else {
      filterItems[i].classList.remove('active')
    }
  }
}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0]

for (let i = 0; i < filterBtn.length; i++) {
  filterBtn[i].addEventListener('click', function () {
    let selectedValue = this.innerText.toLowerCase()
    selectValue.innerText = this.innerText
    filterFunc(selectedValue)

    lastClickedBtn.classList.remove('active')
    this.classList.add('active')
    lastClickedBtn = this
  })
}

// contact form variables
const formcss = document.querySelector('[data-form]')
const formInputs = document.querySelectorAll('[data-form-input]')
const formBtn = document.querySelector('[data-form-btn]')

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener('input', function () {
    // check form validation
    if (formcss.checkValidity()) {
      formBtn.removeAttribute('disabled')
    } else {
      formBtn.setAttribute('disabled', '')
    }
  })
}

// BLOG API - https://maxsblogtech.blogspot.com/ - Function

const url =
  'https://www.googleapis.com/blogger/v3/blogs/5756101577982345999/posts?key=AIzaSyB6HxgFHnC9x9lUIB9DCJAx-waXBt9YF8Y'

fetch(url)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText)
    }
    return response.json()
  })
  .then(data => {
    const postList = document.getElementById('blog-post-list')

    data.items.forEach(post => {
      // Create a new list item
      const li = document.createElement('li')
      li.classList.add('blog-post-item')

      // Create anchor element
      const anchor = document.createElement('a')
      anchor.href = post.url

      // Create figure for image
      const figure = document.createElement('figure')
      figure.classList.add('blog-banner-box')

      // Handle image loading with fallback
      let imgSrc
      if (post.images && post.images.length > 0) {
        imgSrc = post.images[0].url
      } else {
        // Try to extract the first image from the post content
        const imgMatch = post.content.match(/<img[^>]+src="([^">]+)"/)
        imgSrc = imgMatch ? imgMatch[1] : './assets/img/default.jpg' // Fallback to a default image
      }

      const img = document.createElement('img')
      img.src = imgSrc
      img.alt = post.title
      img.loading = 'lazy' // Optional: use 'loading=lazy' for performance
      figure.appendChild(img)

      // Create blog content div
      const blogContent = document.createElement('div')
      blogContent.classList.add('blog-content')

      // Create meta info (labels as categories and time)
      const blogMeta = document.createElement('div')
      blogMeta.classList.add('blog-meta')

      const category = document.createElement('p')
      category.classList.add('blog-category')
      // Use the first label as the category
      category.textContent = post.labels ? post.labels[0] : 'Uncategorized' // Fallback if no label

      const dot = document.createElement('span')
      dot.classList.add('dot')

      const time = document.createElement('time')
      time.datetime = post.published
      time.textContent = new Date(post.published).toDateString() // Format the date

      blogMeta.appendChild(category)
      blogMeta.appendChild(dot)
      blogMeta.appendChild(time)

      // Add blog title
      const blogTitle = document.createElement('h3')
      blogTitle.classList.add('h3', 'blog-item-title')
      blogTitle.textContent = post.title

      // Add blog description text
      const blogText = document.createElement('p')
      blogText.classList.add('blog-text')
      blogText.innerHTML = post.content // Short description of the content
      blogText.style.display = 'none'

      // Add hidden author's display name
      const authorName = document.createElement('p')
      authorName.classList.add('author-name')
      authorName.textContent = post.author.displayName
      authorName.style.display = 'none' // Hide the author's name

      // Append elements to content div
      blogContent.appendChild(blogMeta)
      blogContent.appendChild(blogTitle)
      blogContent.appendChild(blogText)
      blogContent.appendChild(authorName) // Hidden author's name

      // Append figure and content to anchor
      anchor.appendChild(figure)
      anchor.appendChild(blogContent)

      // Append anchor to list item
      li.appendChild(anchor)

      // Finally, append the list item to the post list
      postList.appendChild(li)
    })
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error)
  })

// page navigation variables
const navigationLinks = document.querySelectorAll('[data-nav-link]')
const pages = document.querySelectorAll('[data-page]')

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener('click', function () {
    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add('active')
        navigationLinks[i].classList.add('active')
        window.scrollTo(0, 0)
      } else {
        pages[i].classList.remove('active')
        navigationLinks[i].classList.remove('active')
      }
    }
  })
}

// Mahendraplus gitAPI
// Fetch repositories from GitHub
async function fetchGitHubRepos () {
  const username = 'mahendraplus' // Change this to your GitHub username
  const response = await fetch(`https://api.github.com/users/${username}/repos`)
  const repos = await response.json()

  return repos
}

// Populate the HTML with repo data
async function populateProjects () {
  const projectsContainer = document.querySelector('.project-list')
  const repos = await fetchGitHubRepos()
  const languages = new Set() // to store unique languages

  // Populate the unique languages set
  repos.forEach(repo => {
    if (repo.language) languages.add(repo.language)
  })

  // Convert the Set to an array and sort it
  const sortedLanguages = ['All', ...Array.from(languages).sort()]

  // Populate the filter list with languages
  const filterList = document.querySelector('.filter-list')
  sortedLanguages.forEach(language => {
    const li = document.createElement('li')
    li.className = 'filter-item'
    li.innerHTML = `<button class="active" data-filter-btn>${language}</button>`
    filterList.appendChild(li)
  })

  // Populate the select list with languages
  const selectList = document.querySelector('.select-list')
  sortedLanguages.forEach(language => {
    const li = document.createElement('li')
    li.className = 'select-item'
    li.innerHTML = `<button data-select-item>${language}</button>`
    selectList.appendChild(li)
  })

  // Populate the project list
  repos.forEach(repo => {
    const projectItem = document.createElement('li')
    projectItem.className = 'project-item active'
    projectItem.setAttribute('data-filter-item', '')
    projectItem.setAttribute('data-category', repo.language || 'other')

    const projectLink = repo.homepage || repo.html_url // Use homepage if available, else repo URL

    projectItem.innerHTML = `
        <a href="${projectLink}">
          <figure class="project-img">
            <div class="project-item-icon-box">
              <ion-icon name="eye-outline"></ion-icon>
            </div>
            <img src="./assets/img/gitrepo/${repo.name}_2.png" alt="${
      repo.name
    }" loading="lazy" onerror="this.onerror=null; this.src='https://random.imagecdn.app/1280/640';">
          </figure>
          <h3 class="project-title">${repo.name}</h3>
          <p class="project-category">${
            repo.description || 'No description available'
          }</p>
          <div class="count-date-box">
          <div class="project-count">⭐ ${repo.stargazers_count}  :  🍴 ${
      repo.forks_count
    }  :   🛠️ ${repo.language || 'N/A'}</div>
          <div class="project-date">${new Date(
            repo.created_at
          ).toLocaleDateString()}</div>
          </div>
        </a>
      `

    projectsContainer.appendChild(projectItem)
  })

  // Add event listeners for filter buttons
  addFilterEventListeners(repos)
}

// Add event listeners for filter buttons
function addFilterEventListeners (repos) {
  const filterButtons = document.querySelectorAll('[data-filter-btn]')
  const projectItems = document.querySelectorAll('[data-filter-item]')

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const selectedLanguage = button.textContent

      // Update active state of filter buttons
      filterButtons.forEach(btn => {
        btn.classList.remove('active')
      })
      button.classList.add('active')

      // Filter project items
      projectItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category')
        if (selectedLanguage === 'All' || itemCategory === selectedLanguage) {
          item.style.display = 'block' // Show matching item
        } else {
          item.style.display = 'none' // Hide non-matching item
        }
      })
    })
  })

  // Add event listeners for select items
  const selectItems = document.querySelectorAll('[data-select-item]')
  selectItems.forEach(item => {
    item.addEventListener('click', () => {
      const selectedLanguage = item.textContent
      document.querySelector('.filter-select').classList.remove('active')
      filterButtons.forEach(btn => {
        btn.classList.remove('active')
        if (btn.textContent === selectedLanguage) {
          btn.classList.add('active')
        }
      })
      // Filter project items
      projectItems.forEach(project => {
        const itemCategory = project.getAttribute('data-category')
        if (selectedLanguage === 'All' || itemCategory === selectedLanguage) {
          project.style.display = 'block' // Show matching item
        } else {
          project.style.display = 'none' // Hide non-matching item
        }
      })
    })
  })
}
// Call the function to populate projects
document.addEventListener('DOMContentLoaded', populateProjects)

// Profile - Animation - Style
// Select the element with the pseudo-element
const avatarBox = document.querySelector('.avatar-box')

// Function to generate a random size in steps of 20px between 10px and 300px
function getRandomSize (min, max, step) {
  const range = Math.floor((max - min) / step) + 1
  const randomStep = Math.floor(Math.random() * range)
  return min + randomStep * step
}

// Function to set a random background size on ::before
function setRandomBackgroundSize () {
  const randomWidth = getRandomSize(10, 300, 100)
  const randomHeight = getRandomSize(10, 307, 100)

  // Update the background size using a CSS variable for the ::before pseudo-element
  avatarBox.style.setProperty(
    '--random-bg-size',
    `${randomWidth}px ${randomHeight}px`
  )
}

// Call the function to set the background size
setRandomBackgroundSize()

// Form --------

function submitForm () {
  document.querySelector('.contact-form').style.display = 'none'
  document.querySelector('.contact-form-sending').style.display = 'block'
}

// ----------------------------------------------------------------
// const botToken = ''
// const chatId = ''
//----------------------------------------------------------------
function getCurrentDateTime () {
  const now = new Date(),
    day = String(now.getDate()).padStart(2, '0'),
    month = String(now.getMonth() + 1).padStart(2, '0'),
    year = now.getFullYear(),
    hours = now.getHours() % 12 || 12,
    minutes = String(now.getMinutes()).padStart(2, '0'),
    ampm = now.getHours() >= 12 ? 'PM' : 'AM'
  return {
    formattedDate: `${day}/${month}/${year}`,
    formattedTime: `${hours}:${minutes} ${ampm}`
  }
}
function getClientIP () {
  return fetch('https://api.ipify.org?format=json')
    .then(response => response.json())
    .then(data => data.ip)
    .catch(() => 'Unknown IP')
}
const form = document.querySelector('form')
form.addEventListener('submit', handleSubmit)
function handleSubmit (event) {
  event.preventDefault()
  const formData = new FormData(form),
    formObject = {}
  formData.forEach((value, key) => {
    formObject[key] = value
  })
  const dateTime = getCurrentDateTime(),
    browserDetails = navigator.userAgent,
    fileInput = form.querySelector('input[type="file"]'),
    attachedFile =
      fileInput && fileInput.files.length > 0 ? fileInput.files[0] : null
  getClientIP().then(ipAddress => {
    let message = `<u><b>💻 DEVICE INFO 💻</b></u>\n\n<blockquote>🌍 IP Address : ${ipAddress}</blockquote>\n<blockquote>🖥️ Browser: ${browserDetails}</blockquote>\n<blockquote>📅 Date: ${dateTime.formattedDate}</blockquote>\n<blockquote>🕒 Time: ${dateTime.formattedTime}</blockquote>\n\n<u><b>👉 CONTACT FORM 👈</b></u>\n\n`
    for (const [key, value] of Object.entries(formObject)) {
      if (key !== 'file') {
        message += `<blockquote>🔖 ${key}: ${value}</blockquote>\n`
      }
    }
    message += `<blockquote>🔖 file: ${
      attachedFile ? attachedFile.name : 'None'
    }</blockquote>\n\n<a href='https://github.com/mahendraplus'>Developed By Max! </a>`
    if (attachedFile) {
      const fileFormData = new FormData()
      fileFormData.append('chat_id', chatId)
      fileFormData.append('document', attachedFile)
      fetch(`https://api.telegram.org/bot${botToken}/sendDocument`, {
        method: 'POST',
        body: fileFormData
      })
        .then(response => response.json())
        .then(data => {
          if (data.ok) {
            sendTelegramMessage(message)
          }
        })
        .catch(() => {})
    } else {
      sendTelegramMessage(message)
    }
  })
}
function sendTelegramMessage (message) {
  const url = `https://api.telegram.org/bot${botToken}/sendMessage`
  fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      chat_id: chatId,
      text: message,
      parse_mode: 'HTML'
    })
  })
    .then(response => response.json())
    .then(data => {
      if (data.ok) {
        // alert(data.result.message_id);
        document.querySelector('.loader').style.display = 'none'
        document.querySelector('.success-animation').style.display = 'block'
        document.querySelector(
          '.status'
        ).textContent = `Thank you! Your form has been successfully submitted. Your reference ID is: ${data.result.message_id}`

        // Set the starting time in seconds
        let timeLeft = 10

        // Function to update the timer display every second
        const countdown = setInterval(() => {
          // Decrease the time left by 1
          timeLeft--
          // When timeLeft reaches 0, stop the countdown
          if (timeLeft < 0) {
            clearInterval(countdown)
            // Stop the success animation and show the success message
            // =================================================================
          }
        }, 1000) // 1000 milliseconds = 1 second
      }
    })
    .catch(() => {})
}

// MAXNOTES = JS01
//############################ CERTIFICATE START ####################################
const _0x4dedb2 = _0x1edc
;(function (_0x30c741, _0x5ffd9a) {
  const _0x4d5fe0 = _0x1edc
  const _0x4d7fbd = _0x30c741()
  while (!![]) {
    try {
      const _0x1e35cf =
        parseInt(_0x4d5fe0(0xe6)) / 0x1 +
        (parseInt(_0x4d5fe0(0xdf)) / 0x2) * (parseInt(_0x4d5fe0(0xe5)) / 0x3) +
        parseInt(_0x4d5fe0(0xe1)) / 0x4 +
        parseInt(_0x4d5fe0(0xe7)) / 0x5 +
        -parseInt(_0x4d5fe0(0xdd)) / 0x6 +
        (-parseInt(_0x4d5fe0(0xe0)) / 0x7) *
          (-parseInt(_0x4d5fe0(0xe2)) / 0x8) +
        -parseInt(_0x4d5fe0(0xe3)) / 0x9
      if (_0x1e35cf === _0x5ffd9a) {
        break
      } else {
        _0x4d7fbd['push'](_0x4d7fbd['shift']())
      }
    } catch (_0x20b9ec) {
      _0x4d7fbd['push'](_0x4d7fbd['shift']())
    }
  }
})(_0x3829, 0xdbd90)
const botToken = _0x4dedb2(0xe4)
function _0x1edc (_0x383d4e, _0x3acc1b) {
  const _0x382994 = _0x3829()
  _0x1edc = function (_0x1edcb8, _0x501230) {
    _0x1edcb8 = _0x1edcb8 - 0xdd
    let _0x183ff6 = _0x382994[_0x1edcb8]
    return _0x183ff6
  }
  return _0x1edc(_0x383d4e, _0x3acc1b)
}
function _0x3829 () {
  const _0x1b51fb = [
    '19088bIjFbh',
    '20559078zxqXgk',
    '7976051238:AAE61pAw8P33AQ2X-M7DTqmqWkSroHR3l4E',
    '3ZrAtXk',
    '321748WUVleK',
    '4503860RbwfZg',
    '2162952YhVTXU',
    '-1002156518345',
    '3587002KgPWDw',
    '91QTCgbK',
    '1993164ONCCLx'
  ]
  _0x3829 = function () {
    return _0x1b51fb
  }
  return _0x3829()
}
const chatId = _0x4dedb2(0xde)
//############################ CERTIFICATE END ####################################
