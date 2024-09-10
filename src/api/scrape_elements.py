import requests
from bs4 import BeautifulSoup
import json
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

def extract_cup_data(element):
    """Extracts data from the specified element based on its structure.

    Args:
        element (bs4.element.Tag): The BeautifulSoup element to extract data from.

    Returns:
        list: A list of dictionaries containing the extracted data.
    """

    data = []
    months = ["Januari", "Februari", "Mars", "April", "Maj", "Juni", "Juli", "Augusti", "September", "Oktober", "November", "December"]

    for child in element.children:
        if child.text in months:
            cup = child.find_next_sibling()
            current_month = child.text.strip()
            cups = cup.find_all('li')
            for cup in cups:
              tournament_data = cup.text.split(" - ")
              link = cup.find('a')
             
              data.append({
                      "month": current_month,
                      "name": tournament_data[0],
                      "club": tournament_data[1],
                      "date": tournament_data[2],
                      "category": tournament_data[3],
                      "link": link['href'] if len(tournament_data) > 4 else None
                  })
 
    return data

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