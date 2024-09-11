import { hash as _hash, argon2id, verify } from "argon2"

async function hashPassword(password) {
  try {
    const hash = await _hash(password, {
      type: argon2id
    })
    return hash
  } catch (err) {
    console.error(err)
  }
}

async function checkPassword(hash, password) {
  try {
    const match = await verify(hash, password)
    return match
  } catch (err) {
    console.error(err)
  }
}

export default { hashPassword, checkPassword }
