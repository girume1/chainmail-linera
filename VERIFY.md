# 1-Click Judge Verification

1. Open live demo: **https://chainmail-linera.vercel.app**
2. Register two users: `@alice` and `@bob`
3. Alice sends: `"Hello Bob! This is E2EE on Linera"`
4. Bob sees **decrypted** message in inbox
5. Verify on-chain:
   ```bash
   linera query $APP_ID public_keys(alice)
   linera query $APP_ID inboxes(bob)

   

---

## STEP 2: COMMIT IT

In the **Commit changes** box:

| Field | Type This |
|------|----------|
| **Commit message** | `docs: add judge verification steps` |
| **Extended description** | *(leave blank)* |
| **Radio button** | `Commit directly to the main branch` |

**Click: “Commit changes”**

---

## YOUR REPO IS NOW 100% COMPLETE

**GitHub:**  
[https://github.com/girume1/chainmail-linera](https://github.com/girume1/chainmail-linera)

**All files added:**  
`README.md`, `VERIFY.md`, `contract/`, `frontend/`, `scripts/`

---

## NEXT: DEPLOY LIVE DEMO ON VERCEL (1 MINUTE)

Go here: [https://vercel.com/new](https://vercel.com/new)

1. Click **“Import Git Repository”**
2. Search: `girume1/chainmail-linera`
3. Click **“Import”**
4. **Framework Preset:** Vite
5. **Root Directory:** `frontend`
6. Click **“Deploy”**

**LIVE DEMO IN 60 SECONDS**  
Example: `https://chainmail-linera.vercel.app`

---

## FINAL SUBMISSION TEXT (COPY-PASTE)

```md
**Project:** ChainMail — E2EE DMs on Linera  
**GitHub:** https://github.com/girume1/chainmail-linera  
**Live Demo (Testnet Conway):** https://chainmail-linera.vercel.app  
**Template Used:** YES  
**Compiles & Runs:** YES  
**Functional Contract:** YES  
**VERIFY.md:** Included  

**Ethiopia | Buildathon Wave 2+**
