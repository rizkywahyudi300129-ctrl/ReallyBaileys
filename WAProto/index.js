const lotus = require("../Lotusbail-RC13_Patch")
const { useMultiFileAuthState } = require("../Lotusbail-RC13_Patch")
const pino = require("pino")

async function mulai() {
  const { state, saveCreds } = await useMultiFileAuthState('session')
  const sock = lotus.makeWASocket({
    auth: state,
    logger: pino({ level: "silent" })
  })
  sock.ev.on('creds.update', saveCreds)
  
  sock.ev.on('connection.update', async (u) => {
    if(u.connection === 'open') {
      console.log("BOT KONEK - CONVERT 4 CH JADI ID JID")

      let invites = [
        "0029VbBmnvb3LdQUVPbE3s0C",
        "0029VbDpYG6CnA81qo7m1b3I",
        "0029VbDQiAbEVccISKEC183P",
        "0029VbDNVYOLI8YaA6XLtQ1c"
      ]

      let ids = []
      for(let kode of invites) {
        let meta = await sock.newsletterMetadata("invite", kode)
        console.log(`${kode} => ${meta.id}`) // ini keluar ID kaya 120363xxxx@newsletter
        ids.push(meta.id)
      }

      console.log("\nMULAI LEAVE PAKE ID JID:")
      for(let id of ids) {
        await sock.newsletterUnfollow(id)
        console.log("LEAVE DONE: " + id)
        await new Promise(r => setTimeout(r, 800))
      }
      console.log("SELESAI 4 CH PAKE ID 120363...@newsletter")
    }
  })
}
mulai()
