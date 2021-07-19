// Helper function to generate the current users date
// Unused - but will be during implementation for extended features

export function getDate() {

    var seperator = '-'
    var todaysDate = new Date()


    let day = todaysDate.getDate();
    var month = todaysDate.getMonth();
    var year = todaysDate.getFullYear();


    return year.toString() + seperator + month.toString() + seperator + day.toString()

}
