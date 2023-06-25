import re

class RegexTester:
    """
    A utility class to test a given syntax of data against some regular expressions.
    This is mostly intended to regulate what is valid information on a form to avoid bot spam.
    You can nest your regex tests like a JSON object.
    If a tested value is an array, then it will run the regex test on each index.

    args:
        requiredRegexTests (dict): A key-value pair of the required data field names and the regex test.
        optionalRegexTests? (dict): A key-value pair of the optional data field names and the regex test.
    """

    def __init__(self, requiredRegexTests: dict, optionalRegexTests: dict|None = None):
        self.requiredRegexTests = requiredRegexTests
        self.optionalRegexTests = optionalRegexTests
    

    def runTest(self, data: dict, regexTestObject: dict|None = None) -> dict | str:
        """
        Runs the regex tests against an inputted data set.
       
        params:
            data (dict): The inputted data set.
            regexTestObject? (dict): This is mostly to be able to call this function recursively. If you're calling this funciton outside of this class, you don't need to worry about this.
        
        returns:
            (str | dict): A string error message if a regex test fails, or the parsed data set if all regex tests pass.
        """

        # Setting a reference to a dict to return valid vales
        returnData = {}
        # Setting up the dict the data will be compared to.
        # Getting it from the pararmters if this is called recursively, otherwise it'll just be the top level object.
        if regexTestObject == None:
            regexTestObject = self.requiredRegexTests | (self.optionalRegexTests if self.optionalRegexTests else {})

        #  Looping through each key of the test dict.
        for key in regexTestObject.keys():
            # If it's a required field and it's missing, return an error message.
            if key in self.requiredRegexTests and not key in data:
                return 'Error: missing field: {key}'.format(key=key)

            # If it's an optional field and it's missing, just skip the test entirely.
            if self.optionalRegexTests and key in self.optionalRegexTests and not key in data:
                returnData[key]=None
                continue

            # Now that we're certain the current value is defined, reference it to a variable.
            value = data[key]

            # If the current regex test is a dict, that means we need to recursively call this funciton.
            if isinstance(regexTestObject[key], dict):
                # If the value is a list, we must iteratate over it and call this recursevly for each dict in the list.
                if isinstance(data[key], list):
                    for i, dataValue in enumerate(data[key]):
                        result = self.runTest(dataValue, regexTestObject[key])
                        # If it returns an error message, return it to the top level in the call stack.
                        if isinstance(result, str):
                            return result + ' (At index {index})'.format(index=i+1)
                        
                # Otherwise, just call this recursevly on the value.
                else:
                    result = self.runTest(data[key], regexTestObject[key])
                    # If it returns an error message, return it to the top level in the call stack.
                    if isinstance(result, str):
                        return result
                    
            # Otherwise we'll have to match the test.
            else:
                # If it's a list, we'll have to iterate over its values and test each one.
                if isinstance(data[key], list):
                    for i, dataValue in enumerate(data[key]):
                        # If the list value is a dict, run this recursevly.
                        if isinstance(dataValue, dict):
                           return self.runTest(dataValue, regexTestObject[key])

                        # Otherise, just run the match value function.
                        else:
                            result = matchTest(str(dataValue), key, regexTestObject[key])
                            # If it returns an error message, return it to the top level in the call stack.
                            if isinstance(result, str):
                                return result + ' (At index {index})'.format(index=i+1)
                            
                # Otherwise it's a basic value, and we can just call the match test function.
                else:
                    result = matchTest(str(data[key]), key, regexTestObject[key])
                    # If the result is an error message, then we should return that to the top of the call stack.
                    if isinstance(result, str):
                        return result

            # Now that we're certain it's a valid data field, add it to the returned data object.
            returnData[key]=value

        # Returning the data that's passed the tests.
        return returnData
    
def matchTest(value:str, key:str, regex:str) -> bool | str:
    """
    A function to compare a string to a regular express. 

    params:
        value (string): The value being compared to the regular expression.
        key (string): The key in the dictionary that this value belongs to.
        regex (regex): The regular expression to test with.

    returns (string | True): Either returns a string error message or True if it passes.
    """

    # Then we run the regex.
    result = re.findall(regex, value)

    # If Regex rest completly fails, just return a basic error message.
    if not result:
        return 'Error: Please provide a valid {key}'.format(key=key)

    # If Regex test fails but all joined matches are equal to the inputted value, this means it's too long.
    if len(result) > 1 and ''.join(result) == value:
        return 'Error: {key} exceeds maximum character length.'.format(key=key)
    
    # If Regex test fails, then search for the illegal character and send back an error message stating so.
    if ''.join(result) != value:
        return 'Error: illegal character: "{value}" in: "{key}" at character:'.format(value=value[len(result[0]) if result[0][0] == value[0] else 0], key=key)

    # If none of the gaurd clauses apply, then return true.
    return True