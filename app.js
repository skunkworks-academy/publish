const stages = ['Intake','Design','Development','Review','QA','Pilot','Release'];
const checklistItems = [
  'Project brief approved',
  'Learning objectives approved',
  'Course assets registered',
  'Technical review completed',
  'Quality assurance passed',
  'Rights and licensing confirmed',
  'Release owner approval recorded'
];

const state = {
  signedIn: false,
  projectCreated: false,
  stageIndex: 0,
  hours: 0,
  timeEntries: [],
  assets: [],
  checks: checklistItems.map(() => false)
};

const $ = (id) => document.getElementById(id);

function renderStages() {
  $('stageList').innerHTML = stages.map((stage, index) => {
    const status = index < state.stageIndex ? 'complete' : index === state.stageIndex ? 'active' : '';
    return `<li class="${status}">${index + 1}. ${stage}</li>`;
  }).join('');
  $('metricStage').textContent = stages[state.stageIndex];
}

function renderTime() {
  $('metricHours').textContent = state.hours.toFixed(2);
  $('timeEntries').innerHTML = state.timeEntries.map((entry) => `<li><span>${entry.activity}</span><strong>${entry.hours.toFixed(2)} h</strong></li>`).join('');
}

function renderAssets() {
  $('assetEntries').innerHTML = state.assets.map((asset) => `<li><span>${asset.name}</span><strong>${asset.type}</strong></li>`).join('');
}

function renderChecklist() {
  $('checklist').innerHTML = checklistItems.map((label, index) => `
    <label class="check-row" for="check-${index}">
      <input id="check-${index}" type="checkbox" data-check-index="${index}" ${state.checks[index] ? 'checked' : ''} />
      <span>${label}</span>
    </label>`).join('');

  document.querySelectorAll('[data-check-index]').forEach((input) => {
    input.addEventListener('change', (event) => {
      state.checks[Number(event.target.dataset.checkIndex)] = event.target.checked;
      updateReadiness();
    });
  });
  updateReadiness();
}

function updateReadiness() {
  const complete = state.checks.filter(Boolean).length;
  const percentage = Math.round((complete / checklistItems.length) * 100);
  $('metricReadiness').textContent = `${percentage}%`;
  const ready = complete === checklistItems.length && state.stageIndex === stages.length - 1;
  $('createReleaseButton').disabled = !ready;
  $('releaseBadge').textContent = ready ? 'Ready for release' : 'Not ready';
  $('releaseBadge').classList.toggle('ready', ready);
}

function showWorkspace() {
  state.signedIn = true;
  $('productView').hidden = true;
  $('capabilities').hidden = true;
  $('workspaceView').hidden = false;
  $('identitySummary').textContent = 'Signed in as demo.user@skunkworksacademy.com · Publishing entitlement: Trial enabled';
}

$('navToggle').addEventListener('click', () => {
  const expanded = $('navToggle').getAttribute('aria-expanded') === 'true';
  $('navToggle').setAttribute('aria-expanded', String(!expanded));
  $('siteNav').classList.toggle('open');
});

$('signInButton').addEventListener('click', showWorkspace);

$('signOutButton').addEventListener('click', () => {
  state.signedIn = false;
  $('workspaceView').hidden = true;
  $('productView').hidden = false;
  $('capabilities').hidden = false;
});

$('createProjectButton').addEventListener('click', () => {
  const projectName = $('projectName').value.trim();
  if (!projectName) {
    $('projectName').focus();
    return;
  }
  state.projectCreated = true;
  $('metricProject').textContent = projectName;
  $('projectWorkspace').hidden = false;
  renderStages();
  renderTime();
  renderAssets();
  renderChecklist();
  $('projectWorkspace').scrollIntoView({ behavior: 'smooth', block: 'start' });
});

$('advanceStageButton').addEventListener('click', () => {
  if (state.stageIndex < stages.length - 1) {
    state.stageIndex += 1;
    renderStages();
    updateReadiness();
  }
});

$('addTimeButton').addEventListener('click', () => {
  const activity = $('timeActivity').value.trim();
  const hours = Number($('timeHours').value);
  if (!activity || !Number.isFinite(hours) || hours <= 0) return;
  state.timeEntries.unshift({ activity, hours });
  state.hours += hours;
  $('timeActivity').value = '';
  renderTime();
});

$('addAssetButton').addEventListener('click', () => {
  const name = $('assetName').value.trim();
  const type = $('assetType').value;
  if (!name) return;
  state.assets.unshift({ name, type });
  $('assetName').value = '';
  renderAssets();
});

$('createReleaseButton').addEventListener('click', () => {
  const date = new Intl.DateTimeFormat('en-ZA', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date());
  $('releaseMessage').textContent = `Release v0.1.0 recorded on ${date}. Production integration will persist this record and trigger the deployment workflow.`;
});