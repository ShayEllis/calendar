export const CalendarData = ({ classes, date, data }) => {
  console.log(data)

  return (
    <div className={classes}>
      {date}
      {data && <div>Data Entered - Click to View</div>}
    </div>
  )
}
