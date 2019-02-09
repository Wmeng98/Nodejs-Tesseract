module.exports = {

  walmart_APIKey : process.env.WALMART_API,
  httpUrl : "http://api.walmartlabs.com/v1/items?apiKey=" + this.walmart_APIKey + "&upc=",
  
  // function to retrieve array of upc codes, designed specifcally for walmart receipts
  getUPCCodes: function(text) { // specifically for WALMART receipts
    console.log("text >>> ");
    console.log(text);
  
    var words = text.split(" ");
    var tempUCP = "";
    var UCPList = new Array();
  
    // iterate through each character in the string
    var currUCPLength = 0;
  
    for (var i = 0; i < words.length; i += 1) {
      // console.log("word >>> " + words[i]);
      // only consider words where length of string >= 12
      
      if (words[i].includes("*")) { // assumption reached-> ACCOUNT # LINE, hence past actual items list in receipt
        return UCPList;
      }
      if (words[i].length >= 12) {
        for (var j = 0; j < words[i].length; j += 1) {
          // If char in word is a number, add to tempUCP
          var parsed = parseInt(words[i][j], 10)
          if (!isNaN(parsed)) {
            if (currUCPLength == 11) { // add last integer to ucp and restart count
              tempUCP += words[i][j];
  
              // compare with exceptional condition
              if (tempUCP != "111111111111") {
                UCPList.push(tempUCP);
              }
              // Reset, look for new ucp
              currUCPLength = 0;
              tempUCP = "";
            } else {
              tempUCP += words[i][j];
              currUCPLength += 1;
            }
          }
          else { // Not an integer
            // reset counts
            tempUCP = "";
            currUCPLength = 0;
          }
        }
      }
    }
    console.log("UCP list length: " + UCPList.length);
    for (var i = 0; i < UCPList.length; i += 1) {
      console.log(" >> " + UCPList[i]);
    }
    return UCPList;
  },

  testFun: function(str) {
    console.log("called within walmart.js exported object >> " + str);
  }

}
