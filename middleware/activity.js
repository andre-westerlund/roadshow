//Get AGENT TYPE
exports.getAgentType = (today, dateJoined) => {
    //check if date joined is less than 30 days from today
     var now = new Date(today);
     var beforeDate = now.setDate(now.getDate() - 30);
     if(dateJoined.getTime() >= beforeDate.getTime()){
         return "NEW";
     }else{
        return "OLD";
     }
}

