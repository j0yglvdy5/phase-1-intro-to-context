// Your code here
function createEmployeeRecord(array){
    return {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: [],
    }
}
function createEmployeeRecords(arrayOfArrays) {
    return arrayOfArrays.map(array => createEmployeeRecord(array));
}

function createTimeInEvent(employeeRecord, dateTimeString) {
    // Parse the date/time string into a Date object
    const dateTime = new Date(dateTimeString);
    
    // Create a timeIn event object
    const timeInEvent = {
        type: "TimeIn",
        date: dateTime.toLocaleDateString(),
        hour: dateTime.getHours()
    };
    
    // Add the timeIn event to the employee's record of timeInEvents
    employeeRecord.timeInEvents.push(timeInEvent);
    
    // Return the updated employee record
    return employeeRecord;
}

function createTimeOutEvent(employeeRecord, dateTimeString) {
    // Parse the date/time string into a Date object
    const dateTime = new Date(dateTimeString);
    
    // Create a timeOut event object
    const timeOutEvent = {
        type: "TimeOut",
        date: dateTime.toLocaleDateString(),
        hour: dateTime.getHours()
    };
    
    // Add the timeOut event to the employee's record of timeOutEvents
    employeeRecord.timeOutEvents.push(timeOutEvent);
    
    // Return the updated employee record
    return employeeRecord;
}

function hoursWorkedOnDate(employeeRecord, date) {
    // Find the timeIn event for the given date
    const timeInEvent = employeeRecord.timeInEvents.find(event => event.date === date);
    
    // Find the timeOut event for the given date
    const timeOutEvent = employeeRecord.timeOutEvents.find(event => event.date === date);
    
    // If both timeIn and timeOut events are found for the given date, calculate the hours worked
    if (timeInEvent && timeOutEvent) {
        const timeInHour = timeInEvent.hour;
        const timeOutHour = timeOutEvent.hour;
        return (timeOutHour - timeInHour) / 100; // Assuming the hour is represented in 24-hour format
    }
    
    // If either timeIn or timeOut event is missing, return 0 hours worked
    return 0;
}

function wagesEarnedOnDate(employeeRecord, date) {
    // Calculate the hours worked on the given date
    const hoursWorked = hoursWorkedOnDate(employeeRecord, date);
    
    // Retrieve the employee's rate per hour
    const ratePerHour = employeeRecord.payPerHour;
    
    // Calculate the wages earned by multiplying the hours worked by the rate per hour
    const wagesEarned = hoursWorked * ratePerHour;
    
    // Return the wages earned
    return wagesEarned;
}

function allWagesFor(employeeRecord) {
    // Initialize total wages to 0
    let totalWages = 0;

    // Iterate over each date in the timeInEvents array
    employeeRecord.timeInEvents.forEach(timeInEvent => {
        // Retrieve the date from the timeInEvent
        const date = timeInEvent.date;

        // Calculate the wages earned on the current date using wagesEarnedOnDate function
        const wagesEarned = wagesEarnedOnDate(employeeRecord, date);

        // Add the wages earned on the current date to the total wages
        totalWages += wagesEarned;
    });

    // Return the total wages earned
    return totalWages;
}

function calculatePayroll(employeeRecords) {
    let totalPayroll = 0;

    // Iterate over each employee record in the array
    employeeRecords.forEach(employeeRecord => {
        // Calculate the total wages for the current employee using the allWagesFor function
        const employeePayroll = allWagesFor(employeeRecord);
        
        // Add the total wages for the current employee to the total payroll
        totalPayroll += employeePayroll;
    });

    // Return the total payroll for all employees
    return totalPayroll;
}

