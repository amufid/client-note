export function decrypt(id) {
   // fungsi bawaan atob() untuk dekripsi Base64
   let newId = atob(id)
   return (+newId / 10);
}

export function encrypt(id) {
   // fungsi bawaan btoa() untuk enkripsi Base64
   return btoa(id * 10);
}
