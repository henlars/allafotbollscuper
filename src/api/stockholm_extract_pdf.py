import tabula
import pandas as pd
import json
import pdfplumber
import fitz
import re
swedish_months = ["jan", "feb", "mars", "apr", "maj", "jun", "jul", "aug", "sep", "okt", "nov", "dec"]
swedish_long_months = ["januari", "februari", "mars", "april", "maj", "juni", "juli", "augusti", "september", "oktober", "november", "december"]

def strip_date(date):
        new_date = date
        for index, month in enumerate(swedish_months):
          if month in new_date.lower():           
            new_date = new_date.lower().replace(month, "/" + str(index +1)).replace('-/', '/')
        new_date = new_date.replace(" ", "").replace('+', ' & ')    
        return new_date
def extract_month(date):
      extracted_month= ""
      for index, month in enumerate(swedish_months):
        if month in date:
            if (month != "jan" and extracted_month != "januari"):
              extracted_month = swedish_long_months[index]
              break
            else:
              if (month == 'dec'):
                extracted_month = swedish_long_months[index]
              else:
                extracted_month = swedish_long_months[0]  
        else:
          match = re.search(r'/(\d)', date)
          if match:
            extracted_month = swedish_long_months[int(match.group(1)) - 1]
      
                 
              


      return extracted_month.capitalize()  
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
def modify_patternFP(input_string):
  """ print(input_string)
  plus_pattern = r"\+"
  match = re.search(plus_pattern, input_string)
  if match:
    pattern = r"F/P(\d+)\+(\d+)"
    replacement = r"F\1/P\1F\2/P\2"
    return re.sub(pattern, replacement, input_string)
  else: """  
  pattern = r"F/P(\d+)"
  replacement = r"F\1/P\1"
  return re.sub(pattern, replacement, input_string)
""" def modify_pattern_with_two_ranges(input_string):
  print(input_string)
  pattern = r"F/P(\d+)\+(\d+)"
  replacement = r"F\1/P\1F\2/P\2"
  return re.sub(pattern, replacement, input_string) """
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
def convert_categories(categories):     
  processed_string = ""       
  subitems = categories.replace(' ', '')
  """ pattern = r"\+(\d+)"
  no_gender_after_plus = re.search(pattern, subitems)
  if no_gender_after_plus:
    subitems = re.split(r"[,&]", subitems)
  else: """
  subitems = re.split(r"[,&+]", subitems)
  categories_symbol = ""  
  for subitem in subitems:
    if subitem.strip().startswith("P"):
      categories_symbol = "P"
    if subitem.strip().startswith("F"):
      categories_symbol = "F"
    if subitem.strip().startswith("F/P"):
      categories_symbol = "F/P"
    if   subitem.find("F") == -1 and subitem.find("P") == -1:
      subitem = categories_symbol + subitem    
      
    if not subitem.find("-") == -1 and ((subitem.strip().startswith("P") and subitem.find("F") == -1) or (subitem.strip().startswith("F") and subitem.find("P") == -1)):
      processed_string += modify_pattern_with_dash_and_one_gender(subitem.strip())
    elif not subitem.find("-") == -1 and subitem.strip().startswith("F"):
      processed_string += modify_patternFP_with_dash(subitem.strip())  
    elif subitem.find("-") == -1 and subitem.strip().startswith("F"):
      processed_string += modify_patternFP(subitem.strip())   
    elif     subitem.strip().startswith("Dam-F") or subitem.strip().startswith("Herr-P"):
      processed_string = '*'  
    elif    subitem.strip() == 'DJ':
      processed_string += 'DJ'   
    elif    subitem.strip() == 'HJ':
      processed_string += 'HJ'  
    
     
    else:
      processed_string += subitem.strip()       
  processed_string = processed_string.replace('/', '')  
  pattern = r"(?=(?:F|P|HJ|DJ))"  
  result = re.split(pattern, processed_string)
  
  # Remove any empty strings from the beginning of the list
  while result and result[0] == "":
    result.pop(0)
  converted_years = [] 
  for year in result:
    
    match = re.match(r'([A-Z]+)(\d+)', year)
    if match:
        letters, numbers = match.groups()
        """ print(f"Letters: {letters}, Numbers: {numbers}") """
        new_year = 2024 - int(numbers)
        converted_years.append(letters + str(new_year))
    else:
      converted_years.append(year)
  converted_years = add_zero_before_one_digit(converted_years)
    
  return converted_years         
doc = fitz.open("./pdf/stockholm2025.pdf")
link_array = []
for i in range(doc.page_count):
  page = doc.load_page(i)
  links = page.get_links()
  for link in links:

    link_array.append(link['uri'])
# Read the PDF
pages = tabula.read_pdf("./pdf/stockholm2025.pdf", pages="all" , output_format="json")
link_index = -1
# Create a list of dictionaries to store data from all tables
all_data = []
# Iterate through each table and append its data to the list
for page in pages:
    for index, cup in enumerate(page['data']):       
      all_data.append({
                        
                        "name": cup[0]['text'],
                        "club": cup[1]['text'],
                        "date": strip_date(cup[2]['text']),                      
                        "categoriesSummary": cup[3]['text'],
                        "link":   link_array[link_index] if cup[4]['text'] else "",
                        "year": "2025",
                        "county": "Stockholm",
                        "categories": convert_categories(cup[3]['text']),
                        "month": extract_month(cup[2]['text'])
                    })
      if cup[4]['text']:
        link_index += 1     
all_data.pop(0)
# Save the entire list as a JSON file
with open("stockholm2025.json", 'w', encoding='utf-8') as f:
    json.dump(all_data, f, indent=4, ensure_ascii=False)

