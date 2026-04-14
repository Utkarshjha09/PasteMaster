(function() {
  importScripts('dfwp.js');

  const browser = DFWP.browser;
  const action = browser.action || browser.browserAction;
  let rules = new DFWP.Rules();

  const checkIfActive = (tabId) => {
    browser.tabs.get(tabId, tab => {
      const match = tab && tab.url && rules.some((r) => r.test(tab.url));

      if (match) {
        action.setIcon({ path: 'clipboard-active-32.png' });
        action.setTitle({ title: "PasteMaster (active)" });
        browser.tabs.sendMessage(tab.id, { active: true });
      } else {
        action.setIcon({ path: 'clipboard-inactive-32.png' });
        action.setTitle({ title: "PasteMaster (inactive)" });
        browser.tabs.sendMessage(tab.id, { active: false });
      }
    });
  };

  const fetchRules = (cb) => {
    DFWP.storage.get({ rules: [] }, (result = {}) => {
      const values = result.rules || [];
      rules = DFWP.Rules.deserialize(values);
      if (cb) { cb(); }
    });
  };

  browser.runtime.onInstalled.addListener(({ previousVersion, reason }) => {
    if (reason === 'update' && previousVersion == '1.1') {
      DFWP.storage.get({ include: '' }, (result = {}) => {
        const include = result.include || '';
        fetchRules(() => {
          include.split('\n').forEach(value => {
            if (value !== '.*') {
              const rule = new DFWP.Rule(value);
              rules.add(rule);
            }
          });
          DFWP.storage.set({ rules: rules.serialize() });
        });
      });
    }
  });

  browser.runtime.onMessage.addListener(({ didLoad }) => {
    if (didLoad) {
      browser.tabs.query({active: true, windowId: browser.windows.WINDOW_ID_CURRENT}, ([tab]) => {
        checkIfActive(tab.id);
      });
    }
  });

  browser.storage.onChanged.addListener(() => {
    fetchRules(() => {
      browser.tabs.query({active: true}, tabs => {
        tabs.forEach(tab => {
          checkIfActive(tab.id);
        });
      });
    })
  });

  browser.tabs.onActivated.addListener(({ tabId }) => checkIfActive(tabId));

  fetchRules();
})();
