function formatDate (inputDate) {
  const date = new Date(inputDate);
  const options = {
    year: 'numeric',
    day: '2-digit',
    month: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
    timeZone: 'Asia/Jakarta'
  };

  const formattedDate = date.toLocaleString('id-ID', options);

  return formattedDate.replaceAll('.', ':');
}

export default formatDate;