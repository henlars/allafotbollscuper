import requests
from bs4 import BeautifulSoup
import os
import openpyxl
import json
def scrape_website(url):
    """Scrapes the website for an Excel file and downloads it.

    Args:
        url (str): The URL of the website to scrape.

    Returns:
        None
    """

    try:
        # Fetch the website content
        response = requests.get(url, headers={'User-Agent': 'Mozilla/5.0'})
        response.raise_for_status()  # Raise exception for HTTP errors

        # Parse the HTML content
        soup = BeautifulSoup(response.text, 'lxml')

        # Find the Excel link
        excel_link = soup.find('a', href=lambda href: href and href.lower().find('sanktionerade-turneringar-2024') != -1 and href.lower().endswith(('.xls', '.xlsx')))

        if not excel_link:
            print("No Excel file found.")
            return

        # Construct the full Excel URL
        excel_url = f"https://www.gbgfotboll.se//{excel_link['href']}"

        # Download the Excel file
        excel_response = requests.get(excel_url, headers={'User-Agent': 'Mozilla/5.0'})
        excel_response.raise_for_status()  # Raise exception for download errors

        # Create the download directory if it doesn't exist
        os.makedirs('./excel', exist_ok=True)  # Safe creation of directory

        # Generate a unique filename with underscores
        filename = os.path.basename(excel_url).replace('/', '_')
        # Change extension if needed
        filename = f"{filename.rsplit('.', 1)[0]}.xlsx"

        # Download the Excel content
        with open(f'./excel/{filename}', 'wb') as f:
            f.write(excel_response.content)

        # Load the Excel file using openpyxl
        workbook = openpyxl.load_workbook(f'./excel/{filename}')

        # Get the first worksheet (adjust index if needed)
        sheet = workbook.worksheets[0]
        print(sheet)
        # Extract data from the worksheet
        #  Convert generator to list
        first_row = list(sheet.values)[0]
        data = []
        for row in sheet.iter_rows(values_only=True):
          data.append(dict(zip(first_row, row)))
      

        # Save the data as JSON
        with open(f"{filename}.json", 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=4, ensure_ascii=False)

        print(f"Excel file downloaded and converted to JSON successfully: {filename}")

    except requests.exceptions.RequestException as e:
        print(f"Error fetching or downloading files: {e}")
    except Exception as e:
        print(f"Error processing Excel file: {e}")

if __name__ == "__main__":
    url = "https://www.gbgfotboll.se/tavling/fotboll/sanktionerade-turnering/"
    scrape_website(url)