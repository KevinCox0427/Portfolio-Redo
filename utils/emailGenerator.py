class EmailGenerator:
    """
    A Utility Class to generate a templated HTML file to send emails.
    The constructor will create the template, while the functions use the template to fill in the necessary data and return it as a string.

    args:
        name (str):
        message (str): 
        subtitle (str):
    """
    def __init__(self, name:str='', message:str='', subtitle:str=''):
        self.name = name
        self.message = message
        self.subtitle = subtitle

    def generateHTMLEmail(self, subject:str='', data:str='') -> str:
        """
        Fills in the templated email with data in a table format.
        This one is inteneded for the customer, so this will include the disclaimer as the bottom.
        
        params:
            subject (str): The message at the very top of the email.
            data (dict | str): The inserted data. All data MUST be an object but can be nested.
        
        returns (str): an HTML email in a string format.
        """

        data = f'<tr><td colspan="2" style="font-size:18px;font-weight:200;padding-top:25px;padding-bottom:25px;">{data}</td></tr>' if isinstance(data, str) else createTableRows(data, 0)
        
        return f'''<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "https://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html xmlns=3D"https://www.w3.org/1999/xhtml" xmlns:v=3D"urn:schemas-micr=osoft-com:vml"><head><meta https-equiv=3D"Content-Type" content=3D"text/html; charset=3Dutf-8"=/><meta https-equiv=3D"X-UA-Compatible" content=3D"IE=3Dedge" /><meta name=3D"viewport" content=3D"width=3Ddevice-width, initial-scale=3D=1.0"><meta name=3D"x-apple-disable-message-reformatting" /><title>{subject}</title><style type=3D"text/css">@font-face{{font-family:'Libre Franklin';src:url("https://fonts.gstatic.com/s/librefranklin/v13/jizDREVItHgc8qDIbSTKq4XkRiUf2zcZiVbJ.woff2") format("woff2");font-weight: 200;font-style: normal;}}@font-face {{font-family: "Libre Franklin";src: url("https://fonts.gstatic.com/s/librefranklin/v13/jizBREVItHgc8qDIbSTKq4XkRiUa6zUTjnTLgNs.woff2") format("woff2");font-weight: 200;font-style: italic;}}@font-face {{font-family: 'Arima';src: url("https://fonts.gstatic.com/s/arima/v5/neIFzCqmt4Aup9CI_oCsNKEy.woff2") format("woff2");font-weight: 200;font-style: italic;}}</style></head><body style="background-color:#eee5e4 !important; color:#47484d !important; font-family: 'Libre Franklin', sans-serif;"><table border="0" cellpadding="0" cellspacing="0" width="600px" style="border-collapse: collapse; margin-left: auto; margin-right: auto; font-size: 16px;max-width: 100% !important;"><tbody><tr style="border-bottom:2px dashed #47484d;"><th colspan="2" style="font-size:18px;padding-top:10px;padding-bottom:10px;font-weight:200;font-style:italic;"><h1 style="font-weight:200;font-size:36px;line-height:38px;margin-bottom:0px;font-family:'Arima',serif;font-style:normal;">{self.name}</h1>{self.subtitle}</th></tr><tr><td colspan="2" style="font-size:24px;line-height:26px;text-align:center;padding-top:35px;padding-bottom:30px;font-family:'Arima',serif;font-weight:200;">{subject}</td></tr>{data}<tr><td colspan="2" style="font-size:18px;text-align:center;padding-top:40px;padding-bottom:45px;font-style:italic;font-weight:200;">{self.message}</td></tr><tr></tr><tr style="font-weight:200;border-top:2px dashed #47484d;"><td style="line-height:80%;vertical-align:center;padding-left:10px;padding-top:20px;padding-bottom:15px;padding-right:5px;font-family:'Arima', serif;font-size:28px;">Kevin Cox</td><td style="vertical-align:center;padding-left:10px;padding-top:20px;padding-bottom:15px;padding-right:5px;line-height:140%;"><span style="font-weight: 400;margin-right:5px">Email:</span> kevin@dreamstate.graphics<br><span style="font-weight: 400;margin-right:5px">Phone:</span> (845) 649-7476</td></tr></tbody></table></body></html>'''

        
def createTableRows(inputData: dict | list, nestedIndex: int) -> str:
    """
    A recursive function for converting the data dictionary into html as table rows.
    
    params:
        inputData (dict | list): The current data set that's been inserted into the table.
        nestedIndex (int): The index of how many times this function has been called recursevly. Used to add "padding-left" to the inserted values.
    
    returns (str): A series of HTML table rows
    """

    # Formatting the HTML table row based on the inputted data.
    rows: list

    # If it's a dictionary, we'll loop over it's keys.
    if(isinstance(inputData, dict)):
        rows = ''.join(list(map(lambda currentKey:
            f'<tr><td style="padding-left:{10+(nestedIndex*15)}px;padding-top:10px;padding-bottom:10px;padding-right:5px;font-weight:400;">{currentKey}:</td><td style="padding-left:{10+(nestedIndex*15)}px;padding-top:10px;padding-bottom:10px;font-weight:200;word-break:break-word;">{inputData[currentKey] if not isinstance(inputData[currentKey], (dict, list)) else ""}</td></tr>{createTableRows(inputData=inputData[currentKey], nestedIndex=nestedIndex+1) if isinstance(inputData[currentKey], (dict, list)) else ""}'   
        , inputData.keys())))

    # Otherwise just loop over the list
    else:
        rows = ''.join(list(map(lambda data:
            f'<tr><td style="padding-left:{10+(nestedIndex*15)}px;padding-top:10px;padding-bottom:10px;padding-right:5px;font-weight:200;">{data[0]+1}:</td><td style="padding-left:{10+(nestedIndex*15)}px;padding-top:10px;padding-bottom:10px;font-weight:200;word-break:break-word;">{data[1] if not isinstance(data[1], (dict, list)) else ""}</td></tr>{createTableRows(inputData=data[1], nestedIndex=nestedIndex+1) if isinstance(data[1], (dict, list)) else ""}'
        , enumerate(inputData))))

    # Making every other row a brighter white.
    rows = list(filter(lambda row: len(row) > 0, rows.split('<tr>')))

    for i, row in enumerate(rows):
        if i % 2 == 0:
            rows[i] = f'<tr style="background-color:#f7f7f7 !important;">{rows[i]}'
        else:
            rows[i] = f'<tr>{rows[i]}'

    # Returning the joined result.
    return ''.join(rows)