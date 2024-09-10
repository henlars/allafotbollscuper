import requests
from bs4 import BeautifulSoup
import os

def scrape_website(url):
    """Scrapes the website for a PDF link containing "sanktionerade-cuper" and downloads it.

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

        # Find the PDF link containing "sanktionerade-cuper"
        pdf_link = soup.find('a', href=lambda href: href and href.lower().find('sanktionerade-cuper') != -1 and href.lower().endswith('.pdf'))

        if not pdf_link:
            print("No PDF link found containing 'sanktionerade-cuper'.")
            return

        # Construct the full PDF URL
        pdf_url = f"https://www.stff.se/{pdf_link['href']}"

        # Download the PDF
        pdf_response = requests.get(pdf_url, headers={'User-Agent': 'Mozilla/5.0'})
        pdf_response.raise_for_status()  # Raise exception for download errors

        # Create the download directory if it doesn't exist
        os.makedirs('./pdf', exist_ok=True)  # Safe creation of directory

        # Generate a unique filename with underscores
        filename = os.path.basename(pdf_url).replace('/', '_')

        # Download the PDF content
        with open(f'./pdf/{filename}', 'wb') as f:
            f.write(pdf_response.content)

        print(f"PDF downloaded successfully: {filename}")

    except requests.exceptions.RequestException as e:
        print(f"Error fetching or downloading files: {e}")

if __name__ == "__main__":
    url = "https://www.stff.se/tavling/cuper/sanktionerade-cuper/"
    scrape_website(url)