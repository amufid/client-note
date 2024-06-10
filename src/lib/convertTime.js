export const convertTime = (dateCreate) => {
   const date = new Date(dateCreate);
   const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long',
      hour: 'numeric',
      minute: 'numeric',
      hour12: false
   };

   return date.toLocaleString('id-ID', options);
}
