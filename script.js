assets/script.js */
const studentNameInput = document.getElementById('studentName');
const currentYearInput = document.getElementById('currentYear');
const endYearInput = document.getElementById('endYear');
const levelSelect = document.getElementById('level');
const newModuleInput = document.getElementById('newModule');
const addModuleBtn = document.getElementById('addModule');
const tableBody = document.querySelector('#modulesTable tbody');

let modules = JSON.parse(localStorage.getItem('modules')) || [];

function saveData() {
  localStorage.setItem('modules', JSON.stringify(modules));
  localStorage.setItem('studentName', studentNameInput.value);
  localStorage.setItem('currentYear', currentYearInput.value);
  localStorage.setItem('endYear', endYearInput.value);
  localStorage.setItem('level', levelSelect.value);
}

function loadData() {
  studentNameInput.value = localStorage.getItem('studentName') || '';
  currentYearInput.value = localStorage.getItem('currentYear') || '';
  endYearInput.value = localStorage.getItem('endYear') || '';
  levelSelect.value = localStorage.getItem('level') || 'CT';
  renderModules();
}

function renderModules() {
  tableBody.innerHTML = '';
  modules.forEach((mod, index) => {
    const tr = document.createElement('tr');
    const tdName = document.createElement('td');
    tdName.textContent = mod.name;

    const tdStatus = document.createElement('td');
    const select = document.createElement('select');
    ['non validé', 'en cours', 'validé'].forEach(st => {
      const opt = document.createElement('option');
      opt.value = st;
      opt.textContent = st;
      if (st === mod.status) opt.selected = true;
      select.appendChild(opt);
    });
    select.addEventListener('change', () => {
      mod.status = select.value;
      saveData();
      renderModules();
    });
    tdStatus.appendChild(select);

    const tdAction = document.createElement('td');
    const delBtn = document.createElement('button');
    delBtn.textContent = '🗑️';
    delBtn.addEventListener('click', () => {
      modules.splice(index, 1);
      saveData();
      renderModules();
    });
    tdAction.appendChild(delBtn);

    tr.className = mod.status.replace(' ', '');
    tr.appendChild(tdName);
    tr.appendChild(tdStatus);
    tr.appendChild(tdAction);
    tableBody.appendChild(tr);
  });
}

addModuleBtn.addEventListener('click', () => {
  const name = newModuleInput.value.trim();
  if (name) {
    modules.push({ name, status: 'non validé' });
    newModuleInput.value = '';
    saveData();
    renderModules();
  }
});

[studentNameInput, currentYearInput, endYearInput, levelSelect].forEach(el => {
  el.addEventListener('input', saveData);
});

loadData();
