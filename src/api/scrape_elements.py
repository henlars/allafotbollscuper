import requests
from bs4 import BeautifulSoup
import json
import re
def modify_pattern_with_dash_and_one_gender(input_string):
    pattern = r"(F|P)(\d+)-(\d+)"
    # Find the match and extract the numbers
    match = re.search(pattern, input_string)
    if match:
        replacement = "".join(r"\1/" + f"{num}" for num in range(int(match.group(2)), int(match.group(3)) + 1))
        
        # Perform the substitution
        return re.sub(pattern, replacement, input_string)
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
  return re.sub(pattern, replacement, input_string)
def modify_patternFP(input_string):
  pattern = r"F/P(\d+)"
  replacement = r"F\1/P\1"
  return re.sub(pattern, replacement, input_string)

def extract_cup_data(element):
    data = []
    months = ["Januari", "Februari", "Mars", "April", "Maj", "Juni", "Juli", "Augusti", "September", "Oktober", "November", "December"]
    def process_tournament_data(tournament_data):
      processed_string = ""
      
      raw_data = tournament_data[3]
      if len(tournament_data) > 5:
        raw_data += "-" + tournament_data[4]
        
      subitems = raw_data.replace(' ', '').replace('&', '').split(',')
      for subitem in subitems:
        if not subitem.find("-") == -1 and ((subitem.strip().startswith("P") and subitem.find("F") == -1) or (subitem.strip().startswith("F") and subitem.find("P") == -1)):
          processed_string += modify_pattern_with_dash_and_one_gender(subitem.strip())
        elif not subitem.find("-") == -1 and subitem.strip().startswith("F"):
          processed_string += modify_patternFP_with_dash(subitem)
        elif not subitem.find("-") == -1 and subitem.strip().startswith("P"):
          processed_string += modify_patternPF_with_dash(subitem)
        elif subitem.find("-") == -1 and subitem.strip().startswith("F"):
          processed_string += modify_patternFP(subitem)
        elif subitem.find("-") == -1 and subitem.strip().startswith("P"):
          processed_string += modify_patternPF(subitem)  
          
        else:
          processed_string = raw_data       
      processed_string = processed_string.replace('/', '')
      pattern = r"(?=(?:F|P))"  
      result = re.split(pattern, processed_string)

      # Remove any empty strings from the beginning of the list
      while result and result[0] == "":
        result.pop(0)
    
      return result
           
    
    for child in element.children:
        if child.text in months:
            cup = child.find_next_sibling()
            current_month = child.text.strip()
            cups = cup.find_all('li')
            for cup in cups:
              link = cup.find('a')
              if link:
                link.extract() 
              
              tournament_data = cup.text.split(" -")
              

              data.append({
                      "month": current_month,
                      "name": tournament_data[0],
                      "club": tournament_data[1],
                      "date": tournament_data[2],
                      "categories": process_tournament_data(tournament_data),
                      "link": link['href'] if link else "",
                      "year": "2024"
                  })
              
 
    return data


def scrape_tournament_data(url, text_to_find):
    """Scrapes a webpage and extracts data based on months and elements within the found element.

    Args:
        url (str): The URL of the webpage to scrape.
        text_to_find (str): The text to search for within the webpage.

    Returns:
        list: A list of dictionaries containing the extracted data.
    """
    
    try:
        # Fetch the webpage content
        response = requests.get(url, headers={'User-Agent': 'Mozilla/5.0'})
        response.raise_for_status()  # Raise exception for HTTP errors
        """ save = BeautifulSoup(response.text, 'html.parser')

        with open("index.html", "w", encoding="utf-8") as f:
          f.write(str(save)) 
        with open("index.html", "r", encoding="utf-8") as f:
          content = f.read()"""
        # Parse the HTML content
        soup = BeautifulSoup(response.text, 'lxml')

        # Find all span elements
        spans = soup.find_all('span')

        # Iterate through spans and find the one with the desired text
        for span in spans:
            if span.string == text_to_find:
                parent = span.parent
                aria_controls = parent.get('aria-controls')
                if aria_controls:
                    # Find the element with the specified aria-controls attribute
                    element = soup.find(id=aria_controls)
                    if element:
                        # Extract data based on the element's structure
                        data = extract_cup_data(element)
                        return data
                break  # Exit the loop once the element is found

        print(f"Element containing '{text_to_find}' not found.")
        return None

    except requests.exceptions.RequestException as e:
        print(f"Error fetching webpage content: {e}")
        return None


if __name__ == "__main__":
    url = "https://vastergotland.svenskfotboll.se/tavling/cuptillstand/"
    text_to_find = "Cuptillstånd fotboll 2024"

    data = scrape_tournament_data(url, text_to_find)
    
    if data:
        # Save the data as JSON
        with open("cuper2024.json", 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=4, ensure_ascii=False)
    else:
        print("Scraping failed.")