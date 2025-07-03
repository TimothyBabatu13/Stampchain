// const res = await fetch("/api/create-token", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({
//       userPublicKey: wallet.publicKey.toBase58(),
//       decimals: 9,
//       initialSupply: 1000000000,
//     }),
//   })
  
//   const data = await res.json()
//   const unsignedTx = data.unsignedTx
//   const tx = Transaction.from(Buffer.from(unsignedTx, "base64"))
  
//   // Let user sign
//   const signed = await wallet.signTransaction(tx)
  
//   // Send signed tx to backend
//   await fetch("/api/submit-tx", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({
//       signedTx: signed.serialize().toString("base64"),
//     }),
//   })
  
export const Read = () => {
  return(
    <div></div>
  )
}