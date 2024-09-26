import tabula
import pandas as pd
import json
import pdfplumber
import fitz
swedish_months = ["jan", "feb", "mars", "apr", "maj", "jun", "jul", "aug", "sep", "okt", "nov", "dec"]

def strip_date(date):
        new_date = date
        for index, month in enumerate(swedish_months):
          if month in new_date.lower():           
            new_date = new_date.lower().replace(month, "/" + str(index +1)).replace('-/', '/')
        new_date = new_date.replace(" ", "").replace('+', ' & ')    
        return new_date
doc = fitz.open("./pdf/sanktionerade-cuper-2024.pdf")
link_array = []
for i in range(doc.page_count):
  page = doc.load_page(i)
  links = page.get_links()
  for link in links:

    link_array.append(link['uri'])
# Read the PDF
pages = tabula.read_pdf("./pdf/sanktionerade-cuper-2024.pdf", pages="all" , output_format="json")
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
                        "year": "2024",
                        "county": "Stockholm",
                        "categories": [],
                        "month": ""
                    })
      if cup[4]['text']:
        link_index += 1     
all_data.pop(0)
# Save the entire list as a JSON file
with open("sanktionerade-cuper-2024.json", 'w', encoding='utf-8') as f:
    json.dump(all_data, f, indent=4, ensure_ascii=False)

