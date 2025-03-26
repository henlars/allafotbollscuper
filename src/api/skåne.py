import datetime
import locale
import requests
from bs4 import BeautifulSoup
import json
import re

 
def add_zero_before_one_digit(array):
    modified_array = []
    for element in array:
      if element.startswith('P') or element.startswith('F'):
        if len(element[1:]) == 1:
          modified_array.append(f"{element[0]}0{element[1:]}")
        else:
          modified_array.append(element)
      else:
        modified_array.append(element)
    return modified_array
swedish_long_months = ["januari", "februari", "mars", "april", "maj", "juni", "juli", "augusti", "september", "oktober", "november", "december"]

def convert_date_range(date_range):
    """Converts a date range in the format "YYYY-MM-DD - YYYY-MM-DD" into the format "DD/MM-DD/MM".

    Args:
        date_range: The date range string.

    Returns:
        The converted date range string.
    """
    
    if not (date_range.find(" - ") == -1):
      
      start_date, end_date = date_range.split(" - ")
      if not start_date.find('-') == -1:
        start_day = start_date.split("-")[2]
        start_month = start_date.split("-")[1]
        end_day = end_date.split("-")[2]
        end_month = end_date.split("-")[1]
  
        if start_month == end_month:
            return f"{remove_leading_zeros(start_day)}-{remove_leading_zeros(end_day)}/{remove_leading_zeros(start_month)}"
        else:
            return f"{remove_leading_zeros(start_day)}/{remove_leading_zeros(start_month)}-{remove_leading_zeros(end_day)}/{remove_leading_zeros(end_month)}"
      else:
         return start_date.replace(' 2025', '')
    else:
      start_day = date_range.split("-")[2]
      start_month = date_range.split("-")[1]
      return f"{remove_leading_zeros(start_day)}/{remove_leading_zeros(start_month)}"
def remove_leading_zeros(number):
  """Removes leading zeros from a number string.

  Args:
    number: The number string.

  Returns:
    The number string without leading zeros.
  """

  if number.startswith("0"):
    return number.lstrip("0")
  else:
    return number

def get_swedish_month(date_string):
    if (date_string.replace(' 2025', "").lower() in swedish_long_months):
       return date_string
    elif not (date_string.find('Vår') == -1):
       return "Mars" 
    else:   
      english_month = int(date_string.split('-')[1]) -1 # Extract month
      swedish_month = swedish_long_months[english_month]
      return swedish_month.capitalize()

def detailed_categories(categories):
  if not categories.find('/') == -1: 
     pattern = r"(F|P)(\d+)(\/)(\d+)"
     replacement = r"\1\2/\1\4"
     return re.sub(pattern, replacement, categories)
  elif  categories.find('-') == -1:
     if categories == "DA":
       return "DAM"
     elif categories == "HA":
       return "HERR"
     else:
       return categories
  
  else:   
    pattern = r"(F|P)(\d+)-(F|P)(\d+)"

    replacement = r"P\1/P\2/F\1/F\2"
    match = re.search(pattern, categories)
    
    if match:
      replacement = "".join(r"\1/" + f"{num}" for num in range(int(match.group(2)), int(match.group(4)) + 1))
      
      # Perform the substitution
      return re.sub(pattern, replacement, categories)
    
    else:
        return categories
def scrape_tournament_data(url):
  
    
    try:
        # Fetch the webpage content
        response = requests.get(url, headers={'User-Agent': 'Mozilla/5.0'})
        response.raise_for_status()  # Raise exception for HTTP errors 
        save = BeautifulSoup(response.text, 'html.parser')

        with open("skåne2025.html", "w", encoding="utf-8") as f:
          f.write(str(save))
        with open("skåne2025.html", "r", encoding="utf-8") as f:
          content = f.read()
        # Parse the HTML content
        soup = BeautifulSoup(content, 'lxml')
        """ soup = BeautifulSoup(response.text, 'lxml') """
        # Find all span elements
        cups = soup.find_all('div', class_="accordion__content")
        data = []
        for cup in cups:
          spans = cup.find_all('span')
          special_spans = ""  
          if not spans:
             text = cup.find('p').text
             words_to_split_by = ['Cup/tävling: ', 'Datum: ', 'Kategorier: ']

             special_spans = re.split("|".join(words_to_split_by), text.replace('Arrangör: ', ""))
             processed_string = ""             
  
             categories = special_spans[3].split(',')
             for category in categories:
               processed_string += detailed_categories(category.strip())
             processed_string = processed_string.replace('/', '')
                             
         
             pattern = r"(?=(?:F|P|DAM|HERR))"  
             result = re.split(pattern, processed_string)
             result = add_zero_before_one_digit(result)
             while result and result[0] == "":
              result.pop(0)
             data.append({
                           "month": get_swedish_month(special_spans[2].split(' - ')[0].strip()),
                           "name": special_spans[1],
                           "club": special_spans[0],
                           "date": convert_date_range(special_spans[2]),
                           "categories": result,
                           "categoriesSummary": special_spans[3],
                           "link": cup.find('a')['href'] if cup.find('a') else "",
                           "year": "2025",
                           "county": "Skåne"
                       })
             
          else:
               
            processed_string = ""             
  
            categories = spans[3].text.replace('Kategorier: ', '').split(',')
            for category in categories:
              processed_string += detailed_categories(category.strip())
                                          
            processed_string = processed_string.replace('/', '')

            pattern = r"(?=(?:F|P|DAM|HERR))"  
            result = re.split(pattern, processed_string)
            result = add_zero_before_one_digit(result)
            while result and result[0] == "":
              result.pop(0)
            data.append({
                          "month": get_swedish_month(spans[2].text.split(' - ')[0].replace('Datum: ', '').strip()),
                          "name": spans[1].text.replace('Cup/tävling: ', ''),
                          "club": spans[0].text.replace('Arrangör: ', ''),
                          "date": convert_date_range(spans[2].text.replace('Datum: ', '')),
                          "categories": result,
                          "categoriesSummary": spans[3].text.replace('Kategorier: ', ''),
                          "link": cup.find('a')['href'] if cup.find('a') else "",
                          "year": "2025",
                          "county": "Skåne"
                      })
          """ print(data) """
        return(data)
    except requests.exceptions.RequestException as e:
        print(f"Error fetching webpage content: {e}")
        return None


if __name__ == "__main__":
    url = "https://www.skaneboll.se/tavling/cuper/tavlingar-med-tillstand-fotboll-2021/"

    data = scrape_tournament_data(url)
    
    if data:
        # Save the data as JSON
        with open("skåne2025.json", 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=4, ensure_ascii=False)
    else:
        print("Scraping failed.")