import React, { Component } from "react";
import moment from "moment"; // Import moment.js library to handle date manipulation
import "../Components/calendar.css"; // Import custom CSS for styling

class Calendar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dateType: moment(), // Initialize the dateType state with the current date
      today: moment(), // Initialize the today's date state
      showMonthPopup: false, // Flag to control month dropdown visibility
      showYearNav: false, // Flag to control year input visibility
    };
  }

  // Weekdays (Sun to Sat)
  weekdays = moment.weekdays(); // ["Sunday", "Monday", "Tuesday", ...]
  weekdaysShort = moment.weekdaysShort(); // ["Sun", "Mon", "Tue", ...]

  // Months
  months = moment.months(); // ["January", "February", ..., "December"]

  /*==== Calendar Functions ===*/

  // Get the current year
  year = () => {
    return this.state.dateType.format("Y");
  };

  // Get the current month
  month = () => {
    return this.state.dateType.format("MMMM");
  };

  // Get the number of days in the current month
  daysInMonth = () => {
    return this.state.dateType.daysInMonth();
  };

  // Get the current day (1 to 31)
  currentDay = () => {
    return this.state.dateType.format("D");
  };

  // Get the index of the first day of the month (0 = Sunday, 1 = Monday, ...)
  firstDayOfMonth = () => {
    let dateType = this.state.dateType;
    let firstDay = moment(dateType).startOf("month").format("d"); // Days of the week index (0-6)
    return firstDay;
  };

  // Go to the next month
  nextMonth = () => {
    let dateType = Object.assign({}, this.state.dateType);
    dateType = moment(dateType).add(1, "month");
    this.setState({
      dateType: dateType,
    });
    this.props.onNextMonth && this.props.onNextMonth();
  };

  // Go to the previous month
  prevMonth = () => {
    let dateType = Object.assign({}, this.state.dateType);
    dateType = moment(dateType).subtract(1, "month");
    this.setState({
      dateType: dateType,
    });
    this.props.onPrevMonth && this.props.onPrevMonth();
  };

  // Set the selected month
  setMonth = (month) => {
    let monthNo = this.months.indexOf(month);
    let dateType = Object.assign({}, this.state.dateType);
    dateType = moment(dateType).set("month", monthNo);
    this.setState({
      dateType: dateType,
    });
  };

  // Handle the month change selection from popup
  onSelectChange = (e, data) => {
    this.setMonth(data);
  };

  // Component to display a list of months (selectable)
  SelectList = (props) => {
    let popup = props.data.map((data) => {
      return (
        <div key={data}>
          <a
            href="#"
            role="button"
            onClick={(e) => {
              this.onSelectChange(e, data);
            }}
          >
            {data}
          </a>
        </div>
      );
    });
    return <div className="popup">{popup}</div>;
  };

  // Toggle the visibility of the month popup
  onChangeMonth = (e, month) => {
    this.setState({ showMonthPopup: !this.state.showMonthPopup });
  };

  // Month navigation component
  MonthNav = () => {
    return (
      <span
        className="month"
        onClick={(e) => {
          this.onChangeMonth(e, this.month());
        }}
      >
        {this.month()}
        {this.state.showMonthPopup && <this.SelectList data={this.months} />}
      </span>
    );
  };

  // Show year editor (input to edit year)
  showYearEditor = () => {
    this.setState({
      showYearNav: true,
    });
  };

  // Set the selected year
  setYear = (year) => {
    let dateType = Object.assign({}, this.state.dateType);
    dateType = moment(dateType).set("year", year);
    this.setState({
      dateType: dateType,
    });
  };

  // Handle year input change
  onYearChange = (e) => {
    this.setYear(e.target.value);
  };

  // Year navigation component
  YearNav = () => {
    return this.state.showYearNav ? (
      <input
        defaultValue={this.year()}
        className="edityear"
        onChange={(e) => this.onYearChange(e)}
        type="number"
        placeholder="Year"
      />
    ) : (
      <span
        className="year"
        onClick={(e) => {
          this.showYearEditor();
        }}
      >
        {this.year()}
      </span>
    );
  };

  // Handle day click (for selecting a day)
  onDayClick = (e, day) => {
    this.props.onDayClick && this.props.onDayClick(e, day);
  };

  render() {
    // Map weekdays (Sun, Mon, Tue, ...)
    let weekdays = this.weekdaysShort.map((day) => {
      return (
        <td key={day} className="week-day">
          {day}
        </td>
      );
    });

    // Create empty slots before the first day of the month
    let blanks = [];
    for (let i = 0; i < this.firstDayOfMonth(); i++) {
      blanks.push(
        <td key={i * 80} className="emptyslot">
          {""}
        </td>
      );
    }

    // Create days for the current month
    let daysInMonth = [];
    for (let d = 1; d <= this.daysInMonth(); d++) {
      let className = d === this.currentDay() ? " current-day" : "day";
      daysInMonth.push(
        <td key={d} className={className}>
          <span
            onClick={(e) => {
              this.onDayClick(e, d);
            }}
          >
            {d}
          </span>
        </td>
      );
    }

    // Combine blanks and days in the month to fill the calendar grid
    let totalSlots = [...blanks, ...daysInMonth];
    let rows = [];
    let cells = [];
    totalSlots.forEach((row, index) => {
      if (index % 7 !== 0) {
        cells.push(row);
      } else {
        let insertRow = cells.slice(); // Create a new row
        rows.push(insertRow); // Add new row to the rows array
        cells = []; // Reset cells for next row
        cells.push(row); // Start new row with the current cell
      }
      if (index === totalSlots.length - 1) {
        let insertRow = cells.slice();
        rows.push(insertRow); // Add last row to the rows array
      }
    });

    // Render table rows for the calendar
    let trElements = rows.map((d, i) => {
      return <tr key={i * 100}>{d}</tr>;
    });

    return (
      <div className="calendar">
        <table className="table">
          <thead>
            <tr className="trheader">
              <td colSpan="5">
                <this.MonthNav />
                <span style={{ margin: "0 10px" }}></span>
                <this.YearNav />
              </td>
              {/* <td col="2" className="navmonth">
                                <i className="icon fa fa-fw fa-chevron-left"
                                    onClick={(e) => { this.prevMonth() }}></i>
                                <i className="icon fa fa-fw fa-chevron-right"
                                    onClick={(e) => { this.nextMonth() }}></i>
                            </td> */}
              <td
                col="2"
                className="navmonth"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <i
                  className="icon fa fa-fw fa-chevron-left"
                  onClick={(e) => {
                    this.prevMonth();
                  }}
                ></i>
                <i
                  className="icon fa fa-fw fa-chevron-right"
                  onClick={(e) => {
                    this.nextMonth();
                  }}
                ></i>
              </td>
            </tr>
          </thead>
          <tbody>
            <tr>{weekdays}</tr>
            {trElements}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Calendar;
