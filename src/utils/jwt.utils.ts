import jwt from "jsonwebtoken";
import config from "config";

let privateKey = process.env.PRIVATE_KEY;
// const privateKey = config.get<string>("privateKey");
let publicKey = config.get<string>("publicKey");

if (process.env.JEST_WORKER_ID) {
  publicKey = `-----BEGIN PUBLIC KEY-----
MIIBITANBgkqhkiG9w0BAQEFAAOCAQ4AMIIBCQKCAQB+DL+c7Wg1V36eyLmNO+s6
qPNKuEudtYZ8wt9Hh5IbwlcT052Al9rSXZxVyrdQJCJckwJ/T9aU2BG/5uSbqkU0
wkppNGsRO7KVpw0luULAodpF+wWjsJnJOEsmaoLuiBoYArKExBoEUY85tTFKMS4S
D1nEaCqWMJfQ+9oKgadJ2MAtNym1tL/slLqOzVnS9zWqBYpM0qBQlw7m4uL+Pyp8
ECk90XcqQVSZR/PTOmD8OlDuG40VwrnxN7c9sLf0TQYgsUMcBf8BJYZQOfQF2u8w
Gg17zfAokbZDd/vNLfc+4FcNbq61vvhzB33LIIlMx67Snkl6g5aOiRBP3lF8oatp
AgMBAAE=
-----END PUBLIC KEY-----`;
  privateKey = `-----BEGIN RSA PRIVATE KEY-----
MIIEowIBAAKCAQB+DL+c7Wg1V36eyLmNO+s6qPNKuEudtYZ8wt9Hh5IbwlcT052A
l9rSXZxVyrdQJCJckwJ/T9aU2BG/5uSbqkU0wkppNGsRO7KVpw0luULAodpF+wWj
sJnJOEsmaoLuiBoYArKExBoEUY85tTFKMS4SD1nEaCqWMJfQ+9oKgadJ2MAtNym1
tL/slLqOzVnS9zWqBYpM0qBQlw7m4uL+Pyp8ECk90XcqQVSZR/PTOmD8OlDuG40V
wrnxN7c9sLf0TQYgsUMcBf8BJYZQOfQF2u8wGg17zfAokbZDd/vNLfc+4FcNbq61
vvhzB33LIIlMx67Snkl6g5aOiRBP3lF8oatpAgMBAAECggEAfeRfr+0RKk1zokTZ
xax1mMXLD/KXWzFE2/CJrlhB3kWwUJYG9bs1CuwBy1HG2lzskMcnNF5Z85kFyUNj
SfG6YyI1zXNUCAc2qu8IW4f3motMhJ5cmIs2XVlC/WBd2rzGSvrOr3lofq2yvbEx
RGdwGwuH3XkoJ47q4gfYUqwBl+ddDBbr8Jpi9kjNVkJDpenjxzHRD0fvmXHFcRNX
ELfKX0TuPKRgyCwYheXy+OfafCuq6XMFIAIA3IalwdBW4KgydaYOJCkRmCoUr3xb
MQScbjmvfriafXXAAWhzPUF7qdlwOn6RLdsb5tIIpsD+016YTqiO+XrKgD50bEXv
QbIigQKBgQDaO7oO767hkhiWAF9GQ2chpLH7ameGgxZeQ+6bVwO0mEWV7P75ck7L
wlF4LKD26BspW4wTEHHvkAR6PZsnGWM7c1o6B1XXR4PxxRvQuoj8VuyprGxWvtLd
T5ab6eu8V+AqITH+aMKnqAS3jHBjITTlgFe1minubVjam5K8eSAE2QKBgQCT3RCs
b5YxdBt8WiXu08Meeo0N0nwQShy/ILFIUGIgCJDokDjvtXbfBDxV4ctRelBWDSZV
LaFrBX+26jKLVStmUb2JuSz9eAcl1IVSQ87E5Mzzk3aK1BE/jzAPIwCtPdiNTs0U
UDUL/E9wB58UMITuQrXJbkHKmQ8ullC9HZCBEQKBgQC3vsotgUlxy5y/z5hohJ/1
B8KDuVdpPj47KF9ik6UfDYapcV5NkR0fGoGV+Z2dxlf4Poh2FMaZulzKv8w+43VV
vQ4fBcYU+LXzfs6otCZasKWbRv4BG7JXfIeGxzIg5qxrTH/XgUVD/IfcM3b9QBxV
j/ZJhYAArDi/93VZE3MOIQKBgAGy64sfqRkeXWZ7Xq40zqwd+lrrTTOetl/Xz1Gm
Yso9bvTNG2pdqmT7lnniI0TnY97pPcSCxrUFFieS30vMibgePlBDyWmMJIDhxTph
vxFyE4zE5/rGXwBc889otoxHBqLxAdg257UgjAUcgU5pFE3shEwxMR5TzeHaJklV
+qARAoGBAKApvH0OZaqF09h5+tdZn2bhepC6KUetwzE65EevQQy2AV40848EK7FK
2OAwjqs5DPjVyXFNw7vrlw1cYwO+J8gtgClBesgyj2sbxxpZtUzJlSmmTOsCvKqO
m5tuPepFK7x+YUHQSswIZoVutokgRHyMNYRUGP/YAalOFgFgBShu
-----END RSA PRIVATE KEY-----`;
}

export function signJwt(object: Object, options?: jwt.SignOptions | undefined) {
  return jwt.sign(object, privateKey!, {
    ...(options && options),
    algorithm: "RS256",
  });
}

export function verifyJwt(token: string) {
  try {
    const decoded = jwt.verify(token, publicKey);
    return {
      valid: true,
      expired: false,
      decoded,
    };
  } catch (error: any) {
    return {
      valid: false,
      expired: (error.message = "jwt expired"),
      decoded: null,
    };
  }
}
