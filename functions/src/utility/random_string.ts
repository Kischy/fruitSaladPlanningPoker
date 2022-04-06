

export default function randomString(length: number) : string {
  const characters =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let res = "";
  for (let i = 0; i < length; i++) {
    res += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return res;
}
