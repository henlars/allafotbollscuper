import pyodbc
import json
from dotenv import load_dotenv

load_dotenv("../../.env.local")
import os

# Ersätt med dina autentiseringsuppgifter
server = 'allafotbollscuper.database.windows.net'
database = 'cuper'
username = 'henrik'
password = os.environ.get("DATABASE_PASSWORD")
driver = '{ODBC Driver 18 for SQL Server}'

# Anslutningssträng
conn_string = f'DRIVER={driver};SERVER={server};DATABASE={database};UID={username};PWD={password}'

try:
    # Anslut till databasen
    conn = pyodbc.connect(conn_string)
    cursor = conn.cursor()

   # Exempel på JSON-data
    json_data = {
        
       "name": "Romelanda Cup",
        "club": "Romelanda UF",
        "categoriesSummary": "F9,F13,P9,P13",
        "date": "23-24/3&6-7/4",
        "pitchSize": "5 mot 5, Liten 9 mot 9",
        "link": "https://www.romelandacup.se",
        "county": "Göteborg",
        "year": "2024",
        "categories": [
            "F09",
            "F13",
            "P09",
            "P13"
        ],
        "month": "Mars"
    }
    

    # SQL-fråga för INSERT
    sql = "INSERT INTO cuper (name, club, categoriesSummary, date,  link, county, year, categories, month    ) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?)"

    # Utför INSERT
    cursor.execute(sql, (json_data["name"], json_data["club"], json_data["categoriesSummary"],json_data["date"],json_data["link"],json_data["county"],json_data["year"],", ".join(json_data["categories"]),json_data["month"]))
    conn.commit()
    print("Data inserted successfully!")
except pyodbc.Error as ex:
    print('Error:', ex)

finally:
    if conn:
        conn.close()