const addDateSuffix = (date) => {
  let dateStr = date.toString()

  const lastChar = dateStr.charAt(dateStr.length - 1)

  if (lastChar === '1' && dateStr !== '11') {
    dateStr = `${dateStr}st`
  } else if (lastChar === '2' && dateStr !== '12') {
    dateStr = `${dateStr}nd`
  } else if (lastChar === '3' && dateStr !== '13') {
    dateStr = `${dateStr}rd`
  } else {
    dateStr = `${dateStr}th`
  }

  return dateStr
}

const dateFormat = (timestamp) => {
  const dateObj = new Date(timestamp)

  const month = new Intl.DateTimeFormat('en', { month: 'short' }).format(
    dateObj
  )
  const day = addDateSuffix(dateObj.getDate())
  const year = dateObj.getFullYear()
  const time = dateObj.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  })

  return `${month} ${day}, ${year} at ${time}`
}

module.exports = dateFormat
