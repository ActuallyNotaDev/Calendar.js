
class DatePackage {

    constructor(startYear, endYear) {
        this.month = [
            'Gen', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sep', 'Ott', 'Nov', 'Dic'
        ]
        this.weekDay = [
            'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
        ]
        this.yearSheet = [
            31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31
        ]
        this.year = startYear
        this.endYear = endYear
        this.firstOfTheYear = new Date('January 01 ' + this.year.toString())
        this.firstDay = this.firstOfTheYear.getDay()
        this.localTimeOffset = new Date().getTimezoneOffset()
        this.yearPackage = { year: this.year.toString(), days: [] }
        this.weekPackage = { year: this.year.toString(), weeks: []}
        this.currentWeek = []
        this.currentDay = {}
        this.PRIVATEcurrentObjectDay = new Date()
        this.PRIVATEcurrentDayOfTheWeek = this.PRIVATEcurrentObjectDay.getDay()
        this.PRIVATEcurrentDay = this.PRIVATEcurrentObjectDay.getDate()
        this.PRIVATEcurrentMonth = this.PRIVATEcurrentObjectDay.getMonth()
        this.calendar = []
        this.PreviousPackage = { year: this.year.toString(), days: [] }
        this.generateYear(this.firstOfTheYear.getFullYear())
        this.generateCurrentDay()
        this.generateCurrentWeek()
        this.generateWeeksPackage()
        this.generateCalendar()
    }
    generateYear(y) {
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
    }
    generateCurrentDay() {
        for (const i in this.yearPackage.days) {
            if (this.yearPackage.days[i].day == this.PRIVATEcurrentDay && this.yearPackage.days[i].month == this.month[this.PRIVATEcurrentMonth]) {
                this.currentDay = this.yearPackage.days[i]
                this.PRIVATEcurrentDayNumber = i
                break
            }
        }
    }
    generateCurrentWeek() {
        let weekday = this.PRIVATEcurrentDayOfTheWeek
        // this is because the Date Object return 0 
        // for sunday, in this code 0 must be always monday
        weekday = weekday == 0 ? 6 : weekday - 1        
        let monday = this.PRIVATEcurrentDayNumber - weekday
        for (let i = 0; i < 7; i++) {
            this.currentWeek[i] = this.yearPackage.days[monday]
            monday++
        }
    }

    generateWeeksPackage(){
        let week = []
        let count = 0
        let weekcount = 0
        var FirstMondayOfTheYear = 0
        if (this.firstOfTheYear.getDay() != 1) {
            FirstMondayOfTheYear = this.firstOfTheYear.getDay() == 0 ? 6 : this.firstOfTheYear.getDay()-1
            FirstMondayOfTheYear = 7 - FirstMondayOfTheYear
        }
        for (let i = FirstMondayOfTheYear; i < this.yearPackage.days.length ; i++) {
            week[count] = this.yearPackage.days[i]
            count ++
            if ((count%7)==0) {
                this.weekPackage.weeks[weekcount] =  [...week]
                for (let e = 0; e < 8; e++) {
                    week.pop()
                }
                count = 0
                weekcount ++
            }
        }
    }
    generateCalendar(){
        let count = 0
        for (let i = this.year; i < this.endYear; i++) {
            this.calendar[count] = this.yearPackage
            this.yearPackage = { year: i.toString(), days: [] }
            this.generateYear(i)
            count ++
        }
        console.log(this.calendar);
    }
    getYearPackage() {
        return this.yearPackage
    }
    getCurrentDay() {
        return this.currentDay
    }
    getCurrentWeek() {
        return this.currentWeek
    }
    getWeeksPackage() {
        return this.weekPackage
    }
    getCalendar() {
        return this.calendar
    }

}
export default DatePackage 