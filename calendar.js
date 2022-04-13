
class calendar {



    constructor() {
        this.month = [
            'Gen', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sep', 'Ott', 'Nov', 'Dic'
        ]
        this.weekDay = [
            'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
        ]
        this.yearSheet = [
            31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31
        ]
    }
    generateWeeksPackage(y) {
        this.weekPackage = { year: y.toString(), weeks: [] }
        let week = []
        let count = 0
        let weekcount = 0
        var FirstMondayOfTheYear = 0
        while (this.yearPackage.days[FirstMondayOfTheYear].weekDay != this.weekDay[0]) {
            FirstMondayOfTheYear++
        }
        for (let i = FirstMondayOfTheYear; i < this.yearPackage.days.length; i++) {
            week[count] = this.yearPackage.days[i]
            count++
            if ((count % 7) == 0) {
                this.weekPackage.weeks[weekcount] = [...week]
                week = []
                count = 0
                weekcount++
            }
        }
    }
    generateYear(y) {
        this.yearPackage = { year: y.toString(), days: [] }
        let count = 0
        this.yearSheet[1] = (y - 2020) % 4 == 0 ? 29 : 28
        var actualDay = new Date('January 01 ' + y.toString()).getDay()
        actualDay = actualDay == 0 ? 6 : actualDay - 1
        for (let i = 0; i < 12; i++) {
            for (let k = 0; k < this.yearSheet[i]; k++) {
                this.yearPackage.days[count] = {
                    day: k + 1, month: this.month[i], weekDay: this.weekDay[actualDay]
                }
                actualDay++
                actualDay = (actualDay % 7) === 0 ? 0 : actualDay
                count++
            }
        }
        this.generateWeeksPackage(y)
        this.calendarByWeek.push(this.weekPackage)

        return this.yearPackage

    }

    generateCalendar() {
        this.calendar = []
        let count = 0
        if (this.endYear == undefined) {
            this.endYear = this.year
        }
        for (let i = this.year; i <= this.endYear;) {
            this.calendar[count] = this.generateYear(i)
            count++
            i++
        }
    }

    getCalendar() {
        this.generateCalendar()
        return this.calendar
    }
    getCalendarByWeek() {
        return this.calendarByWeek
    }
    getPointedDay() {
        this.calendar[this.pointedDay.year].days[this.pointedDay.day].year = this.calendar[this.pointedDay.year].year.toString()
        return this.calendar[this.pointedDay.year].days[this.pointedDay.day]
    }
    set(startYear, endYear) {
        this.year = startYear
        this.endYear = endYear

        this.calendarByWeek = []
        this.firstOfTheYear = new Date('January 01 ' + this.year.toString())

        this.localTimeOffset = new Date().getTimezoneOffset()
        this.PRIVATEcurrentObjectDay = new Date()
        this.PRIVATEcurrentDayOfTheWeek = this.PRIVATEcurrentObjectDay.getDay()
        this.PRIVATEcurrentDay = this.PRIVATEcurrentObjectDay.getDate()
        this.PRIVATEcurrentMonth = this.PRIVATEcurrentObjectDay.getMonth()

        this.pointedDay = {}






    }

    pointDay(month, day, year) {
        if (year > this.endYear) {
            console.log('ERROR: your day is out of the calendar range, maybe extend your year renge in set() function');
        } else {
            for (let i = 0; i < this.calendar.length; i++) {
                if (this.calendar[i].year == year) {
                    this.pointedDay.year = i
                    break
                }
            }
            for (const key in this.calendar[this.pointedDay.year].days) {
                if (this.calendar[this.pointedDay.year].days[key].day == day && this.calendar[this.pointedDay.year].days[key].month == this.month[month - 1]) {
                    this.pointedDay.day = parseInt(key)
                }
            }
        }
    }


    addDays(n) {
        if (n + this.pointedDay.day > this.calendar[this.pointedDay.year].days.length) {
            let a = (n + this.pointedDay.day - this.calendar[this.pointedDay.year].days.length)
            this.pointedDay.year++
            if (parseInt(this.calendar[this.pointedDay.year].year) > this.endYear) {
                this.pointedDay.year--
                console.log('ERROR: your day is out of the calendar range, maybe extend your year renge in set() function');
            } else {
                this.pointedDay.day = a
                return
            }
        } else {
            this.pointedDay.day = this.pointedDay.day + n
            return this.getPointedDay()
        }
    }

    subDays(n) {
        if (this.pointedDay.day - n < 0) {
            let a = this.pointedDay.day - n
            this.pointedDay.year--
            try {
                parseInt(this.calendar[this.pointedDay.year].year)
                this.pointedDay.day = this.calendar[this.pointedDay.year].days.length - (a * (-1))
                return this.getPointedDay()
            } catch (error) {
                this.pointedDay.year++
                console.log('ERROR: your day is out of the calendar range, maybe extend your year renge in set() function');
            }
        } else {
            this.pointedDay.day = this.pointedDay.day - n
            return this.getPointedDay()
        }

    }


}



module.exports =  calendar