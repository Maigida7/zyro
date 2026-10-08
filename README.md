# ZYRO Telegram Mini App — Complete Starter

This is the clean ZYRO project package prepared for GitHub and Cloudflare.

## Included
- Responsive Telegram Mini App frontend
- Home dashboard
- Daily check-in UI
- Task catalog UI
- Referral UI
- Leaderboard UI
- Rewards UI
- Cloudflare Worker API scaffold
- Cloudflare D1 database schema
- Wrangler configuration
- Production-oriented project structure

## Important
The frontend currently runs in Beta/demo mode. Real points, task verification, referral rewards and redemption must be enabled only after server-side Telegram WebApp authentication and abuse protection are implemented.

Never put a BotFather token in the frontend, GitHub repository, or public JavaScript.

## Deployment plan
1. Create GitHub repository.
2. Upload the contents of this package (not the ZIP itself).
3. Create a Cloudflare D1 database named `zyro-db`.
4. Put the resulting D1 database ID into `wrangler.toml`.
5. Run the D1 migration.
6. Deploy the Worker.
7. Configure the Telegram Mini App URL in BotFather.
8. Test Telegram init-data verification and all reward/task flows.
9. Add admin controls and production reward rules before launch.

## Security before real rewards
- Verify Telegram init data on the server.
- Do not trust points from the browser.
- Write every points change to `point_ledger`.
- Make task completion unique per user/task.
- Rate-limit sensitive endpoints.
- Protect admin endpoints separately.
- Keep secrets in Cloudflare secrets, never source code.
