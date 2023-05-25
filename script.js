// new note
const newNote = `
<div class="card-head">
    <div class="title">Enter Title</div>
    <input type="text" class="title disable">
    <div class="drop-down">
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="13px"
            height="13px" viewBox="0 0 13 13" version="1.1">
            <g id="surface1">
                <path style=" stroke:none;fill-rule:nonzero;fill:rgb(0%,0%,0%);fill-opacity:1;"
                    d="M 7.71875 10.5625 C 7.71875 11.234375 7.171875 11.78125 6.5 11.78125 C 5.828125 11.78125 5.28125 11.234375 5.28125 10.5625 C 5.28125 9.890625 5.828125 9.34375 6.5 9.34375 C 7.171875 9.34375 7.71875 9.890625 7.71875 10.5625 Z M 7.71875 6.5 C 7.71875 7.171875 7.171875 7.71875 6.5 7.71875 C 5.828125 7.71875 5.28125 7.171875 5.28125 6.5 C 5.28125 5.828125 5.828125 5.28125 6.5 5.28125 C 7.171875 5.28125 7.71875 5.828125 7.71875 6.5 Z M 7.71875 2.4375 C 7.71875 3.109375 7.171875 3.65625 6.5 3.65625 C 5.828125 3.65625 5.28125 3.109375 5.28125 2.4375 C 5.28125 1.765625 5.828125 1.21875 6.5 1.21875 C 7.171875 1.21875 7.71875 1.765625 7.71875 2.4375 Z M 7.71875 2.4375 " />
            </g>
        </svg>
        <div class="color-select">
            <p>Change Background</p>
            <div class="colors">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
            <div class="delete-btn">Delete</div>
        </div>
    </div>
</div>
<div class="msg-body">Enter Note</div>
<textarea class="msg-body text-body disable" cols="30"></textarea>
`
const newNoteBtn = document.querySelector('nav.container .add-note')
const cardContainer = document.querySelector('main .card-container')
let CARDID = 2

// add new note
newNoteBtn.addEventListener('click', (event) => {
    const card = document.createElement('li')
    card.setAttribute('class', 'card')
    card.setAttribute('data-id', CARDID)
    CARDID++
    card.innerHTML = newNote
    cardContainer.append(card)
    enableBtnTrigger(card)
    deleteTrigger(card)
    changeBackgroundColor(card)
    inputs(card)
    event.stopPropagation()

})


// drop down
const cards = document.querySelectorAll("main .card-container .card")
cards.forEach(card => {
    enableBtnTrigger(card)
    deleteTrigger(card)
    changeBackgroundColor(card)
})

// triggers
function enableBtnTrigger(card) {
    const btn = card.querySelector('svg')
    const box = card.querySelector('.color-select ')
    btn.addEventListener('click', (event) => {
        clearOldDropDown()
        box.classList.toggle('enable')
        cardContainer.setAttribute('data-dropdown-node', card.getAttribute('data-id'))
        event.stopPropagation()
    })
}

function clearOldDropDown () {
    if (cardContainer.getAttribute('data-dropdown-node') !== '-1') {
        const activeNodeNumber = cardContainer.getAttribute('data-dropdown-node')
        const card = cardContainer.querySelector(`[data-id="${activeNodeNumber}"]`)
        card.querySelector('.color-select').classList.remove('enable')
    }
}

function deleteTrigger(card) {
    const deleteBtn = card.querySelector('.card-head .drop-down .color-select .delete-btn')
    deleteBtn.addEventListener('click', () => {
        card.remove()
        cardContainer.setAttribute('data-dropdown-node', -1)
    })
}

function changeBackgroundColor(card) {
    const colors = ["#FFF", "#CBD2D6", "#CCE8E4", "#FAF1DB", "#FDE9D9", "#F9DCD5",]
    const spans = card.querySelectorAll('.card-head .drop-down .color-select .colors span')
    spans.forEach((span, index) => {
        span.addEventListener('click', (e) => {
            card.style.backgroundColor = colors[index]
        })
    })

}

// edit mechanics
inputs(cardContainer.querySelector('.card'))
function inputs(card) {
    const cardID = card.getAttribute('data-id')
    const title = card.querySelector('div.title')
    const input = card.querySelector('input.title')
    const msgBody = card.querySelector('div.msg-body')
    const inputBody = card.querySelector('textarea.text-body')

    title.addEventListener('click', (event) => {
        clearOldNodeTriggers()
        input.value = title.innerText
        title.classList.add('disable')
        input.classList.remove('disable')
        input.focus()
        cardContainer.setAttribute('data-active-node', cardID)
        event.stopPropagation()
    })

    msgBody.addEventListener('click', (event) => {
        clearOldNodeTriggers()
        inputBody.value = msgBody.innerText
        msgBody.classList.add('disable')
        inputBody.classList.remove('disable')
        inputBody.focus()
        cardContainer.setAttribute('data-active-node', cardID)
        event.stopPropagation()

    })
}


window.addEventListener('click', checkActive)
function checkActive() {

    clearOldDropDown ()

    const activeNodeNumber = cardContainer.getAttribute('data-active-node')
    if (activeNodeNumber === "-1")
        return

    const activeNode = cardContainer.querySelector(`[data-id="${activeNodeNumber}"]`)
    const activeElement = document.activeElement
    const title = activeNode.querySelector('div.title')
    const input = activeNode.querySelector('input.title')
    const isTitleActive = title.classList.contains('disable')
    if (isTitleActive && activeElement !== input) {
        title.innerText = input.value
        input.classList.add('disable')
        title.classList.remove('disable')
        cardContainer.setAttribute('data-active-node', -1)
    }

    const msgBody = activeNode.querySelector('div.msg-body')
    const inputBody = activeNode.querySelector('textarea.text-body')
    const isMsgBodyActive = msgBody.classList.contains('disable')
    if (isMsgBodyActive && activeElement !== inputBody) {
        msgBody.innerText = inputBody.value
        inputBody.classList.add('disable')
        msgBody.classList.remove('disable')
        cardContainer.setAttribute('data-active-node', -1)
    }

}

function clearOldNodeTriggers() {

    const allCards = [...cardContainer.children]
    allCards.forEach(card => {
        const title = card.querySelector('div.title')
        const input = card.querySelector('input.title')
        if (title.classList.contains('disable')) {
            title.innerText = input.value
            input.classList.add('disable')
            title.classList.remove('disable')
        }
        const msgBody = card.querySelector('div.msg-body')
        const inputBody = card.querySelector('textarea.text-body')
        if (msgBody.classList.contains('disable')) {
            msgBody.innerText = inputBody.value
            inputBody.classList.add('disable')
            msgBody.classList.remove('disable')
        }
    })
}


