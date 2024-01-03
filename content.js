const getGhAccounts = () => {
  const names = [...document.querySelectorAll('.text-small > a.Link')]
    .map(link => link.textContent.trim().slice(1))
  const assignment = window.location.pathname.split('/').pop();
  const repos = names.map(name => `https://github.com/UMSI579-Instructors/${assignment}-${name}`)
  const feedbacks = repos.map(url => `${url}/pull/1/files`)
  const actions = repos.map(url => `${url}/actions`)
  return {
    repos,
    feedbacks,
    actions,
  }
}


chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.method === "tabs")
      sendResponse({ links: getGhAccounts()});
  }
);
