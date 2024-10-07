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

def strip_date(date):
        new_date = date
        for index, month in enumerate(swedish_long_months):
          if month in new_date.lower():           
            new_date = new_date.lower().replace(month, "/" + str(index +1)).replace('-/', '/')
        new_date = new_date.replace(" ", "").replace('+', ' & ').replace('och', ' & ')  
        return new_date
   
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
swedish_long_months = ["januari", "februari", "mars", "april", "maj", "juni", "juli", "augusti", "september", "oktober", "november", "december"]



def modify_pattern_with_dash_and_one_gender(input_string):
    pattern = r"(F|P)(\d+)-(\d+)"
    pattern2 = r"(F|P)(\d+)-(F|P)(\d+)"
    # Find the match and extract the numbers
    match = re.search(pattern, input_string)
    match2 = re.search(pattern2, input_string)

    if match:
        replacement = "".join(r"\1/" + f"{num}" for num in range(int(match.group(2)), int(match.group(3)) + 1))
        
        # Perform the substitution
        return re.sub(pattern, replacement, input_string)
    elif match2:
        replacement = "".join(r"\1/" + f"{num}" for num in range(int(match2.group(2)), int(match2.group(4)) + 1))
        
        # Perform the substitution
        return re.sub(pattern2, replacement, input_string)
    else:
        return input_string
def modify_patternFP_with_dash(input_string):
  
  pattern = r"F/P(\d+)-(\d+)"
  pattern2 = r"F/P(\d+)-F/P(\d+)"

  replacement = r"F\1/F\2/P\1/P\2"
  # Find the match and extract the numbers
  match = re.search(pattern, input_string)
  match2 = re.search(pattern2, input_string)

  if match:
      start_num, end_num = int(match.group(1)), int(match.group(2))  
      # Generate the sequence of numbers
      number_sequence = [str(num) for num in range(start_num, end_num + 1)]  
      # Construct the replacement string
      replacement = "/".join(f"F{num}" for num in number_sequence) + "/" + "/".join(f"P{num}" for num in number_sequence)  
      # Perform the substitution
      return re.sub(pattern, replacement, input_string)
  elif match2:
      start_num, end_num = int(match2.group(1)), int(match2.group(2))  
      # Generate the sequence of numbers
      number_sequence = [str(num) for num in range(start_num, end_num + 1)]  
      # Construct the replacement string
      replacement = "/".join(f"F{num}" for num in number_sequence) + "/" + "/".join(f"P{num}" for num in number_sequence)  
      # Perform the substitution
      return re.sub(pattern2, replacement, input_string)
  else:
      return input_string  # Return the original string if no match is found
def modify_patternPF_with_dash(input_string):
  input_string = input_string.replace("PF", "P/F")

  pattern = r"P/F(\d+)-(\d+)"
  pattern2 = r"P/F(\d+)-P/F(\d+)"

  replacement = r"P\1/P\2/F\1/F\2"
  match = re.search(pattern, input_string)
  match2 = re.search(pattern2, input_string)
  
  if match:
      start_num, end_num = int(match.group(1)), int(match.group(2))  
      # Generate the sequence of numbers
      number_sequence = [str(num) for num in range(start_num, end_num + 1)]  
      # Construct the replacement string
      replacement = "/".join(f"P{num}" for num in number_sequence) + "/" + "/".join(f"F{num}" for num in number_sequence)  
      # Perform the substitution
      return re.sub(pattern, replacement, input_string)
  elif match2:
      start_num, end_num = int(match2.group(1)), int(match2.group(2))  
      # Generate the sequence of numbers
      number_sequence = [str(num) for num in range(start_num, end_num + 1)]  
      # Construct the replacement string
      replacement = "/".join(f"P{num}" for num in number_sequence) + "/" + "/".join(f"F{num}" for num in number_sequence)  
      # Perform the substitution
      return re.sub(pattern2, replacement, input_string)
  else:
      return input_string
def modify_patternPF(input_string):
  pattern = r"P/F(\d+)"
  replacement = r"P\1/F\1"
  pattern2 = r"PF(\d+)"
  replacement2 = r"P\1/F\1"
  match = re.search(pattern, input_string)
  match2 = re.search(pattern2, input_string)

  if match:
    return re.sub(pattern, replacement, input_string)
  elif match2:
    return re.sub(pattern2, replacement2, input_string)
  else:
    return re.sub(pattern, replacement, input_string)
       
  
def modify_patternFP(input_string):
  pattern = r"F/P(\d+)"
  replacement = r"F\1/P\1"
  return re.sub(pattern, replacement, input_string)
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
def scrape_tournament_data(url):
  
    
    try:
        # Fetch the webpage content
        """ response = requests.get(url, headers={'User-Agent': 'Mozilla/5.0'})
        response.raise_for_status()  # Raise exception for HTTP errors 
        save = BeautifulSoup(response.text, 'html.parser')

        with open("småland_index.html", "w", encoding="utf-8") as f:
          f.write(str(save)) """
        with open("småland_index.html", "r", encoding="utf-8") as f:
          content = f.read()
        # Parse the HTML content
        soup = BeautifulSoup(content, 'lxml')
        """ soup = BeautifulSoup(response.text, 'lxml') """
        # Find all span elements
        cups = soup.find_all('div', class_="accordion__content")
        data = []
        current_gender = ""
        for cup in cups:
          parts = cup.find_all('p')
          
             
          if (len(parts) != 0):   
             
            processed_string = ""             
            categories = parts[3].text.replace('Ålder: ', '').replace('.', "").replace('\xa0', "").replace('år', "").replace(' ', "").replace('pojkar', "P").replace('Pojkar', "P").replace('flickor', "F").replace('Flickor', "F").replace('Pojk', "P").replace('Flick', "F").replace('PochF', "PF")
            categories = categories.replace('och', ',').split(',')
            print(categories)
            for category in categories:
              if  category.startswith("F") or  category.startswith("P"):
                current_gender = category[0]
              if not category.find("-") == -1 and ((category.strip().startswith("P") and category.find("F") == -1) or (category.strip().startswith("F") and category.find("P") == -1)):
                processed_string += modify_pattern_with_dash_and_one_gender(category.strip())
              elif not category.find("-") == -1 and category.strip().startswith("F"):
                processed_string += modify_patternFP_with_dash(category)
              elif not category.find("-") == -1 and category.strip().startswith("P"):
                processed_string += modify_patternPF_with_dash(category)
              elif category.find("-") == -1 and category.strip().startswith("F"):
                processed_string += modify_patternFP(category)
              elif category.find("-") == -1 and category.strip().startswith("P"):
                processed_string += modify_patternPF(category)  
              elif category.find("-") == -1 and not category.strip().startswith("P") and not category.strip().startswith("F") and not category.strip().startswith("Herr") and not category.strip().startswith("Dam"): 
                processed_string += current_gender + category
              else:
                processed_string += category.strip()       
                                          
            processed_string = processed_string.replace('/', '').replace("Damsenior", "DAM").replace("Herrsenior", "HERR")
            print(processed_string)
            pattern = r"(?=(?:F|P|DAM|HERR|Herrjunior))"  
            result = re.split(pattern, processed_string)
            result = add_zero_before_one_digit(result)
            while result and result[0] == "":
              result.pop(0)
            
          
            month = ""
            if  not parts[2].text.find("/") == -1:
              english_month = int(parts[2].text.replace('Datum: ', '').split('/')[1].strip()) -1 # Extract month
              month = swedish_long_months[english_month].capitalize()
            else:
              sub_parts = parts[2].text.split(' ')
              for part in sub_parts:
                 if part.replace("spetember", "september").replace("\xa0", "").lower() in swedish_long_months:
                   month =  part.replace("spetember", "september").replace("\xa0", "").capitalize()
                   break
            
            data.append({
                          "name": parts[0].text.replace('Tävlingens namn: ', '').replace("\xa0", ""),
                          "club": parts[1].text.replace('Arrangör: ', '').replace("\xa0", ""),
                          "categoriesSummary": parts[3].text.replace('Ålder: ', '').replace("\xa0", ""),
                          "link": cup.find('a')['href'] if cup.find('a') else "",
                          "year": "2024",
                          "county": "Småland",
                          "date": strip_date(parts[2].text.replace('Datum: ', '').replace('2023', "").replace('2024', "").replace('2025', "").replace("\xa0", "")),
                          "categories": result,
                          "month": month
                          
                      })
           
        return(data)
    except requests.exceptions.RequestException as e:
        print(f"Error fetching webpage content: {e}")
        return None


if __name__ == "__main__":
    url = "https://www.smalandsfotbollen.se/tavling/cupsanktioner/sanktionerade-fotbollscuper-2024/"

    data = scrape_tournament_data(url)
    
    if data:
        # Save the data as JSON
        with open("småland.json", 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=4, ensure_ascii=False)
    else:
        print("Scraping failed.")