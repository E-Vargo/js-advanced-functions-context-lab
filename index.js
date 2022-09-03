/* Your Code Here */
function createEmployeeRecord(info){
    return {
        firstName: info[0],
        familyName: info[1],
        title: info[2],
        payPerHour: info[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(employeesInfo){
    return employeesInfo.map(function(info){
        return createEmployeeRecord(info)
    })
}

function createTimeInEvent(dateTime){
    let [date, hour] = dateTime.split(' ')

    this.timeInEvents.push({
        type: 'TimeIn',
        hour: parseInt(hour, 10),
        date
    })
    return this
}

function createTimeOutEvent(dateTime){
    let [date, hour] = dateTime.split(' ')

    this.timeOutEvents.push({
        type: 'TimeOut',
        hour: parseInt(hour, 10),
        date
    })
    return this
}

function hoursWorkedOnDate(workedDate){

    let clockIn = this.timeInEvents.find(function(e){
        return e.date === workedDate
    })

    let clockOut = this.timeOutEvents.find(function(e){
        return e.date === workedDate
    })

    return ((clockOut.hour) - (clockIn.hour)) / 100
    
}

function wagesEarnedOnDate(workedDate){
    let hours = hoursWorkedOnDate.call(this, workedDate)
    let hourlyRate = this.payPerHour
    return hours * hourlyRate
}


function calculatePayroll(employeeRecords){
    return employeeRecords.reduce(function(memo, record){
        return memo + allWagesFor.call(record)
    }, 0)
}

function findEmployeeByFirstName(array, name){
    return array.find(function(e){
        return e.firstName === name
    })
}
/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}