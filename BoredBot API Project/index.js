document
  .getElementById('getActivity')
  .addEventListener('click', appendActivity);

async function getActivity() {
  try {
    const response = await fetch('https://apis.scrimba.com/bored/api/activity');
    if (!response.ok) {
      throw new Error(`Error: Status code ${response.status}`);
    }
    const data = await response.json();
    return data.activity;
  } catch (error) {
    console.log(error);
    document.getElementById('activity').textContent = 'Error fetching Activity';
  }
}

async function appendActivity() {
  const activityEl = document.getElementById('activity');
  activityEl.textContent = 'Loading....';
  try {
    const activity = await getActivity();
    activityEl.textContent = activity;
  } catch (error) {
    activityEl.textContent = 'Error Fetching Data';
  }
}
