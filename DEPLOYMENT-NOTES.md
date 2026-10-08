# ZYRO Deployment Notes

Do not deploy real-money rewards yet.

## GitHub
Upload the extracted project contents so GitHub shows:
- public/
- src/
- migrations/
- package.json
- wrangler.toml
- README.md

## Cloudflare
The target architecture is:
Telegram -> Cloudflare Worker -> D1
                     |
                     -> static Mini App

The D1 database must be created first. After creation, replace
REPLACE_AFTER_CREATING_D1 in wrangler.toml with the real database ID.

## Telegram
The BotFather token is secret. It must never be placed in index.html,
app.js, or any GitHub file.

The production Worker should verify Telegram WebApp initData before
creating/updating a user or awarding points.
