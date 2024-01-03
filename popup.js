
let urls = {};

chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  // since only one tab should be active and in the current window at once
  // the return variable should only have one entry
   console.log('TAAB', tabs)

  console.log('OH SHI', tabs[0].url)
  if(tabs[0].url.includes('https://classroom.github.com/classrooms/')) {
     console.log('THIS IS A TAB WE WANT TO DO STUFF O')
    document.querySelectorAll('[data-open]').forEach(button => {
      button.disabled = false;
      button.addEventListener('click', (e) => {
        const type = e.target.getAttribute('data-open')
        urls[type].forEach(url => {
          chrome.tabs.create({ url, active: false });
        })

      })
    })
  }
});


(async () => {
  const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});
  const response = await chrome.tabs.sendMessage(tab.id, {method: "tabs"});
  urls = response.links;
})();
