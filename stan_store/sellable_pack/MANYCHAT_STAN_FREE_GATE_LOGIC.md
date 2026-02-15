# ManyChat -> Stan Store Free Gate (One-Link-at-a-Time)

## Goal
Allow one free pack claim at a time, without exposing a public page with all free downloads.

## Products to Create in Stan (Unlisted)
- LoopWorker Free Pack - BEEFBOY
- LoopWorker Free Pack - DRIP
- LoopWorker Free Pack - STAY

Upload files from:
- `stan_store/sellable_pack/free_claim_uploads/BEEFBOY_FREE_CLAIM.zip`
- `stan_store/sellable_pack/free_claim_uploads/DRIP_FREE_CLAIM.zip`
- `stan_store/sellable_pack/free_claim_uploads/STAY_FREE_CLAIM.zip`

## ManyChat Fields
- `free_pack_claimed` (text: `yes` / `no`)
- `free_pack_name` (text)
- `free_claimed_at` (date/time)

Default `free_pack_claimed = no` for new contacts.

## Flow Logic (per keyword)
Trigger keyword: `BEEFBOY` / `DRIP` / `STAY`

Condition:
- If `free_pack_claimed == yes`
  - Message: "You’ve already claimed a free pack. Reply UPGRADE to unlock full access packs."
  - End
- Else
  - Ask for email
  - Send specific Stan URL (only one)
  - Set fields:
    - `free_pack_claimed = yes`
    - `free_pack_name = <keyword>`
    - `free_claimed_at = now`

## DM Copy
Message 1:
"Drop your best email and I’ll send your free pack."

Message 2 (BEEFBOY example):
"Here’s your free BEEFBOY pack: <STAN_BEEFBOY_URL>"

Message 3:
"Reply DONE once you got it."

## Notes
- Keep all three free Stan products unlisted.
- Do not place them in any public storefront collection.
- Share links only via ManyChat automation.
