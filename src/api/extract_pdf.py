import tabula
import pandas as pd
import json

# Read the PDF
tables = tabula.read_pdf("./pdf/sanktionerade-cuper-2024.pdf", pages="all")

# Create a list of dictionaries to store data from all tables
all_data = []

# Iterate through each table and append its data to the list
for table in tables:
    data = table.to_dict('records')
    all_data.extend(data)

# Save the entire list as a JSON file
with open("sanktionerade-cuper-2024", 'w', encoding='utf-8') as f:
    json.dump(all_data, f, indent=4, ensure_ascii=False)

# We will have to locate the links later on with other libraries