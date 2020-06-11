const moment = require("moment");

//Get AGENT TYPE
exports.getAgentType = (today, dateJoined) => {
    //check if date joined is less than 30 days from today
     var now = new Date(today);
     var beforeDate = new Date(now.setDate(now.getDate() - 30));
     if(dateJoined.getTime() >= beforeDate.getTime()){
         return "NEW";
     }else{
        return "OLD";
     }
}

exports.getTodayQuery = (agentId) => {
    const today = moment().startOf('day');
    return {
        date: {
            $gte : today.toDate(),
            $lte : moment(today).endOf('day').toDate()
        },
        agent: agentId
    }

}

