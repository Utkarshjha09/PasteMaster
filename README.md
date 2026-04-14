# PasteMaster

PasteMaster is a lightweight browser extension that restores copy and paste on
websites that block normal input behavior.

## Why PasteMaster?

Many sites disable paste, copy, cut, or context menu actions in forms. This
extension removes those restrictions so you can use password managers,
autofill, and your own workflow without friction.

## Features

- Re-enables copy and paste on matching websites
- Rule-based activation using JavaScript regular expressions
- Per-tab active/inactive behavior
- Clean popup and options UI for quick pattern management
- Refreshed PasteMaster logo and icon set

## How It Works

PasteMaster runs only on sites that match your saved rules. When a tab URL
matches a rule, the extension activates and updates the toolbar icon to indicate
active state.

## Usage

1. Open the extension popup.
2. Add or edit a pattern for the current site.
3. Click Save.
4. If the current tab matches your rule, PasteMaster becomes active.

## Local Development

1. Clone this repository.
2. Open Chrome and go to `chrome://extensions`.
3. Enable Developer mode.
4. Click Load unpacked and select this project folder.

## Permissions

- `storage`: save and read your matching rules
- `tabs`: detect active tab changes so the extension can toggle correctly

PasteMaster does not send your browsing data to external servers. All logic is
local to the extension.

## License

See [LICENSE.md](LICENSE.md).
