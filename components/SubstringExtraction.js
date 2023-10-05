'use strict';

// Documentation for writing custom components: https://github.com/oracle/bots-node-sdk/blob/master/CUSTOM_COMPONENT.md

// You can use your favorite http client package to make REST calls, however, the node fetch API is pre-installed with the bots-node-sdk.
// Documentation can be found at https://www.npmjs.com/package/node-fetch
// Un-comment the next line if you want to make REST calls using node-fetch. 
// const fetch = require("node-fetch");
 
module.exports = {
  metadata: () => ({
    name: 'SubstringExtraction',
    properties: {
      startString: { required: false, type: 'string' },
      EndString: { required: false, type: 'string' },
      fullString: { required: true, type: 'string' },
    },
    supportedActions: []
  }),


  /**
   * invoke methods gets called when the custom component state is executed in the dialog flow
   * @param {CustomComponentContext} context 
   */
  invoke: (context, done) => {


    // Retrieve the value of the 'human' component property.
    const { startString } = context.properties();
    const { EndString } = context.properties();
    const { fullString } = context.properties();
    let resultString = "";

    if(startString && !EndString){
      const startIndex = fullString.indexOf(startString) + startString.length;
      resultString  = fullString.slice(startIndex).trim();

    }else if(!startString && EndString){

      const endIndex = fullString.indexOf(EndString)
      resultString  = fullString.substring(0,endIndex);

    }else if(startString && EndString){
      const startIndex = fullString.indexOf(startString) + startString.length;
      const endIndex = fullString.indexOf(EndString)
      resultString  = fullString.substring(startIndex,endIndex);
    }

    context
    .setVariable("user.extractedString", resultString)
    .transition()
    .keepTurn(true);         
     done();   
      
      


  }
};
