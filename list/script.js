// selecionar elementos
const toDiscussList = document.getElementById('toDiscussList');
const discussedList = document.getElementById('discussedList');
const newTopicInput = document.getElementById('newTopicInput');
const addTopicBtn = document.getElementById('addTopicBtn');
const resetBtn = document.getElementById('reset');

let toDiscussTopics = [];
let discussedTopics = [];

// salvar tópicos
function saveTopics() {
    localStorage.setItem('toDiscussTopics', JSON.stringify(toDiscussTopics));
    localStorage.setItem('discussedTopics', JSON.stringify(discussedTopics));
}

// carregar tópicos
function loadTopics() {
    const savedToDiscuss = localStorage.getItem('toDiscussTopics');
    const savedDiscussed = localStorage.getItem('discussedTopics');

    if (savedToDiscuss) {
        toDiscussTopics = JSON.parse(savedToDiscuss);
  }
    if (savedDiscussed) {
        discussedTopics = JSON.parse(savedDiscussed);
  }
}


// criar item na lista
function createItem(topic, isDiscussed = false){
    const li = document.createElement('li');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = isDiscussed; 

    if (isDiscussed) {
    li.classList.add('discussed');        
  }

    const text = document.createTextNode(' ' + topic);

    li.appendChild(checkbox);
    li.appendChild(text);

    return li;
}

// renderizar lista
function renderLists() {
    toDiscussList.innerHTML = '';
    discussedList.innerHTML = '';

    toDiscussTopics.forEach(topic => {
        toDiscussList.appendChild(createItem(topic, false));
    });
    

    discussedTopics.forEach(topic => {
        discussedList.appendChild(createItem(topic, true));
    });
}

// adicionar tópicos
function addTopic() {
  const topic = newTopicInput.value.trim();
  if (topic) {
    toDiscussTopics.push(topic);
    saveTopics();
    renderLists();
    newTopicInput.value = '';
  }
}

addTopicBtn.addEventListener('click', addTopic);

// suporte a tecla enter
newTopicInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    e.preventDefault();
    addTopicBtn.click();
  }
});


// mover tópicos para "assuntos passados"
// toDiscussList.addEventListener('change', e => {
//     if (e.target.type === 'checkbox' && e.target.checked) {
//         const li = e.target.parentElement;
//         const topicText = li.textContent.trim();
//         // remover de toDiscussList
//         toDiscussTopics = toDiscussTopics.filter(t => t != topicText);
//         // adicionar a discussedList
//         discussedTopics.push(topicText);
//         saveTopics();
//         renderLists();
//     }
// });

function handleToggle(e) {
  if (e.target.type === 'checkbox') {
    const li = e.target.parentElement;
    const topicText = li.textContent.trim();

    if (e.target.checked) {
      // mover para discutidos
      toDiscussTopics = toDiscussTopics.filter(t => t !== topicText);
      if (!discussedTopics.includes(topicText)) discussedTopics.push(topicText);
    } else {
      // mover de volta para a primeira lista
      discussedTopics = discussedTopics.filter(t => t !== topicText);
      if (!toDiscussTopics.includes(topicText)) toDiscussTopics.push(topicText);
    }

    saveTopics();
    renderLists();
  }
}

toDiscussList.addEventListener('change', handleToggle);
discussedList.addEventListener('change', handleToggle);

// resetar lista
resetBtn.addEventListener('click', () => {
  if (confirm("Tem certeza que quer resetar?")) {
    toDiscussTopics = [];
    discussedTopics = [];
    localStorage.removeItem('toDiscussTopics');
    localStorage.removeItem('discussedTopics');
    renderLists();
  }
});


loadTopics();
renderLists();